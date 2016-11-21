(function() {

    /**
     * hotModule Module
     *
     * Description
     */
    var listModule = angular.module('doubanApp.listModule', ['toubanApp.service']);
    listModule.controller('ListController', ['$timeout', '$scope', '$http', 'JsonpService','$routeParams','$route','$rootScope',function($timeout, $scope, $http, JsonpService,$routeParams,$route,$rootScope) {

        //console.log($routeParams);
        //给根作用域设置当前的分类信息,控制左侧三个分类按钮的选中
        // index.html中的数据不属于ListController的 $scope 管理,所有只能加到$rootScope上
        $rootScope.category = $routeParams.category;
        
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

        //搜索
        $rootScope.search = function  () {
            // console.log($rootScope.input);
            // 如果路由表中没有配置 q 参数,则会自动加到?后
            $route.updateParams({category:'search',q:$rootScope.input});

            $rootScope.input = '';
        }



        //跨域请求豆瓣数据
        JsonpService.jsonp('https://api.douban.com/v2/movie/'+$routeParams.category, { count: count, start: start,q:$routeParams.q}, function(res) {
            // console.log(res);

            //数据数组
            $scope.subjects = res.subjects;
            $scope.title = res.title;

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

})();
