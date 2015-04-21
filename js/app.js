//RedditApp Module
var redditApp = angular.module('redditApp', ['ngRoute']);

redditApp.controller('mainController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    $scope.next = null;
    $scope.count = 0;
    $scope.page = 1;

    //The Reddit AJAX magic.
    $scope.redditify = function() {
        $scope.sr;
        $scope.success = false;
        $http.get('http://www.reddit.com/r/' + $scope.sr + '.json?count=' + $scope.count + '&limit=25' + $scope.next)

        .success(function(data) {

            $scope.success = true;
            $scope.subreddits = [];
            $scope.next = null;

            if (data.data.children.length > 0) {
                $('.previouspage, .nextpage').removeClass('hidden');
                $('#placeholderdiv').addClass('hidden');
                }

            for (var i = 0; i < data.data.children.length; i++) {
                //Hide placeholder div
                //Show page nav.
               

                //Dealing with .gifs
                var str = data.data.children[i].data.url;
                var rest = str.substring(0, str.lastIndexOf("/") + 1);
                var last = str.substring(str.lastIndexOf("/") + 1, str.length);

                var split = last.split(".");
                var fileformat = split[1];

                //Check if .gifv format. Not supporting that.
                if (fileformat == "gifv")
                    data.data.children[i].data.url = "http://" + data.data.children[i].data.domain + "/" + split[0] + ".gif";
                if (fileformat == "jpg" || fileformat == "png" || fileformat == "bmp" || fileformat == "tif") {
                    $scope.subreddits.push(data.data.children[i].data);
                }


                $scope.after = data.data.after;
                $scope.before = data.data.before;
                $scope.subreddit = data.data.children[i].data.subreddit;
            }
        });
    }

}]);

//Directive for showing the info qtip.
redditApp.directive('ngHover', function() {
    return {
        link: function(scope, element) {
            element.qtip({
                position: {
                    my: 'bottom center', // Position it where the click was...
                    at: 'top center',
                    target: element,
                    adjust: {
                        mouse: false
                    } // ...but don't follow the mouse
                },
                style: {
                    classes: 'qtip-youtube'
                },
                content: {
                    text: scope.subreddit.title
                }

            })

            element.on('click', function() {

                $('.modal-body').empty();
                $('#myModal p a').remove();
                $('.modal-title').empty();
                $('.modal-title').append('<a href="http://reddit.com' + scope.subreddit.permalink + '" target="_blank">' + scope.subreddit.title + '</a>');
                $('.modal-body').append('<img id="mimg" src="' + scope.subreddit.url + '">');

                $('#myModal').modal('show');

                setTimeout(function() {
                    $('#myModal').data('bs.modal').handleUpdate();
                }, 800);

            });
        }
    }
});
//Directive ends

//Next Page 
redditApp.directive('nextPage', function() {
    return {
        link: function(scope, element) {
            element.on('click', function() {
                scope.next = "&after=" + scope.after;
                scope.count = scope.count + 25;

                scope.redditify();
            });
        }
    }
});

//Previous Page 
redditApp.directive('previousPage', function() {

    return {
        link: function(scope, element) {
            element.on('click', function() {
                scope.next = "&before=" + scope.before;
                scope.count = scope.count - 25;

                scope.redditify();


            });
        }
    }
});
