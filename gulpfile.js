var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    bower = require('gulp-bower'),
    gulpCopy = require('gulp-copy');;

var config = {
     sassPath: './sass',
     bowerDir: './bower_components' ,
    outputPath: './css',
    openemrPath: '/srv/openemr/interface/themes'
};

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('css', function() { 
    return sass(config.sassPath + '/*', {
             style: 'expanded',
             loadPath: [
                 './sass',
                 config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/font-awesome/scss'
             ]
            }) 
        .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))
         .pipe(gulp.dest(config.outputPath)); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'css']);
