import { TableExtender } from './table_extender';
import * as tariff from './distance_tariff.json';

// Test
console.log(tariff);
const extender = new TableExtender('.table.table-striped.table-bordered');
extender.init();
