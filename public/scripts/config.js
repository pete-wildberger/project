app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "/views/partials/patient.html",
        controller: "ProjectController"
    }).when('/appointments', {
        templateUrl: "views/partials/appointment.html",
        controller: "ProjectController"
    }).when('/profile', {
        templateUrl: "views/partials/profile.html",
        controller: "ProjectController"
    }).when('/notes', {
        templateUrl: "views/partials/notes.html",
        controller: "ProjectController"
    });
});
