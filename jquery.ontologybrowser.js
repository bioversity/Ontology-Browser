/*
 * Poshy Tip jQuery plugin v1.1+
 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
 * Copyright 2010-2011, Vasil Dinkov, http://vadikom.com/
 */
(function(e){var a=[],d=/^url\(["']?([^"'\)]*)["']?\);?$/i,c=/\.png$/i,b=e.browser.msie&&e.browser.version==6;function f(){e.each(a,function(){this.refresh(true)})}e(window).resize(f);e.Poshytip=function(h,g){this.$elm=e(h);this.opts=e.extend({},e.fn.poshytip.defaults,g);this.$tip=e(['<div class="',this.opts.className,'">','<div class="tip-inner tip-bg-image"></div>','<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',"</div>"].join("")).appendTo(document.body);this.$arrow=this.$tip.find("div.tip-arrow");this.$inner=this.$tip.find("div.tip-inner");this.disabled=false;this.content=null;this.init()};e.Poshytip.prototype={init:function(){a.push(this);var g=this.$elm.attr("title");this.$elm.data("title.poshytip",g!==undefined?g:null).data("poshytip",this);if(this.opts.showOn!="none"){this.$elm.bind({"mouseenter.poshytip":e.proxy(this.mouseenter,this),"mouseleave.poshytip":e.proxy(this.mouseleave,this)});switch(this.opts.showOn){case"hover":if(this.opts.alignTo=="cursor"){this.$elm.bind("mousemove.poshytip",e.proxy(this.mousemove,this))}if(this.opts.allowTipHover){this.$tip.hover(e.proxy(this.clearTimeouts,this),e.proxy(this.mouseleave,this))}break;case"focus":this.$elm.bind({"focus.poshytip":e.proxy(this.show,this),"blur.poshytip":e.proxy(this.hide,this)});break}}},mouseenter:function(g){if(this.disabled){return true}this.$elm.attr("title","");if(this.opts.showOn=="focus"){return true}this.clearTimeouts();this.showTimeout=setTimeout(e.proxy(this.show,this),this.opts.showTimeout)},mouseleave:function(g){if(this.disabled||this.asyncAnimating&&(this.$tip[0]===g.relatedTarget||jQuery.contains(this.$tip[0],g.relatedTarget))){return true}var h=this.$elm.data("title.poshytip");if(h!==null){this.$elm.attr("title",h)}if(this.opts.showOn=="focus"){return true}this.clearTimeouts();this.hideTimeout=setTimeout(e.proxy(this.hide,this),this.opts.hideTimeout)},mousemove:function(g){if(this.disabled){return true}this.eventX=g.pageX;this.eventY=g.pageY;if(this.opts.followCursor&&this.$tip.data("active")){this.calcPos();this.$tip.css({left:this.pos.l,top:this.pos.t});if(this.pos.arrow){this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow}}},show:function(){if(this.disabled||this.$tip.data("active")){return}this.reset();this.update();this.display();if(this.opts.timeOnScreen){this.clearTimeouts();this.hideTimeout=setTimeout(e.proxy(this.hide,this),this.opts.timeOnScreen)}},hide:function(){if(this.disabled||!this.$tip.data("active")){return}this.display(true)},reset:function(){this.$tip.queue([]).detach().css("visibility","hidden").data("active",false);this.$inner.find("*").poshytip("hide");if(this.opts.fade){this.$tip.css("opacity",this.opacity)}this.$arrow[0].className="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left";this.asyncAnimating=false},update:function(j,k){if(this.disabled){return}var i=j!==undefined;if(i){if(!k){this.opts.content=j}if(!this.$tip.data("active")){return}}else{j=this.opts.content}var h=this,g=typeof j=="function"?j.call(this.$elm[0],function(l){h.update(l)}):j=="[title]"?this.$elm.data("title.poshytip"):j;if(this.content!==g){this.$inner.empty().append(g);this.content=g}this.refresh(i)},refresh:function(h){if(this.disabled){return}if(h){if(!this.$tip.data("active")){return}var k={left:this.$tip.css("left"),top:this.$tip.css("top")}}this.$tip.css({left:0,top:0}).appendTo(document.body);if(this.opacity===undefined){this.opacity=this.$tip.css("opacity")}var l=this.$tip.css("background-image").match(d),m=this.$arrow.css("background-image").match(d);if(l){var i=c.test(l[1]);if(b&&i){this.$tip.css("background-image","none");this.$inner.css({margin:0,border:0,padding:0});l=i=false}else{this.$tip.prepend('<table border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>').css({border:0,padding:0,"background-image":"none","background-color":"transparent"}).find(".tip-bg-image").css("background-image",'url("'+l[1]+'")').end().find("td").eq(3).append(this.$inner)}if(i&&!e.support.opacity){this.opts.fade=false}}if(m&&!e.support.opacity){if(b&&c.test(m[1])){m=false;this.$arrow.css("background-image","none")}this.opts.fade=false}var o=this.$tip.find("table");if(b){this.$tip[0].style.width="";o.width("auto").find("td").eq(3).width("auto");var n=this.$tip.width(),j=parseInt(this.$tip.css("min-width")),g=parseInt(this.$tip.css("max-width"));if(!isNaN(j)&&n<j){n=j}else{if(!isNaN(g)&&n>g){n=g}}this.$tip.add(o).width(n).eq(0).find("td").eq(3).width("100%")}else{if(o[0]){o.width("auto").find("td").eq(3).width("auto").end().end().width(document.defaultView&&document.defaultView.getComputedStyle&&parseFloat(document.defaultView.getComputedStyle(this.$tip[0],null).width)||this.$tip.width()).find("td").eq(3).width("100%")}}this.tipOuterW=this.$tip.outerWidth();this.tipOuterH=this.$tip.outerHeight();this.calcPos();if(m&&this.pos.arrow){this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow;this.$arrow.css("visibility","inherit")}if(h&&this.opts.refreshAniDuration){this.asyncAnimating=true;var p=this;this.$tip.css(k).animate({left:this.pos.l,top:this.pos.t},this.opts.refreshAniDuration,function(){p.asyncAnimating=false})}else{this.$tip.css({left:this.pos.l,top:this.pos.t})}},display:function(h){var i=this.$tip.data("active");if(i&&!h||!i&&h){return}this.$tip.stop();if((this.opts.slide&&this.pos.arrow||this.opts.fade)&&(h&&this.opts.hideAniDuration||!h&&this.opts.showAniDuration)){var m={},l={};if(this.opts.slide&&this.pos.arrow){var k,g;if(this.pos.arrow=="bottom"||this.pos.arrow=="top"){k="top";g="bottom"}else{k="left";g="right"}var j=parseInt(this.$tip.css(k));m[k]=j+(h?0:(this.pos.arrow==g?-this.opts.slideOffset:this.opts.slideOffset));l[k]=j+(h?(this.pos.arrow==g?this.opts.slideOffset:-this.opts.slideOffset):0)+"px"}if(this.opts.fade){m.opacity=h?this.$tip.css("opacity"):0;l.opacity=h?0:this.opacity}this.$tip.css(m).animate(l,this.opts[h?"hideAniDuration":"showAniDuration"])}h?this.$tip.queue(e.proxy(this.reset,this)):this.$tip.css("visibility","inherit");this.$tip.data("active",!i)},disable:function(){this.reset();this.disabled=true},enable:function(){this.disabled=false},destroy:function(){this.reset();this.$tip.remove();delete this.$tip;this.content=null;this.$elm.unbind(".poshytip").removeData("title.poshytip").removeData("poshytip");a.splice(e.inArray(this,a),1)},clearTimeouts:function(){if(this.showTimeout){clearTimeout(this.showTimeout);this.showTimeout=0}if(this.hideTimeout){clearTimeout(this.hideTimeout);this.hideTimeout=0}},calcPos:function(){var n={l:0,t:0,arrow:""},h=e(window),k={l:h.scrollLeft(),t:h.scrollTop(),w:h.width(),h:h.height()},p,j,m,i,q,g;if(this.opts.alignTo=="cursor"){p=j=m=this.eventX;i=q=g=this.eventY}else{var o=this.$elm.offset(),l={l:o.left,t:o.top,w:this.$elm.outerWidth(),h:this.$elm.outerHeight()};p=l.l+(this.opts.alignX!="inner-right"?0:l.w);j=p+Math.floor(l.w/2);m=p+(this.opts.alignX!="inner-left"?l.w:0);i=l.t+(this.opts.alignY!="inner-bottom"?0:l.h);q=i+Math.floor(l.h/2);g=i+(this.opts.alignY!="inner-top"?l.h:0)}switch(this.opts.alignX){case"right":case"inner-left":n.l=m+this.opts.offsetX;if(n.l+this.tipOuterW>k.l+k.w){n.l=k.l+k.w-this.tipOuterW}if(this.opts.alignX=="right"||this.opts.alignY=="center"){n.arrow="left"}break;case"center":n.l=j-Math.floor(this.tipOuterW/2);if(n.l+this.tipOuterW>k.l+k.w){n.l=k.l+k.w-this.tipOuterW}else{if(n.l<k.l){n.l=k.l}}break;default:n.l=p-this.tipOuterW-this.opts.offsetX;if(n.l<k.l){n.l=k.l}if(this.opts.alignX=="left"||this.opts.alignY=="center"){n.arrow="right"}}switch(this.opts.alignY){case"bottom":case"inner-top":n.t=g+this.opts.offsetY;if(!n.arrow||this.opts.alignTo=="cursor"){n.arrow="top"}if(n.t+this.tipOuterH>k.t+k.h){n.t=i-this.tipOuterH-this.opts.offsetY;if(n.arrow=="top"){n.arrow="bottom"}}break;case"center":n.t=q-Math.floor(this.tipOuterH/2);if(n.t+this.tipOuterH>k.t+k.h){n.t=k.t+k.h-this.tipOuterH}else{if(n.t<k.t){n.t=k.t}}break;default:n.t=i-this.tipOuterH-this.opts.offsetY;if(!n.arrow||this.opts.alignTo=="cursor"){n.arrow="bottom"}if(n.t<k.t){n.t=g+this.opts.offsetY;if(n.arrow=="bottom"){n.arrow="top"}}}this.pos=n}};e.fn.poshytip=function(h){if(typeof h=="string"){var g=arguments,k=h;Array.prototype.shift.call(g);if(k=="destroy"){this.die("mouseenter.poshytip").die("focus.poshytip")}return this.each(function(){var l=e(this).data("poshytip");if(l&&l[k]){l[k].apply(l,g)}})}var i=e.extend({},e.fn.poshytip.defaults,h);if(!e("#poshytip-css-"+i.className)[0]){e(['<style id="poshytip-css-',i.className,'" type="text/css">',"div.",i.className,"{visibility:hidden;position:absolute;top:0;left:0;}","div.",i.className," table, div.",i.className," td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;}","div.",i.className," td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:",i.bgImageFrameSize,"px;width:",i.bgImageFrameSize,"px;overflow:hidden;}","div.",i.className," td.tip-right{background-position:100% 0;}","div.",i.className," td.tip-bottom{background-position:100% 100%;}","div.",i.className," td.tip-left{background-position:0 100%;}","div.",i.className," div.tip-inner{background-position:-",i.bgImageFrameSize,"px -",i.bgImageFrameSize,"px;}","div.",i.className," div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}","</style>"].join("")).appendTo("head")}if(i.liveEvents&&i.showOn!="none"){var j=e.extend({},i,{liveEvents:false});switch(i.showOn){case"hover":this.live("mouseenter.poshytip",function(){var l=e(this);if(!l.data("poshytip")){l.poshytip(j).poshytip("mouseenter")}});break;case"focus":this.live("focus.poshytip",function(){var l=e(this);if(!l.data("poshytip")){l.poshytip(j).poshytip("show")}});break}return this}return this.each(function(){new e.Poshytip(this,i)})};e.fn.poshytip.defaults={content:"[title]",className:"tip-yellow",bgImageFrameSize:10,showTimeout:500,hideTimeout:100,timeOnScreen:0,showOn:"hover",liveEvents:false,alignTo:"cursor",alignX:"right",alignY:"top",offsetX:-22,offsetY:18,allowTipHover:true,followCursor:false,fade:true,slide:true,slideOffset:8,showAniDuration:300,hideAniDuration:300,refreshAniDuration:200}})(jQuery);

