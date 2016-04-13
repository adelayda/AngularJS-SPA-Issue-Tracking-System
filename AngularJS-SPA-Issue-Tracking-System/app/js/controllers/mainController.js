'use strict';

issueTracker.controller('MainController', function ($scope, $location, mainData, authentication, notifyService) {

    $scope.startPage = 1;
    $scope.name = authentication.GetName();
    $scope.isAdmin = authentication.GetIsAdmin();
    $scope.isNotAdmin = (!$scope.isAdmin || $scope.isAdmin == "false");
    if ($scope.name) {
        authentication.GetUserProfile(function (serverData) {
            $scope.userData = serverData;
        })
    }
    var path = $location.path();
    if ((path.indexOf("user") != -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }


    var getProjects = function () {

     //   mainData.getAllTowns(
     //       function (serverData) {
     //           $scope.towns = serverData;
     //       },
     //       function () {
     //           notifyService.showError("Unsuccessful Connection to Database!")
     //       });
     //
     //   mainData.getAllCategories(
     //       function (serverData) {
     //           $scope.categories = serverData;
     //       },
     //       function () {
     //           notifyService.showError("Unsuccessful Connection to Database!")
     //       });

        mainData.getAllProjects(
            function (serverData) {
                for (var key in serverData.projects) {
                    var project = serverData.projects[key];
                    var currentCategory = $scope.categories.filter(function (category) {
                        return category.id == ad.categoryId;
                    });
                    projects.categoryName = currentCategory[0] ? currentCategory[0].name : null;
                    var currentTown = $scope.towns.filter(function (town) {
                        return town.id == ad.townId;
                    });
                    projects.townName = currentTown[0] ? currentTown[0].name : null;
                }

                $scope.data = serverData;
                window.scrollTo(0,0);
            },
            function () {
                notifyService.showError("Unsuccessful Connection to Database!")
            });
    };

    getProjects();

    $scope.townFilter = function (townId) {
        mainData.params.townId = townId;
        $scope.townId = townId;
        mainData.params.startPage = 1;
        $scope.startPage = 1;
        getProjects();
    };

    $scope.categoryFilter = function (categoryId) {
        mainData.params.categoryId = categoryId;
        $scope.categoryId = categoryId;
        mainData.params.startPage = 1;
        $scope.startPage = 1;
        getProjects();
    };

    $scope.pagination = function () {
        mainData.params.startPage = $scope.startPage;
        getProjects();
    };
});
