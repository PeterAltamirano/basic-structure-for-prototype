class @TemplateEngine

    templatesLoaded         : 0
    templatesToLoad         : 0
    templateLoadCallback    : null

    templates               : []    # array of templates

    loadTemplates : (templatePath, templts, callback) =>
        @templatesLoaded = 0

        @templatesToLoad = templts.length
        @templateLoadCallback = callback

        for templt in templts
            key = Object.keys(templt)
            @.getTemplate(templatePath, templt[key], key)

    getTemplate : (path, tmplt, key) =>
        xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () =>
            if (xhr.readyState == 4)
                @templates[key] = xhr.responseText
                @.templateLoaded()

        console.log "",path+""+tmplt
        xhr.open('GET', path+tmplt)
        xhr.send()

    templateLoaded : () =>
        @templatesLoaded++
        if( @templatesLoaded >= @templatesToLoad)
            if @templateLoadCallback
                console.log "TEMPLATES LOADED"
                @templateLoadCallback()

    getRenderedTemplate : (key, values) =>
        if !@templates[key]
            console.log "!! TEMPLATE DOESN'T EXISTS !!"
        return @.renderTemplate(@templates[key],values)

    renderTemplate : (tpl, data) =>
        re = /<%([^%>]+)?%>/g
        while match = re.exec(tpl)
            tpl = tpl.replace(match[0], data[match[1]])
        return tpl