// // the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {
    

    var CROPONTOLOGY_URL = "http://www.cropontology.org";
    /**
    *  @var oneTime: array used to check if you have jet called the fucntion
    *  @var exclude: var used in openDialog to exclude following call
    */
    var oneTime = [],
          onClick, 
          $elemClicked /* element clicked from table header */,
          $domSelector;
    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than globals
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'ontologyBrowser',
        defaults = {
            propertyName: "value"
        };
/**
 * takes care of assigning proper
 * click events for expanding this li
 */
(function expand_collapse() {
    var div = $(".hitarea");
 
    div.live("click", function() {
 
        var $this = $(this);

        var li = $this.parent();

        var parent = li.find("ul").first();
 
 
        // check whether we need to expand or collapse
        if(li.hasClass("collapsable")) { // collapsing
            li.removeClass("collapsable");
            li.addClass("expandable");
            var hitarea = li.find(".hitarea").first();
            hitarea.removeClass("collapsable-hitarea");
            hitarea.addClass("expandable-hitarea");
            if(li.hasClass("lastCollapsable")) {
                li.removeClass("lastCollapsable");
                li.addClass("lastExpandable");
                hitarea.removeClass("lastCollapsable-hitarea");
                hitarea.addClass("lastExpandable-hitarea");
            }
 
            // let's clear the ul contents
            parent.hide();
 
 
        } else if(li.hasClass("expandable")) { // expanding
            li.removeClass("expandable");
            li.addClass("collapsable");
            var hitarea = li.find(".hitarea").first();
            hitarea.removeClass("expandable-hitarea");
            hitarea.addClass("collapsable-hitarea");
            if(li.hasClass("lastExpandable")) {
                li.removeClass("lastExpandable");
                li.addClass("lastCollapsable");
                hitarea.removeClass("lastExpandable-hitarea");
                hitarea.addClass("lastCollapsable-hitarea");
            }
 
            // if parent contains a filled UL, dont run the ajax call again, just show it
            if(parent.children().length) {
                parent.show();
            } else {
 
                var id = li.find(".id").val();
                
                if($this.hasClass("ontology-hitarea")) {
                    load_branch(parent, "/get-ontology-roots/"+id+"?callback=?");
                } else {                   
                    load_branch(parent, "/get-children/"+id+"?callback=?");
                }
                
            }
 
        }
 
    });
})();
    // The actual plugin constructor
