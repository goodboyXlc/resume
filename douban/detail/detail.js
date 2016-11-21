(function() {

    /**
     * hotModule Module
     *
     * Description
     */
    var detailModule = angular.module('doubanApp.detailModule', ['toubanApp.service']);

    detailModule.controller('DetailController', ['$timeout', '$scope', '$http', 'JsonpService','$routeParams','$route','$rootScope',function($timeout, $scope, $http, JsonpService,$routeParams,$route,$rootScope) {

        //跨域请求豆瓣数据
        JsonpService.jsonp('https://api.douban.com/v2/movie/subject/'+$routeParams.id, {}, function(data) {
            // console.log(res);
            $scope.movie = data;
            $scope.$apply();
        });


    }]);

    detailModule.config(['$routeProvider',function($routeProvider) {
        $routeProvider.
        when('/detail/:id',{
            templateUrl:'detail/detail.html',
            controller:'DetailController'
        })
    }])



})();
