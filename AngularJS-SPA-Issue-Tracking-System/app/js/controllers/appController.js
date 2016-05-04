'use strict';

issueTracker.controller('AppController', function ($scope,
                                                   $location,
                                                   authenticationService,
                                                   notifyService) {

        $scope.authenticationService = authenticationService;

        $scope.logout = function () {
            authenticationService.logout();
            notifyService.showInfo("Logout successful");
            $location.path('/');
        };
    }
);

