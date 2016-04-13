'use strict';

issueTracker.factory('projectServices', function ($http, baseServiceUrl) {
    var projectService = {};

    projectService.params = {};

    var projectServiceUrl = baseServiceUrl + "/user/Projects";

    projectService.GetUserProjects = function (headers, success) {
        $http.get(projectServiceUrl,
            {
                params: this.params,
                headers: headers
            })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    projectService.addNewProject = function (projectData, headers, success, error) {
        $http.post(projectServiceUrl, projectData, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    projectService.DeactivateProject = function (projectId, headers, success, error) {
        $http.put(projectServiceUrl + '/deactivate/' + projectId, {}, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    projectService.GetUserProjectById = function (projectId, headers, success) {
        $http.get(projectServiceUrl + '/' + projectId,
            {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    projectService.EditProject = function (currentProject, headers, success, error) {
        $http.put(projectServiceUrl + '/' + currentProject.id, currentProject, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    projectService.DeleteProject = function (projectId, headers, success, error) {
        $http.delete(projectServiceUrl + '/' + projectId, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    projectService.RepublishProject = function (projectId, headers, success, error) {
        $http.put(projectServiceUrl + '/publishagain/' + projectId, {}, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    projectService.clearParams = function () {
        projectService.params.status = null;
        projectService.params.startPage = 1;
    };

    projectService.clearParams();
    projectService.params.pageSize = 5;

    return projectService;
});