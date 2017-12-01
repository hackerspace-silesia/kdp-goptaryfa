import { Stop } from './data_collector';

export enum Tariff {
    Time,
    Distance
}

export interface Result {
    time: number;
    distance: number;
    zones: Set<number>;
}

export class TariffAdvisor {
    public static perform(stops: Stop[], checkedStopsIds: number[], tariff: Object): Tariff | null {
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

        return Tariff.Time;
    }
}
