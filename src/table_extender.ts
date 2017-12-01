import {DataCollector} from './data_collector';

export class TableExtender {
  private timetable: Element;
  private rows: NodeListOf<Element>;
  private stops: Object[];
  private checkedStops: number[] = [];
  private clsStops = 'stopChbx';

  constructor(table: string) {
    this.timetable = document.querySelector(table) as Element;
    this.rows = this.timetable.querySelectorAll('tbody tr:not([id])');
  }

  public init(): void {
    this.extendTableHeader();
    this.extendTableBody();
    this.stops = DataCollector.perform();
    console.table(this.stops);
  }

  private extendTableHeader(): void {
    const colHeader: Element = this.timetable.querySelectorAll('thead th')[0];
    const checkboxColNotExists: boolean = !document.querySelector('#checkboxCol');
    if (checkboxColNotExists) {
      colHeader.insertAdjacentHTML('beforebegin', '<th id="checkboxCol"></th>');
    }
  }

  private extendTableBody(): void {
    const stopCheck = e => this.handleStopCheck(e);
    let checkbox: Element | null;
    let i: number = 0;

    this.rows.forEach(row => {
      if (Array.from(row.classList).includes('text-muted')) {
        this.addBlankColumn(row);
      } else {
        row.setAttribute('data-stop', `${i}`);
        row.classList.add('stop');

        this.addInputColumn(row, i);

        checkbox = document.querySelector(`input[data-stop="${i}"]`);
        if (checkbox) {
          checkbox.addEventListener('change', stopCheck.bind(this, checkbox));
        }

        const rowChildren = Array.from(row.children);
        rowChildren[3].classList.add('stopTime');
        rowChildren[4].classList.add('stopDistance');
        rowChildren[5].classList.add('stopInfo');

        i++;
      }
    });
  }

  private addInputColumn(row: Element, i: number): void {
    const inputRow = `<td style="text-align: center;">
                        <input class="${this.clsStops}" data-stop="${i}" type="checkbox" />
                      </td>`;
    row.insertAdjacentHTML('afterbegin', inputRow);
  }

  private addBlankColumn(row: Element): void {
    const emptyRow = `<td style="text-align: center;"></td>`;
    row.insertAdjacentHTML('afterbegin', emptyRow);
  }

  private handleStopCheck(stop: Element): void {
    const stopId = Number(stop.getAttribute('data-stop'));
    this.performCheck(stopId);
    this.updateCheckedRows();
    console.log(this.checkedStops);
  }

  private performCheck(stopId: number): void {
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
  }

  private updateCheckedRows(): void {
    const stopCheckboxes = document.querySelectorAll(
      'input.stopChbx'
    ) as NodeListOf<HTMLInputElement>;

    Array.from(stopCheckboxes).forEach(chbx => {
      let stopId = Number(chbx.getAttribute('data-stop'));
      if (!this.checkedStops.includes(stopId)) chbx.checked = false;
    });
  }
}
