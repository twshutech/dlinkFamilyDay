var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "https://twshutech.github.io/demo.github.io/frontpage.html"
    })
    .when("/skills", {
        templateUrl : "https://twshutech.github.io/demo.github.io/skills"
    })
    .when("/portfolio", {
        templateUrl : "https://twshutech.github.io/demo.github.io/portfolio.html"
    })
    .when("/contact", {
        templateUrl : "https://twshutech.github.io/demo.github.io/contact.html"
    });
});

angular.module("myApp").controller('familyDayController',function($scope){
    var $scope.desktopView = true;

    if(window.screen.availWidth < 700){
        $scope.desktopView = false;
    }

    $(window).resize(function(){
        console.log ($scope.desktopView)
        console.log (window.screen.availWidth)
        if(window.screen.availWidth < 700){
            $scope.desktopView = false;
        }
        else{
            $scope.desktopView = true;
        }
    });

});