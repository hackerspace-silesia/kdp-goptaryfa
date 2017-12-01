export class DataCollector {
  public static perform(): Object[] {
    const data: Object = {};
    const stopRows: NodeListOf<Element> = document.querySelectorAll('.stop');
    let stops: Object[] = [];
    let text: string;
    let zone: number = 1;

    stopRows.forEach(stop => {
      data['data-stop'] = Number(stop.getAttribute('data-stop'));
      data['zone'] = zone;

      text = this.extractTextValue(stop, '.stopDistance small');
      data['distance'] = this.normalize(text);

      text = this.extractTextValue(stop, '.stopTime small');
      data['time'] = this.normalize(text);

      text = this.extractTextValue(stop, '.stopInfo');

      if (text.match(/Strefowy/)) {
        zone++;
      }

      stops = [...stops, Object.assign({}, data)];
    });

    return stops;
  }

  private static normalize(value: string): number {
    return value !== '' ? this.strToFloat(value) : 0;
  }

  private static strToFloat(str: string): number {
    const regexp: RegExp = /[^0-9.]/g;
    const result: string = str.replace(regexp, '');
    return parseFloat(result);
  }

  private static extractTextValue(parent: Element, selector: string): string {
    const element: Element | null = parent.querySelector(selector);
    return element ? element.textContent || '' : '';
  }
}
