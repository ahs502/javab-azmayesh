/*global app*/
/*global angular*/
/*global ValidationSystem*/
/*global iconJs*/

app.controller('PanelSendController', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$timeout', '$http', 'AnswerService',
    function($scope, $rootScope, $state, $stateParams, $window, $timeout, $http, answerService) {

        $scope.loadPatientInfo = loadPatientInfo;
        $scope.sendAnswer = sendAnswer;
        $scope.selectFilesDialog = selectFilesDialog;
        $scope.abortUpload = abortUpload;
        $scope.removeFile = removeFile;

        $scope.sendingAnswer = false;
        $scope.files = [];
        /* Each file has :
            status:         Preparing, Uploading, Uploded, Error, Aborting, Aborted, Removing, Removed
            name:           alpha.beta
            size:           1024
            type:           application/beta
            lastModified:   
            id:             4
            srcPreview:     pdf file
            xhr:            Uploading XHR for this file
            progress:       73
            serverName:     1234567
        */

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('ارسال نتایج');

        var inputFile = $window.document.getElementById('input-file');
        var dropZone = $window.document.getElementById('drop-zone');

        inputFile.addEventListener('change', inputFile_OnChange, false);
        $window.document.addEventListener("dragover", document_OnDragOver, false);
        $window.document.addEventListener("dragleave", document_OnDragLeave, false);
        $window.document.addEventListener("drop", document_OnDrag, false);
        $scope.$on('$destroy', function() {
            inputFile.removeEventListener('change', inputFile_OnChange);
            $window.document.removeEventListener("dragover", document_OnDragOver);
            $window.document.removeEventListener("dragleave", document_OnDragLeave);
            $window.document.removeEventListener("drop", document_OnDrag);
        });

        $scope.person = {};
        //$scope.person.nationalCode
        //$scope.person.fullName
        //$scope.person.mobilePhoneNumber
        //$scope.person.phoneNumber
        //$scope.person.extraPhoneNumber
        //$scope.person.email
        //$scope.notes

        $scope.vs = new ValidationSystem($scope.person)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('fullName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(3)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('extraPhoneNumber', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('email', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.email()
            ]);

        var fileId = 0;

        function loadPatientInfo() {
            if (!$scope.vs.see('nationalCode')) return;

            if ($scope.person.fullName && $scope.person.mobilePhoneNumber && $scope.person.phoneNumber &&
                $scope.person.extraPhoneNumber && $scope.person.email) return;

            $scope.sendingAnswer = true;
            return answerService.patientInfo($scope.person.nationalCode)
                .then(function(patient) {

                    $scope.person.fullName = $scope.person.fullName || patient.fullName;
                    $scope.person.mobilePhoneNumber = $scope.person.mobilePhoneNumber || patient.numbers[0];
                    $scope.person.phoneNumber = $scope.person.phoneNumber || patient.numbers[1];
                    $scope.person.extraPhoneNumber = $scope.person.extraPhoneNumber || patient.numbers[2];
                    $scope.person.email = $scope.person.email || patient.email;

                    $scope.vs.check('fullName', 'mobilePhoneNumber', 'phoneNumber', 'extraPhoneNumber', 'email');

                }, function(code) {
                    // No problem!
                })
                .then(function() {
                    $scope.sendingAnswer = false;
                });
        }

        function sendAnswer() {
            if (!$scope.vs.validate()) return;

            $scope.sendingAnswer = true;
            answerService.send($scope.person, $scope.files, $scope.notes, $scope.vs.dictate)
                .then(function() {
                    $scope.sendingAnswer = false;
                    $scope.showMessage('ازسال موفقیت آمیز نتایج آزمایش',
                            'نتایج آزمایش ثبت شده و اطلاع رسانی لازم به بیمار صورت خواهد گرفت.')
                        .then(function() {
                            $state.go('panel.home');
                        });
                }, function(code) {
                    $scope.sendingAnswer = false;
                    alert(code);
                });
        }

        function selectFilesDialog() {
            inputFile.click();
        }

        function inputFile_OnChange(e) {
            var files = toArray(inputFile.files);
            inputFile.value = '';
            addNewFiles(files);
        }

        function processDragEvent(e) {
            dropZone.className = (e.type === 'dragover' && e.path.indexOf(dropZone) >= 0) ? 'drag-on' : '';
            e.stopPropagation();
            e.preventDefault();
        }

        function document_OnDragOver(e) {
            processDragEvent(e);
        }

        function document_OnDragLeave(e) {
            processDragEvent(e);
        }

        function document_OnDrag(e) {
            processDragEvent(e);
            if (e.path.indexOf(dropZone) >= 0) {
                var files = toArray(e.target.files || e.dataTransfer.files);
                addNewFiles(files);
            }
        }

        function addNewFiles(files) {

            // filter bad / duplicated / veryLarge files
            files = files.filter(function(file) {
                return file.size > 0 && file.size <= 10 * 1024 * 1024 && file.type != '' &&
                    $scope.files.filter(function(existingFile) {
                        return existingFile.name === file.name &&
                            existingFile.size === file.size &&
                            existingFile.type === file.type &&
                            existingFile.lastModified === file.lastModified;
                    }).length === 0;
            });

            // assign id & try to make a preview image for the file
            files.forEach(function(file) {
                file.id = fileId++;

                file.srcPreview = iconJs.file(file.name);

                if (file.type.match('image.*')) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $timeout(function() {
                            file.srcPreview = e.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });

            // start uploading the file
            files.forEach(uploadFile);

            // show all files
            $scope.files = $scope.files.concat(files);
            $scope.$$phase || $scope.$apply();
        }

        function uploadFile(file) {

            file.status = 'Preparing';

            var formData = new FormData();
            formData.append(file.name, file);

            var xhr = new XMLHttpRequest();
            file.xhr = xhr;
            xhr.open('post', '/answer/file/upload', true);
            xhr.setRequestHeader('X-Access-Token', $http.defaults.headers.common['X-Access-Token']);
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    file.progress = Math.floor((e.loaded / e.total) * 100);
                    angular.element('#progress-' + file.id).progress({
                        percent: file.progress
                    });
                    $scope.$$phase || $scope.$apply();
                }
            };
            xhr.onerror = function(e) {
                file.status = 'Error';
                $scope.$$phase || $scope.$apply();
            };
            xhr.onabort = function(e) {
                (file.status === 'Aborting') && (file.status = 'Aborted');
                $scope.$$phase || $scope.$apply();
            };
            xhr.onload = function(e) {
                try {
                    if (e.currentTarget.status != 200)
                        throw e.currentTarget.response;
                    file.serverName = JSON.parse(e.currentTarget.response).filename;
                    file.status = 'Uploaded';
                }
                catch (err) {
                    file.status = 'Error';
                }
                $scope.$$phase || $scope.$apply();
            };

            file.status = 'Uploading';
            file.progress = 0;
            angular.element('#progress-' + file.id).progress({
                percent: file.progress
            });
            $scope.$$phase || $scope.$apply();

            xhr.send(formData);
        }

        function abortUpload(file) {
            file.status = 'Aborting';
            file.xhr.abort();
        }

        function removeFile(file) {
            //TODO: lock this file interface
            abortUpload(file);
            file.status = 'Removing';
            $timeout(function() {
                file.status = 'Removed';
                $scope.files.splice($scope.files.indexOf(file), 1);
            } /*, 500*/ );
        }

        // convert object to array
        // e.g.: Convert FileList to Array of File
        function toArray(arrayLikeObject) {
            return Array.apply(null, {
                    length: arrayLikeObject.length
                }).map(Number.call, Number)
                .map(function(i) {
                    return arrayLikeObject[i];
                });
            /* or */
            // return Array.prototype.slice.call(arrayLikeObject);
        }

    }
]);
