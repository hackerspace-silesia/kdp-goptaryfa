function TicketAdvisor(timetable) {
  this.timetable = $(timetable)
}

TicketAdvisor.prototype.extendTableHeader = function() {
  var col_header = this.timetable.find("thead th").first();
  var checkbox_header = $("<th></th>");
  col_header.before(checkbox_header);
}

TicketAdvisor.prototype.extendTableBody = function() {
  var rows = this.timetable.find("tbody tr:not([id])");
  var id_string = "chbox_stop_id";
  var cls_stops = "chbox_stops";
  var rowInput = null;

  for (var i = 0; i < rows.length; i++) {
    rowInput = "<td style=\"text-align: center;\">" +
                 "<input class=\"" + cls_stops + "\" id=\"" + id_string + i +
               "\" type=\"checkbox\"></td>";
    $(rowInput).prependTo(rows[i]);
  }
}

TicketAdvisor.prototype.extendTable = function() {
  this.extendTableHeader();
  this.extendTableBody();
}
