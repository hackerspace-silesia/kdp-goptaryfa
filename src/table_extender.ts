import { DataCollector } from './data_collector';
import { TariffAdvisor } from './tariff_advisor';
import { distanceTariff } from '*.json';
import { Tariff } from './enums';

export class TableExtender {
  private timetable: Element;
  private rows: NodeListOf<Element>;
  private stops: GopTariff.Stop[];
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

    this.rows.forEach((row, i) => {
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
    let advisedTariff: GopTariff.TariffWithInfo | null = null;

    this.performCheck(stopId);
    this.updateCheckedRows();

    if (this.checkedStops.length == 2) {
      advisedTariff = TariffAdvisor.perform(this.stops, this.checkedStops);
    }

    this.removeInfoBox();
    if (advisedTariff) {
      this.showInfoBox(advisedTariff);
    }
  }

  private performCheck(stopId: number): void {
    if (!this.checkedStops.includes(stopId)) {
      if (this.checkedStops.length < 2) {
        this.checkedStops.push(stopId);
        this.checkedStops.sort((a: number, b: number): number => { 
            if (a > b) {
              return 1;
            } else if (a < b) {
              return -1;
            } else {
              return 0;
            }
        });
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

  private showInfoBox(travelInfo: GopTariff.TariffWithInfo): void {
    const infoRow = document.querySelector('.info.stop') as Element;
    const infoBox = this.prepareInfoBox(travelInfo);
    infoRow.insertAdjacentHTML('beforebegin', infoBox);
  }

  private removeInfoBox(): void {
    const infoBox = document.querySelector('#adviseInfo') as Element;
    if (infoBox) {
      const parentNode = infoBox.parentNode as Node;
      parentNode.removeChild(infoBox);
    }
  }

  private prepareInfoBox(travel: GopTariff.TariffWithInfo): string {
    const tariffUrl = 'http://www.kzkgop.com.pl/strony/p-1-cennik-oplat.html';
    let ticketType, price, adviseInfo: string;
    const timeTicketPrice = travel.zoneTimeTariffCost.toFixed(2);
    const distanceTicketPrice = travel.distanceTariffCost.toFixed(2);
    if (travel.tariff == Tariff.Time) {
      ticketType = 'czasowo-strefowej';
      price = timeTicketPrice; 
    } else {
      ticketType = 'odległościowej';
      price = distanceTicketPrice;
    }
    const zoneCount = travel.travelInfo.zones.size;
    const zonesInfo = zoneCount == 1 ? 'miasta (gminy)' : 'miast (gmin)';
    if (timeTicketPrice == distanceTicketPrice) {
      adviseInfo = `Skorzystaj z biletu w cenie <strong>${price} zł.</strong> Koszt biletu jest identyczny w obu taryfach.<br/><br>`;
    } else {
      adviseInfo = `Skorzystaj z biletu w taryfie <strong>${ticketType}</strong> w cenie <strong>${price} zł.</strong><br/><br/>`;
    }
    
    const defaultInfo = `Twoja podróż będzie trwała ${travel.travelInfo.time} min. Przebędziesz ${travel.travelInfo.distance.toFixed(2)} km na terenie ${zoneCount} ${zonesInfo}.<br/>`
    const ticketInfo = `Cena biletu w <a href="${tariffUrl}">taryfie odległościowej</a> to ${distanceTicketPrice} zł.<br/>Cena biletu w <a href="${tariffUrl}">taryfie czasowo-strefowej</a> to ${timeTicketPrice} zł.<br/>`

    return `<tr id="adviseInfo" style="background-color: #98FB98; font-size: 1.2em;"><td colspan="6">${adviseInfo}${defaultInfo}${ticketInfo}</td></tr>`
  }
}
