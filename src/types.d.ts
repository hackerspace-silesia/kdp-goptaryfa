declare module "*.json" {
  export const zoneTimeTariff;
  export const distanceTariff;
}

declare module GopTariff {
  interface Stop {
    "data-stop": number;
    zone: number;
    distance: number;
    time: number;
  }

  interface TariffWithInfo {
    tariff: any;
    zoneTimeTariffCost: number;
    distanceTariffCost: number;
    travelInfo: Result;
  }

  interface Result {
    time: number;
    distance: number;
    zones: Set<number>;
  }

  interface ZoneTimeTariff {
    start: number;
    end: number;
    zones: number;
    fare: number;
  }

  interface DistanceTariff {
    start: number;
    end: number;
    fare: number;
  }

  interface TariffBook {
    zoneTimeTariff: ZoneTimeTariff[];
    distanceTariff: DistanceTariff[];
  }
}
