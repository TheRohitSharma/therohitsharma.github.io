//Set up module
var redditApp = angular.module('redditApp', ['ngRoute']);





redditApp.controller('mainController', ['$scope', '$http', '$location', '$rootElement', '$timeout',  function($scope, $http, $location, $rootElement, $timeout){
    
    $scope.next = null;
    $scope.count = 0;
    $scope.page = 1;
    
    $scope.redditify = function(){
        $scope.sr;
        $scope.success = false;
    $http.get('http://www.reddit.com/r/' + $scope.sr + '.json?count=' + $scope.count + '&limit=25' + $scope.next)
   
        .success(function (data){
           
        $scope.success = true;
        $scope.subreddits = [];
      
            $scope.next = null;
            for(var i = 0; i < data.data.children.length; i++)
            { 
                //Hide placeholder div
                //Show page nav.
                if(data.data.children.length > 0)
                {
                    $('.previouspage, .nextpage').removeClass('hidden');
                    $('#placeholderdiv').addClass('hidden');
                }
                //Dealing with .gifs
                var str =  data.data.children[i].data.url;
                var rest = str.substring(0, str.lastIndexOf("/") + 1);
		        var last = str.substring(str.lastIndexOf("/") + 1, str.length);
                //console.log(last);    
                var split = last.split(".");
                var fileformat = split[1];
                    if(fileformat == "gifv")
                        data.data.children[i].data.url = "http://" + data.data.children[i].data.domain + "/" + split[0] + ".gif";
                    if(fileformat == "jpg" || fileformat == "png" || fileformat == "bmp" || fileformat =="tif")
                    {
$scope.subreddits.push(data.data.children[i].data);

                    } 
                           // console.log(data);
                            //console.log(data.data.after + "<-After");
               
                
                         $scope.after = data.data.after;
                         $scope.before = data.data.before;
                                                                                                       //$scope.permalinks.push(data.data.children[i].data.permalink);

                         $scope.subreddit = data.data.children[i].data.subreddit;
            }   
        
        
       
        
    });
    
    
        
    }
    


$scope.resetPage= function(){
    $scope.page = 1;
}


]


}]);
    
    //Code for the info qtip
redditApp.directive('ngHover', function() {
  return {
      
    link: function(scope, element) {
   element.qtip({
         position: {
        my: 'bottom center', 
        at: 'top center',
        target: element,
        adjust: { mouse: false } 
    },
           style: { classes: 'qtip-youtube' },

       
       content:
       {
   text: scope.subreddit.title

       }
   
   
   })
   
   element.on('click', function(){
   	$('#myModal p a').remove();
        $('.modal-body', '.modal-title').empty();
        
        $('.modal-title').append('<a href="http://reddit.com' + scope.subreddit.permalink + '" target="_blank">' + scope.subreddit.title + '</a>');
        $('.modal-body').append('<img id="mimg" src="' + scope.subreddit.url + '">');

        $('#myModal').modal('show');           

    setTimeout( function () {
        $('#myModal').data('bs.modal').handleUpdate();
    } , 800 );
   
   });
   
    }
  }
});

//Next Page 
redditApp.directive('nextPage', function(){

    return {
    
        link: function(scope, element){
        
            element.on('click', function(){
            scope.next = "&after=" + scope.after;
            scope.count = scope.count + 25;
                
            scope.redditify();
            
            
            });
        
        
        
        }    
    
    }



});

//Previous Page 
redditApp.directive('previousPage', function(){

    return {
    
        link: function(scope, element){
        
            element.on('click', function(){
            scope.next = "&before=" + scope.before;
            scope.count = scope.count - 25;

            scope.redditify();
            
            
            });
        
        
        
        }    
    
    }



});
