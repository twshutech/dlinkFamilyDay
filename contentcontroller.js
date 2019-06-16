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
    
    $scope.mobilemenu = function(){
        console.log($scope.desktopView);
    }
    console.log($window.innerWidth);
    if($window.innerWidth < 700){
        $scope.desktopView = false;
        $scope.mobilemenu = function(){
            $scope.desktopView = !$scope.desktopView;
            console.log($window.innerWidth);
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
       
           function onResize(){
               console.log($window.innerWidth);
               // uncomment for only fire when $window.innerWidth change   
               if (scope.width !== $window.innerWidth)
               {
                   scope.width = $window.innerWidth;
                   scope.$digest();
               }
           };

           angular.element($window).bind('resize', onResize);
    }    
}]);