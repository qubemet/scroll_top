import gulp from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import concat from 'gulp-concat'
import cleanCSS from 'gulp-clean-css'
import gulpAutoprefixer from 'gulp-autoprefixer'
import zip from 'gulp-zip'
import { readFile } from 'fs/promises';
const sass = gulpSass(dartSass)
const packageJson = JSON.parse(
	await readFile(new URL('./package.json', import.meta.url))
);

const styles = [
	{ name: 'dashboard', src: './src/scss/dashboard.scss', dest: '../assets/css', file: 'dashboard.min.css' },
	{ name: 'qmt_scroll', src: './src/scss/qmt-scroll.scss', dest: '../assets/css', file: 'qmt-scroll.min.css' },
];

const sassTasks = styles.map(function (entry) {
	const taskName = `sass_to_css_${entry.name}`;
	gulp.task(taskName, function () {
		return gulp.src(entry.src)
			.pipe(sass.sync().on('error', sass.logError))
			.pipe(gulpAutoprefixer({ cascade: false }))
			.pipe(concat(entry.file))
			.pipe(cleanCSS())
			.pipe(gulp.dest(entry.dest));
	});
	return taskName;
});

gulp.task('build', gulp.series(...sassTasks));

gulp.task("watch", function () {
	styles.map(function (entry) {
		gulp.watch(entry.src, gulp.series("sass_to_css_" + entry.name));
	})
});

let folderName = "qmt-scroll";
gulp.task('copy_files', function() {
	return gulp
		.src([
			'../**/*',
			"!../.git",
			"!../.gitignore",
			"!../react/**",
			"!../build/**",
			"!../assets/js/dashboard.js.LICENSE.txt",
		])
		.pipe(gulp.dest(`../build/${folderName}`, {overwrite: true}));
});

gulp.task('zip', function() {
	return gulp.src(`../build/${folderName}/**`)
		.pipe(zip(`qmt-scroll-${packageJson.version}.zip`))
		.pipe(gulp.dest(`../build`))
});

gulp.task('clean', async function() {
	const { deleteAsync } = await import('del');
	return deleteAsync([`../build/${folderName}`], { force: true });
});

gulp.task('package', gulp.series(
	'copy_files',
	'zip',
	'clean'
));