function Plugin( element) {
    this.element = element;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
}

/**
 * @return: build the dialog calling varius function to create the tree
 */
function openDialog($elem) {
    var exclude = $elem['context'].textContent;
    if (oneTime.indexOf(exclude)==-1 || !document.getElementsByClassName('tip_form').length){
        $elem.poshytip({
            className: 'tip_form',
            showTimeout: 1,
            showOn: 'none',
            alignTo: 'target',
            alignX: 'inner-left',
            offsetY: 0,
            allowTipHover: true,
            fade: false,
            slide: false,
            content: function(updateCallback) {
                search($elem.text(), function(data) { 
                    var content = "";
                    if(!data) {
                        listOntologies(updateCallback);
                        //updateCallback("Error : Access to restricted URI denied");
                    } else if(data.length) {
                        buildOntologyTree(data, $elem.text(), updateCallback);
                    } else {
                        listOntologies(updateCallback);
                    }
                });
                return 'Loading...';
            }
        });
        $elem.poshytip('show');
        oneTime.push(exclude);
    }
}       
    
function search(text, callback) {
    if(text.indexOf("[")!=-1)
        text = text.substring(0, text.indexOf(" ["))
    $.getJSON(CROPONTOLOGY_URL + "/search?callback=?&q=" + text, callback)
        .error(function(){ 
            callback(false);  
        });
}

