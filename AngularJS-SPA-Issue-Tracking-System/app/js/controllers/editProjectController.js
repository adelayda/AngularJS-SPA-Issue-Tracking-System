'use strict';

issueTracker.controller('EditProjectController', function ($scope,
                                                           $routeParams,
                                                           $location,
                                                           authenticationService,
                                                           projectsService,
                                                           notifyService,
                                                           usersService) {


        function getProjectById(id) {
            projectsService.getProjectById(id,
                function success(data) {
                    $scope.projectData = data;
                },
                function error(err) {
                    notifyService.showError("Cannot load this project", err);
                }
            );
        }

        getProjectById($routeParams.id);

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
                    notifyService.showError("Labels loading failed", err);
                });
        };

        $scope.editProject = function (editProjectData) {
            var labelsList = [];
            var prioritiesList = [];

            var stringLabels = editProjectData.Labels.split(', ');
            stringLabels.forEach(function (element) {
                labelsList.push({Name: element.trim()})
            });

            var stringPriorities = editProjectData.Priorities.split(', ');
            stringPriorities.forEach(function (element) {
                prioritiesList.push({Name: element.trim()})
            });

            editProjectData.Priorities = prioritiesList;
            editProjectData.Labels = labelsList;
            editProjectData.Id = $scope.projectData.Id;

            projectsService.editProject(editProjectData,
                function success() {
                    notifyService.showInfo("Project edited successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Project edit failed", err);
                }
            )
        };
    }
);

