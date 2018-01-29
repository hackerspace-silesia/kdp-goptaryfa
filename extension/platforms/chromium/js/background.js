!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.Time=0]="Time",t[t.Distance=1]="Distance"}(e.Tariff||(e.Tariff={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),new(n(2).default)(".table.table-striped.table-bordered").init()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),o=function(){function t(t){this.checkedStops=[],this.timetable=document.querySelector(t),this.rows=this.timetable.querySelectorAll("tbody tr:not([id])"),this.eventHandler=new r.default}return t.prototype.init=function(){this.extendTable()},t.prototype.extendTable=function(){!document.querySelector("#checkboxCol")&&(this.extendTableHeader(),this.extendTableBody(),this.eventHandler.init())},t.prototype.extendTableHeader=function(){this.timetable.querySelectorAll("thead th")[0].insertAdjacentHTML("beforebegin",'<th id="checkboxCol"></th>')},t.prototype.extendTableBody=function(){var t=this;this.rows.forEach(function(e,n){if(Array.from(e.classList).includes("text-muted"))t.addBlankColumn(e);else{e.setAttribute("data-stop",""+n),e.classList.add("stop"),t.addInputColumn(e,n);var r=document.querySelector('input[data-stop="'+n+'"]');r&&t.eventHandler.add(r);var o=Array.from(e.children);o[3].classList.add("stopTime"),o[4].classList.add("stopDistance"),o[5].classList.add("stopInfo")}})},t.prototype.addInputColumn=function(t,e){var n='<td style="text-align: center;">\n                        <input class="stopChbx" data-stop="'+e+'" type="checkbox" />\n                      </td>';t.insertAdjacentHTML("afterbegin",n)},t.prototype.addBlankColumn=function(t){t.insertAdjacentHTML("afterbegin",'<td style="text-align: center;"></td>')},t}();e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),o=n(6),i=n(7),a=function(){function t(){this.checkedStops=[]}return t.prototype.init=function(){this.stops=o.default.perform()},t.prototype.add=function(t){var e=this;t.addEventListener("change",function(){return e.handleStopCheck(t)})},t.prototype.handleStopCheck=function(t){var e=Number(t.getAttribute("data-stop")),n=null;this.performCheck(e),this.updateCheckedRows(),2==this.checkedStops.length&&(n=r.default.perform(this.stops,this.checkedStops)),i.default.removeInfoBox(),n&&i.default.showInfoBox(n)},t.prototype.performCheck=function(t){if(this.checkedStops.includes(t)){var e=this.checkedStops.indexOf(t);this.checkedStops.splice(e,1)}else this.checkedStops.length<2?(this.checkedStops.push(t),this.checkedStops.sort(this.sortAsc)):t<this.checkedStops[1]?this.checkedStops[0]=t:t>this.checkedStops[1]&&(this.checkedStops[1]=t)},t.prototype.updateCheckedRows=function(){var t=this,e=document.querySelectorAll("input.stopChbx");Array.from(e).forEach(function(e){var n=Number(e.getAttribute("data-stop"));t.checkedStops.includes(n)||(e.checked=!1)})},t.prototype.sortAsc=function(t,e){return t>e?1:t<e?-1:0},t}();e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(5),o=n(0),i=function(){function t(){}return t.perform=function(t,e){if(2!=e.length)return null;var n=e.slice(),r=n[0],o=n[1],i={time:0,distance:0,zones:new Set};return t.forEach(function(t){t["data-stop"]>=r&&t["data-stop"]<=o&&(t["data-stop"]>r&&(i.time+=t.time,i.distance+=t.distance),i.zones.add(t.zone))}),this.chooseTariff(i)},t.chooseTariff=function(t){var e=r.distanceTariff,n=r.zoneTimeTariff,o=this.findTariffCost(t.distance,e),i=this.findTariffCost(t.time,n),a=t.zones.size,s=n.find(function(t){return t.zones==a}),c=s?s.fare:n.slice(-1)[0].fare;return this.decider(i,c,o,t)},t.findTariffCost=function(t,e){for(var n=0,r=e;n<r.length;n++){var o=r[n];if(t>=o.start&&t<=o.end)return o.fare}return 9999},t.decider=function(t,e,n,r){var i=e<t?e:t;return{tariff:i<n?o.Tariff.Time:o.Tariff.Distance,zoneTimeTariffCost:i,distanceTariffCost:n,travelInfo:r}},t}();e.default=i},function(t,e){t.exports={zoneTimeTariff:[{start:0,end:20,fare:3,zones:1},{start:20,end:40,fare:3.6,zones:2},{start:40,end:999999999,fare:4.4,zones:999999999}],distanceTariff:[{start:0,end:1,fare:2.2},{start:1,end:2,fare:2.8},{start:2,end:5,fare:3.1},{start:5,end:9,fare:3.7},{start:9,end:14,fare:4.2},{start:14,end:20,fare:4.4},{start:20,end:999999999,fare:4.6}]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.perform=function(){var t,e=this,n={"data-stop":0,zone:0,distance:0,time:0},r=[],o=1;return document.querySelectorAll(".stop").forEach(function(i){n["data-stop"]=Number(i.getAttribute("data-stop")),n.zone=o,t=e.extractTextValue(i,".stopDistance small"),n.distance=e.normalize(t),t=e.extractTextValue(i,".stopTime small"),n.time=e.normalize(t),(t=e.extractTextValue(i,".stopInfo")).match(/Strefowy/)&&o++,r=r.concat([Object.assign({},n)])}),r},t.normalize=function(t){return""!==t?this.strToFloat(t):0},t.strToFloat=function(t){var e=t.replace(/[^0-9.]/g,"");return parseFloat(e)},t.extractTextValue=function(t,e){var n=t.querySelector(e);return n&&n.textContent||""},t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=function(){function t(){}return t.showInfoBox=function(t){var e=document.querySelector(".info.stop"),n=this.prepareInfoBox(t);e.insertAdjacentHTML("beforebegin",n)},t.removeInfoBox=function(){var t=document.querySelector("#adviseInfo");t&&t.parentNode.removeChild(t)},t.prepareInfoBox=function(t){var e,n,o="http://www.kzkgop.com.pl/strony/p-1-cennik-od-1012018-r.html",i=t.zoneTimeTariffCost.toFixed(2),a=t.distanceTariffCost.toFixed(2),s=t.travelInfo.zones.size,c=1==s?"miasta (gminy)":"miast (gmin)";return t.tariff==r.Tariff.Time?(e="czasowo-strefowej",n=i):(e="odległościowej",n=a),'<tr id="adviseInfo" style="background-color: #98FB98; font-size: 1.2em;"><td colspan="6">'+(i==a?"Skorzystaj z biletu w cenie <strong>"+n+" zł.</strong> Koszt biletu jest identyczny w obu taryfach.<br/><br>":"Skorzystaj z biletu w taryfie <strong>"+e+"</strong> w cenie <strong>"+n+" zł.</strong><br/><br/>")+("Twoja podróż będzie trwała "+t.travelInfo.time+" min. Przebędziesz "+t.travelInfo.distance.toFixed(2)+" km na terenie "+s+" "+c+".<br/>")+('Cena biletu w <a href="'+o+'">taryfie odległościowej</a> to '+a+' zł.<br/>Cena biletu w <a href="'+o+'">taryfie strefowo-czasowej</a> to '+i+" zł.<br/>")+"</td></tr>"},t}();e.default=o}]);