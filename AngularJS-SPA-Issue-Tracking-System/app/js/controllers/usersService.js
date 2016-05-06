'use strict';

issueTracker.factory('usersService', function ($http, baseServiceUrl, authenticationService) {
    return {
        getAllUsers: function (success, error) {
            var getAllUsersRequest = {
                method: 'GET',
                url: baseServiceUrl + 'users',
                headers: authenticationService.getAuthHeaders()
            };

            $http(getAllUsersRequest).success(success).error(error);
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