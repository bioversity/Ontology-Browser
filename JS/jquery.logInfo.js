// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    
    var pluginName = 'logInfo',
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    /**
     * create a log info for each users
     * @input: elem, the element where the log will be display
     * @return: the informations for the current user
     */
    function createLog(elem, id, json){
        var $el = $(elem);
        checkUser(id,json, function(p){
            $el.append(p);
        });
    }
    /**
     * check which log will be display
     * @input: id, the user id
     * @input: json, the array contains json elements
     */
    function checkUser(id, json,cb){
        var jsonElem = json.test.pop();
        if (jsonElem){
            jsonToArray(jsonElem, function(arr){
            // arr[0]='id'; arr[1]=id_value; arr[i]=key; arr[i+1]=value
                if(id==arr[1]){
                    if (document.getElementById('fileID'+arr[3])){
                           $('p#fileID'+arr[3]).remove();
                    }
                        else{
                           var p = $("<p></p>");
                           p.attr("id", 'fileID'+arr[3])
                        }
                    for(var i=4; i<arr.length; i++){
                        if(arr[i]=='progress')
                            var span = $("<span class='"+ arr[i] + "' value='"+arr[i+1]+"'>" + arr[i+1] + "</span>");
                        else 
                            var span = $("<span id='"+ arr[i] + "'>" + arr[i+1] + "</span>");
                        i++;
                        p.append(' ')
                        p.append(span);
                    }
                    checkUser(id,json,cb);
                }     
                else
                    checkUser(id,json,cb);
            cb(p);
            });
        }
    }

    /**
     * create an associativbe array parsing a json element
     * @input: json
     * @return: associative array
     */
    function jsonToArray(json, callback){
        var items = [];
        json = JSON.stringify(json)
        var value = jQuery.parseJSON(json)
            if (typeof value==='object')
                    $.each(value, function(i,arr){
                        items.push(i)
                        items.push(arr);
                    })
        callback(items)
        console.log(items)
    }
    
    
    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( id, json ) {
        createLog(this, id, json);
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, id, json ));
            }
        });
    }

})( jQuery, window, document );

