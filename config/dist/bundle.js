/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TicketAdvisor = (function () {
    function TicketAdvisor(timetable) {
        this.clsStops = 'stopChbx';
        this.timeClass = 'stopTime';
        this.distanceClass = 'stopDistance';
        this.infoClass = 'stopInfo';
        this.timetable = $(timetable);
        this.rows = this.timetable.find('tbody tr:not([id])');
        this.stops = [];
    }
    TicketAdvisor.prototype.extendTableHeader = function () {
        var colHeader = this.timetable.find('thead th').first();
        var checkboxHeader = $('<th></th>');
        colHeader.before(checkboxHeader);
    };
    TicketAdvisor.prototype.extendTableBody = function () {
        var idString = 'stopId';
        var rowInput;
        var stopRow;
        var i = 0;
        for (; i < this.rows.length; i++) {
            // add checkbox
            rowInput = $('<td style="text-align: center;">' +
                '<input class="' + this.clsStops + '" id="' + idString + i +
                '" type="checkbox"></td>');
            stopRow = $(this.rows[i]);
            stopRow.data('id', i);
            stopRow.addClass('stop');
            $(rowInput).prependTo(stopRow);
            // add time class
            stopRow.find('td:nth-child(4)').addClass(this.timeClass);
            // add distance class
            stopRow.find('td:nth-child(5)').addClass(this.distanceClass);
            // add info class
            stopRow.find('td:nth-child(6)').addClass(this.infoClass);
        }
    };
    TicketAdvisor.prototype.extendTable = function () {
        this.extendTableHeader();
        this.extendTableBody();
    };
    TicketAdvisor.prototype.strToFloat = function (str) {
        var regexp = /[^0-9.]/g;
        var result = str.replace(regexp, '');
        return parseFloat(result);
    };
    TicketAdvisor.prototype.collectData = function () {
        var data = null;
        var stops = $('.stop');
        var tempString = '';
        var i = 0;
        var zone = 1;
        for (; i < stops.length; i++) {
            data = {};
            data['id'] = $(stops[i]).data('id');
            data['zone'] = zone;
            tempString = $(stops[i]).find('.' + this.distanceClass + ' small').text();
            data['distance'] = this.normalize(tempString);
            tempString = $(stops[i]).find('.' + this.timeClass + ' small').text();
            data['time'] = this.normalize(tempString);
            tempString = $(stops[i]).find('.' + this.infoClass).text();
            if (tempString.match(/Strefowy/)) {
                zone++;
            }
            this.stops.push(data);
        }
    };
    TicketAdvisor.prototype.getStops = function () {
        return this.stops;
    };
    TicketAdvisor.prototype.normalize = function (value) {
        return (value !== '') ? this.strToFloat(value) : 0;
    };
    return TicketAdvisor;
}());
exports.TicketAdvisor = TicketAdvisor;
// ---------------------------------------------------------------------
var tickets = new TicketAdvisor('table');
tickets.extendTable();
tickets.collectData();
console.table(this.getStops());


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map