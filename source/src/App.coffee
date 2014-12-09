# MAIN APP

window.app = 

    view    : null

    init: ->
        app.initApp()
        return

    initApp: ->
        console.log "INIT APP";

        app.view = new AppView($('#container'))
        app.view.init()

        return
        
do app.init