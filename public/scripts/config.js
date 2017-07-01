app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "views/partials/login.html",
        controller: "ProjectController"
    }).when('/register', {
        templateUrl: "views/partials/register.html",
        controller: "ShelfController"
    }).when('/loggedIn', {
        templateUrl: "views/partials/loggedIn.html",
        controller: "ShelfController"
    });
});
