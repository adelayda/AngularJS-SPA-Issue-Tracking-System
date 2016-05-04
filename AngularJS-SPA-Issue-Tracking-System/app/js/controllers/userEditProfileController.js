'use strict';

issueTracker.controller('UserEditProfileController', function ($scope,
                                                               $location,
                                                               authenticationService,
                                                               notifyService) {
    $scope.changePassword = function (passData) {
        authenticationService.changePassword(passData,
            function success() {
                notifyService.showInfo("Password changed successfully");
                $location.path("/");
            },
            function error(err) {
                notifyService.showError("Password change failed", err);
            }
        );
    };
});