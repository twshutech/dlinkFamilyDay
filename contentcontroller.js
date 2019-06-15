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

app.directive('resize',['$window',function($window){
    return {
        link: function($scope){
            $scope.desktopView = true;

            if(window.screen.availWidth < 700){
                $scope.desktopView = false;
            }

            angular.element($window).bind('resize', function(){
                if(window.screen.availWidth < 700){
                    $scope.desktopView = false;
                    console.log ('mobile view'+$scope.desktopView);
                }
                else{
                    $scope.desktopView = true;
                    console.log ('desktop view'+$scope.desktopView);
                }
            });
        }
    }
}]);