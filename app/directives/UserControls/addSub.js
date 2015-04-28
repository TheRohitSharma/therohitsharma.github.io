angular.module('redditApp').directive('addSub', function() {
    return {
        link: function(scope, element) {

            element.on('click', function(){
            if (scope.sublist.indexOf(scope.sr) == -1) {
       
                scope.sublist.push(scope.sr);
        
                }
         
            });
        }
        
    }
    
});