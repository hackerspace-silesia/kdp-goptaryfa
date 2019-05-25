import { Tariff } from './enums';

export default class InfoBox {
  public static showInfoBox(travelInfo: GopTariff.TariffWithInfo): void {
    const infoRow = document.querySelector('.info.stop') as Element;
    const infoBox = this.prepareInfoBox(travelInfo);
    infoRow.insertAdjacentHTML('beforebegin', infoBox);
  }

  public static removeInfoBox(): void {
    const infoBox = document.querySelector('#adviseInfo') as Element;
    if (infoBox) {
      const parentNode = infoBox.parentNode as Node;
      parentNode.removeChild(infoBox);
    }
  }

  private static prepareInfoBox(travel: GopTariff.TariffWithInfo): string {
    const tariffUrl = 'https://www.metropoliaztm.pl/pl/s/cennik';
    const timeTicketPrice = travel.zoneTimeTariffCost.toFixed(2);
    const distanceTicketPrice = travel.distanceTariffCost.toFixed(2);
    const zoneCount = travel.travelInfo.zones.size;
    const zonesInfo = zoneCount == 1 ? 'miasta (gminy)' : 'miast (gmin)';
    let ticketType, price, adviseInfo: string;

    if (travel.tariff == Tariff.Time) {
      ticketType = 'czasowo-strefowej';
      price = timeTicketPrice;
    } else {
      ticketType = 'odległościowej';
      price = distanceTicketPrice;
    }

    if (timeTicketPrice == distanceTicketPrice) {
      adviseInfo = `Skorzystaj z biletu w cenie <strong>${price} zł.</strong> Koszt biletu jest identyczny w obu taryfach.<br/><br>`;
    } else {
      adviseInfo = `Skorzystaj z biletu w taryfie <strong>${ticketType}</strong> w cenie <strong>${price} zł.</strong><br/><br/>`;
    }

    const defaultInfo = `Twoja podróż będzie trwała ${travel.travelInfo.time} min. Przebędziesz ${travel.travelInfo.distance.toFixed(2)} km na terenie ${zoneCount} ${zonesInfo}.<br/>`
    const ticketInfo = `Cena biletu w <a href="${tariffUrl}">taryfie odległościowej</a> to ${distanceTicketPrice} zł.<br/>Cena biletu w <a href="${tariffUrl}">taryfie strefowo-czasowej</a> to ${timeTicketPrice} zł.<br/>`

    return `<tr id="adviseInfo" style="background-color: #98FB98; font-size: 1.2em;"><td colspan="6">${adviseInfo}${defaultInfo}${ticketInfo}</td></tr>`
  }
}
