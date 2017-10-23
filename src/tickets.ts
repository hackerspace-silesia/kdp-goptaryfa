export class TicketAdvisor {
  private timetable: JQuery<HTMLElement>;
  private headerRow: JQuery<HTMLElement>;
  private rows: JQuery<HTMLElement>;
  private stops: any[];
  private cells: any;
  private clsStops = 'stopChbx';
  private timeClass = 'stopTime';
  private distanceClass = 'stopDistance';
  private infoClass = 'stopInfo';
  constructor(timetable) {
    this.timetable = $(timetable);
    this.rows = this.timetable.find('tbody tr:not([id])');
    this.stops = [];
  }
  public extendTableHeader() {
    const colHeader = this.timetable.find('thead th').first();
    const checkboxHeader = $('<th></th>');
    colHeader.before(checkboxHeader);
  }

  public extendTableBody() {
    const idString = 'stopId';
    let rowInput: JQuery<HTMLElement>;
    let stopRow: JQuery<HTMLElement>;
    let i = 0;

    for (; i < this.rows.length; i++) {
      // add checkbox
      rowInput = $('<td style="text-align: center;">' +
        '<input class="' + this.clsStops + '" id="' + idString + i +
        '" type="checkbox"></td>');

      stopRow = $(this.rows[i]);
      stopRow.data('id', i);

      stopRow.addClass('stop');
      $(rowInput).prependTo(stopRow);

      // add time class
      stopRow.find('td:nth-child(4)').addClass(this.timeClass);

      // add distance class
      stopRow.find('td:nth-child(5)').addClass(this.distanceClass);

      // add info class
      stopRow.find('td:nth-child(6)').addClass(this.infoClass);
    }
  }

  public extendTable() {
    this.extendTableHeader();
    this.extendTableBody();
  }

  public strToFloat(str: string) {
    const regexp = /[^0-9.]/g;
    const result = str.replace(regexp, '');
    return parseFloat(result);
  }

  public collectData() {
    let data: any = null;
    const stops = $('.stop');
    let tempString = '';
    let i = 0;
    let zone = 1;

    for (; i < stops.length; i++) {
      data = {};
      data['id'] = $(stops[i]).data('id');
      data['zone'] = zone;

      tempString = $(stops[i]).find('.' + this.distanceClass + ' small').text();
      data['distance'] = this.normalize(tempString);

      tempString = $(stops[i]).find('.' + this.timeClass + ' small').text();
      data['time'] = this.normalize(tempString);

      tempString = $(stops[i]).find('.' + this.infoClass).text();

      if (tempString.match(/Strefowy/)) {
        zone++;
      }

      this.stops.push(data);
    }
  }

  public getStops() {
    return this.stops;
  }

  private normalize(value) {
    return (value !== '') ? this.strToFloat(value) : 0;
  }
}

// ---------------------------------------------------------------------

const tickets = new TicketAdvisor('.table.table-striped.table-bordered');
tickets.extendTable();
tickets.collectData();
console.table(tickets.getStops());
