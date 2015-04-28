//Directive for deleting all of the subreddits.

angular.module('redditApp').directive('trashList', ['$localStorage', 'webStorage', function( $localStorage, webStorage ) {
    return {
        link: function(scope, element) {
                 
           element.on('click', function(){
               scope.sublist = [ ];
               $('.subredditcontainer ul').children().fadeOut();
               webStorage.local.clear();

           });    
        }
    }
}]);
                      
                      
                      