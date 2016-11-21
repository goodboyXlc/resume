(function() {

    /**
     * toubanApp.service Module
     *
     * Description
     */
    var serviceModule = angular.module('toubanApp.service', []);
    serviceModule.service('JsonpService', ['$window',function($window) {

/*
JsonpService.jsonp('https://api.douban.com/v2/movie/in_theaters', { count: 20, start: 0 }, function(res) {
});
 */
        this.jsonp = function (url, params, fn) {

            var queryString = '?';
            //1.拼接参数
            for (key in params) {
                queryString += key + '=' + params[key] + '&&';
            }

            //2.生成函数名 my_callback1475029690057
            var funName = 'my_callback' + new Date().getTime();
            queryString += 'callback' + '=' + funName;

            //3.挂载函数
            $window[funName] = function(res) {
            	console.log('请求成功');
                fn(res);

                //删除之前添加的script标签
                //$window.document.body.removeChild(script);
            };

            //4.要向页面添加 script 标签
            var script = $window.document.createElement('script');
            script.src = url + queryString;
            $window.document.body.appendChild(script);
        }
    }])

})();
