//Directive for the saving the subreddits.
angular.module('redditApp').directive('saveList', ['$localStorage', 'webStorage', function( $localStorage, webStorage ) {
    return {
        link: function(scope, element) {       
           element.on('click', function(){
               webStorage.local.add('obj', scope.sublist);        
           });
            
        }
        
    }
    
}]);
                      
                      