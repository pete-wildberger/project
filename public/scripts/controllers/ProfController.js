app.controller('ProfController', function($location, httpService) {
  console.log('ProfController');
  const vm = this;

  vm.formHide = false;
  vm.currentPat = httpService.currentPat;

  //new patient
  vm.newForm = function() {
    vm.formHide = true;
  }; //end newpatient

  vm.saveAppointment = function(id) {

    let appToSend = new Appointment(
      id,
      new Date(),
      vm.inputed.durationIn,
      vm.inputed.timeIn,
      vm.inputed.dateIn,
      vm.inputed.mTypeIn);

    httpService.putPost(P_ROUTE, '/' + id, appToSend).then(function(response) {
      vm.showUpdatedProfile();
      vm.inputed = '';
      vm.formHide = false;
    });
  };

  vm.showUpdatedProfile = function() {
    httpService.getProfiles(P_ROUTE, httpService.logInName).then(function(response) {
      httpService.currentPat.splice(0, httpService.currentPat.length);
      httpService.currentPat.push(httpService.patientsArray[httpService.currentIndex[0]]);
    });
  };

  vm.removeAppointment = function(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4062BB',
      cancelButtonColor: '#F45B69',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      httpService.deletePost(APPOINT_ROUTE, id).then(function(response) {
        console.log('response is: ', response);
        vm.showUpdatedProfile();
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      });

    });
  };

  vm.goToNotes = function(x) {
    console.log('repeated x', x);
    httpService.currentAppIndex.splice(0, httpService.currentAppIndex.length);
    httpService.currentApp.splice(0, httpService.currentApp.length);
    idx = httpService.patientsArray[httpService.currentIndex[0]].appointments.indexOf(x);
    console.log('gtn idx', idx);
    httpService.currentAppIndex.push(idx);
    console.log('gtn', httpService.currentAppIndex);
    httpService.currentApp.push(httpService.patientsArray[httpService.currentIndex[0]].appointments[idx]);
    console.log('gtn', httpService.currentApp);
    $location.path('/notes');
  };
});
