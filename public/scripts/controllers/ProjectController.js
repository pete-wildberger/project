app.controller('ProjectController', function($location, httpService) {
  const vm = this;
  vm.welcome = true;
  vm.registering = false;
  vm.loggedIn = false;
  vm.name = httpService.logInName;
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
    let credentials = {
      username: vm.userRegister,
      password: vm.passwordRegister
    };
    httpService.postPosts('/', credentials).then(function(res) {
      console.log(res);
      if (res.data == 'hooray') {
        console.log(credentials.username);
        vm.welcome = false;
        vm.registering = false;
        vm.loggedIn = true;
        httpService.logInName = credentials.username;
        vm.name = httpService.logInName;
        vm.passwordRegister = '';
        vm.userRegister = '';
      }  else if (res.data == 'no user found'){
        swal(
          'Oops...',
          "Try again please",
          'question'
        );
      }
    });
  };

  vm.register = function() {
    if (vm.password != vm.password2) {
      swal(
        'Oops...',
        'We said "type your password TWICE"',
        'error'
      );
      vm.password = '';
      vm.password2 = '';
    } else {
      var credentials = {
        username: vm.username,
        password: vm.password
      };
      console.log('in the controller logIn');
      httpService.postPosts(REGISTER_ROUTE, credentials).then(function(res) {
        vm.username = '';
        vm.password = '';
        vm.password2 = '';
        console.log(res);
        if (res.status == 201) {
          vm.username = '';
          vm.password = '';
          vm.password2 = '';
          swal(
            'Good job!',
            'You are now registered!',
            'success'
          );
          vm.unwelcome();
        } else if(res.data == 'already taken') {
          vm.username = '';
          vm.password = '';
          vm.password2 = '';
          swal(
            'Opps...',
            "That name is already taken :(",
            'question'
          );
        } else {
          vm.username = '';
          vm.password = '';
          vm.password2 = '';
          swal(
            'Oops...',
            'Something went wrong!',
            'error'
          );
        }
      });
    }
  }; //end register()

  vm.logOut = function() {
    console.log('logout');
    vm.go('/');
    vm.name = '';
    httpService.logInName = '';
    vm.welcome = true;
    vm.registering = false;
    vm.loggedIn = false;
  }; //end logout()

});
