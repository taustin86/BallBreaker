angular.module('starter.services', [])

.factory('Ball', function(){

  function Ball(origin, radius) {
    if(origin.x <= view.center.x) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }
    this.radius = radius;
    this.slope = ((view.center.y - origin.y)/(view.center.x - origin.x));
    this.path = new Path.Circle({
      center: [origin.x, origin.y],
      radius: this.radius,
      strokeColor: 'green',
      fillColor: 'green'
    });
  }

  Ball.prototype.move = function(horizontalUnits) {
    var nextX = this.path.position.x + (this.direction * horizontalUnits);
    var nextY = this.slope * (nextX - this.path.position.x) + this.path.position.y;
    this.path.position.x = nextX;
    this.path.position.y = nextY;
  }

  Ball.prototype.react = function(otherPath) {
    if(this.path.getIntersections(otherPath).length != 0){
      this.direction = -(this.direction);
    }
  }

  return Ball;
});
