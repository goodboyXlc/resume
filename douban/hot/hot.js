(function() {

    /**
     * hotModule Module
     *
     * Description
     */
    var hotModule = angular.module('doubanApp.hotModule', ['toubanApp.service']);
    hotModule.controller('HotController', ['$timeout', '$scope', '$http', 'JsonpService','$routeParams','$route',function($timeout, $scope, $http, JsonpService,$routeParams,$route) {

        console.log($routeParams);

        //计算分页
        var count = 10;   //每页显示的数据
        /*
        1   start:0   count:10
        2   start:10  count:10
        3   start:20  count:10

        start = (page-1)*count

        需要在分页中加上分页的参数
        */
        //获取当前页码
        var currentPage = parseInt($routeParams.page || 1);
        $scope.currentPage = currentPage;
        //计算从第几条数据开始
        var start = (currentPage - 1) * count;



        //跨域请求豆瓣数据
        JsonpService.jsonp('https://api.douban.com/v2/movie/in_theaters', { count: count, start: start }, function(res) {
            // console.log(res);

            //数据数组
            $scope.subjects = res.subjects;

            //数据的总条数
            $scope.total = res.total;
            //共有多少页;注意点:向上取整
            $scope.totalPage = Math.ceil($scope.total / count);


            //告诉 angular 刷新界面上的数据
            $scope.$apply();

            //分页处理
            $scope.hundlePage = function(page) {
                if (page < 1 || page > $scope.totalPage) {
                    return;
                }
                //更改路由的参数,控制分页,注意:需要用到$route
                $route.updateParams({page:page})
            }
        });

    }])

})()
