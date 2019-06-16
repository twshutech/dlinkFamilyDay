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

function Ctrl($scope, $window){
    $scope.desktopView = true;
    
    $scope.mobilemenu = function(e){
        console.log($scope.desktopView);
    }
    console.log($window.innerWidth);
    if($window.innerWidth < 700){
        $scope.desktopView = false;
        $scope.mobilemenu = function(e){
            console.log (e)
            angular.element('.option').addClass('slide');
            $scope.desktopView = !$scope.desktopView;
            console.log($window.innerWidth);
        }
    }
    
    $scope.closeMenu = function(e){
        var target = e.currentTarget;
        console.log(target);
        if($window.innerWidth < 700){
            $scope.desktopView = false;
        }
    }
}

app.controller('familydayController', ["$scope", "$window", Ctrl]);

app.directive('windowDetection', ['$window', function ($window) {
    return {
       link: link,
       restrict: 'A'     
    };
    function link(scope, element, attrs){
        scope.width = $window.innerWidth;

        angular.element($window).bind('resize', function(){
            console.log($window.innerWidth);
            scope.$apply();
        });
    }    
}]);