'use strict';

issueTracker.controller('IssuesController', function ($scope,
                                                      $routeParams,
                                                      $location,
                                                      authenticationService,
                                                      projectsService,
                                                      notifyService,
                                                      issuesService,
                                                      pageSize) {
    $scope.projectParams = {
        'startPage': 1,
        'pageSize': pageSize
    };

    $scope.getUserIssues = function () {
        issuesService.getUserIssues($scope.projectParams,
            function success(data) {
                $scope.userIssues = data.Issues;
            },
            function error(err) {
                notifyService.showError("Issues loading failed", err);
            }
        );
    };

    $scope.getUserIssues();

    issuesService.getIssueById($routeParams.id,
        function success(data) {
            $scope.issueData = data;
        },
        function error(err) {
            notifyService.showError("Issue loading failed", err);
        }
    );

    $scope.changeStatus = function (issueId, statusId, statusName) {
        issuesService.changeIssueStatus(issueId, statusId,
            function success(data) {
                $scope.issueData.AvailableStatuses = data;
                $scope.$broadcast("statusSelectionChanged", statusName);
            },
            function error(err) {
                notifyService.showError("Status change failed", err);
            }
        );
    };

    $scope.getIssueComments = function () {
        issuesService.getCommentsById($routeParams.id,
            function success(data) {
                $scope.issueComments = data;
            },
            function error(err) {
                notifyService.showError("Issue Comments loading failed", err);
            }
        );
    };

    $scope.getIssueComments();

    $scope.addComment = function (issueId, comment) {
        issuesService.addCommentToIssue(issueId, comment,
            function success(data) {
                notifyService.showInfo("Comment added successfully");
                $scope.$broadcast("totalCommentsChanged", data);
            },
            function error(err) {
                notifyService.showError("Comment posting failed", err);
            }
        );
    };

    $scope.$on("statusSelectionChanged", function (event, selectedStatus) {
        $scope.issueData.Status.Name = selectedStatus;

        $scope.getUserIssues();
    });

    $scope.$on("totalCommentsChanged", function (event, allComments) {
        $scope.issueComments = allComments;
        document.getElementById("issueComment").value = "";

        $scope.getIssueComments();
    });
});


