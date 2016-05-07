'use strict';

issueTracker.factory('adminService', function ($http, baseServiceUrl, authenticationService) {
    return {
        addNewProject: function (projectData, success, error) {
            var addProjectsRequest = {
                method: 'POST',
                url: baseServiceUrl + 'projects',
                headers: authenticationService.getAuthHeaders(),
                data: projectData
            };

            $http(addProjectsRequest).success(success).error(error);
        },

        makeAdmin: function (success, error) {
            var makeAdminRequest = {
                method: 'PUT',
                url: baseServiceUrl + 'users/makeAdmin',
                headers: authenticationService.getAuthHeaders()
            };

            $http(makeAdminRequest).success(success).error(error);
        }
    }
});