module.exports=function(grunt){
    grunt.initConfig({
        concat: {
          js: {
            src: ['mainjs.js'],
            dest: 'build//js/built.js',
          },
          css: {
            src: ['maincss.css'],
            dest: 'build/css/GCss.css',
          },
        },
        watch: {
            js: {
              files: ['build/**/*.js'],
              tasks: ['concat'],
            }, 
            css: {
                files: ['build/**/*.css'],
                tasks: ['concat'],
              }
          },
      });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTasks('default',['concat','watch'])
}