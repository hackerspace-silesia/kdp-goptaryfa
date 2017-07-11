function TicketAdvisor(timetable) {
  this.timetable = $(timetable)
  this.rows = this.timetable.find("tbody tr:not([id])");
  this.stops = [];
  this.cls_stops = "stopChbx";
  this.timeClass = "stopTime";
  this.distanceClass = "stopDistance";
  this.infoClass = "stopInfo";
}

TicketAdvisor.prototype.extendTableHeader = function() {
  var col_header = this.timetable.find("thead th").first();
  var checkbox_header = $("<th></th>");
  col_header.before(checkbox_header);
}

TicketAdvisor.prototype.extendTableBody = function() {
  var id_string = "stopId";
  var rowInput = null;
  var stopRow = null;
  var i = 0

  for (; i < this.rows.length; i++) {
    // add checkbox
    rowInput = $("<td style=\"text-align: center;\">" +
                 "<input class=\"" + this.cls_stops + "\" id=\"" + id_string + i +
               "\" type=\"checkbox\"></td>");

    stopRow = $(this.rows[i]);
    stopRow.data("id", i)

    stopRow.addClass("stop")
    $(rowInput).prependTo(stopRow);

    // add time class
    stopRow.find("td:nth-child(4)").addClass(this.timeClass);

    // add distance class
    stopRow.find("td:nth-child(5)").addClass(this.distanceClass);

    // add info class
    stopRow.find("td:nth-child(6)").addClass(this.infoClass);
  };
}

TicketAdvisor.prototype.extendTable = function() {
  this.extendTableHeader();
  this.extendTableBody();
}

// convert (+ x.xx min) format to float
TicketAdvisor.prototype.strToFloat = function(string) {
  var regexp = /[^0-9.]/g;
  var result = string.replace(regexp, "");
  return parseFloat(result);
}

TicketAdvisor.prototype.normalize = function(value) {
  return (value !== '') ? this.strToFloat(value) : 0;
}

TicketAdvisor.prototype.collectData = function() {
  var data = null;
  var stops = $(".stop");
  var temp_string = "";
  var i = 0;
  var zone = 1;

  for (; i < stops.length; i++) {
    data = {};
    data["id"] = $(stops[i]).data("id");
    data["zone"] = zone;

    temp_string = $(stops[i]).find("." + this.distanceClass + " small").text();
    data["distance"] = this.normalize(temp_string);

    temp_string = $(stops[i]).find("." + this.timeClass + " small").text();
    data["time"] = this.normalize(temp_string);

    temp_string = $(stops[i]).find("." + this.infoClass).text();

    if (temp_string.match(/Strefowy/)) {
      zone++;
    }

    this.stops.push(data);
  }
}

// Check
var ta = new TicketAdvisor('.table.table-striped.table-bordered');
ta.extendTable();
ta.collectData();
console.table(ta.stops);
