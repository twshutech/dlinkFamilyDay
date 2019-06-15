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
    $(window).resize(function(){
        console.log (window.screen.availWidth)
    })

});