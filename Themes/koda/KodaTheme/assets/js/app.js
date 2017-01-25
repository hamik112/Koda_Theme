var storefrontAppDependencies = [
'ui.bootstrap'
]
var storefrontApp = angular.module('storefrontApp', storefrontAppDependencies);

storefrontApp.factory('httpErrorInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    var httpErrorInterceptor = {};

    httpErrorInterceptor.responseError = function (rejection) {
        $rootScope.$broadcast('storefrontError', {
            type: 'error',
            title: [rejection.config.method, rejection.config.url, rejection.status, rejection.statusText, rejection.data.message].join(' '),
            message: rejection.data.stackTrace,
        });
        return $q.reject(rejection);
    };
    httpErrorInterceptor.requestError = function (rejection) {
        $rootScope.$broadcast('storefrontError', {
            type: 'error',
            title: [rejection.config.method, rejection.config.url, rejection.status, rejection.statusText, rejection.data.message].join(' '),
            message: rejection.data.stackTrace,
        });
        return $q.reject(rejection);
    };

    return httpErrorInterceptor;
}])

storefrontApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpErrorInterceptor');

}]);

$(document).ready(function () {
    //AWW this code hides and shows the seach form by using a search icon element
    $("#cart-icon").click(function () {
        $(".special").show();
        $("#cart-icon").hide();
    });
    $(".special").focusout(function () {
        $(".special").hide();
        $("#cart-icon").show();
    });
    //
    $(".main-content:has(#HomePageSlider)").css('padding-top', '0');
    $("main.wrapper:has(#HomePageSlider)").css('max-width', '1800px');
    $("main.wrapper:has(#HomePageSlider)").css('text-align', 'center');
});