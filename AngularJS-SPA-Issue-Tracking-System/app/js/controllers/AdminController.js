'use strict';

Advertisements.controller('AdminController', function ($scope, $location, $routeParams, authentication, adminServices, notifyService) {

    $scope.approveAd = function (adId) {
        adminServices.ApproveAd(adId, authentication.GetHeaders(),
            function () {
                notifyService.showInfo("Successful Ad Approval!");
                getAdminAds();
            },
            function (serverError) {
                notifyService.showError("Unsuccessful Ad Approval!", serverError)
            })
    };

    $scope.rejectAd = function (adId) {
        adminServices.RejectAd(adId, authentication.GetHeaders(),
            function () {
                notifyService.showInfo("Successful Ad Rejection!");
                getAdminAds();
            },
            function (serverError) {
                notifyService.showError("Unsuccessful Ad Rejection!", serverError)
            })
    };

    $scope.displayAd = function (adId) {
        $location.path('/admin/ads/edit/'+adId);
    };

    $scope.displayDeleteAd = function (adId) {
        $location.path('/admin/ads/delete/'+adId);
    };

    var getAdminAds = function (adId) {

        if (!adId) {
            adminServices.GetAds(authentication.GetHeaders(),
                function (resp) {
                    $scope.ads = resp;
                    window.scrollTo(0,0);
                });
        } else {
            adminServices.GetAdById(adId, authentication.GetHeaders(),
                function (resp) {
                    $scope.currentAd = resp;
                })
        }
    };

    getAdminAds($routeParams.id);

    $scope.adminTownFilter = function (townId) {
        adminServices.params.townId = townId;
        adminServices.params.startPage = 1;
        $scope.adminStartPage = 1;
        getAdminAds();
    };

    $scope.adminCategoryFilter = function (categoryId) {
        adminServices.params.categoryId = categoryId;
        adminServices.params.startPage = 1;
        $scope.adminStartPage = 1;
        getAdminAds();
    };

    $scope.adminStatusFilter = function (status) {
        adminServices.params.status = status;
        adminServices.params.startPage = 1;
        $scope.adminStartPage = 1;
        getAdminAds();
    };

    $scope.adminPagination = function () {
        adminServices.params.startPage = $scope.adminStartPage;
        getAdminAds();
    };

});
