app.controller('PatientController', function($location, httpService, loggedInService) {
  console.log('PatientController');
  const vm = this;
  vm.newForm = false;
  vm.patientsArray = [];

  //new patient
  vm.newPatient = function() {
    console.log('newpatient');
    vm.newForm = true;
  }; //end newpatient

  vm.savePatient = function() {
    if (loggedInService.logInName) {
      var itemToSend = {
        firstname: vm.inputed.firstNameIn,
        lastname: vm.inputed.lastNameIn,
        phone: vm.inputed.phoneIn,
        email: vm.inputed.emailIn
      };

      httpService.postPosts('/patients', itemToSend).then(function(response) {
        vm.inputed = '';
        vm.getPatients();
        vm.newForm = false;
      });
    } else {
      swal("LOG IN FOOL", "You need to be logged in to post", "error");
    }
  };


  vm.getPatients = function() {
    httpService.getPosts('/patients').then(function(response) {
      console.log('response is: ', response);
      vm.patientsArray = response;
      console.log('patientsArray', vm.patientsArray);
    });
  };
  vm.getPatients();

});