function bindClick(elem){
    if(document.getElementsByClassName("tip_form")[0])
        closeDialog();
    $elemClicked = $(elem);
    var $el = $(elem);
    openDialog($el);
    /*$elemClicked.click(function(e){ 
        $elemClicked = $el;
        openDialog($el);
    })*/
}
    /**
 *
 * @returns a jquery dom element
 */
var i = 0;
function makeLi(obj, last) {
    // generic attributes
    if(obj.ontology_id) {
        // is an ontology
        var id = obj.ontology_id;
        var name = obj.ontology_name;
        var label = obj.label;
        var summary = obj.ontology_summary;
        var has_children = true;
    } else {
        var id = obj.id;
        var name = obj.name;
        var label = obj.label;
        var summary = obj.name;
        var has_children = obj.has_children;
    }
    var relationship = obj.relationship,
        hitarea;
        //has_method = (!obj.has_children && obj.method && obj.method !== "null");

    var li = $("<li id='"+id+"li'></li>");
    if(last)
        li.addClass("last");
 
    // add a hidden input to track the id of this node
    li.append('<input type="hidden" class="id" value="'+id+'" />');
 
    if(has_children){
        li.addClass("expandable");
        hitarea = $('<div class="hitarea expandable-hitarea"></div>'); 
        if(obj.ontology_id) hitarea.addClass("ontology-hitarea");

        li.append(hitarea);
    } 
   
    if(last && (has_children)) {
        li.addClass("lastExpandable");
        hitarea.addClass("lastExpandable-hitarea");
    }
    var idc = id+"A"+i;
    i++;
    var link = $('<a title="'+summary+'" class="minibutton btn-watch" id="'+idc+'"><span id="'+id+'">'+name+'</span></a>');
    link.click(function(){
        $.getJSON(CROPONTOLOGY_URL + "/get-attributes/"+id+"?callback=?", function(data){
            openDetails(data, id, name);
        });
        // close the details modal on next click
        jQuery.prompt.close();
    });
    li.append(link);
    
    if (!has_children){
//    if(relationship=='is_a'){
        var selectArea = $('<span class="selection"><- use</span>');
        selectArea.attr('onMouseOver','document.getElementById("'+idc+'").className="minibutton choosing"');
        selectArea.attr('onMouseOut','document.getElementById("'+idc+'").className="minibutton btn-watch"');
        selectArea.click(function(){
            // close the details modal when click on use button
            jQuery.prompt.close();
            onClick(id, name, $elemClicked);
            closeDialog();
        });
        li.append(selectArea)
        li.addClass("leaf");
    }

    if(relationship) {
        var rel = $("<span class='relationship "+relationship+"' title='"+relationship+"'>"+relationship+"</span>");

     //   li.append(rel);

    }
 
    if(label)
        li.append('<div class="meta">'+label+'</div>');
 
    // last child
    if(has_children){
        li.append('<ul style="display:none;"></ul>');
 
        // assign click events for expansion/collapse
        //expand_collapse(li);
    }

    // if it's the last leaf node and it has a method
    // just show it as a child
//    if(has_method) { 
   //     li.append(methodScale(obj));
   // }
    return li;
}

