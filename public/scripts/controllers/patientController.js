app.controller('PatientController', function($location, httpService) {
  console.log('PatientController');
  const vm = this;
  vm.formHide = false;
  vm.patientsArray = [];

  //new patient
  vm.newForm = function() {
    console.log('newpatient');
    vm.formHide = true;
  }; //end newpatient

  vm.showProfile = function() {
    console.log('showprof');
    httpService.getProfiles(P_ROUTE, httpService.logInName).then(function(response) {
      vm.patientsArray = httpService.patientsArray;
    });
  };
  vm.showProfile();

  vm.savePatient = function() {
    if (httpService.logInName) {
      let itemToSend = {
        therapist: httpService.logInName,
        firstname: vm.firstNameIn,
        lastname: vm.lastNameIn,
        phone: vm.phoneIn,
        email: vm.emailIn
      };

      httpService.postPosts(P_ROUTE, itemToSend).then(function(response) {
        vm.firstNameIn = '';
        vm.lastNameIn = '';
        vm.phoneIn = '';
        vm.emailIn = '';
        vm.showProfile();
        vm.formHide = false;
      });
    } else {
      // swal("LOG IN FOOL", "You need to be logged in to post", "error");
    }
  };



  vm.removePatient = function(id) {
    console.log(id);
    swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4062BB',
      cancelButtonColor: '#F45B69',
      confirmButtonText: 'Yes, delete it!'
    }).then(function() {
      httpService.deletePost(P_ROUTE, id).then(function(response) {
        console.log('response is: ', response);
        vm.showProfile();
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      });
    });
  };

  vm.goToProf = function(path, id) {
    httpService.currentIndex = [];
    httpService.currentPat = [];
    console.log(id);
    let idx = vm.patientsArray.indexOf(id);

    console.log('gtp', idx);
    httpService.currentIndex.push(idx);
    console.log('gtp', vm.patientsArray[idx]);
    httpService.currentPat.push(vm.patientsArray[idx]);
    console.log('gtp', httpService.currentPat);
    $location.path(path);
  };


});
