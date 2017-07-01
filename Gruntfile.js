module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        options: {
          mangle: false
        }, // end options
        // destination: src
        files: {
          'public/build/app.min.js': [
            'public/scripts/raw.js',
            'public/scripts/app.js',
            'public/scripts/ngconfig.js',
            'public/scripts/controllers/ProjectController.js',
            'public/scripts/controllers/patientController.js',
            'public/scripts/services/http.Service.js',
            'public/scripts/services/loggedIn.Service.js'


          ],

        } // end files
      } // end my_target
    }, // end uglify
    copy: {
      angular: {
        expand: true,
        cwd: 'node_modules/angular',
        src: [
          'angular.min.js'
        ],
        dest: 'public/vendors/'
      }, // end angular
    } // end copy
  }); // end module.exports

  // specify the plugins used
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // set which tasks to run when we grunt
  grunt.registerTask('default', ['copy', 'uglify']);
};
