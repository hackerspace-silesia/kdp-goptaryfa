import * as tariffs from './distance_tariff.json';
import { Tariff } from './enums';

export default class TariffAdvisor {
  public static perform(stops: GopTariff.Stop[], checkedStopsIds: number[]): GopTariff.TariffWithInfo | null {
    if (checkedStopsIds.length != 2) return null;

    const [startStopId, endStopId] = [...checkedStopsIds];

    const result = {
      time: 0,
      distance: 0,
      zones: new Set()
    };

    stops.forEach((stop) => {
      if (stop['data-stop'] >= startStopId && stop['data-stop'] <= endStopId) {
        if (stop['data-stop'] > startStopId) {
          result.time += stop.time;
          result.distance += stop.distance;
        }
        result.zones.add(stop.zone);
      }
    });
    return this.chooseTariff(result);
  }

  private static chooseTariff(result: GopTariff.Result): GopTariff.TariffWithInfo {
    const distanceTariff = tariffs.distanceTariff as GopTariff.DistanceTariff[];
    const zoneTimeTariff = tariffs.zoneTimeTariff as GopTariff.ZoneTimeTariff[];

    const distanceTariffCost = this.findTariffCost(result.distance, distanceTariff);
    const timeTariffCost = this.findTariffCost(result.time, zoneTimeTariff);
    const zones = result.zones.size;

    const zoneTariff = zoneTimeTariff.find(tariff => {
      return tariff.zones == zones;
    });

    const zoneTariffCost = zoneTariff ? zoneTariff.fare : zoneTimeTariff.slice(-1)[0].fare;
    return this.decider(timeTariffCost, zoneTariffCost, distanceTariffCost, result);
  }

  private static findTariffCost(value: number, tariffBook: GopTariff.DistanceTariff[] | GopTariff.ZoneTimeTariff[]): number {
    for (let tariff of tariffBook) {
      if (value >= tariff.start && value <= tariff.end) {
        return tariff.fare;
      }
    }
    return 9999;
  }

  private static decider(timeTariffCost: number, zoneTariffCost: number, distanceTariffCost: number, result: GopTariff.Result): GopTariff.TariffWithInfo {
    const zoneTimeTariffCost = zoneTariffCost < timeTariffCost ? zoneTariffCost : timeTariffCost;
    const resultTariff = zoneTimeTariffCost < distanceTariffCost ? Tariff.Time : Tariff.Distance;
    return { tariff: resultTariff, zoneTimeTariffCost, distanceTariffCost, travelInfo: result };
  }
}
