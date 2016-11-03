/*global app*/
/*global $*/

app.run(['$rootScope', '$state', '$stateParams', '$window',
    function($rootScope, $state, $stateParams, $window) {

        $('#ja-initial-loader').hide();
        $('#ja-sidebar-menu').show();
        $('#ja-main-site-content').show();

        // $state.go('home.find');
        $state.go('panel.send');

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
