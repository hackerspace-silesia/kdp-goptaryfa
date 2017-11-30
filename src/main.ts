import { TicketAdvisor } from './ticket_advisor';
import * as tariff from './distance_tariff.json';

// Test
console.log(tariff);
const tickets = new TicketAdvisor('.table.table-striped.table-bordered');
tickets.extendTable();
tickets.collectData();
console.table(tickets.getStops());