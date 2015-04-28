//Directive for the drag and drop system.

angular.module('redditApp').directive('ngDrag', function() {
    return {
        link: function(scope, element) {
            
            element.draggable({ });
            
        
             
        }
        
    }
   
    
});

angular.module('redditApp').directive('ngDroppable', function() {
    return {
        link: function(scope, element) {
            
            element.droppable({
            
                drop: function(event, ui){
                    scope.subreddits = [];
                    scope.sr = $(ui.draggable).find('span').text();
                    scope.populateImages();
                    $(ui.draggable).draggable('option', 'revert', true);
       
                }
            
            
            });
            
         
            
        }

        
    }
    
    
    
});

