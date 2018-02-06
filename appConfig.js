requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        modules: 'modules'
    }
});

requirejs(['app']);