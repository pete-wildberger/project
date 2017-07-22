app.controller('AppointController', function($location, httpService) {
  console.log('AppointController');
  const vm = this;

  vm.patientsArray = [];
  vm.appointments = [];
  vm.mailObject = {};
  vm.textObject = {};


  vm.showProfile = function() {
    console.log('appshowprof');
    vm.patientsArray = httpService.patientsArray;
    for (let i = 0; i < vm.patientsArray.length; i++) {
      for (let j = 0; j < vm.patientsArray[i].appointments.length; j++) {
        vm.patientsArray[i].appointments[j].name = vm.patientsArray[i].firstname + ' ' + vm.patientsArray[i].lastname;
        vm.patientsArray[i].appointments[j].phone = vm.patientsArray[i].phone;
        vm.appointments.push(vm.patientsArray[i].appointments[j]);
      }
    }
  };
  vm.showProfile();

  vm.goToNotes = function(x) {
    console.log('repeated x', x);
    httpService.currentAppIndex.splice(0, httpService.currentAppIndex.length);
    httpService.currentApp.splice(0, httpService.currentApp.length);
    idx = vm.appointments.indexOf(x);
    console.log('gtn idx', idx);
    httpService.currentAppIndex.push(idx);
    console.log('gtn', httpService.currentAppIndex);
    httpService.currentApp.push(vm.appointments[idx]);
    console.log('gtn', httpService.currentApp);
    $location.path('/notes');
  };

  vm.submitEmail = function(x) {
    let parentID = x.id.split('.', 1);
    console.log(parentID);
    for (let i = 0; i < vm.patientsArray.length; i++) {
      if (parentID == vm.patientsArray[i]._id) {
        vm.mailObject.toEmail = vm.patientsArray[i].email;
        vm.mailObject.from = vm.patientsArray[i].therapist;
        console.log(vm.mailObject);
      }
    }
    console.log('app', x);
    let date = x.time;
    let targetTime = new Date(date);
    let dbDiff = -6.00;
    let tzDifference = dbDiff * 60 + targetTime.getTimezoneOffset();
    let offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
    console.log('formTime', offsetTime);
    timeArr = (offsetTime.toString()).split(' ');
    time = timeArr[4];
    console.log('time', time, 'typeof', typeof(time));
    vm.mailObject.time = time.slice(0, 5);
    vm.mailObject.date = x.date.split('T', 1);
    httpService.postPosts('/appointments/email', vm.mailObject).then(function(response) {
      console.log('sent', response);
      swal(
        'Sent!',
        'success'
      );
    });
  };

  vm.submitText = function(x) {
    let parentID = x.id.split('.', 1);
    console.log(parentID);
    for (let i = 0; i < vm.patientsArray.length; i++) {
      if (parentID == vm.patientsArray[i]._id) {
        vm.textObject.toNumber = '+1' + vm.patientsArray[i].phone;
        vm.textObject.from = vm.patientsArray[i].therapist;
        console.log(vm.textObject);
      }
    }
    timeArr = x.time.split('T');
    time = timeArr[1];
    vm.textObject.time = time.slice(0, 5);
    vm.textObject.date = x.date.split('T', 1);
    httpService.postPosts('/appointments/text', vm.textObject).then(function(response) {
      swal(
        'Hello!',
        'Unfortunately, with the trial version of the Twilio API, this app is unable to send texts'
      );
      console.log('sent', response);
    });
  };

});
