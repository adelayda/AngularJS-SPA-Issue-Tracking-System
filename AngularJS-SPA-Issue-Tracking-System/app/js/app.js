/**
 * Created by Adi on 4/11/2016.
 */
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
        .otherwise({redirectTo: '/'})

});