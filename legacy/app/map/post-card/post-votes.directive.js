module.exports = PostVotesDirective;

PostVotesDirective.$inject = [
    // '$translate',
    '$rootScope',
    'Notify',
    'PostsSdk'
];

function PostVotesDirective(
    // $translate,
    $rootScope,
    Notify,
    PostsSdk
) {
    return {
        restrict: 'E',
        scope: {
            post: '='
        },
        template: require('./post-votes.html'),
        link: function ($scope) {
            $scope.votes = function () {
                return $scope.post && $scope.post.votes && $scope.post.votes.sum;
            };
            $scope.currentUserVotedForThisPost = function () {
                // currently, this could be 1 or 0
                return $scope.post && $scope.post.votes && $scope.post.votes.current_user_vote;
            };
            $scope.voteClicked = function ($event) {
                $event.stopPropagation()
                if (!$rootScope.currentUser) {
                    Notify.sdkErrors('You need to be logged in in order to vote');
                    return;
                }

                // if there is a vote already, set to 0, otherwise add the user's vote
                const vote = $scope.currentUserVotedForThisPost() ? 0 : 1;
                PostsSdk.savePostVote($scope.post.id, $rootScope.currentUser.userId, vote).then(function (response) {
                    console.info('savePostVote -> ', response)
                    if (response.data) {
                        // updated vote results for this post have been returned
                        console.info('Votes updated for ', $scope.post.id, ' -> ', response.data)
                        // TODO:PET where to store this update?? is there a store like in React/Vue?
                        $scope.post.votes = response.data.data;
                        $scope.$apply();
                    }
                }, function (error) { // errors
                    if (error && error.response && error.response.status === 401) {
                        Notify.sdkErrors('You need to be logged in in order to vote');
                    } else {
                        Notify.sdkErrors(error);
                    }
                })
            };
        }
    };
}
