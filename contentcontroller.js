var app = angular.module("myApp", ["ngRoute",]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./frontpage.html"
    })
    .when("/skills", {
        templateUrl : "./skills"
    })
    .when("/portfolio", {
        templateUrl : "./portfolio.html"
    })
    .when("/contact", {
        templateUrl : "./contact.tml"
    });
});

function Ctrl($scope, $window, $document){

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
    }
}


app.controller('familydayController', ["$scope", "$window", "$document", Ctrl]);

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