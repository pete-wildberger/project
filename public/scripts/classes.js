class Appointment {

  constructor(duration, time, date, type) {
    this.duration = duration;
    this.time = time;
    this.date = date;
    this.mType = type;
    this.notes = {};
  } // end constructor
}

class Notes {
  constructor(s, o, a, p) {
    this.s = s;
    this.o = o;
    this.a = a;
    this.p = p;
    this.spots = [];
  } // end constructor
}

function Dot(x, y, sym) {
    return {
      x,
      y,
      sym
    };
  }