function closeDialog(){
    //document.body.removeChild(document.getElementsByClassName('tip_form')[0]);
    //$(".tip_form").remove();
    $elemClicked.poshytip('hide');
}

/**
 * @input par-> the parameter to search
 * @return the ontology tree if find something, otherwise the ontologies list 
 */
function searchForm(par){
    $elemClicked.poshytip('update', function(updateCallback) {
                search(par['target'].value, function(data) { 
                if(data.length) {
                        buildOntologyTree(data, par['target'].value, updateCallback);
                    } else {
                        listOntologies(updateCallback);
                    }
                });
                return 'Loading...';
        });
 }
 
    /**
     * @input: arr -> build the tree from the list of term
     * @return: the tree html
     */
function buildOntologyTree(searchResult, searchValue, updateCallback){
        var $html = $("<div></div>");
        var close = $("<div class='close'>close X</div>");
        close.click(function(){
            closeDialog();
            // close the details modal when click on use button
            jQuery.prompt.close();
        });
        $html.append(close);
        var $searchForm = $('<input type="text" tabindex="0" placeholder="'+searchValue+'" name="q" id="search" autocomplete="off" class="ac_input" >');
        $searchForm.bind('keypress', function(e){
            if(e.keyCode == 13)
                searchForm(e);
        });
        $html.append($searchForm);
        for (var i=0; i<searchResult.length; i++){ // for each search result
            var term = searchResult[i];
            $.getJSON(CROPONTOLOGY_URL + "/get-term-parents/" +term.id + "?callback=?", function(data) {
                var $root = $("<div></div>");
                for(var x=0; x<data.length; x++) { // for each relationship
                    var parent;
                    var li;
                    for(var i=0; i<data[x].length; i++) { // from parent to child
                        var el = data[x][i];
                        el.has_children = true;

// deleting this you are supposing that the element you look for is NOT the last element
                        if(i == (data[x].length-1))
                            el.has_children = false;
                        var elemId = el.id.replace(":","");
                        if (i == 0 && !$root.hasClass(elemId)) {
                            $root.attr('class', "treeview "+elemId);
                            if ($("."+elemId).length) {
                                $root =  $("."+elemId).append($("<ul></ul>")); 
                                parent = $root.find("ul:first");
                                continue; 
                            }
                            else
                                parent = $root;
                        }
                        else if(i == 0 && $root.hasClass(elemId)) {
                            parent = $root.find("ul:first");
                            continue;                         
                        } 
                        if (i==1 && el.has_children && x!=(data.length-1))
                            li = makeLi(el, false);
                        else 
                            li = makeLi(el, true);
                        // if(!parent.hasClass(elemId))
                        parent.append(li);
                        // parent becomes the first ul inside this li
                        parent = li.find("ul:first");
                        parent.show();   
                    }  
                }

                $html.append($root)
                updateCallback($html);
            });
        }
    }

    /**
     * @input: data -> json from get-ontologies
     * @return: the tree with all ontologies
     */
