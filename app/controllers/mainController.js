redditApp.controller('mainController', ['$scope', '$http', '$timeout', '$localStorage', 'webStorage', function($scope, $http, $timeout, $localStorage, webStorage) {

    $scope.sublist = []

    if(webStorage.local.get('obj') != undefined)
        for(var i = 0; i < webStorage.local.get('obj').length; i++)
            $scope.sublist.push(webStorage.local.get('obj')[i]);
            

      
    $scope.next = null;
    $scope.count = 0;
    $scope.page = 1;
    
    $scope.populateImages= function(){
      
         //Show loading animation
        $('.loader').removeClass('hidden');
      
        //Get images from Reddit API.    
        $scope.sr;
        $scope.success = false;
        $http.get('http://www.reddit.com/r/' + $scope.sr + '.json?count=' + $scope.count + '&limit=25' + $scope.next)
            
        .success(function(data) {
                
                //Hide loading animation
            $('.loader').addClass('hidden');

          
                
            $scope.success = true;
            $scope.subreddits = [];
            $scope.next = null;
            
              //Hide placeholder div
              //Show page nav.
            if (data.data.children.length > 0) {
                $('.previouspage, .nextpage').removeClass('hidden');
                $('#placeholderdiv').addClass('hidden');
                }
        

                
                

            for (var i = 0; i < data.data.children.length; i++) {
                
              
                //Dealing with .gifs. Not supporting them. Only loading images if the url                 does not end in ".gif".
                var str = data.data.children[i].data.url;
                var rest = str.substring(0, str.lastIndexOf("/") + 1);
                var last = str.substring(str.lastIndexOf("/") + 1, str.length);

                var split = last.split(".");
                var fileformat = split[1];

                //Check if .gifv format. Not supporting that either.
                if (fileformat == "gifv")
                    data.data.children[i].data.url = "http://" + data.data.children[i].data.domain + "/" + split[0] + ".gif";
                
                if (fileformat == "jpg" || fileformat == "png" || fileformat == "bmp" || fileformat == "tif") {
                    
                    $scope.subreddits.push(data.data.children[i].data);
                }


                $scope.after = data.data.after;
                $scope.before = data.data.before;
                $scope.subreddit = data.data.children[i].data.subreddit;
            }
        }).error(function(data, status, headers, config) {
             $('.loader').addClass('hidden');
                        
  });;
      
      //Hide the dummy div.
      $('#placeholderdiv').addClass('hidden');
  }  
  
    
  //For adding subreddits to sidebar.
    $scope.addSub = function() {
        if ($scope.sublist.indexOf($scope.sr) == -1) {
       
            $scope.sublist.push($scope.sr);
            }
    }

}]);
           
