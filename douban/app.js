(function () {
	
	/**
	* doubanApp Module
	*
	* Description
	*/
	var doubanApp = angular.module('doubanApp', ['ngRoute','doubanApp.detailModule','doubanApp.listModule']);

	doubanApp.config(['$routeProvider',function($routeProvider) {
		$routeProvider.
		when('/:category/:page?',{
			templateUrl:'list/list.html',
			controller:'ListController'
		}).
		otherwise({
			//注意点:不要乱写
			redirectTo:'/in_theaters/1'
		})

	}])


})();