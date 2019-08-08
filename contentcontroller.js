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
    .when("/transpotation", {
        templateUrl : "./transpotation.html",
        controller: 'transpotationController'
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
    $scope.selectionArray = ['絹印環保袋', '松果貓頭鷹', '俏皮貓頭鷹像框', '幸福苔玉球', '貓頭鷹時鐘']
    $scope.selectDiy = 0
    $scope.showSelection = false
    $scope.diySelection = $scope.selectionArray[0]
    $scope.selectDIY = function(item,e){
        console.log(e)
        $scope.selectDiy = item
        $scope.diySelection = $scope.selectionArray[$scope.selectDiy]
        $scope.showSelection = false
    }

    $scope.getDiySelection = function(){
        $scope.showSelection = !$scope.showSelection
        $('div.diyDetail ul').addClass('autoHeight');
    }
}


app.controller('infoController', ["$scope", "$window", "$document", "$route", "$location", infoCtrl]);

function transController($scope, $window, $document, $route, $location){
    $scope.selectionArray = ['千里之行始於足下,我要走路', '我坐巴士好了', '我是老司機我要開車', '我很有錢我叫Uber代步']
    $scope.travelMode = ['WALKING', 'TRANSIT ', 'DRIVING']
    $scope.showParkingLotFee = false
    $scope.showSelection = false
    $scope.showBusPath = false;
    $scope.diySelection = '你要怎麼去'
    $scope.currentLocation = { lat: 25.0999136, lng: 121.5222447}
    $scope.selectedTravelMode = $scope.travelMode[0]
    $scope.selectDIY = function(index){
        console.log($scope.travelMode);
        $scope.diySelection = $scope.selectionArray[index]
        $scope.selectedTravelMode = $scope.travelMode[index]
        if(index == 2){
            $scope.showBusPath = false;
            $scope.showParkingLotFee = true;
        }
        else if(index == 1){
            $scope.showBusPath = true;
            $scope.showParkingLotFee = false;
            $scope.iGoBus = { modes:['BUS'] }
        }else if(index == 5) {
            console.log('uberrr');
            window.open(' https://m.uber.com/ul/?client_id=<CLIENT_ID>', '_blank');
        }else{
            $scope.showParkingLotFee = false;
        }
        $scope.showSelection = false
        var startPos;
        var geoSuccess = function(position) {
          startPos = position;
          $scope.currentLocation = { lat: startPos.coords.latitude , lng: startPos.coords.longitude };
          initMap()
        };
        var geoError = function(position) {
            console.log('Error occurred. Error code: ' + error.code);
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out
          };
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError);
    }

    $scope.getDiySelection = function(){
        $scope.showSelection = !$scope.showSelection
        $('div.diyDetail ul').addClass('autoHeight');
    }
    
    // Initialize and add the map
    $window.initMap = function initMap() {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var familyDay = {lat: 25.100093, lng: 121.530059};
        // The map, centered at Uluru
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: { lat: 25.034010, lng: 121.562428 }
        });
    
        directionsDisplay.setMap(map);
        var request = {
            origin: $scope.currentLocation,
            destination: familyDay,
            travelMode: $scope.selectedTravelMode
            //transitOptions: $scope.iGoBus
        };
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                // 回傳路線上每個步驟的細節
                console.log(result.routes[0].legs[0].steps);
                directionsDisplay.setDirections(result);
            } else {
                console.log(status);
            }
        });
        
        // The marker, positioned at Uluru
        //var marker = new google.maps.Marker({position: familyDay, map: map});
    }
}


app.controller('transpotationController', ["$scope", "$window", "$document", "$route", "$location", transController]);

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