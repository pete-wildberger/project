app.service('httpService', function($http) {
  var sv = this;

  sv.getPosts = function(path) {
    return $http.get(path).then(function(response) {
      return response.data;
    });
  };
  sv.postPosts = function(path, its) {
    return $http.post(path, its).then(function(response) {
      console.log('back from server with:', response);
    });
  };
  sv.sendLogIn = function(credentials) {
    console.log('in Service');
    return $http.post('/', credentials).then(function(res) {
      console.log('login back', res);
      return res;
    });
  };
  sv.sendRegister = function(credentials) {
    console.log('in Service');
    return $http.post('/register', credentials).then(function(res) {
      console.log('login back', res);
      return res;
    });
  };

});
