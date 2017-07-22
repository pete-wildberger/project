var app = angular.module('myApp', ["ngRoute", "xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
