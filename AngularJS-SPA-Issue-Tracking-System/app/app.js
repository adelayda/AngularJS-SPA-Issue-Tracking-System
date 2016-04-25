'use strict';

var issueTracker = angular.module('IssueTrackingSystem', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap.pagination'
])
    .constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('pageSize', 6)
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/user/dashboard.html',
            controller: 'AuthenticationController'
        });

        $routeProvider.when('/user/profile/password', {
            templateUrl: 'templates/user/edit-password.html',
            controller: 'UserEditProfileController'
        });

        $routeProvider.when('/projects', {
            templateUrl: 'templates/projects/all-projects.html',
            controller: 'AdminController'
        });

        $routeProvider.when('/projects/add', {
            templateUrl: 'templates/projects/add-new-project.html',
            controller: 'AdminController'
        });

        $routeProvider.when('/projects/:id', {
            templateUrl: 'templates/projects/project-page.html',
            controller: 'ViewProjectController'
        });

        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'templates/issues/add-new-issue.html',
            controller: 'ProjectsController'
        });

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'templates/projects/edit-project.html',
            controller: 'EditProjectController'
        });

        $routeProvider.when('/issues/:id', {
            templateUrl: 'templates/issues/issue-page.html',
            controller: 'IssuesController'
        });

        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'templates/issues/edit-issue.html',
            controller: 'EditIssueController'
        });

        $routeProvider.otherwise(
            {
                redirectTo: '/'
            }
        );
    });

issueTracker.run(function ($rootScope, $location, authenticationService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if (!authenticationService.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }
    });
});

