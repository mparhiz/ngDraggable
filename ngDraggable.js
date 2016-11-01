var app = angular.module('maApp', []);

app.directive("ngDraggable", function ($document) {
    return {
        restrict: "A",
        link: function ($scope, $element, $attr) {
            var startX = 0,
                startY = 0;

            $element.css({
                position: 'absolute'
            });
            
            var draggableItems = $element[0].querySelectorAll(".draggable");
            for (var i = 0; i < draggableItems.length; i++) {
                angular.element(draggableItems[i]).css({
                    cursor: 'move'
                });
            };

            $element.on("mousedown", function ($event) {
                $event.preventDefault();
                
                if (angular.element($event.target).hasClass("draggable")) {
                    startX = $event.pageX - $element[0].offsetLeft;
                    startY = $event.pageY - $element[0].offsetTop;
                    $document.on("mousemove", mousemove);
                    $document.on("mouseup", mouseup);
                };
            });

            function mousemove($event) {
                placeNode($element, $event.pageY - startY, $event.pageX - startX);
            };

            function mouseup() {
                $document.off("mousemove", mousemove);
                $document.off("mouseup", mouseup);
            };

            function placeNode(node, top, left) {
                node.css({
                    position: "absolute",
                    top: top + "px",
                    left: left + "px",
                });
            };
        }
    };
});