function listOntologies(updateCallback){
      //  return $.getJSON("http://www.cropontology.org/get-ontologies?callback=?", listOntologiesCallback);
        var $html = $("<div></div>");
        // search 
        var close = $("<div class='close'>close X</div>");
        close.click(function(){
            closeDialog();
            // close the details modal when click on use button
            jQuery.prompt.close();
        });
        $html.append(close);
        var $searchForm = $('<input type="text" tabindex="0" placeholder="Search" name="q" id="search" autocomplete="off" class="ac_input" >');
        $searchForm.bind('keypress', function(e){
            if(e.keyCode == 13)
                searchForm(e);
        });
        $html.append($searchForm);
        $.getJSON("http://www.cropontology.org/get-ontologies?callback=?", function(data) {
            var $root = $("<ul class='treeview'></ul>");
            var obj = JSON.stringify(data, function(key, value){
                if (typeof value==='object')
                    $.each(value, function(i,arr){
                        for(var i=0; i<arr.length; i++){
                            var parent = $root;
                            var li;
                            var el = arr[i];
                            li = makeLi(el, true);
                            parent.append(li);
                            parent = li.find("ul:first");
                            parent.show();
                        }
                       
                    });
            });
            $html.append($root);
            updateCallback($html);
        });
    }

/**
 * @return: return the id of the element clicked
 */
function callbackOnClick(e){
    e.preventDefault();
    e.stopPropagation();
    window.open("http://www.cropontology.org/terms/"+e.target.attributes['id'].value+"/");
}

/**
 * print the loader gif during the loading
 */
function loader(parent, show){
    var jimg = $("<img>").attr("src", "images/metabox_loader.gif");
    if(show) {
        jimg.insertBefore(parent);
    } else { // hide
        $(parent).prev().remove();
    }
}

/**
 * create the modal with the details
 * @input: json -> the json from get-attributes
 * @input: id -> the id of the element clicked
 * @input: name -> the name of the element clicked
 * 
 * @return the modal with the details
 */
function openDetails(json, id, name){
    var $details = $("<div></div>");
    var $name = $("<h3 class='attributes'>"+name+"</h3>");
    $details.append($name);
    var $id= $("<div class='attributes'><label class='details'>Identifier</label><span class='details'>"+id+"</span></div>");
    $details.append($id);
    var obj = JSON.stringify(json, function(key, value){
                if (typeof value==='object')
                    $.each(value, function(i,arr){
                        var $attr = $("<div class='attributes'></div>");
                        var $label = $("<label class='details'>"+arr.key+"</label>");
                        $attr.append($label);
                        var $span = $("<span class='details'>"+arr.value+"</span>");
                        $attr.append($span);
                        $details.append($attr);
                    });
                
                });
    // call modal
    $.prompt($details.html(),{opacity: 0, persistent:false});
    
}
/*
 * loads a single branch given an array of objects
 * @parent - the container of the branch, a jquery DOM element; 
 *           this gets populated with the elements
 * @url - the json array of objects to do an AJAX request to
 */
function load_branch(parent, url) {
    var obj, li;
    // insert before the parent a loading image
    loader(parent, true);
    parent.show();
    $.getJSON(CROPONTOLOGY_URL+url, function(children) {      
        for(var i=0,len=children.length; i<len; i++) {
            var child = children[i];
            var last = false;
            if(i == (children.length-1))
                last = true;
            // check if parent of current branch has root
            if(parent.parent().find(".ontology-hitarea").length) {
                child.has_children = true;
            }
            var li = makeLi(child, last);
            parent.append(li);          
        }      
        loader(parent, false);
    });
}

   
    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and the options via the instance, 
        // e.g., this.element and this.options
        //bindClick(this.element);
    };
    
    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function (cb) { 
        $(this.selector).live("click", function() {bindClick(this);})
        onClick = cb;
        $domSelector = this;
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this));
            }
        }); 
    }
    $[pluginName] = { 
       search: search,
       buildOntologyTree: buildOntologyTree,
       openDialog: openDialog,
       bindClick: bindClick
    }

})( jQuery, window, document );
