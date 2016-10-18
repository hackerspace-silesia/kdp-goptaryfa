function TicketAdvisor (timetable) {
  this.table = $(timetable);
  this.header_row = this.table.find('thead > tr');
  this.rows = this.table.find('tbody > tr');
  this.stops = [];
  this.cells = [];
}

TicketAdvisor.prototype.distanceValidator = function(distance) {
  return (distance !== 'b.d.') ? parseFloat(distance.replace(" km", "")) : 'b.d.';
};

TicketAdvisor.prototype.timeToSeconds = function(time) {
    time = time.split(/:/);
    return time[0] * 3600 + time[1] * 60;
};

TicketAdvisor.prototype.extendTable = function() {
  var rowInput;
  $('<th>Przelicz</th>').prependTo(this.header_row);
  for (var i = 0; i < this.rows.length; i++) {
    rowInput = "<th><input class=\"row" + i + "\" type=\"checkbox\"></th>";
    $(rowInput).prependTo(this.rows[i]);
  }
};

TicketAdvisor.prototype.collectData = function() {
  var data = {};
  var time;
  var distance;
  for (var i = 0; i < this.rows.length; i++) {
    data = {};
    this.cells = $(this.rows[i]).children();
    distance = this.cells[2].innerHTML;
    time = $(this.cells[3]).find('a')[0].innerHTML;

    data.distance = this.distanceValidator(distance);
    data.time = this.timeToSeconds(time);
    this.stops[i] = data;
  }
};

// test
/*
var tickets = new TicketAdvisor('table');
tickets.collectData();
tickets.extendTable();

for (var i = 0; i < tickets.rows.length; i++) {
  console.log(i + ".\n" + tickets.stops[i].distance + "\n" + tickets.stops[i].time + "\n\n");
}
*/