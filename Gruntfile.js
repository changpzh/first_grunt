module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				//define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				//the files to concatenate
				src: ['src/**/*.js'],
				// the location of hte resulting JS file
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			buildall: {
				options: {
					mangle: true,
					compress: {
						drop_console: true
					},
					report: "min"
				},
				files: [{
					expand: true,
					cwd: 'src',	//in js dirs
					src: '**/*.js',	//all js files
					dest: 'dist'	// output to this dir.
				}]
			}
			// dist: {
			// 	files:{
			// 		'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			// 	}
			// }
		},
		qunit: {
			// files: ['test/**/*.html']
			all: {
				options: {
					urls: [
						'http://localhost:3000/test/index.html'
					]
				}
			}
		},
		connect: {
			server: {
				options: {
					port:3000,
					base: '.'
				}
			}
		},
		jshint: {
			//define the files to lint
			files: ['src/**/*.js', 'test/**/*.js'],
			//configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				//more options here if you want to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['minall'],
				option: {
					spawn: true,
					inerrupt: true
				}
			}
		}
		// watch: {
		// 	files: ['<%= jshint.files %>'],
		// 	tasks: ['jshint', 'qunit']
		// }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib');

	grunt.registerTask('minall', ['uglify:buildall']);
	grunt.registerTask('unittest', ['connect', 'qunit']);
	grunt.registerTask('test', ['jshint', 'qunit']);
	grunt.registerTask('full', ['jshint', 'qunit']);
	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};
