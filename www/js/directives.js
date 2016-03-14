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
          // Only executed our code once the DOM is ready.
          // Get a reference to the canvas object
          var canvas = document.getElementById('canvas');

          // Create an empty project and a view for the canvas:
          paper.setup(canvas);

          var path = new Path.Circle({
            center: view.center,
            radius: 25,
            strokeWidth: 2,
            strokeColor: 'white',
            fillColor: 'white',
            selected: true
          });

          path.insert(4, new Point(view.center.x - 25, view.center.y + 25));

          view.onResize = function(event) {
            path.position = view.center;
          }

          view.draw();
        }
    };
});
