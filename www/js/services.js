angular.module('starter.services', [])

.factory('Ball', function(){

  function Ball(origin) {
    if(origin.x <= view.center.x) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }
    this.slope = ((view.center.y - origin.y)/(view.center.x - origin.x));
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

  return Ball;
});
