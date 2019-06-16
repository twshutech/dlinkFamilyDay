var app = angular.module("myApp", ["ngRoute",]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "https://twshutech.github.io/dlinkFamilyDay/frontpage.html"
    })
    .when("/skills", {
        templateUrl : "https://twshutech.github.io/dlinkFamilyDay/skills"
    })
    .when("/portfolio", {
        templateUrl : "https://twshutech.github.io/dlinkFamilyDay/portfolio.html"
    })
    .when("/contact", {
        templateUrl : "https://twshutech.github.io/dlinkFamilyDay/contact.html"
    });
});

function Ctrl($scope){
    $scope.desktopView = true;
    console.log($scope.desktopView);
    if(window.screen.availWidth < 700){
        $scope.desktopView = false;
        console.log($scope.desktopView);
    }
}

app.controller('familydayController', ["$scope", Ctrl]);

app.directive('resize',['$window',function($window){
    return {
        link: function($scope){
            angular.element($window).bind('resize', function(){
                if(window.screen.availWidth < 700){
                    $scope.desktopView = false;
                    console.log ('mobile view'+$scope.desktopView);
                }
                else{
                    $scope.desktopView = true;
                    console.log ('desktop view'+$scope.desktopView);
                }
                $scope.$apply();
            });
        }
    }
}]);