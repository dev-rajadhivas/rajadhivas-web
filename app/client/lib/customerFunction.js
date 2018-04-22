Handlebars.registerHelper('getHightWindows', function(data) {
    var size = parseInt(window.innerHeight * 0.75);
    return 'height: ' + size + 'px;overflow-y: auto;'
});
