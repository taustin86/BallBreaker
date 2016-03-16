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
          var trackerRadius = window.innerWidth * .06;

          // Get a reference to the canvas object
          var canvas = document.getElementById('canvas');

          // Create an empty project and a view for the canvas:
          paper.setup(canvas);

          var path = new Path.Circle({
            center: view.center,
            radius: trackerRadius,
            strokeWidth: 2,
            strokeColor: 'white',
            fillColor: 'white',
            selected: true
          });

          path.insert(4, new Point(view.center.x - trackerRadius, view.center.y + trackerRadius));

          var tool = new Tool();

          tool.onMouseDrag = function(event) {
            event.preventDefault();
            path.position = path.position.add(new Point(event.delta.x, event.delta.y));
          }

          view.onFrame = function(event) {
            path.rotate(1);
          }

          view.onResize = function(event) {
            path.position = view.center;
          }

          view.draw();
        }
    };
});
