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
          var Ball = function(origin, slope) {
            if(origin.x <= view.center.x) {
              this.direction = 1;
            } else {
              this.direction = -1;
            }
            this.slope = slope;
            this.path = new Path.Circle({
              center: [origin.x, origin.y],
              radius: 50,
              strokeColor: 'green',
              fillColor: 'green'
            });
          }

          Ball.prototype.move = function() {
            var nextX = this.path.position.x + (this.direction * 3);
            var nextY = this.slope * (nextX - this.path.position.x) + this.path.position.y;
            this.path.position.x = nextX;
            this.path.position.y = nextY;
          }

          var pinToViewEdge = function(point) {
            var mask = Math.floor((Math.random() * 100) + 1) % 4;
            switch(mask) {
              case 0:
                return new Point(0, point.y);
                break;
              case 1:
                return new Point(point.x, 0);
                break;
              case 2:
                return new Point(view.bounds.bottomRight.x, point.y);
                break;
              case 3:
                return new Point(point.x, view.bounds.bottomRight.y);
                break;
              default:
                return point;
            }
          }

          var trackerRadius = window.innerWidth * 0.125;

          if(screen.lockOrientation != undefined){
            //Mobile device pinned to landscape
            trackerRadius = window.innerWidth * 0.25;
          }

          // Get a reference to the canvas object
          var canvas = document.getElementById('canvas');

          // Create an empty project and a view for the canvas:
          paper.setup(canvas);

          var tracker = new Path.Circle({
            center: view.center,
            radius: trackerRadius,
            strokeWidth: trackerRadius * 0.125,
            strokeColor: 'white',
            closed: false
          });

          var lastPointX = tracker.lastSegment.point.x + (trackerRadius * Math.sin(-0.25 * Math.PI));
          var lastPointY = tracker.lastSegment.point.y - (trackerRadius * (1 - Math.cos(-0.25 * Math.PI)));

          tracker.add(new Point(lastPointX, lastPointY));

          var ballTargets = [];
          window.setInterval(function(){
            var startingPoint = pinToViewEdge(Point.random().multiply(view.bounds.bottomRight));
            ballTargets.push(new Ball(startingPoint, ((view.center.y - startingPoint.y)/(view.center.x - startingPoint.x))));
          }, 3000);

          var tool = new Tool();
          tool.onMouseDrag = function(event) {
            tracker.rotate(event.delta.angleInDegrees * 0.05, view.center);
          }

          view.onResize = function(event) {
            tracker.position = view.center;
          }

          view.onFrame = function(event) {
            ballTargets = ballTargets.filter(function(ball){
              var viewable = ball.path.position.isInside(view.bounds);
              if(!viewable){
                ball.path.remove();
              }
              return viewable;
            });
            for(var i = 0; i < ballTargets.length; i++){
              ballTargets[i].move();
            }
          }

          view.draw();
        }
    };
});
