function TicketAdvisor (timetable) {
  this.table = $(timetable);
  this.header_row = this.table.find('thead > tr');
  this.rows = this.table.find('tbody > tr');
  this.stops = [];
  this.cells = [];
}

TicketAdvisor.prototype.distanceValidator = function(distance) {
  return (distance !== 'b.d.') ? parseFloat(distance.replace(" km", "")) : 'b.d.';
};

TicketAdvisor.prototype.timeToSeconds = function(time) {
  time = time.split(/:/);
  return time[0] * 3600 + time[1] * 60;
};

TicketAdvisor.prototype.timeToMinutes = function(time) {
  time = time.split(/:/);
  return parseInt(time[0]) * 60 + parseInt(time[1]);
};

TicketAdvisor.prototype.advise = function(cls_stops, id_string) {
  var taryfaStrefowoCzasowa = [
	{
	  czasStart: 0,
	  czasEnd:   15,
	  cena:      3.10
	},
	{
	  czasStart: 15,
	  czasEnd:   30,
	  cena:      3.70
	},
	{
	  czasStart: 30,
	  czasEnd:   999999999,
	  cena:      4.60
	}
  ];
  
  var taryfaOdleglosciowa = [
    {
	  kmStart: 0,
	  kmEnd:   1,
	  cena:    2.20
	},
    {
	  kmStart: 1,
	  kmEnd:   2,
	  cena:    2.80
	},
    {
	  kmStart: 2,
	  kmEnd:   5,
	  cena:    3.10
	},
    {
	  kmStart: 5,
	  kmEnd:   9,
	  cena:    3.70
	},
    {
	  kmStart:  9,
	  kmEnd:   14,
	  cena:     4.20
	},
    {
	  kmStart: 14,
	  kmEnd:   20,
	  cena:    4.40
	},
    {
	  kmStart: 20,
	  kmEnd:   999999999,
	  cena:    4.60
	}
  ];
  
  var stops = $('.' + cls_stops + ':checked');
  if (stops.length == 2) {
	var stop1 = $(stops[0]);
	var stop2 = $(stops[1]);
	
    var id1  = stop1.attr('id');
	var idx1 = parseInt(id1.replace(id_string, ''));
	
    var id2  = stop2.attr('id');
	var idx2 = parseInt(id2.replace(id_string, ''));
	
	//console.log(idx1 + ' :: ' + idx2);
	// oblicz roznice czasowa w minutach miedzy wybranymi przystankami
	var timeDiffMinutes = this.stops[idx2].time - this.stops[idx1].time;
	//console.log(timeDiffMinutes);
	
	// oblicz odleglosc miedzy wybranymi przystankami
	var distDiffKms = 0;
	var dist;
	var i;
	for (i = idx1 + 1; i <= idx2; i++) {
	  dist = this.stops[i].distance;
	  if (dist == 'b.d.') {
	    distDiffKms = 0;
		break;
	  }
	  distDiffKms += dist;
	}
	distDiffStr = distDiffKms ? distDiffKms.toFixed(2) : '?';
	
	var msg = 'Różnica: ' + timeDiffMinutes + ' min., ' + distDiffStr + ' km';
	
	if (distDiffKms) {
	  // okresl cene biletu w strefie czasowo-strefowej i odleglosciowej...
	  var cenaStrefCzas = 0;
	  //console.log(taryfaStrefowoCzasowa.length);
	  for (i = 0; i <= taryfaStrefowoCzasowa.length - 1; i++) {
		/*console.log('czStart: ' + taryfaStrefowoCzasowa[i].czasStart + ' ' +
		            'czEnd: ' + taryfaStrefowoCzasowa[i].czasEnd + ' ' +
		            'cena: ' + taryfaStrefowoCzasowa[i].cena);*/
	    if (timeDiffMinutes >  taryfaStrefowoCzasowa[i].czasStart &&
	        timeDiffMinutes <= taryfaStrefowoCzasowa[i].czasEnd) {
		  cenaStrefCzas = taryfaStrefowoCzasowa[i].cena;
		}
	  }
	  
	  var cenaOdleglosc = 0;
	  //console.log(taryfaOdleglosciowa.length);
	  for (i = 0; i <= taryfaOdleglosciowa.length - 1; i++) {
		/*console.log('kmStart: ' + taryfaOdleglosciowa[i].kmStart + ' ' +
		            'kmEnd: ' + taryfaOdleglosciowa[i].kmEnd + ' ' +
		            'cena: ' + taryfaOdleglosciowa[i].cena);*/
	    if (distDiffKms >  taryfaOdleglosciowa[i].kmStart &&
	        distDiffKms <= taryfaOdleglosciowa[i].kmEnd) {
		  cenaOdleglosc = taryfaOdleglosciowa[i].cena;
		}
	  }	  
	  // ... a potem je porownaj i wygeneruj komunikat
	  msg += '<br/><a href="http://www.kzkgop.com.pl/strony/p-1-cennik-oplat.html">Bilet</a> jednorazowy w ŚKUP czasowo-strefowy: ' + cenaStrefCzas.toFixed(2) + ' zł.';
	  msg += '<br/><a href="http://www.kzkgop.com.pl/strony/p-1-cennik-oplat.html">Bilet</a> jednorazowy w ŚKUP odległościowy: '    + cenaOdleglosc.toFixed(2) + ' zł.';
	  if (cenaStrefCzas < cenaOdleglosc) {
	    msg += '<br/>Kup bilet <b>czasowo-strefowy</b>!';
	  } else if(cenaStrefCzas > cenaOdleglosc) {
	    msg += '<br/>Kup bilet <b>odległościowy</b>!';
	  } else {
		msg += '<br/>Ceny identyczne! Kup jakikolwiek bilet w powyższej cenie.';
	  }
	}
	
	this.showMessage(msg);
	
  } else {
	this.showMessage('&nbsp;');
  }
};

