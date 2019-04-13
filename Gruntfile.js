var name = 'via',
    dir = `static/public/via`,
    vender = `static/public/via/vender`,

    // 每次打包需要更新'version'
    version = '0.1.2',
    pathProd = `${dir}/${version}/${name}.js`,
    minPathProd = `${dir}/${version}/${name}.min.js`,

    versionDev = 'dev'
    pathDev = `${dir}/${versionDev}/${name}.js`,
    minPathDev = `${dir}/${versionDev}/${name}.min.js`,

    // banner = `/* ${name} - ${version}  build: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>; packages: vue,vue-router,vuex,axios,iscroll;*/\n`
    banner = `/* ${name} - ${version} */\n`

module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // 合并JS
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: banner
            },
            dev: {
                src: [
                    `${vender}/vue.2.5.16.js`,
                    `${vender}/vue-router.2.7.0.js`,
                    `${vender}/vue-router-extend.0.0.1.js`,
                    `${vender}/vuex.3.0.1.js`,
                    `${vender}/iscroll-probe.5.2.0-jie.js`,
                    `${vender}/axios.0.18.0.js`
                ],
                dest: pathDev //合并文件在dist下名为built.js的文件  
            },
            prod: {
                src: [
                    `${vender}/vue.2.5.16.min.js`,
                    `${vender}/vue-router.2.7.0.js`,
                    `${vender}/vue-router-extend.0.0.1.js`,
                    `${vender}/vuex.3.0.1.min.js`,
                    `${vender}/iscroll-probe.5.2.0-jie.js`,
                    `${vender}/axios.0.18.0.js`
                ],
                dest: pathProd //合并文件在dist下名为built.js的文件  
            }
        },

        // 压缩JS
        uglify: {
            options: {
                banner: banner                
            },
            dev: {
                files: {
                    [minPathDev]: [ pathDev ]
                }
            },
            prod: {
                files: {
                    [minPathProd]: [ pathProd ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认任务

    grunt.registerTask('dev', ['concat:dev', 'uglify:dev']);
    grunt.registerTask('prod', ['concat:prod', 'uglify:prod']);
    grunt.registerTask('default', ['concat:dev', 'uglify:dev', 'concat:prod', 'uglify:prod']);
}