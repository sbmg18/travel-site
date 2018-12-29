import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(els, offset) {
    this.ItemsToReveal = els;
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWayPoints();
  }

  hideInitially() {
    this.ItemsToReveal.addClass('reveal-item');
  }

  createWayPoints() {
    var that = this;

    this.ItemsToReveal.each(function() {
      var currentItem = this;
      new Waypoint({
        element: currentItem,
        handler: function() {
          $(currentItem).addClass('reveal-item--is-visible');
        },
        offset: that.offsetPercentage
      });
    });
  }
}

export default RevealOnScroll;
