'use strict';

issueTracker.factory('issueServices', function ($http, baseServiceUrl, authentication) {
    return {
        addNewIssue: function (issueData, success, error) {
            var addIssueRequest = {
                method: 'POST',
                url: baseServiceUrl + '/issues',
                headers: authentication.getAuthHeaders(),
                data: issueData
            };

            $http(addIssueRequest).success(success).error(error);
        },

        getUserIssues: function (params, success, error) {
            var getUserIssuesRequest = {
                method: 'GET',
                url: baseServiceUrl + '/issues/me?orderBy=Project.Name desc,IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                headers: authentication.getAuthHeaders()
            };

            $http(getUserIssuesRequest).success(success).error(error);
        },

        getProjectById: function (id, success, error) {
            if (id) {
                var getProjectRequest = {
                    method: 'GET',
                    url: baseServiceUrl + '/projects/' + id,
                    headers: authentication.getAuthHeaders()
                };
                $http(getProjectRequest).success(success).error(error);
            }
        },

        getIssuesByProjectId: function (id, success, error) {
            if (id) {
                var getIssuesRequest = {
                    method: 'GET',
                    url: baseServiceUrl + '/projects/' + id + '/issues',
                    headers: authentication.getAuthHeaders()
                };
                $http(getIssuesRequest).success(success).error(error);
            }
        },

        getIssuesByProjectIdPagination: function (params, id, success, error) {
            if (id) {
                var getIssuesPagingRequest = {
                    method: 'GET',
                    url: baseServiceUrl + '/issues?pageSize=' + params.pageSize +
                            '&pageNumber=' + params.startPage + '&filter=Project.Id==' + id,
                    headers: authentication.getAuthHeaders()
                };
                $http(getIssuesPagingRequest).success(success).error(error);
            }
        },

        getIssueById: function (id, success, error) {
            if (id) {
                var getIssueRequest = {
                    method: 'GET',
                    url: baseServiceUrl + '/issues/' + id,
                    headers: authentication.getAuthHeaders()
                };
                $http(getIssueRequest).success(function (response) {
                    var issueData = response;
                    var projectId = response.Project.Id;

                    var getProjectDataRequest = {
                        method: 'GET',
                        url: baseServiceUrl + '/projects/' + projectId,
                        headers: authentication.getAuthHeaders()
                    };

                    $http(getProjectDataRequest).success(function (response) {
                        issueData.projectLeaderName = response.Lead.Username;
                        issueData.projectPriorities = response.Priorities;
                        success(issueData);
                    }).error(error);
                }).error(error);

            }
        },

        changeIssueStatus: function (issueId, statusId, success, error) {
            if (issueId && statusId) {
                var changeStatusRequest = {
                    method: 'PUT',
                    url: baseServiceUrl + '/issues/' + issueId + '/changestatus?statusId=' + statusId,
                    headers: authentication.getAuthHeaders()
                };
                $http(changeStatusRequest).success(success).error(error);
            }
        },

        editIssue: function (editIssueData, success, error) {
            var editIssueRequest = {
                method: 'PUT',
                url: baseServiceUrl + '/issues/' + editIssueData.Id,
                headers: authentication.getAuthHeaders(),
                data: editIssueData
            };

            $http(editIssueRequest).success(success).error(error);
        },

        addCommentToIssue: function (issueId, comment, success, error) {
            if (issueId && comment) {
                var addCommentRequest = {
                    method: 'POST',
                    url: baseServiceUrl + '/issues/' + issueId + '/comments',
                    headers: authentication.getAuthHeaders(),
                    data: comment
                };
                $http(addCommentRequest).success(success).error(error);
            }
        },

        getCommentsById: function (id, success, error) {
            if (id) {
                var getCommentsRequest = {
                    method: 'GET',
                    url: baseServiceUrl + '/issues/' + id + '/comments',
                    headers: authentication.getAuthHeaders()
                };
                $http(getCommentsRequest).success(success).error(error);
            }
        }
    }
});
