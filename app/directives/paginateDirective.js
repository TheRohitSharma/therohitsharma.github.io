//Next Page 
angular.module('redditApp').directive('nextPage', function() {
    return {
        link: function(scope, element) {
            element.on('click', function() {
                scope.next = "&after=" + scope.after;
                scope.count = scope.count + 25;
               
                scope.populateImages();
            
            });



        }

    }



});

//Previous Page 
angular.module('redditApp').directive('previousPage', function() {

    return {
        link: function(scope, element) {
            element.on('click', function() {
                scope.next = "&before=" + scope.before;
                scope.count = scope.count - 25;
                console.log(scope.count);

                scope.populateImages();


            });



        }

    }


});
