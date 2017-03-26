/*global app*/
/*global $*/

app.run(['$rootScope', '$state', '$stateParams', '$window',
    function($rootScope, $state, $stateParams, $window) {

        // No need to initial loader anymore
        $('#ja-initial-loader').hide();
        $('#ja-main-site-content').show();
        $('#ja-sidebar-menu').show();

        if ($window.location.hash.indexOf('#/answer') !== 0) {
            // $state.go('home.find');
            // $state.go('panel.account.summary');
            // $state.go('panel.home');
            $state.go('lab.login');
            // $state.go('lab.register');
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.data = {};

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {

                //event.preventDefault(); 
                //...

            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                $window.scrollTo(0, 0);

                //...

            });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {

                //...

            });

    }
]);
