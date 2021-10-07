module.exports = [
    '$scope',
    '$rootScope',
    'Authentication',
    '$window',
    function (
        $scope,
        $rootScope,
        Authentication,
        $window
    ) {
        $scope.startHeadway = startHeadway;

        activate();

        function activate() {
            $rootScope.$on('event:authentication:login:succeeded', function () {
                $scope.startHeadway();
            });

            if (Authentication.getLoginStatus()) {
                $scope.startHeadway();
            }
        }

        function startHeadway() {
            var config = {
                selector: '.notif-bar', // CSS selector where to inject the badge
                account: '7wPX5J'
            };

            $window.Headway.init(config);
        }

    }];
