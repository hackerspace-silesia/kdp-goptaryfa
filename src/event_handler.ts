import { TariffAdvisor } from './tariff_advisor';
import { DataCollector } from './data_collector';
import { InfoBox } from './info_box';

export class EventHandler {
  private stops: GopTariff.Stop[];
  private checkedStops: number[] = [];

  public init() {
    this.stops = DataCollector.perform();
  }

  public add(checkbox: Element): void {
    const stopCheck = e => this.handleStopCheck(e);

    checkbox.addEventListener('change', stopCheck.bind(this, checkbox));
  }

  private handleStopCheck(stop: Element): void {
    const stopId = Number(stop.getAttribute('data-stop'));
    let advisedTariff: GopTariff.TariffWithInfo | null = null;

    this.performCheck(stopId);
    this.updateCheckedRows();

    if (this.checkedStops.length == 2) {
      advisedTariff = TariffAdvisor.perform(this.stops, this.checkedStops);
    }

    InfoBox.removeInfoBox();
    if (advisedTariff) {
      InfoBox.showInfoBox(advisedTariff);
    }
  }

  private performCheck(stopId: number): void {
    if (!this.checkedStops.includes(stopId)) {
      if (this.checkedStops.length < 2) {
        this.checkedStops.push(stopId);
        this.checkedStops.sort(this.sortAsc);
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

  private sortAsc(a: number, b: number): number {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
  }
}
