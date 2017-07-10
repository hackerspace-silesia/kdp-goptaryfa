function TicketAdvisor(timetable) {
  this.timetable = $(timetable)
  this.rows = this.timetable.find("tbody tr:not([id])");
  this.stops = [];
  this.cls_stops = "stopsChbx";
  this.timeClass = "stopsTime";
  this.distanceClass = "stopsDistance";
  this.infoClass = "stopsInfo";
}

TicketAdvisor.prototype.extendTableHeader = function() {
  var col_header = this.timetable.find("thead th").first();
  var checkbox_header = $("<th></th>");
  col_header.before(checkbox_header);
}

TicketAdvisor.prototype.extendTableBody = function() {
  var id_string = "stopId";
  var rowInput = null;

  for (var i = 0; i < this.rows.length; i++) {
    // add checkbox
    rowInput = "<td style=\"text-align: center;\">" +
                 "<input class=\"" + this.cls_stops + "\" id=\"" + id_string + i +
               "\" type=\"checkbox\"></td>";
    $(rowInput).prependTo(this.rows[i]);

    // add time class
    $(this.rows[i]).find("td:nth-child(4)").addClass(this.timeClass);

    // add distance class
    $(this.rows[i]).find("td:nth-child(5)").addClass(this.distanceClass);

    // add info class
    $(this.rows[i]).find("td:nth-child(6)").addClass(this.infoClass);
  }
}

TicketAdvisor.prototype.extendTable = function() {
  this.extendTableHeader();
  this.extendTableBody();
}

TicketAdvisor.prototype.collectDate = function() {
  var data = {};
  var stops = this.timetable.find("tbody tr." + this.cls_stops);

}
