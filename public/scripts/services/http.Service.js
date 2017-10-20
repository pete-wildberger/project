app.service('httpService', function($http) {
  var sv = this;
  sv.logInName = '';
  sv.patientsArray = [];
  sv.currentIndex = [];
  sv.currentPat = [];
  sv.currentAppIndex = [];
  sv.currentApp = [];
  sv.allAppointments = [];

  var img0 = new Image();
  img0.src = '/assets/adhesionsm.png';
  var img1 = new Image();
  img1.src = '/assets/hypertonicitysm.png';
  var img2 = new Image();
  img2.src = '/assets/inflamationsm.png';
  var img3 = new Image();
  img3.src = '/assets/rotationsm.png';
  var img4 = new Image();
  img4.src = '/assets/triggerpointsm.png';
  var img5 = new Image();
  img5.src = '/assets/tendersm.png';
  var img6 = new Image();
  img6.src = '/assets/spasmsm.png';
  var img7 = new Image();
  img7.src = '/assets/omegasm.png';

  sv.imageArr = [img0, img1, img2, img3, img4, img5, img6, img7];

  // httpServices
  sv.getPosts = function(path) {
    return $http.get(path).then(function(response) {
      return response.data;
    });
  };
  sv.getProfiles = function(path, id) {
    console.log(path + '/' + id);
    return $http.get(path + '/' + id).then(function(response) {
      console.log('service: ', response);
      sv.patientsArray = response.data;
      console.log('service array', sv.patientsArray);
      return response.data;
    });
  };

  sv.postPosts = function(path, its) {
    return $http.post(path, its).then(function(response) {
      console.log('back from server with:', response);
      return response;
    });
  };
  sv.putPost = function(path, id, its) {
    console.log('its: ', its);
    return $http.put(path + id, its).then(function(response) {
      console.log('updated', response);
      return response;
    });
  };
  sv.deletePost = function(path, id) {
    return $http.delete(path + '/' + id).then(function(response) {
      console.log('deleted', response);
      return response;
    });
  };
});
