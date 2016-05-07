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
        })
        .when('/user/profile/password', {
            templateUrl: 'templates/user/edit-password.html',
            controller: 'UserEditProfileController'
        })
        .when('/projects', {
            templateUrl: 'templates/projects/all-projects.html',
            controller: 'AdminController'
        })
        .when('/projects/add', {
            templateUrl: 'templates/projects/add-new-project.html',
            controller: 'AdminController'
        })
        .when('/projects/:id', {
            templateUrl: 'templates/projects/project-page.html',
            controller: 'ViewProjectController'
        })
        .when('/projects/:id/add-issue', {
            templateUrl: 'templates/issues/add-new-issue.html',
            controller: 'ProjectsController'
        })
        .when('/projects/:id/edit', {
            templateUrl: 'templates/projects/edit-project.html',
            controller: 'EditProjectController'
        })
        .when('/issues/:id', {
            templateUrl: 'templates/issues/issue-page.html',
            controller: 'IssuesController'
        })
        .when('/issues/:id/edit', {
            templateUrl: 'templates/issues/edit-issue.html',
            controller: 'EditIssueController'
        })
        .when('/make-admin', {
            templateUrl: 'templates/user/make-admin.html',
            controller: 'AdminController'
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

