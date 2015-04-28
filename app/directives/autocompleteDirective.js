angular.module('redditApp').directive('autoComplete', function( $timeout ) {
    return {
        link: function(scope, element) {
        
            element.autocomplete({
               source: scope.sublist 
            });
        
        
        }
        
        
    }
    
    
    
});