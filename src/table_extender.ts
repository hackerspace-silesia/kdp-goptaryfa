import { EventHandler } from './event_handler';

export class TableExtender {
  private timetable: Element;
  private rows: NodeListOf<Element>;
  private checkedStops: number[] = [];
  private eventHandler: EventHandler;

  constructor(table: string) {
    this.timetable = document.querySelector(table) as Element;
    this.rows = this.timetable.querySelectorAll('tbody tr:not([id])');
    this.eventHandler = new EventHandler();
  }

  public init(): void {
    this.extendTable();
  }

  private extendTable(): void {
    const checkboxColNotExists: boolean = !document.querySelector('#checkboxCol');
    if (checkboxColNotExists) {
      this.extendTableHeader();
      this.extendTableBody();
      this.eventHandler.init();
    }
  }

  private extendTableHeader(): void {
    const colHeader: Element = this.timetable.querySelectorAll('thead th')[0];
    colHeader.insertAdjacentHTML('beforebegin', '<th id="checkboxCol"></th>');
  }

  private extendTableBody(): void {
    this.rows.forEach((row, i) => {
      if (Array.from(row.classList).includes('text-muted')) {
        this.addBlankColumn(row);
      } else {
        row.setAttribute('data-stop', `${i}`);
        row.classList.add('stop');

        this.addInputColumn(row, i);

        const checkbox = document.querySelector(`input[data-stop="${i}"]`);
        if (checkbox) this.eventHandler.add(checkbox);

        const rowChildren = Array.from(row.children);
        rowChildren[3].classList.add('stopTime');
        rowChildren[4].classList.add('stopDistance');
        rowChildren[5].classList.add('stopInfo');
      }
    });
  }

  private addInputColumn(row: Element, i: number): void {
    const inputRow = `<td style="text-align: center;">
                        <input class="stopChbx" data-stop="${i}" type="checkbox" />
                      </td>`;
    row.insertAdjacentHTML('afterbegin', inputRow);
  }

  private addBlankColumn(row: Element): void {
    const emptyRow = `<td style="text-align: center;"></td>`;
    row.insertAdjacentHTML('afterbegin', emptyRow);
  }
}
