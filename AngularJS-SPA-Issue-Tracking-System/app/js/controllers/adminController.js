'use strict';

issueTracker.controller('AdminController', function ($scope,
                                                     $routeParams,
                                                     $location,
                                                     authenticationService,
                                                     projectsService,
                                                     adminService,
                                                     usersService,
                                                     notifyService,
                                                     pageSize) {

    if (!authenticationService.isAdmin()) {
        $location.path("/");
    }

    $scope.projectParams = {
        'startPage': 1,
        'pageSize': pageSize
    };

    $scope.getProjects = function () {
        projectsService.getAllProjectsPagination($scope.projectParams,
            function success(data) {
                $scope.totalProjects = data.TotalPages * $scope.projectParams.pageSize;
                $scope.projects = data.Projects;
            },
            function error(err) {
                notifyService.showError("Projects loading failed", err);
            }
        );
    };

    $scope.getProjects();

    usersService.getAllUsers(
        function success(data) {
            $scope.allUsers = data;
            $scope.allUsers = $scope.allUsers.filter(function (user) {
                return user.isAdmin === false;
            });
            $scope.selectedUser = $scope.allUsers ? $scope.allUsers[0] : '';
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

    $scope.addProject = function (projectData, projectKey) {
        var labelsList = [];
        var prioritiesList = [];

        var stringLabels = projectData.Labels.split(', ');
        stringLabels.forEach(function (element) {
            labelsList.push({Name: element.trim()})
        });

        var stringPriorities = projectData.Priorities.split(', ');
        stringPriorities.forEach(function (element) {
            prioritiesList.push({Name: element.trim()})
        });

        projectData.ProjectKey = projectKey;
        projectData.Priorities = prioritiesList;
        projectData.Labels = labelsList;

        adminService.addNewProject(projectData,
            function success() {
                notifyService.showInfo("Project added successfully");
                $location.path("/projects");
            },
            function error(err) {
                notifyService.showError("Project add failed", err);
            }
        )
    };

    $scope.setProjectKey = function (projectName) {
        if (projectName) {
            var tokens = projectName.split(' ');
            var result = "";
            tokens.forEach(function (element) {
                result += element.substring(0, 1)
            });

            $scope.projectKey = result;
        }
    };
    
    $scope.makeAdmin = function () {
        var data = {
            UserId: $scope.selectedUser.id
        };

        adminService.makeAdmin(
            function success(data) {
                notifyService.showInfo("User " + $scope.selectedUser.name + " is now admin!");
                $route.reload();
            },
            function error(err) {
                notifyService.showError("Error making user admin", err);
            }
        );
    }

});
