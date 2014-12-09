
class AppView

    $container              : null
    templatePath            : 'template/'
    templateEngine          : null
    templatesToPreload      : [  { main : 'main-template.html' } ]
    videoPlayer             : null
    videoW                  : 854
    videoH                  : 480

    constructor: (el) ->
        console.log "APP VIEW"
        @$container = el
        return

    init: ($wrapper) ->
        console.log "INIT APP VIEW"

        @templateEngine = new TemplateEngine()
        @templateEngine.loadTemplates(@templatePath, @templatesToPreload, @preloaded)

        return

    preloaded: () =>
        # init main view
        @$container.html @templateEngine.getRenderedTemplate('main',{ 
            VIDEO_PATHNAME : 'data/trailer'
        })

        @videoPlayer = @$container.find('#bg-video')

        $(window).resize @onResizeEvents
        @onResizeEvents()

        return

    onResizeEvents: () =>
        @bgVideoCenter()

    # recenter fullscreen video bg
    bgVideoCenter: =>
        vidEl = @videoPlayer
        videoW = @videoW
        videoH = @videoH
        docH = @$container.height()
        docW = @$container.width()

        if docW / docH < videoW / videoH
            # adjust height, center horizontally
            margin = (docH * videoW / videoH - docW) / 2 * -1
            $(vidEl).css({"height":docH+"px"})
            $(vidEl).css({"width":"auto"})
            $(vidEl).css({"margin-top":"0px"})
            $(vidEl).css({"margin-left":margin+"px"})
        else
            # adjust width, center vertically
            margin = (docW * videoH / videoW - docH) / 2 * -1
            $(vidEl).css({"height":"auto"})
            $(vidEl).css({"width":docW+"px"})
            $(vidEl).css({"margin-left":"0px"})
            $(vidEl).css({"margin-top":margin+"px"})

        return