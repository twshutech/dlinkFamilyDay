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
    
    $scope.mobilemenu = function(){
        console.log(window.screen.availWidth);
    }

    if(window.screen.availWidth < 700){
        console.log($scope.desktopView);
    }
}

app.controller('familydayController', ["$scope", "$window", Ctrl]);

app.directive('resize',['$window',function($window){
    return {
        link: link,
        restrict: 'A'           
     };

     function link(scope, element, attrs){

       angular.element($window).bind('resize', function(){
           console.log($window.innerWidth);
       });    
     } 
}]);