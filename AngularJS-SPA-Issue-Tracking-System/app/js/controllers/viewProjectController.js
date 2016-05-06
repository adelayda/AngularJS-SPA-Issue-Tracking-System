'use strict';

issueTracker.controller('ViewProjectController', function ($scope,
                                                           $routeParams,
                                                           $location,
                                                           authenticationService,
                                                           projectsService,
                                                           issuesService,
                                                           notifyService,
                                                           pageSize) {


        $scope.projectParams = {
            'startPage': 1,
            'pageSize': pageSize
        };

        projectsService.getProjectById($routeParams.id,
            function success(data) {
                $scope.projectData = data;
            },
            function error(err) {
                notifyService.showError("Project loading failed", err);
            }
        );

        $scope.getIssuesByProject = function () {
            issuesService.getIssuesByProjectIdPagination($scope.projectParams, $routeParams.id,
                function success(data) {
                    $scope.totalIssues = data.TotalPages * $scope.projectParams.pageSize;
                    $scope.issues = data.Issues;
                },
                function error(err) {
                    notifyService.showError("Issues loading failed", err);
                }
            )
        };

        $scope.getIssuesByProject();
    }
);
