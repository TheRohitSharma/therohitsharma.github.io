//Directive for deleting a single subreddit from the list and local storage.
angular.module('redditApp').directive('ngDelete', ['webStorage', function(webStorage) {
    return {
        link: function(scope, element) {

            element.on('click', function(){
           
                element.parent().fadeOut();

                if (scope.sublist.indexOf(element.parent().text()) == -1){
                    
                    //Delete at index with specified value.
                    var index = scope.sublist.indexOf(element.parent().find('span').text());
                    scope.sublist.splice(index, 1);
                    
                    //Remove from local storage as well.
                    webStorage.local.add('obj', scope.sublist);
                }
           });
            
            
        }
     
    }

}]);