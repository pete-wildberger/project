app.controller('PatientController', function($location, httpService, loggedInService) {
  console.log('PatientController');
  const vm = this;
  const P_ROUTE = '/patients';
  vm.newForm = false;
  vm.patientsArray = [];
  vm.patInfo = [];

  vm.go = function(path) {
    $location.path(path);
  };

  //new patient
  vm.newPatient = function() {
    console.log('newpatient');
    vm.newForm = true;
  }; //end newpatient

  vm.showPatients = function() {
    httpService.getPosts(P_ROUTE).then(function(response) {
      console.log('response is: ', response);
      vm.patientsArray = response;
      console.log('patientsArray', vm.patientsArray);
    });
  };
  vm.showPatients();

  vm.savePatient = function() {
    if (loggedInService.logInName) {
      var itemToSend = {
        therapist: loggedInService.logInName,
        firstname: vm.inputed.firstNameIn,
        lastname: vm.inputed.lastNameIn,
        phone: vm.inputed.phoneIn,
        email: vm.inputed.emailIn
      };

      httpService.postPosts(P_ROUTE, itemToSend).then(function(response) {
        vm.inputed = '';
        vm.showPatients();
        vm.newForm = false;
      });
    } else {
      // swal("LOG IN FOOL", "You need to be logged in to post", "error");
    }
  };

  //Appointment(duration, time, date, type)
  vm.saveAppointment = function(id) {
console.log('appointment: ', id);
    var appToSend = new Appointment(vm.inputed.durationIn,
      vm.inputed.dateIn,
      vm.inputed.timeIn,
      vm.inputed.mTypeIn);
      console.log('controller: ', appToSend);
    httpService.putPost(P_ROUTE, id, appToSend).then(function(response) {
      console.log('response is: ', response);
      vm.showProfile(id);
      vm.inputed = '';

    });
  };


  vm.removePatient = function(id) {
    console.log(id);
    httpService.deletePost(P_ROUTE, id).then(function(response) {
      console.log('response is: ', response);
      vm.showPatients();
    });
  };
  vm.removeAppointment = function(id) {
    console.log(id);
    httpService.deletePost(P_ROUTE, id).then(function(response) {
      console.log('response is: ', response);
      vm.showPatients();
    });
  };

  vm.showProfile = function(id){

    httpService.getProfile('/profile', id).then(function(response) {
      console.log('showprofile: ', response);
      loggedInService.profileView.push(response[0]);
    });
  };

console.log('controller from service', loggedInService.profileView);
vm.patInfo.push(loggedInService.profileView[0]);
console.log('afterfunction', vm.patInfo);

  vm.goToProf = function(path, id) {
    vm.patInfo = [];
    vm.showProfile(id);
    $location.path(path);
  };


});
