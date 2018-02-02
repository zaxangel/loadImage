let gulp = require('gulp');
let webserver = require('gulp-webserver');
let fs = require('fs');
let path = require('path');

gulp.task('default', ['webserver', 'dataServer']);

gulp.task('webserver', function () {
	gulp.src('./')
		.pipe(webserver({
			host: 'localhost',
			port: 8080,
			open: true,
			livereload: true,
			fallback: './index.html'
		}));
});

gulp.task('dataServer', function() {
	gulp.src('./')
		.pipe(webserver({
			host: 'localhost',
			port: 3000,
			middleware: function(req, res, next){
				if(req.url === '/data'){
					res.writeHead(200, {
						'Access-Control-Allow-Origin': '*'
					});
					var pathName = path.resolve('data', 'data.json');
					fs.readFile(pathName, (err, data) => {
						res.end(data);
					})
				}
			}
		}));
});
