app.controller('NotesController', function($location, $filter, httpService) {
  console.log('NotesController');
  const vm = this;
  vm.patient = httpService.currentPat[0];
  vm.appointment = httpService.currentApp;
  vm.displayed = vm.appointment[0];
  console.log('display', vm.displayed);
  vm.notes = vm.appointment[0].notes;
  console.log('note con', vm.notes);
  vm.arrToSend = [];
  console.log('arrtosend: ', vm.arrToSend);
  vm.images = httpService.imageArr;

  window.onclick = function(event) {
    id = event.target.getAttribute("id");
    if (event.target.getAttribute("class") == 'modal') {
      document.getElementById(id).style.display = 'none';
    }
  };

  vm.findXY = function(event) {
    vm.x = event.clientX;
    vm.y = event.clientY;
  };

  vm.coords = function() {
    makeCircle(vm.painType, vm.x, vm.y);
    vm.arrToSend.push(new Dot(vm.painType, vm.x, vm.y));
    console.log(vm.arrToSend);
  };

  function makeCircle(type, x, y) {
    console.log('mc', type);
    img = httpService.imageArr[type];

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    console.log('about to draw', img, x - (C_X_OFFSET + HALF_ICON_OFFSET), y - (C_Y_OFFSET + HALF_ICON_OFFSET));
    ctx.drawImage(img, x - (C_X_OFFSET + HALF_ICON_OFFSET), y - (C_Y_OFFSET + HALF_ICON_OFFSET));
    console.log('drawn');
  }

  vm.saveIt = function() {
    console.log('notes saveIt');

    let itemToSend = {
      arrID: httpService.currentApp[0].id,
      appointment: new Notes(
        httpService.currentPat[0]._id,
        new Date(),
        vm.notes.s,
        vm.notes.o,
        vm.notes.a,
        vm.notes.p,
        vm.arrToSend
      )
    };
    console.log('notes its', itemToSend);
    id = httpService.currentPat[0]._id;
    console.log('id', id);
    httpService.putPost('/notes/', id, itemToSend).then(function() {
      swal(
        'Great!',
        'The notes are saved!',
        'success'
      );
      vm.updateShowIt();
    });
  };

  vm.showMe = function() {
    if (vm.appointment[0].notes.spots === null) {
      console.log('no spots yet');
    } else {
      console.log('showme', vm.appointment[0].notes.spots);
      let spotArray = vm.appointment[0].notes.spots;
      console.log(spotArray);
      for (let i = 0; i < spotArray.length; i++) {
        console.log(spotArray[i].type, spotArray[i].x, spotArray[i].y);
        makeCircle(spotArray[i].type, spotArray[i].x, spotArray[i].y);
        vm.arrToSend.push(new Dot(spotArray[i].type, spotArray[i].x, spotArray[i].y));
        console.log('draw');
      }
    }
  };
  vm.showMe();

  vm.updateShowIt = function() {
    let currentPatientArr = httpService.currentPat;
    let currentApp = httpService.currentApp;
    httpService.getProfiles(P_ROUTE, httpService.logInName).then(function(response) {
      currentPatientArr.splice(0, currentPatientArr.length);
      currentPatientArr.push(httpService.patientsArray[httpService.currentIndex[0]]);
      console.log('showit, patient', currentPatientArr[0].appointments, 'appindex', httpService.currentAppIndex[0]);
      console.log('showit, appointment', currentPatientArr[0].appointments[httpService.currentAppIndex[0]]);
      currentApp.splice(0, currentApp.length);
      currentApp.push(currentPatientArr[0].appointments[httpService.currentAppIndex[0]]);
      console.log('showit, patient', httpService.currentApp);
    });
    console.log('showit');
    vm.showMe();
  };

});
