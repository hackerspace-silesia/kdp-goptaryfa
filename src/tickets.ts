export class TicketAdvisor {
  private table: JQuery<HTMLElement>;
  private headerRow: JQuery<HTMLElement>;
  private rows: JQuery<HTMLElement>;
  private stops: any[];
  private cells: any;
  constructor(timetable) {
    this.table = $(timetable);
    this.headerRow = this.table.find('thead > tr');
    this.rows = this.table.find('tbody > tr');
    this.stops = [];
    this.cells = [];
  }
  public distanceValidator(distance) {
    return (distance !== 'b.d.') ? parseFloat(distance.replace(' km', '')) : 'b.d.';
  }

  public timeToSeconds(time) {
    time = time.split(/:/);
    return time[0] * 3600 + time[1] * 60;
  }

  public timeToMinutes(time) {
    time = time.split(/:/);
    return parseInt(time[0], 10) * 60 + parseInt(time[1], 10);
  }

  public advise(clsStops, idString) {
    const taryfaStrefowoCzasowa = [
      {
        czasStart: 0,
        czasEnd: 15,
        cena: 3.10,
      },
      {
        czasStart: 15,
        czasEnd: 30,
        cena: 3.70,
      },
      {
        czasStart: 30,
        czasEnd: 999999999,
        cena: 4.60,
      },
    ];

    const taryfaOdleglosciowa = [
      {
        kmStart: 0,
        kmEnd: 1,
        cena: 2.20,
      },
      {
        kmStart: 1,
        kmEnd: 2,
        cena: 2.80,
      },
      {
        kmStart: 2,
        kmEnd: 5,
        cena: 3.10,
      },
      {
        kmStart: 5,
        kmEnd: 9,
        cena: 3.70,
      },
      {
        kmStart: 9,
        kmEnd: 14,
        cena: 4.20,
      },
      {
        kmStart: 14,
        kmEnd: 20,
        cena: 4.40,
      },
      {
        kmStart: 20,
        kmEnd: 999999999,
        cena: 4.60,
      },
    ];

    const stops = $('.' + clsStops + ':checked');
    if (stops.length === 2) {
      const stop1 = $(stops[0]);
      const stop2 = $(stops[1]);

      const id1 = stop1.attr('id');
      const idx1 = parseInt(id1.replace(idString, ''), 10);

      const id2 = stop2.attr('id');
      const idx2 = parseInt(id2.replace(idString, ''), 10);

      // console.log(idx1 + ' :: ' + idx2);
      // oblicz roznice czasowa w minutach miedzy wybranymi przystankami
      const timeDiffMinutes = this.stops[idx2].time - this.stops[idx1].time;
      // console.log(timeDiffMinutes);

      // oblicz odleglosc miedzy wybranymi przystankami
      let distDiffKms = 0;
      let dist;
      let i;
      for (i = idx1 + 1; i <= idx2; i++) {
        dist = this.stops[i].distance;
        if (dist === 'b.d.') {
          distDiffKms = 0;
          break;
        }
        distDiffKms += dist;
      }
      const distDiffStr = distDiffKms ? distDiffKms.toFixed(2) : '?';

      let msg = 'Różnica: ' + timeDiffMinutes + ' min., ' + distDiffStr + ' km';

      if (distDiffKms) {
        // okresl cene biletu w strefie czasowo-strefowej i odleglosciowej...
        let cenaStrefCzas = 0;
        for (i = 0; i <= taryfaStrefowoCzasowa.length - 1; i++) {
          if (timeDiffMinutes > taryfaStrefowoCzasowa[i].czasStart &&
            timeDiffMinutes <= taryfaStrefowoCzasowa[i].czasEnd) {
            cenaStrefCzas = taryfaStrefowoCzasowa[i].cena;
          }
        }

        let cenaOdleglosc = 0;
        for (i = 0; i <= taryfaOdleglosciowa.length - 1; i++) {
          /*console.log('kmStart: ' + taryfaOdleglosciowa[i].kmStart + ' ' +
                      'kmEnd: ' + taryfaOdleglosciowa[i].kmEnd + ' ' +
                      'cena: ' + taryfaOdleglosciowa[i].cena);*/
          if (distDiffKms > taryfaOdleglosciowa[i].kmStart &&
            distDiffKms <= taryfaOdleglosciowa[i].kmEnd) {
            cenaOdleglosc = taryfaOdleglosciowa[i].cena;
          }
        }
        // ... a potem je porownaj i wygeneruj komunikat
        // tslint:disable-next-line:max-line-length
        msg += '<br/><a href="http://www.kzkgop.com.pl/strony/p-1-cennik-oplat.html">Bilet</a> jednorazowy w ŚKUP czasowo-strefowy: ' + cenaStrefCzas.toFixed(2) + ' zł.';
        msg += '<br/><a href="http://www.kzkgop.com.pl/strony/p-1-cennik-oplat.html">Bilet</a> jednorazowy w ŚKUP odległościowy: ' + cenaOdleglosc.toFixed(2) + ' zł.';
        if (cenaStrefCzas < cenaOdleglosc) {
          msg += '<br/>Kup bilet <b>czasowo-strefowy</b>!';
        } else if (cenaStrefCzas > cenaOdleglosc) {
          msg += '<br/>Kup bilet <b>odległościowy</b>!';
        } else {
          msg += '<br/>Ceny identyczne! Kup jakikolwiek bilet w powyższej cenie.';
        }
      }

      this.showMessage(msg);

    } else {
      this.showMessage('&nbsp;');
    }
  }

  private extendTable() {
    const idString = 'chbox_stop_id';
    const clsStops = 'chbox_stops';

    let rowInput;
    $('<th>Zaznacz 2</th>').prependTo(this.headerRow);
    for (let i = 0; i < this.rows.length; i++) {
      rowInput = `
        <td style="text-align: center;">
          <input class="${clsStops}" id="${idString}${i}" type="checkbox">
        </td>
      `;
      $(rowInput).prependTo(this.rows[i]);
    }

    // zrob placeholder
    this.showMessage('&nbsp;');

    const that = this;
    $('.chbox_stops').click((e) => {
      const id = $(this).attr('id');
      const idx = id.replace(idString, '');

      that.advise(clsStops, idString);
    });
  }
  private collectData() {
    let data: any = {};
    let time;
    let distance;
    for (let i = 0; i < this.rows.length; i++) {
      data = {};
      this.cells = $(this.rows[i]).children();
      distance = this.cells[2].innerHTML;
      time = $(this.cells[3]).find('a')[0].innerHTML;

      data.distance = this.distanceValidator(distance);
      data.time = this.timeToMinutes(time);
      this.stops[i] = data;
    }
  }

  private showMessage(msg) {
    const divTabel = $('#div_tabelka');
    const idMessage = 'id_message';
    const elMessage = $('#' + idMessage);

    if (elMessage.length === 0) {
      $(`<div id="${idMessage}"><h3>${msg}</h3></div>`).prependTo(divTabel);
    } else {
      elMessage.html(`<h3>${msg}</h3>`);
    }
  }
}


// ---------------------------------------------------------------------

const tickets = new TicketAdvisor('table');
