module.exports = [
    '$scope',
    '$stateParams',
    '$translate',
    '$location',
    '$controller',
    '$transition$',
    'PostEntity',
    'PostEndpoint',
function (
    $scope,
    $stateParams,
    $translate,
    $location,
    $controller,
    $transition$,
    postEntity,
    PostEndpoint
) {
    $translate('post.create_post').then(function (title) {
        $scope.title = title;
        $scope.$emit('setPageTitle', title);
    });

    $scope.post = postEntity();

    PostEndpoint.options().$promise.then(function (options) {
        $scope.post.allowed_privileges = options.allowed_privileges;
    });
    $scope.formId = $transition$.params().id;

    if ($stateParams.lat && $stateParams.lng) {
        $scope.post.initialPostLocation = new L.LatLng($stateParams.lat, $stateParams.lng);
    }
}];
