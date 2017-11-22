export class TicketAdvisor {
  private timetable: Element;
  private rows: NodeListOf<Element>;
  private stops: Object[];
  private checkedStops: number[] = [];
  private clsStops = 'stopChbx';
  private timeClass = 'stopTime';
  private distanceClass = 'stopDistance';
  private infoClass = 'stopInfo';

  constructor(table: string) {
    this.timetable = document.querySelector(table) as Element;
    this.rows = this.timetable.querySelectorAll('tbody tr:not([id])');
    this.stops = [];
  }

  public extendTable() {
    this.extendTableHeader();
    this.extendTableBody();
  }

  public collectData() {
    const data: Object = {};
    const stops: NodeListOf<Element> = document.querySelectorAll('.stop');
    let text: string;
    let zone = 1;

    stops.forEach(stop => {
      const lol = {}
      data['id'] = stop.getAttribute('id');
      data['zone'] = zone;

      text = this.extractTextValue(stop, `.${this.distanceClass} small`);
      data['distance'] = this.normalize(text);

      text = this.extractTextValue(stop, `.${this.timeClass} small`);
      data['time'] = this.normalize(text);

      text = this.extractTextValue(stop, `.${this.infoClass}`);

      if (text.match(/Strefowy/)) {
        zone++;
      }

      this.stops = [...this.stops, Object.assign({}, data)];
    });
  }

  public getCheckedStops() {
    return this.checkedStops;
  }

  public getStops() {
    return this.stops;
  }

  private extendTableHeader() {
    const colHeader = this.timetable.querySelectorAll('thead th')[0];
    const checkboxColNotExists = !document.querySelector('#checkboxCol');
    if (checkboxColNotExists) {
      colHeader.insertAdjacentHTML('beforebegin', '<th id="checkboxCol"></th>');
    }
  }

  private extendTableBody() {
    const stopCheck = e => this.handleStopCheck(e);
    let checkbox: Element | null;
    let i: number = 0;

    this.rows.forEach( row => {

      if (Array.from(row.classList).includes('text-muted')) {
        this.addBlankColumn(row);
      } else {
        // prepare row's id and class name
        row.setAttribute('data-stop', `${i}`);
        row.classList.add("stop");

        this.addInputColumn(row, i);

        checkbox = document.querySelector(`input[data-stop="${i}"]`);

        if (checkbox) {
          checkbox.addEventListener('change', stopCheck.bind(this, checkbox));
        };

        // add class names to the columns
        const rowChildren = Array.from(row.children);
        rowChildren[3].classList.add(this.timeClass);
        rowChildren[4].classList.add(this.distanceClass);
        rowChildren[5].classList.add(this.infoClass);

        i++;
      }
    });
  }

  private addInputColumn(row:Element, i:number) {
    const inputRow = `<td style="text-align: center;">
                        <input class="${this.clsStops}" data-stop="${i}" type="checkbox" />
                      </td>`
    row.insertAdjacentHTML('afterbegin', inputRow);
  }

  private addBlankColumn(row:Element) {
    const emptyRow = `<td style="text-align: center;"></td>`
    row.insertAdjacentHTML('afterbegin', emptyRow);
  }

  private handleStopCheck(stop: Element) {
    const stopId = Number(stop.getAttribute('data-stop'));

    if (!this.checkedStops.includes(stopId)) {
      if (this.checkedStops.length < 2) {
        this.checkedStops.push(stopId);
        this.checkedStops.sort();
      } else if (stopId < this.checkedStops[1]) {
        this.checkedStops[0] = stopId;
      } else if (stopId > this.checkedStops[1]) {
        this.checkedStops[1] = stopId;
      }
    } else {
      const index = this.checkedStops.indexOf(stopId);
      this.checkedStops.splice(index, 1);
    }

    this.updateCheckboxes();
  }

  private updateCheckboxes() {
    const stopCheckboxes = document.querySelectorAll('input.stopChbx') as NodeListOf<HTMLInputElement>;

    Array.from(stopCheckboxes).forEach((chbx) => {
      let stopId = Number(chbx.getAttribute('data-stop'));
      if (!this.checkedStops.includes(stopId))
         chbx.checked = false;
    });
  }

  private normalize(value: string) {
    return (value !== '') ? this.strToFloat(value) : 0;
  }

  private strToFloat(str: string) {
    const regexp = /[^0-9.]/g;
    const result = str.replace(regexp, '');
    return parseFloat(result);
  }

  private extractTextValue(parent: Element, selector: string) {
    const element = parent.querySelector(selector);
    return element ? element.textContent || '' : '';
  }
}

// Test
const tickets = new TicketAdvisor('.table.table-striped.table-bordered');
tickets.extendTable();
tickets.collectData();
console.table(tickets.getStops());
