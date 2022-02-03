module.exports = [
    'Util',
    'Session',
    'UshahidiSdk',
    function (
        Util,
        Session,
        UshahidiSdk
    ) {

        let _ushahidi = null;

        const ushahidi = function () {
            if (_ushahidi) {
                return _ushahidi;
            }
            return new UshahidiSdk.Posts(
                Util.url(''),
                Session.getSessionDataEntry('accessToken'),
                Session.getSessionDataEntry('accessTokenExpires')
            );
        }

        const findPost = function (id) {
            return ushahidi()
                .findPost(id);
        }

        const getPosts = function () {
            return ushahidi()
                .getPosts();
        }

        const getPostVotes = function (post_id, user_id) {
            return ushahidi()
                .getPostVotes(post_id, user_id);
        }

        /**
         * @TODO: Discussion on JS API needed: savePost works on both PUT and POST, as
         * we defined it that way for the SDK, but I'm not convinced we made the right
         * call here. I think explicit calls would be best for readability down the line.
         * @param post
         * @returns {void|undefined|{then: then}|*}
         */
        const savePost = function (post) {
            return ushahidi()
                .savePost(post);
        }

        const savePostVote = function (
            post_id,
            user_id,
            vote)
        {
            return ushahidi().savePostVote(
                post_id,
                user_id,
                vote)
        }

        const patchPost = function (post) {
            return ushahidi()
                .patchPost(post);
        }
        const bulkPatch = function (items) {
            return ushahidi()
                .bulkPatch(items);
        }
        const deletePost = function (id) {
            return ushahidi()
                .deletePost(id);
        }
        const bulkDelete = function (ids) {
            return ushahidi()
                .bulkDelete(ids.map(i => {
                    return {id: i}
                }));
        }

        const getPostsTo = function (reason) {
            switch (reason) {
                case 'count':
                    return ushahidi()
                        .getPosts(
                            [
                                'id'
                            ],
                            []
                        );
            }
        }

        const findPostTo = function (id, reason) {
            switch (reason) {
                case 'list':
                    return ushahidi()
                        .findPost(
                            id,
                            ['id', 'title'], ['translations', 'enabled_languages']
                        );
            }
        }
        return {
            findPostTo,
            getPostsTo,
            findPost,
            getPosts,
            getPostVotes,
            savePost,
            savePostVote,
            bulkDelete,
            deletePost,
            bulkPatch,
            patchPost
        };
    }];
