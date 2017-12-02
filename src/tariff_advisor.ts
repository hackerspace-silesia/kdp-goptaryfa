import { Stop } from './data_collector';
import * as tariffs from './distance_tariff.json';
import { distanceTariff } from './distance_tariff.json';

export enum Tariff {
  Time,
  Distance
}

export interface TariffWithInfo {
  tariff: Tariff;
  zoneTimeTariffCost: number;
  distanceTariffCost: number;
  travelInfo: Result;
}

export interface Result {
  time: number;
  distance: number;
  zones: Set<number>;
}

export interface ZoneTimeTariff {
  start: number;
  end: number;
  zones: number;
  fare: number;
}

export interface DistanceTariff {
  start: number;
  end: number;
  fare: number;
}

export interface TariffBook {
  zoneTimeTariff: ZoneTimeTariff[];
  distanceTariff: DistanceTariff[];
}

export class TariffAdvisor {
  public static perform(stops: Stop[], checkedStopsIds: number[]): TariffWithInfo | null {
    if (checkedStopsIds.length != 2) return null;

    const [startStopId, endStopId] = [...checkedStopsIds];
    const result = {
      time: 0,
      distance: 0,
      zones: new Set()
    };
    const chosenStops = stops.filter(stop => {
      return (stop['data-stop'] >= startStopId && stop['data-stop'] <= endStopId)

    });
    chosenStops.forEach(stop => {
      result.time += stop.time;
      result.distance += stop.distance;
      result.zones.add(stop.zone);
    });

    console.table(result);
    return this.advise(result);
  }

  private static advise(result: Result): TariffWithInfo {
    const distanceTariff = tariffs.distanceTariff as DistanceTariff[];
    const zoneTimeTariff = tariffs.zoneTimeTariff as ZoneTimeTariff[];

    const distanceTariffCost = this.findTariffCost(result.distance, distanceTariff);
    const timeTariffCost = this.findTariffCost(result.time, zoneTimeTariff);
    const zones = result.zones.size;
    
    const zoneTariff = zoneTimeTariff.find(tariff => {
      return tariff.zones == zones;
    });

    const zoneTariffCost = zoneTariff ? zoneTariff.fare : zoneTimeTariff.slice(-1)[0].fare;
    return this.decider(timeTariffCost, zoneTariffCost, distanceTariffCost, result);
  }

  private static findTariffCost(value: number, tariffBook: DistanceTariff[] | ZoneTimeTariff[]): number {
    for (let tariff of tariffBook) {
      if (value >= tariff.start && value <= tariff.end) {
        return tariff.fare;
      }
    }
    return 9999;
  }

  private static decider(timeTariffCost: number, zoneTariffCost: number, distanceTariffCost: number, result: Result): TariffWithInfo {
    const zoneTimeTariffCost = zoneTariffCost < timeTariffCost ? zoneTariffCost : timeTariffCost;
    const resultTariff = zoneTimeTariffCost < timeTariffCost ? Tariff.Time : Tariff.Distance;
    return {tariff: resultTariff, zoneTimeTariffCost, distanceTariffCost, travelInfo: result};
  }
}
