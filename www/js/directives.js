angular.module('starter.directives', [])

.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$watch(attributes.hideTabs, function(value){
                $rootScope.hideTabs = value;
            });

            scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})

.directive('draw', function () {
    return {
        restrict: 'AEC',
        link: function postLink(scope, element, attrs) {
            var path;
            var drag = false;

            function mouseUp(event) {
                //Clear Mouse Drag Flag
                drag = false;
            }

            function mouseDrag(event) {
                if (drag) {
                    path.add(new paper.Point(event.layerX, event.layerY));
                    path.smooth();
                }
            }

            function mouseDown(event) {
                //Set  flag to detect mouse drag
                drag = true;
                path = new paper.Path();
                path.strokeColor = 'black';
                path.add(new paper.Point(event.layerX, event.layerY));
            }

            function initPaper() {
                paper.install(window);
                paper.setup('canvas');
            }

            element.on('mousedown', mouseDown).on('mouseup', mouseUp).on('mousemove', mouseDrag);

            initPaper();

        }
    };
});
