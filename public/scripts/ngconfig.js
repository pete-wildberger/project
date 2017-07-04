app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "/views/partials/patient.html",
        controller: "PatientController as pc"
    }).when('/appointments', {
        templateUrl: "views/partials/appointment.html",
        controller: "ProjectController as pc"
    }).when('/profile', {
        templateUrl: "views/partials/profile.html",
        controller: "PatientController as pc"
    }).when('/notes', {
        templateUrl: "views/partials/notes.html",
        controller: "PatientController as pc"
    });
});
