app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "/views/partials/patient.html",
        controller: "PatientController as pc",
        controllerAs:"pc"
    }).when('/appointment', {
        templateUrl: "views/partials/appointment.html",
        controller: "AppointController as ac",
        controllerAs:"ac"
    }).when('/profile', {
        templateUrl: "views/partials/profile.html",
        controller: "ProfController",
        controllerAs:"pc"
    }).when('/notes', {
        templateUrl: "views/partials/notes.html",
        controller: "NotesController",
        controllerAs:"nc"
    }).when('/credits', {
        templateUrl: "views/partials/credits.html",
        controller: "ProjectController",
        controllerAs:"pc"
    });
});
