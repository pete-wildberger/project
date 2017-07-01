app.controller('ProjectController', function($location, httpService, loggedInService) {
  const vm = this;
  vm.welcome = true;
  vm.registering = false;
  vm.loggedIn = false;

  console.log('ProjectController');

  vm.go = function(path) {
            $location.path(path);
          };
vm.unwelcome = function() {
  console.log('unwelcome');
  vm.welcome = !vm.welcome;
  vm.registering = !vm.registering;
};
  vm.logIn = function() {
    console.log('in the controller logIn');
    var credentials = {
      username: vm.userRegister,
      password: vm.inputed.passwordRegister
    };
    httpService.sendLogIn(credentials).then(function(res) {
      console.log(res);
      if (res.status == 200) {
        console.log(credentials.username);
        vm.welcome = false;
        vm.registering = false;
        vm.loggedIn = true;
        loggedInService.logInName = credentials.username;
        vm.inputed = '';
      } else {
        swal(
          'Opps...',
          "We can't find your username",
          'question'
        );

      }

    });
  };
  vm.register = function() {
    if(vm.inputed.password != vm.inputed.password2){
      swal(
        'Oops...',
        'We said "type your password TWICE"',
        'error'
      );
      vm.inputed = '';
    } else {
    var credentials = {
      username: vm.inputed.username,
      password: vm.inputed.password
    };
    console.log('in the controller logIn');
    httpService.sendRegister(credentials).then(function(res) {
      vm.inputed = '';
      console.log(res);
      if (res.status == 201) {
        swal(
          'Good job!',
          'You are now registered!',
          'success'
        );
        vm.unwelcome();
      } else {
        swal(
          'Oops...',
          'Something went wrong!',
          'error'
        );
      }
    });
  }
};//end register()

  vm.logOut = function(){
    console.log('logout');
    loggedInService.logInName = '';
    vm.welcome = true;
    vm.registering = false;
    vm.loggedIn = false;
  }; //end logout()

});
