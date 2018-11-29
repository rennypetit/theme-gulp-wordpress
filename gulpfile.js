// Gulp *
	var gulp = require('gulp')
// Uso de sass *
	var sass = require('gulp-sass')
// minificar js
	const minify = require('gulp-minify');
//minificar css
	var cssnano = require('gulp-cssnano');
//autoprefixer
	const autoprefixer = require('gulp-autoprefixer');
//unir media screen
	var gcmq = require('gulp-group-css-media-queries');
//minificar html
	const htmlmin = require('gulp-htmlmin');
//unir archivos en uno solo
	var concat = require('gulp-concat');

// Tarea para procesar videos y otros archivos de medios
gulp.task('scss', function() {
	gulp.src('development/assets/scss/**/*.scss') 
	.pipe(sass())
	.pipe(autoprefixer({
	    browsers: ['last 3 versions'],
	    cascade: true
	}))
	.pipe(gcmq())
	.pipe(concat('all.css'))
	//.pipe(cssnano())
	.pipe(gulp.dest('theme/assets/css/'))
});

// Tarea para procesar fuentes
gulp.task('fonts', function() {
	return gulp.src('development/assets/fonts/**/*') 
	.pipe(gulp.dest('theme/assets/fonts'))
});

// Tarea para procesar imagenes
gulp.task('img', function() {
	return gulp.src('development/assets/img/**/*') 
	.pipe(gulp.dest('theme/assets/img'))
});

gulp.task('js', function() {
		
  	gulp.src('development/assets/js/**/*.js') 
  	.pipe(concat('all.js'))
	.pipe(minify())
	.pipe(gulp.dest('theme/assets/js/'))
});

gulp.task('php', () => {
  return gulp.src('development/**/*.php') 
    //.pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('theme/'))
});


// Tarea para vigilar los cambios
gulp.task('watch', function () {
	gulp.watch('development/assets/scss/**/*.scss', ['scss'])
	gulp.watch('development/assets/js/**/*.js', ['js'])
	gulp.watch('development/*.php', ['php'])
	gulp.watch('development/assets/img/**', ['img'])
	gulp.watch('development/assets/fonts/**', ['fonts'])
	// gulp.watch('./src/**/*.*', ['archivos'])
	// gulp.watch('./src/partials/**/*.html', ['parciales'])
	// gulp.watch('./src/js/**/*.js', ['js'])
	// gulp.watch('./src/media/**', ['medios'])
})

gulp.task('default', ['scss','js','php','img','fonts','watch'])
