// New a directive for 2nd page to generate dynamical .content according to the data from DB
app.directive("contentDirective", function($compile) {
    return {
        restrict: 'E',
        replace: true,
        template: "<div class='content'></div>",
        link: function(scope, element, attrs) {
            if (scope.current.type == 'Text' || scope.current.type == 'Quote') {
                var DOM = "<textarea class='" + scope.current.type + "' rows='10',cols='40'>" + scope.current.content + "</textarea><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div>";
                DOM = $(DOM);
                var link = $compile(DOM);
                var node = link(scope);
                element.append(node);
            } else {
                // @Todo 20160426: set class to this lists
                var ul = "<ul>";
                for (var i = 0; i < scope.current.content.length; i++) {
                    ul += "<li>" + scope.current.content[i] + "</li>";
                }
                ul += "</ul>";
                ul = "<div class='list_container " + scope.current.type + "' contenteditable='true'>" + ul + "</div><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div>";
                ul = $(ul);
                var link_ul = $compile(ul);
                var node_ul = link_ul(scope);
                element.append(node_ul);
            }
        }
    };
});