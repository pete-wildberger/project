app.controller('PatientController', function($location, httpService, loggedInService) {
  console.log('PatientController');
  const vm = this;
  const P_ROUTE = '/patients';
  vm.newForm = false;
  vm.patientsArray = [];

  vm.go = function(path) {
            $location.path(path);
          };
          
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

      httpService.postPosts(P_ROUTE, itemToSend).then(function(response) {
        vm.inputed = '';
        vm.showPatients();
        vm.newForm = false;
      });
    } else {
      // swal("LOG IN FOOL", "You need to be logged in to post", "error");
    }
  };
  vm.removePatient = function(id) {

    console.log(id);
    httpService.deletePost(P_ROUTE, id).then(function(response) {
      console.log('response is: ', response);
      vm.showPatients();
    });
  };

  vm.showPatients = function() {
    httpService.getPosts(P_ROUTE).then(function(response) {
      console.log('response is: ', response);
      vm.patientsArray = response;
      console.log('patientsArray', vm.patientsArray);
    });
  };
  vm.showPatients();

});
