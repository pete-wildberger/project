class Appointment {

  constructor(parentid, datetime, duration, time, date, type, notes) {
    this.id = parentid + '.' + datetime;
    this.duration = duration;
    this.time = time;
    this.date = date;
    this.mType = type;
    this.notes = {
      noteId: parentid + '$' + datetime,
      s: {
      symptoms: 'none',
      activities: 'none'
    },
      o: {
      findings: 'none',
      techniques: 'none',
      response: 'none'
    },
      a: 'none',
      p: 'none',
      spots: []
    };
  } // end constructor
}

class Notes {
  constructor(parentid, datetime, s, o, a, p, spots) {
    this.noteId = parentid + '$' + datetime;
    this.s = s;
    this.o = o;
    this.a = a;
    this.p = p;
    this.spots = spots;
  } // end constructor
}

function Dot(type, x, y) {
  return {
    type,
    x,
    y
  };
}
