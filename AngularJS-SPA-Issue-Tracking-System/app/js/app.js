'use strict';

var issueTracker = angular.module('issueTracker', ['ngRoute', 'ui.bootstrap', 'angular-loading-bar']);

issueTracker.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net');

issueTracker.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl:'templates/login.html',
            controller:'MainController'
        })
        .when('/register', {
            templateUrl:'templates/register.html',
            controller:'MainController'
        })
        .when('/', {
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

        .otherwise({redirectTo: '/'});
});

issueTracker.run(function ($rootScope, $location, authentication) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if (!authentication.isLoggedIn()) {
          // Authorization check: anonymous site visitors cannot access user routes
          $location.path("/");
      }
    });
});


        //
        //
        // Login Screen
        //    Route: #/
        // Register User Screen - After registration, the user is automatically logged in and is redirected to the dashboard.
        //  Route: #/
        //
        // User Dashboard
        // Route: #/
        //
        // Project Page
        // Route: #/projects/:id
        //
        // Edit Project Page
        // Route: #/projects/:id/edit
        //
        // Add Issue
        // Route: #/projects/:id/add-issue
        //
        // Issue page
        // Route: #/issues/:id
        //
        // Edit Issue page
        // Route: #/issues/:id/edit
        //
        // Change User Password
        // Route: #/profile/password
        //
        // Logout
        // Route: #/logout
        //
        // Guest Authorization Checks
        // Anonymous site visitors (without login) should be able to access only Login and Register screens.


        // Projects/?pageSize={pageSize}&pageNumber={pageNumber}&{filter}={value}
        // Projects/{id}
        // Projects/
        //  Projects/{id}/Issues
        //  Issues/?pageSize={pageSize}&pageNumber={pageNumber}&{filter}={value}
        //  Issues/me?pageSize={pageSize}&pageNumber={pageNumber}&orderBy={by}
        //  Issues/{id}
        //  Issues/
        //  Issues/{id}
        //  Issues/{id}/changestatus?statusid={statusId}
        //  Issues/{id}/comments
        //  Issues/{id}/comments
        //  Labels/?filter={filter}
        //  api/Account/Register
        //  api/Token
        //  Users/
        //  Users/me
        //  Users/makeadmin
        //  api/Account/ChangePassword


