'use strict';

issueTracker.factory('projectsService', function ($http, baseServiceUrl, authentication) {
    return {
        getAllProjects: function (success, error) {
            var getAllProjectsRequest = {
                method: 'GET',
                url: baseServiceUrl + '/projects',
                headers: authentication.getAuthHeaders()
            };

            $http(getAllProjectsRequest).success(success).error(error);
        },

        getAllProjectsPagination: function (params, success, error) {
            var getAllProjectsPagingRequest = {
                method: 'GET',
                url: baseServiceUrl + '/projects?pageSize=' + params.pageSize + '&pageNumber=' + params.startPage + '&filter=',
                headers: authentication.getAuthHeaders()
            };

            $http(getAllProjectsPagingRequest).success(success).error(error);
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

        getLabels: function (success, error) {
            var getLabelsRequest = {
                method: 'GET',
                url: baseServiceUrl + '/labels/?filter=',
                headers: authentication.getAuthHeaders()
            };
            $http(getLabelsRequest).success(success).error(error);
        },

        getProjectsByLeadId: function (id, params, success, error) {
            if (id) {
                var getProjectsRequest = {
                    method: 'GET',
                    url: baseServiceUrl + '/projects/?filter=Lead.Id=' + '"' + id + '"' + '&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                    headers: authentication.getAuthHeaders()
                };
                $http(getProjectsRequest).success(success).error(error);
            }
        },


        isAdmin: function () {
            var currentUser = authentication.getCurrentUser();
            return (currentUser != undefined) && (currentUser.isAdmin);
        },

        editProject: function (projectData, success, error) {
            var editProjectsRequest = {
                method: 'PUT',
                url: baseServiceUrl + '/projects/' + projectData.Id,
                headers: authentication.getAuthHeaders(),
                data: projectData
            };

            $http(editProjectsRequest).success(success).error(error);
        }

    }
});