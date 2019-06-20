var app = angular.module("myApp", ["ngRoute",]);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./frontpage.html",
        controller: 'infoController',
    })
    .when("/map", {
        templateUrl : "./map.html",
        controller: 'familydayController'
    })
    .when("/caution", {
        templateUrl : "./caution.html",
        controller: 'familydayController'
    })
    .when("/bonus", {
        templateUrl : "./bonus.html",
        controller: 'familydayController'
    });
    //$locationProvider.html5Mode(true);
}]);

function Ctrl($scope, $window, $document, $route, $location){

    if($window.innerWidth < 700){
        $scope.mobilemenu = function(e){
            $scope.desktopView = !$scope.desktopView;
            $('.option').removeClass('hideItem');
        }
        $window.addEventListener('touchstart', function(e) {
            if(!$(e.target).hasClass('optionItem')){
                $('.option').addClass('hideItem');
            }
            else if ($(e.target).hasClass('fa-align-justify')){
                $('.option').removeClass('hideItem');
            }
            else{
                console.log('main content'+e.target);
            }
        });
        $scope.closeMenu = function (){
            console.log('click')
            $('.option').addClass('hideItem');
        }
        
        $scope.selectDIY = function(item){
            console.log(item)
        }
    }
    else{
        $('.option').removeClass('hideItem');
    }
}


app.controller('familydayController', ["$scope", "$window", "$document", "$route", "$location", Ctrl]);


function infoCtrl($scope, $window, $document, $route, $location){

    $scope.selectDIY = function(item){
        console.log(item)
    }
    $scope.diySelection = 'ddsdfdfqe21'

}


app.controller('infoController', ["$scope", "$window", "$document", "$route", "$location", infoCtrl]);

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