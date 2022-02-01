module.exports = PostVotesDirective;

PostVotesDirective.$inject = [
    // '$translate',
];

function PostVotesDirective(
    // $translate,
) {
    return {
        restrict: 'E',
        scope: {
            post: '=',
        },
        template: require('./post-votes.html'),
        link: function ($scope) {
            $scope.votes = function () {
                return $scope.post && $scope.post.votes && $scope.post.votes.sum;
            };
        }
    };
}
