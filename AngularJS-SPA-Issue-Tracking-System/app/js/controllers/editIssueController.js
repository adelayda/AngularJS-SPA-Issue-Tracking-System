'use strict';

issueTracker.controller('EditIssueController', function ($scope,
                                                         $routeParams,
                                                         $location,
                                                         authenticationService,
                                                         projectsService,
                                                         notifyService,
                                                         usersService,
                                                         issuesService) {


        issuesService.getIssueById($routeParams.id,
            function success(data) {
                $scope.issueData = data;
            },
            function error(err) {
                notifyService.showError("Issue loading failed", err);
            }
        );

        usersService.getAllUsers(
            function success(data) {
                $scope.users = data;
            },
            function error(err) {
                notifyService.showError("Users loading failed", err);
            }
        );

        $scope.searchChar = '';
        $scope.autoComplete = function () {
            projectsService.getLabels(
                function success(data) {
                    $scope.labelsList = [];
                    data.forEach(function (label) {
                        $scope.labelsList.push(label.Name)
                    });

                    $scope.labelsList = $scope.labelsList.filter(function (e) {
                        return e.indexOf($scope.searchChar) !== -1;
                    });
                },
                function error(err) {
                    notifyService.showError("labels loading failed", err);
                });
        };

        $scope.editIssue = function (editIssueData) {
            var labelsList = [];

            var stringLabels = editIssueData.Labels.split(', ');
            stringLabels.forEach(function (element) {
                labelsList.push({Name: element.trim()})
            });

            editIssueData.Labels = labelsList;
            editIssueData.Id = $scope.issueData.Id;

            issuesService.editIssue(editIssueData,
                function success() {
                    notifyService.showInfo("Issue edited successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Issue edit failed", err);
                }
            )
        };
    }
);

