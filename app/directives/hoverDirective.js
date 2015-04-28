//This directive controls the hover event. The qtip containing the post title shows up on hover.

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

