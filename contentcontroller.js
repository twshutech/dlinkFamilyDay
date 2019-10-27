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
    })
    .when("/start", {
        templateUrl : "./startFamilyDay.html",
        controller: 'startFamilyDayController'
    })
    .when("/draw", {
        templateUrl : "./luckyDraw.html",
        controller: 'luckyDrawController'
    });
    //$locationProvider.html5Mode(true);
}]);

function Ctrl($scope, $window, $document, $route, $location){
    $scope.deviceView = true;
    if($window.innerWidth < 1000){
        $scope.deviceView = false
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
    $scope.travelMode = ['WALKING','DRIVING']
    $scope.showParkingLotFee = false
    $scope.showSelection = false
    $scope.showBusPath = false;
    $scope.diySelection = '你要怎麼去'
    $scope.currentLocation = { lat: 25.101992, lng: 121.5221328}
    $scope.selectedTravelMode = $scope.travelMode[0]
    $scope.selectDIY = function(index){
        console.log(index);
        $scope.diySelection = $scope.selectionArray[index]
        $scope.selectedTravelMode = $scope.travelMode[index]
        if(index > 1){
            $scope.selectedTravelMode = $scope.travelMode[0]
        }
        if(index == 2){
            $scope.showBusPath = false;
            $scope.showParkingLotFee = true;
        }
        else if(index == 1){
            $scope.showBusPath = true;
            $scope.showParkingLotFee = false;
            $scope.iGoBus = { modes:['BUS'] }
        }else if(index == 3) {
            console.log('uberrr');
            window.open(' https://m.uber.com/ul/?client_id=<CLIENT_ID>&action=setPickup&dropoff[latitude]=25.0999136&dropoff[longitude]=121.5222447');
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
        var familyDay = {lat: 25.1052319, lng: 121.5297909};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: {lat: 25.1048016, lng: 121.5298468}
        });
    
        directionsDisplay.setMap(map);
        console.log($scope.selectedTravelMode)
        var request = {
            origin: $scope.currentLocation,
            destination: familyDay,
            travelMode: $scope.selectedTravelMode,
            waypoints: [{location: "4G3G+C8 Taipei",stopover:false}]
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

function startCtrl($scope, $window, $document, $route, $location){
    $scope.giftList = [
        {
            label: "點心",
            ischecked: false,
            link:"img/snack.png"
        },
        {
            label: "星巴克",
            ischecked: false,
            link:"img/coffee.png"
        },
        {
            label: "電影票",
            ischecked: false,
            link:"img/movieTicket.png"
        },
        {
            label: "幸運紅包",
            ischecked: false,
            link:"img/luckyPocket.png"
        },
        {
            label: "商品卡",
            ischecked: false,
            link:"img/sevenElevenCard.png"
        }
    ];
    $scope.diys = [
        {
            label:'絹印環保袋',
            checked:false,
            disabled:false
        },
        {
            label: '松果貓頭鷹',
            checked:false,
            disabled:false
        },
        {
            label:'俏皮貓頭鷹像框',
            checked:false,
            disabled:false
        },
        {
            label:'幸福苔玉球',
            checked:false,
            disabled:false
        },
        {
            label:'貓頭鷹時鐘',
            checked:false,
            disabled:false
        }
    ];
    $scope.levels = [
        {
            label:'第一關-生存大冒險',
            checked:false
        },
        {
            label: '第二關-生態尋寶趣',
            checked:false
        },
        {
            label: '第三關-小鳥猜猜猜',
            checked:false
        },
        {
            label: '第四關-塑膠大作戰',
            checked:false
        },
        {
            label: '第五關-考古拼拼樂',
            checked:false
        }
    ];
    $scope.btnLabels = ['開始家庭日', '我領完了!  開始闖關DIY','我做完DIY,也闖完關了！','回家']
    $scope.btnLabel = $scope.btnLabels[0]
    $scope.firstSteps = true
    $scope.secSteps = false
    $scope.thirdSteps = false
    $scope.forthSteps = false
    $scope.maxDiy = false
    $scope.initSteps = function(){
        $scope.firstSteps = false
        $scope.secSteps = false
        $scope.thirdSteps = false
        $scope.forthSteps = false
    }
    $scope.toStep = function(){
        if($scope.btnLabel == $scope.btnLabels[0]){
            $scope.initSteps();
            $scope.secSteps = true
            $scope.btnLabel = $scope.btnLabels[1]
        }
        else if($scope.btnLabel == $scope.btnLabels[1]){
            $scope.initSteps();
            $scope.thirdSteps = true
            $scope.btnLabel = $scope.btnLabels[2]
            angular.forEach($scope.diys, function(diy){
                if(diy.checked == true){
                    diy['checked'] = false
                    $scope.levels.push(diy)
                }
            });
        }
        else if($scope.btnLabel == $scope.btnLabels[2]){
            var n = 0
            angular.forEach($scope.levels, function(level, index){
                if(level.checked == true){
                    n = n + 1
                    if(n == $scope.levels.length){
                        $scope.initSteps();
                        $scope.forthSteps = true
                        $scope.btnLabel = $scope.btnLabels[3]
                    }
                }
            });
        }
        else if($scope.btnLabel == $scope.btnLabels[3]){
            $window.location.href = '#!map'
        }
    }
    $scope.checkItem = function(item){
        item.ischecked = !item.ischecked
    }
    $scope.checkDiy = function(item,index){
        var n = 0;
        angular.forEach($scope.diys,function(item){
            if(item.checked == true){
                n = n + 1;
            }
            else{
                return
            }
            if(n==2){
                if(item.checked!=true){
                    item.disabled = true
                }
            }
        });
        if(n>2){
            $scope.diys[index]['checked'] = false;
        }
        if(n<3){
            if(n==2){
                $scope.diys[index]['checked'] = false;
                //document.getElementById('select_diy_label_'+index).classList.remove('checkedIcon');
            }
            else{
                $scope.diys[index]['checked'] = !$scope.diys[index]['checked'];
                //document.getElementById('select_diy_label_'+index).className('checkedIcon');
            }
        }
    }
    $scope.checkLevel = function(item,index){
        $scope.levels[index]['checked'] = !$scope.levels[index]['checked'];
    }
}

app.controller('startFamilyDayController', ["$scope", "$window", "$document", "$route", "$location", startCtrl]);

function luckyDrawCtrl($scope, $window, $document, $route, $location){
    $scope.luckyPocket = [{
            number: 110,
            label:'威秀電影票'
        },{
            number: 140,
            label:'商品卡'
        },{
            number: 19,
            label:'starbucks'
            
        }
    ]
    $scope.youWon = null
    $scope.whosTurn = ['輪到我的回合了，我抽','下一位']
    $scope.drawBtn = $scope.whosTurn[0]
    var max = 3
    $scope.nothingLeft = []
    $scope.draw = function(){
        if($scope.drawBtn == $scope.whosTurn[0]){
            $scope.number = Math.floor(Math.random() * Math.floor(max))
            console.log($scope.luckyPocket[$scope.number]) 
            $scope.luckyPocket[$scope.number].number = $scope.luckyPocket[$scope.number].number - 1
            $scope.youWon = $scope.luckyPocket[$scope.number].label
            if($scope.luckyPocket[$scope.number].number == 0){
                if(max == 3){
                    max = 2
                }
                else if(max == 2){
                    max = 1
                }
                $scope.nothingLeft.push($scope.luckyPocket[$scope.number])
                _.pull($scope.luckyPocket, $scope.luckyPocket[$scope.number])
            }
            $scope.drawBtn = $scope.whosTurn[1]
        }
        else{
            $scope.drawBtn = $scope.whosTurn[0]
        }
    }
    $scope.add = function(item){
        if(item.label == 'starbucks'){
            if(item.number < 19){
                item.number = item.number + 1
            }
        }
        else if(item.label == '商品卡'){
            if(item.number < 140){
                item.number = item.number + 1
            }
        }
        else if(item.label == '威秀電影票'){
            if(item.number < 110){
                item.number = item.number + 1
            }
        }
    }
}

app.controller('luckyDrawController', ["$scope", "$window", "$document", "$route", "$location", luckyDrawCtrl]);