TicketAdvisor.prototype.extendTable = function() {
  var id_string = 'chbox_stop_id';
  var cls_stops = 'chbox_stops';
  
  var rowInput;
  $('<th>Zaznacz 2</th>').prependTo(this.header_row);
  for (var i = 0; i < this.rows.length; i++) {
    rowInput = "<td style=\"text-align: center;\">" +
			   "<input class=\"" + cls_stops + "\" id=\"" + id_string + i +
			   "\" type=\"checkbox\"></td>";
    $(rowInput).prependTo(this.rows[i]);
  }
  
  // zrob placeholder
  this.showMessage('&nbsp;');
  
  var that = this; 
  $('.chbox_stops').click(function(e) {
    var id  = $(this).attr('id');
	var idx = id.replace(id_string, '');
	//console.log(idx);
	//e.preventDefault();
	
	that.advise(cls_stops, id_string);
  });
};

TicketAdvisor.prototype.collectData = function() {
  var data = {};
  var time;
  var distance;
  for (var i = 0; i < this.rows.length; i++) {
    data = {};
    this.cells = $(this.rows[i]).children();
    distance = this.cells[2].innerHTML;
    time = $(this.cells[3]).find('a')[0].innerHTML;

    data.distance = this.distanceValidator(distance);
    data.time = this.timeToMinutes(time);
    this.stops[i] = data;
  }
};

TicketAdvisor.prototype.showMessage = function(msg) {
  var div_tabelka = $('#div_tabelka');
  var id_message  = 'id_message';
  var el_message  = $('#' + id_message);
  
  if (el_message.length == 0) {
    $('<div id="' + id_message + '"><h3>' + msg + '</h3></div>').prependTo(div_tabelka);
  } else {
    el_message.html('<h3>' + msg + '</h3>');
  }
};

// ---------------------------------------------------------------------
var tickets = new TicketAdvisor('table');
tickets.collectData();
tickets.extendTable();
