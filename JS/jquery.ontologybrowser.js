	/*
	 * Poshy Tip jQuery plugin v1.1+
	 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
	 * Copyright 2010-2011, Vasil Dinkov, http://vadikom.com/
	 */
	(function(e){var a=[],d=/^url\(["']?([^"'\)]*)["']?\);?$/i,c=/\.png$/i,b=e.browser.msie&&e.browser.version==6;function f(){e.each(a,function(){this.refresh(true)})}e(window).resize(f);e.Poshytip=function(h,g){this.$elm=e(h);this.opts=e.extend({},e.fn.poshytip.defaults,g);this.$tip=e(['<div class="',this.opts.className,'">','<div class="tip-inner tip-bg-image"></div>','<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',"</div>"].join("")).appendTo(document.body);this.$arrow=this.$tip.find("div.tip-arrow");this.$inner=this.$tip.find("div.tip-inner");this.disabled=false;this.content=null;this.init()};e.Poshytip.prototype={init:function(){a.push(this);var g=this.$elm.attr("title");this.$elm.data("title.poshytip",g!==undefined?g:null).data("poshytip",this);if(this.opts.showOn!="none"){this.$elm.bind({"mouseenter.poshytip":e.proxy(this.mouseenter,this),"mouseleave.poshytip":e.proxy(this.mouseleave,this)});switch(this.opts.showOn){case"hover":if(this.opts.alignTo=="cursor"){this.$elm.bind("mousemove.poshytip",e.proxy(this.mousemove,this))}if(this.opts.allowTipHover){this.$tip.hover(e.proxy(this.clearTimeouts,this),e.proxy(this.mouseleave,this))}break;case"focus":this.$elm.bind({"focus.poshytip":e.proxy(this.show,this),"blur.poshytip":e.proxy(this.hide,this)});break}}},mouseenter:function(g){if(this.disabled){return true}this.$elm.attr("title","");if(this.opts.showOn=="focus"){return true}this.clearTimeouts();this.showTimeout=setTimeout(e.proxy(this.show,this),this.opts.showTimeout)},mouseleave:function(g){if(this.disabled||this.asyncAnimating&&(this.$tip[0]===g.relatedTarget||jQuery.contains(this.$tip[0],g.relatedTarget))){return true}var h=this.$elm.data("title.poshytip");if(h!==null){this.$elm.attr("title",h)}if(this.opts.showOn=="focus"){return true}this.clearTimeouts();this.hideTimeout=setTimeout(e.proxy(this.hide,this),this.opts.hideTimeout)},mousemove:function(g){if(this.disabled){return true}this.eventX=g.pageX;this.eventY=g.pageY;if(this.opts.followCursor&&this.$tip.data("active")){this.calcPos();this.$tip.css({left:this.pos.l,top:this.pos.t});if(this.pos.arrow){this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow}}},show:function(){if(this.disabled||this.$tip.data("active")){return}this.reset();this.update();this.display();if(this.opts.timeOnScreen){this.clearTimeouts();this.hideTimeout=setTimeout(e.proxy(this.hide,this),this.opts.timeOnScreen)}},hide:function(){if(this.disabled||!this.$tip.data("active")){return}this.display(true)},reset:function(){this.$tip.queue([]).detach().css("visibility","hidden").data("active",false);this.$inner.find("*").poshytip("hide");if(this.opts.fade){this.$tip.css("opacity",this.opacity)}this.$arrow[0].className="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left";this.asyncAnimating=false},update:function(j,k){if(this.disabled){return}var i=j!==undefined;if(i){if(!k){this.opts.content=j}if(!this.$tip.data("active")){return}}else{j=this.opts.content}var h=this,g=typeof j=="function"?j.call(this.$elm[0],function(l){h.update(l)}):j=="[title]"?this.$elm.data("title.poshytip"):j;if(this.content!==g){this.$inner.empty().append(g);this.content=g}this.refresh(i)},refresh:function(h){if(this.disabled){return}if(h){if(!this.$tip.data("active")){return}var k={left:this.$tip.css("left"),top:this.$tip.css("top")}}this.$tip.css({left:0,top:0}).appendTo(document.body);if(this.opacity===undefined){this.opacity=this.$tip.css("opacity")}var l=this.$tip.css("background-image").match(d),m=this.$arrow.css("background-image").match(d);if(l){var i=c.test(l[1]);if(b&&i){this.$tip.css("background-image","none");this.$inner.css({margin:0,border:0,padding:0});l=i=false}else{this.$tip.prepend('<table border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>').css({border:0,padding:0,"background-image":"none","background-color":"transparent"}).find(".tip-bg-image").css("background-image",'url("'+l[1]+'")').end().find("td").eq(3).append(this.$inner)}if(i&&!e.support.opacity){this.opts.fade=false}}if(m&&!e.support.opacity){if(b&&c.test(m[1])){m=false;this.$arrow.css("background-image","none")}this.opts.fade=false}var o=this.$tip.find("table");if(b){this.$tip[0].style.width="";o.width("auto").find("td").eq(3).width("auto");var n=this.$tip.width(),j=parseInt(this.$tip.css("min-width")),g=parseInt(this.$tip.css("max-width"));if(!isNaN(j)&&n<j){n=j}else{if(!isNaN(g)&&n>g){n=g}}this.$tip.add(o).width(n).eq(0).find("td").eq(3).width("100%")}else{if(o[0]){o.width("auto").find("td").eq(3).width("auto").end().end().width(document.defaultView&&document.defaultView.getComputedStyle&&parseFloat(document.defaultView.getComputedStyle(this.$tip[0],null).width)||this.$tip.width()).find("td").eq(3).width("100%")}}this.tipOuterW=this.$tip.outerWidth();this.tipOuterH=this.$tip.outerHeight();this.calcPos();if(m&&this.pos.arrow){this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow;this.$arrow.css("visibility","inherit")}if(h&&this.opts.refreshAniDuration){this.asyncAnimating=true;var p=this;this.$tip.css(k).animate({left:this.pos.l,top:this.pos.t},this.opts.refreshAniDuration,function(){p.asyncAnimating=false})}else{this.$tip.css({left:this.pos.l,top:this.pos.t})}},display:function(h){var i=this.$tip.data("active");if(i&&!h||!i&&h){return}this.$tip.stop();if((this.opts.slide&&this.pos.arrow||this.opts.fade)&&(h&&this.opts.hideAniDuration||!h&&this.opts.showAniDuration)){var m={},l={};if(this.opts.slide&&this.pos.arrow){var k,g;if(this.pos.arrow=="bottom"||this.pos.arrow=="top"){k="top";g="bottom"}else{k="left";g="right"}var j=parseInt(this.$tip.css(k));m[k]=j+(h?0:(this.pos.arrow==g?-this.opts.slideOffset:this.opts.slideOffset));l[k]=j+(h?(this.pos.arrow==g?this.opts.slideOffset:-this.opts.slideOffset):0)+"px"}if(this.opts.fade){m.opacity=h?this.$tip.css("opacity"):0;l.opacity=h?0:this.opacity}this.$tip.css(m).animate(l,this.opts[h?"hideAniDuration":"showAniDuration"])}h?this.$tip.queue(e.proxy(this.reset,this)):this.$tip.css("visibility","inherit");this.$tip.data("active",!i)},disable:function(){this.reset();this.disabled=true},enable:function(){this.disabled=false},destroy:function(){this.reset();this.$tip.remove();delete this.$tip;this.content=null;this.$elm.unbind(".poshytip").removeData("title.poshytip").removeData("poshytip");a.splice(e.inArray(this,a),1)},clearTimeouts:function(){if(this.showTimeout){clearTimeout(this.showTimeout);this.showTimeout=0}if(this.hideTimeout){clearTimeout(this.hideTimeout);this.hideTimeout=0}},calcPos:function(){var n={l:0,t:0,arrow:""},h=e(window),k={l:h.scrollLeft(),t:h.scrollTop(),w:h.width(),h:h.height()},p,j,m,i,q,g;if(this.opts.alignTo=="cursor"){p=j=m=this.eventX;i=q=g=this.eventY}else{var o=this.$elm.offset(),l={l:o.left,t:o.top,w:this.$elm.outerWidth(),h:this.$elm.outerHeight()};p=l.l+(this.opts.alignX!="inner-right"?0:l.w);j=p+Math.floor(l.w/2);m=p+(this.opts.alignX!="inner-left"?l.w:0);i=l.t+(this.opts.alignY!="inner-bottom"?0:l.h);q=i+Math.floor(l.h/2);g=i+(this.opts.alignY!="inner-top"?l.h:0)}switch(this.opts.alignX){case"right":case"inner-left":n.l=m+this.opts.offsetX;if(n.l+this.tipOuterW>k.l+k.w){n.l=k.l+k.w-this.tipOuterW}if(this.opts.alignX=="right"||this.opts.alignY=="center"){n.arrow="left"}break;case"center":n.l=j-Math.floor(this.tipOuterW/2);if(n.l+this.tipOuterW>k.l+k.w){n.l=k.l+k.w-this.tipOuterW}else{if(n.l<k.l){n.l=k.l}}break;default:n.l=p-this.tipOuterW-this.opts.offsetX;if(n.l<k.l){n.l=k.l}if(this.opts.alignX=="left"||this.opts.alignY=="center"){n.arrow="right"}}switch(this.opts.alignY){case"bottom":case"inner-top":n.t=g+this.opts.offsetY;if(!n.arrow||this.opts.alignTo=="cursor"){n.arrow="top"}if(n.t+this.tipOuterH>k.t+k.h){n.t=i-this.tipOuterH-this.opts.offsetY;if(n.arrow=="top"){n.arrow="bottom"}}break;case"center":n.t=q-Math.floor(this.tipOuterH/2);if(n.t+this.tipOuterH>k.t+k.h){n.t=k.t+k.h-this.tipOuterH}else{if(n.t<k.t){n.t=k.t}}break;default:n.t=i-this.tipOuterH-this.opts.offsetY;if(!n.arrow||this.opts.alignTo=="cursor"){n.arrow="bottom"}if(n.t<k.t){n.t=g+this.opts.offsetY;if(n.arrow=="bottom"){n.arrow="top"}}}this.pos=n}};e.fn.poshytip=function(h){if(typeof h=="string"){var g=arguments,k=h;Array.prototype.shift.call(g);if(k=="destroy"){this.die("mouseenter.poshytip").die("focus.poshytip")}return this.each(function(){var l=e(this).data("poshytip");if(l&&l[k]){l[k].apply(l,g)}})}var i=e.extend({},e.fn.poshytip.defaults,h);if(!e("#poshytip-css-"+i.className)[0]){e(['<style id="poshytip-css-',i.className,'" type="text/css">',"div.",i.className,"{visibility:hidden;position:absolute;top:0;left:0;}","div.",i.className," table, div.",i.className," td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;}","div.",i.className," td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:",i.bgImageFrameSize,"px;width:",i.bgImageFrameSize,"px;overflow:hidden;}","div.",i.className," td.tip-right{background-position:100% 0;}","div.",i.className," td.tip-bottom{background-position:100% 100%;}","div.",i.className," td.tip-left{background-position:0 100%;}","div.",i.className," div.tip-inner{background-position:-",i.bgImageFrameSize,"px -",i.bgImageFrameSize,"px;}","div.",i.className," div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}","</style>"].join("")).appendTo("head")}if(i.liveEvents&&i.showOn!="none"){var j=e.extend({},i,{liveEvents:false});switch(i.showOn){case"hover":this.live("mouseenter.poshytip",function(){var l=e(this);if(!l.data("poshytip")){l.poshytip(j).poshytip("mouseenter")}});break;case"focus":this.live("focus.poshytip",function(){var l=e(this);if(!l.data("poshytip")){l.poshytip(j).poshytip("show")}});break}return this}return this.each(function(){new e.Poshytip(this,i)})};e.fn.poshytip.defaults={content:"[title]",className:"tip-yellow",bgImageFrameSize:10,showTimeout:500,hideTimeout:100,timeOnScreen:0,showOn:"hover",liveEvents:false,alignTo:"cursor",alignX:"right",alignY:"top",offsetX:-22,offsetY:18,allowTipHover:true,followCursor:false,fade:true,slide:true,slideOffset:8,showAniDuration:300,hideAniDuration:300,refreshAniDuration:200}})(jQuery);
	
	// // the semi-colon before function invocation is a safety net against concatenated 
	// scripts and/or other plugins which may not be closed properly.
	;(function ( $, window, document, undefined ) {
	    
	
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
	    if ( !$('.tip_form').length){
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
	                    if(!data[kAPI_DATA_RESPONSE]) {
	                        //buildListOntologiesList(null, $elem.text(), updateCallback);
	                        buildOntologyList(Array, $elem.text(), true, updateCallback);
	                    } else if(!data[kAPI_DATA_RESPONSE][0][kTAG_KIND] || data[kAPI_DATA_RESPONSE].length && data[kAPI_DATA_RESPONSE][0][kTAG_KIND][1] !=kTYPE_ROOT) {
	                        buildOntologyList(data[kAPI_DATA_RESPONSE], $elem.text(), false, updateCallback);
	                    } else {
	                        //buildListOntologiesList(data[kAPI_DATA_RESPONSE][0], $elem.text(), updateCallback);
	                        buildOntologyList(data[kAPI_DATA_RESPONSE], $elem.text(), true, updateCallback);
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
		
		var queryID = '{"'+kOPERATOR_AND+'":[{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_LID+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_EQUAL+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_BINARY+'","'+kAPI_QUERY_DATA+'":{"'+kTAG_TYPE+'":"'+kTYPE_BINARY+'", "'+kTAG_DATA+'":"'+md5(text)+'"}},{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_NODE+'", "'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_NOT_NULL+'"}]}';
		var queryCode = '{"'+kOPERATOR_AND+'":[{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_CODE+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_EQUAL+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_STRING+'","'+kAPI_QUERY_DATA+'":"'+text+'"},{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_NODE+'", "'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_NOT_NULL+'"}]}';
		var queryName = '{"'+kOPERATOR_AND+'":[{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_NAME+':'+kTAG_DATA+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_CONTAINS_NOCASE+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_STRING+'","'+kAPI_QUERY_DATA+'":"'+text.toLowerCase()+'"}]}'
		
		var query = '['+queryID+','+queryCode+','+queryName+']';

        // var queryGID = '{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_GID+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_EQUAL+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_STRING+'","'+kAPI_QUERY_DATA+'":"'+text+'"}';
		// var queryCode = '{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_CODE+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_EQUAL+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_STRING+'","'+kAPI_QUERY_DATA+'":"'+text+'"}';
		// var queryName = '{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_NAME+'.'+kTAG_DATA+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_CONTAINS_NOCASE+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_STRING+'","'+kAPI_QUERY_DATA+'":"'+text.toLowerCase()+'"}';
// 		
		// var query = '['+queryGID+','+queryCode+','+queryName+']';
		
	    $.getJSON(CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_MATCH+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_DATA_QUERY+'='+query, callback)
	        .error(function(){ 
	            callback(false);  
	        });
	}
	
	function bindClick(elem){
	    if($(".tip_form")[0])
	        closeDialog();
	    $elemClicked = $(elem);
	    var $el = $(elem);
	    openDialog($el);
	    /*$elemClicked.click(function(e){ 
	        $elemClicked = $el;
	        openDialog($el);
	    })*/
	}
	
	function closeDialog(){
	    //document.body.removeChild(document.getElementsByClassName('tip_form')[0]);
	    //$(".tip_form").remove();
	    $('#infovis').children().remove();
	    $('#working_area').append($('#center-container').css("display","none"));
	    $elemClicked.poshytip('hide');
	}

	/**
	 * @param par-> the parameter to search
	 * @return the ontology tree if find something, otherwise the ontologies list 
	 */
	function searchForm(par){
		jQuery.prompt.close();
		$('#infovis').children().remove();
    	$('#working_area').append($('#center-container').css("display","none"));

	    $elemClicked.poshytip('update', function(updateCallback) {
	    	var searchValue = (typeof(par)=='object') ? par['target'].value : par;
            search(searchValue, function(data) { 
            	if(par==''){
            		buildOntologyList(Array, searchValue, true, updateCallback);
            	}
            	else if(!data[kAPI_DATA_RESPONSE]) {
                    buildOntologyList(Array, searchValue, true, updateCallback);
                } else if(!data[kAPI_DATA_RESPONSE][0][kTAG_KIND] || data[kAPI_DATA_RESPONSE].length && data[kAPI_DATA_RESPONSE][0][kTAG_KIND][1] !=kTYPE_ROOT) {
                    buildOntologyList(data[kAPI_DATA_RESPONSE], searchValue, false, updateCallback);
                } else {
                    buildOntologyList(data[kAPI_DATA_RESPONSE], searchValue, true, updateCallback);
                }
            });
            return 'Loading...';
	        });
	 }
 
 	/**
 	 * navigate the ontology with the graph
 	 * @param	string -> the value to look for
 	 * @return	graph displayed
 	 */
 	function buildOntologyGraph(searchResult, searchValue, isRoot, updateCallback){
        var $html = $("<div></div>");
        var close = $("<div class='close'>close X</div>");
        close.click(function(){
            closeDialog();
            // close the details modal when click on use button
            jQuery.prompt.close();
        });
        $html.append(close);
        
        var list = $("<div class='neo4j'>view as list</div>");
        list.click(function(){
        	jQuery.prompt.close();
        	$('#infovis').children().remove();
	    	$('#working_area').append($('#center-container').css("display","none"));
        	buildOntologyList(searchResult, searchValue, isRoot, updateCallback);
        });
        $html.append(list)
		/*
        if(searchResult.length==1){
			var tree = $("<div class='tree'>view as tree</div>");
	        tree.click(function(){
	            jQuery.prompt.close();			// close the details modal when click on use button 
	        	$('#infovis').children().remove();
	    		$('#working_area').append($('#center-container').css("display","none"));
	        	buildOntologyTree(searchResult, searchValue, isRoot, updateCallback, $html);			// open the graph view
	        });
	        $html.append(tree);
       	}
       	*/    
        var $searchForm = $('<input type="text" tabindex="0" placeholder="'+searchValue+'" name="q" id="search" autocomplete="off" class="ac_input" >');
        $searchForm.bind('keypress', function(e){
            if(e.keyCode == 13)
                searchForm(e);
        });
        $html.append('<br>');
        $html.append($searchForm);
        
        var $root = $('#infovis');
        
        for (var i=0; i<searchResult.length; i++){ // for each search result
            var term = searchResult[i];
			var count = 0;
			var last;
			var jsonString;
			function initGraph(){
				if(isRoot){
					if(term != null){
						var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_NODES+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+term[kTAG_NODE]+']';
					}
					else{
						var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_ROOTS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER;
					}
				}
				else{
					var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_RELS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+term[kTAG_NODE]+']&'+kAPI_OPT_DIRECTION+'='+kAPI_DIRECTION_OUT+'&'+kAPI_OPT_LEVELS+'=-1';
				}
			    $.getJSON(getJson, function(data){
					count++;
					last = (count==searchResult.length);
					var unique = (count==1 && last)
					if(count == 1){
						jsonString = (unique) ? normalizeGraph(data, searchValue) : normalizeGraph(data, searchValue)+",";
					}
					else{
						if(last){
							jsonString += normalizeGraph(data, searchValue);
						}
						else{
							jsonString += normalizeGraph(data, searchValue)+",";
						}
					}
					if(last){
						var lastString = "["+jsonString+"]";
						var jsonGraph = jQuery.parseJSON(lastString);
					}
					
					
				    $jit.ForceDirected.Plot.EdgeTypes.implement({  
					    'labeled-arrow': {
					      'render': function(adj, canvas) {
					        //plot arrow edge
					        this.edgeTypes.arrow.render.call(this, adj, canvas);
					        //get nodes cartesian coordinates
					        var pos = adj.nodeFrom.pos.getc(true);
					        var posChild = adj.nodeTo.pos.getc(true);
							
					        //check for edge label in data
					        var data = adj.data;
					        if(data.$labelid && data.$labeltext) {
					
					          //if the label doesn't exist create it and append it to the label container
					          var domlabel = document.getElementById(data.$labelid);
					          if(!domlabel) {
					            domlabel = document.createElement('span');
					            domlabel.id = data.$labelid;
					            domlabel.className = 'arrow-label';
					            domlabel.innerHTML = data.$labeltext;
					
					            //if defined set same color as edge
					            if(data.$color) {
					              domlabel.style.color = data.$color;
					            }
					            //append the label to the labelcontainer
					            this.labels.getLabelContainer().appendChild(domlabel);
					          }
					
					          //now adjust the label placement
					          var ox = canvas.translateOffsetX,
					              oy = canvas.translateOffsetY,
					              sx = canvas.scaleOffsetX,
					              sy = canvas.scaleOffsetY,
					              posx = (pos.x + posChild.x) / 2 * sx + ox,
					              posy = (pos.y + posChild.y) / 2 * sy + oy,
					              s = canvas.getSize();
					
					          var labelPos = {
					              x: Math.round(posx - domlabel.offsetWidth / 2 + s.width / 2),
					              y: Math.round(posy - domlabel.offsetHeight / 2 + s.height / 2)
					          };
							  // set the style
					          domlabel.style.left = labelPos.x + 'px';
					          domlabel.style.top = labelPos.y + 'px';
					          domlabel.style.position = "absolute";
					          
					          // set the onclick event
					          domlabel.style.cursor = "pointer";
					          domlabel.onclick = function(e){
								e.preventDefault();
								e.stopPropagation();
					          	openDetails($(this).text())
					          };
					        }
					      }
				    } 
				  });
				  // init ForceDirected
				  var fd = new $jit.ForceDirected({
				    //id of the visualization container
				    injectInto: 'infovis',
				    //Enable zooming and panning
				    //with scrolling and DnD
				    Navigation: {
				      enable: true,
				      type: 'Native',
				      //Enable panning events only if we're dragging the empty
				      //canvas (and not a node).
				      panning: 'avoid nodes',
				      zooming: 10 //zoom speed. higher is more sensible
				    },
				    // Change node and edge styles such as
				    // color and width.
				    // These properties are also set per node
				    // with dollar prefixed data-properties in the
				    // JSON structure.
				    Node: {
				      overridable: true,
				      dim: 7
				    },
				    Edge: {
				      overridable: true,
				      color: '#23A4FF',
				      lineWidth: 0.4
				    },
				    // Add node events
				    Events: {
				      enable: true,
				      type: 'Native',
				      //Change cursor style when hovering a node
				      onMouseEnter: function() {
				        fd.canvas.getElement().style.cursor = 'move';
				      },
				      onMouseLeave: function() {
				        fd.canvas.getElement().style.cursor = '';
				      },
				      //Update node positions when dragged
				      onDragMove: function(node, eventInfo, e) {
				        var pos = eventInfo.getPos();
				        node.pos.setc(pos.x, pos.y);
				        fd.plot();
				      },
				      //Implement the same handler for touchscreens
				      onTouchMove: function(node, eventInfo, e) {
				        $jit.util.event.stop(e); //stop default touchmove event
				        this.onDragMove(node, eventInfo, e);
				      }
				    },
				    //Number of iterations for the FD algorithm
				    iterations: 200,
				    //Edge length
				    levelDistance: 130,
				    // This method is only triggered
				    // on label creation and only for DOM labels (not native canvas ones).
				    onCreateLabel: function(domElement, node){
				      // Create a 'name' and 'close' buttons and add them
				      // to the main node label
				      var nameContainer = document.createElement('span'),
				          useButton = $('<span></span>');
				          detailsButton = $('<span></span>');
				          style = nameContainer.style;
				      nameContainer.className = 'name';
				      nameContainer.innerHTML = node.name;
				      //useButton.className = 'use';
				      useButton.attr('class', 'useGraph');
				      var useButtonValue = (node.data.$type=='triangle') ? 'use' : 'search';
					  useButton.append(useButtonValue);
					  useButton.css("cursor","pointer");
					  useButton.click(function(e){
					  	e.preventDefault();
						e.stopPropagation();
				      	var nameNode = node.name;
						if(node.data.$type=='triangle'){
							jQuery.prompt.close();
				            onClick(node.id, node.data.$gid, $elemClicked);
				            closeDialog();
						}
						else{
							searchForm(nameNode);
						}
					  })
				 	  detailsButton.attr('class', 'detailsGraph');
					  detailsButton.append('details ,');
					  detailsButton.css("cursor","pointer");
					  detailsButton.click(function(e){
							e.preventDefault();
							e.stopPropagation();
					  		openDetails(node.data.$gid)
					  })
				      domElement.appendChild(nameContainer);
				      $(domElement).append("<br>").append(detailsButton).append(useButton);
				      style.fontSize = "10px";
				      style.color = "#ddd";
				      //Fade the node and its connections when
				      //clicking the close button
				      //Toggle a node selection when clicking
				      //its name. This is done by animating some
				      //node styles like its dimension and the color
				      //and lineWidth of its adjacencies.
	      		if(nameContainer.innerHTML.indexOf("nodes") == -1)
	      		nameContainer.onclick = function() {
				    $.getJSON(CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_RELS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+node.id+']&'+kAPI_OPT_DIRECTION+'='+kAPI_DIRECTION_IN, function(dataChild){
					        //set final styles
					        fd.graph.eachNode(function(n) {
					          if(n.id != node.id) delete n.selected;
					          n.setData('dim', 7, 'end');
					          n.eachAdjacency(function(adj) {
					            adj.setDataset('end', {
					              lineWidth: 0.4,
					              color: '#23a4ff'
					            });
					          });
					        });
					        if(!node.selected) {
					          node.selected = true;
					          node.setData('dim', 17, 'end');
					          node.eachAdjacency(function(adj) {
					          	adj.setDataset('end', {
					              lineWidth: 3,
					              color: '#36acfb'
					            });
					          });
					        } else {
					          delete node.selected;
					        }
					        if(dataChild._status.affected > 50){
					        	var count = dataChild._status.affected;
					        	var multi = {id:'multi', name:count+" nodes", data:{"$color": "#C74243","$type": "star"}};
					        	fd.graph.addNode(multi);
					        	fd.graph.addAdjacence(node,multi, {"$type": "labeled-arrow","$labeltext": ":ENUM-OF","$labelid": "multiVaue","$direction":true});
					        	fd.refresh();
					        	$("div#multi").children(".detailsGraph").remove();
					        	$("div#multi").children(".useGraph").remove();
					        	var exclude = Array();
					        	exclude.push(node.id)
					        	$("div#multi").click(function(e){
					        		e.preventDefault();
					        		e.stopPropagation();
					        		openChildren(dataChild._response, exclude, fd, node, count);
					        	})
					        	var subGraph = jQuery.parseJSON("["+normalizeGraph(dataChild, node.name)+"]");
					        	fd.op.sum(subGraph, {
						          type: 'fade:seq',
						          duration: 100,
						          hideLabels: false,
						          transition: $jit.Trans.Quart.easeOut
						        });
						        // fd.op.contract(node, {
					        		// type: 'animate',
						          	// duration: 100,
						          	// hideLabels: false,
						          	// transition: $jit.Trans.Quart.easeOut
						        // })
						        // fd.refresh();
						        // var newSpan = $("<span></span>");
						        // newSpan.attr('class', 'childs');
						        // newSpan.append("viewChilds");
						        // var exclude = Array();
					        	// exclude.push(node.id);
					        	// var count = dataChild._status.affected;
						        // newSpan.click(function(){
						        	// console.log(node)
						        	// // fd.op.expand(node, {
						        		// // type: 'animate',
							          	// // duration: 100,
							          	// // hideLabels: false,
							          	// // transition: $jit.Trans.Quart.easeOut
						        	// // })
						        	// openChildren(dataChild._response, exclude, fd, node, count);
						        // })
						        // fd.fx.plot();
						        // $("#"+node.id).append("<br>").append(newSpan);
					        }
					        else{
								var subGraph = jQuery.parseJSON("["+normalizeGraph(dataChild, node.name)+"]");
						        //trigger animation to final styles
						        fd.fx.animate({
						          modes: ['node-property:dim',
						                  'edge-property:lineWidth:color'],
						          duration: 500
						        });
					        	// add new node from a new json	
					        	fd.op.sum(subGraph, {
						          type: 'fade:seq',
						          duration: 100,
						          hideLabels: false,
						          transition: $jit.Trans.Quart.easeOut
						        });
					       	}
					     })
				      };
				    },
				    // Change node styles when DOM labels are placed or moved.
				    onPlaceLabel: function(domElement, node){
				      var style = domElement.style;
				      var left = parseInt(style.left);
				      var top = parseInt(style.top);
				      var w = domElement.offsetWidth;
				      style.left = (left - w / 2) + 'px';
				      style.top = (top + 10) + 'px';
				      style.display = '';
				    }
				  });
				  if(last){
					  // load JSON data.
					  fd.loadJSON(jsonGraph);
					  // compute positions incrementally and animate.
					  fd.computeIncremental({
					    iter: 40,
					    property: 'end',
					    onComplete: function(){
					      fd.animate({
					        modes: ['linear'],
					        transition: $jit.Trans.Elastic.easeOut,
					        duration: 2500
					      });
					    }
					  });
					  // end
					 }
					 else{
					 	$("#infovis").children().remove();
					 }
				})
			}
			var $container = $('#center-container');
			$container.css("display","block")
			$container.click(function(e){
				e.preventDefault();
				e.stopPropagation();
			})
			initGraph();
	        $html.append($container);
		}
		
        $html.show();
        updateCallback($html);

	}
 	
 
    /**
     * @param: arr -> build the tree from the list of term
     * @return: the tree html
     */
	function buildOntologyTree(searchResult, searchValue, isRoot, updateCallback){
        var $html = $("<div></div>");
        var close = $("<div class='close'>close X</div>");
        close.click(function(){
            closeDialog();
            // close the details modal when click on use button
            jQuery.prompt.close();
        });
        $html.append(close);
        var graph = $("<div class='neo4j'>view as graph</div>");
        graph.click(function(){
            jQuery.prompt.close();			// close the details modal when click on use button 
        	$('#infovis').children().remove();
	    	$('#working_area').append($('#center-container').css("display","none"));
        	buildOntologyGraph(searchResult, searchValue, isRoot, updateCallback, $html);			// open the graph view
        });
        $html.append(graph);
        var list = $("<div class='tree'>view as list</div>");
        list.click(function(){
        	jQuery.prompt.close();
        	$('#infovis').children().remove();
	    	$('#working_area').append($('#center-container').css("display","none"));
        	buildOntologyList(searchResult, searchValue, isRoot, updateCallback);
        });
        $html.append(list)

        var $searchForm = $('<input type="text" tabindex="0" placeholder="'+searchValue+'" name="q" id="search" autocomplete="off" class="ac_input" >');
        $searchForm.bind('keypress', function(e){
            if(e.keyCode == 13)
                searchForm(e);
        });
        $html.append('<br>');
        $html.append($searchForm);
        var $root = $('#infovis');
        $root.click(function(e){
        	e.preventDefault();
			e.stopPropagation();
        });
        for (var i=0; i<searchResult.length; i++){ // for each search result
            var term = searchResult[i];
			function initTree(){
				if(isRoot){
					if(term != null){
						var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_NODES+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+term[kTAG_NODE]+']';
					}
					else{
						var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_ROOTS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER;
					}
				}
				else{
					var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_RELS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+term[kTAG_NODE]+']&'+kAPI_OPT_DIRECTION+'='+kAPI_DIRECTION_OUT+'&'+kAPI_OPT_LEVELS+'=-1';
				}
			    $.getJSON(getJson, function(data){
			    	var jsonTree = normalizeTree(data, searchValue);
				    var level = 10;
				    //init Spacetree
				    //Create a new ST instance
				    var st = new $jit.ST({  
					    //id of viz container element  
					    injectInto: 'infovis',
					    // set level to show
					    levelsToShow: level,  
					    // set the x,y position at the beginning
					    offsetX: 100,
					    //set duration for the animation  
					    duration: 500, 
					    // set multitree
					    multitree: true, 
					    //set animation transition type  
					    transition: $jit.Trans.Quart.easeInOut,  
					    //set distance between node and its children  
					    levelDistance: 50,  
					    //enable panning  
					    Navigation: {  
					      enable:true,  
					      panning:true  
					    },  
					    //set node and edge styles  
					    //set overridable=true for styling individual  
					    //nodes or edges  
					    Node: {  
					        height: 30,  
					        width: 90,  
					        dim: 65,
					        type: 'rectangle',  
					        color: '#aaa',  
					        overridable: true
					    },  
					      
					    Edge: {  
					        type: 'bezier',  
					        overridable: true  
					    },  
				        //This method is triggered on label
				        //creation. This means that for each node
				        //this method is triggered only once.
				        //This method is useful for adding event
				        //handlers to each node label.
				        onCreateLabel: function(label, node){
				            //add some styles to the node label
				            var style = label.style;
				            label.id = node.id;
				            style.color = '#333';
				            style.fontSize = '0.8em';
				            style.textAlign = 'center';
				            style.width = "60px";
				            style.height = "20px";
				            style.paddingTop = "5px";
				            style.paddingLeft = "15px";
				            label.innerHTML = node.name;
				            //Delete the specified subtree 
				            //when clicking on a label.
				            //Only apply this method for nodes
				            //in the first level of the tree.
			                style.cursor = 'pointer';
							
			                label.onclick = function() {
							    $.getJSON(CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_RELS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+node.id+']&'+kAPI_OPT_DIRECTION+'='+kAPI_DIRECTION_IN, function(dataChild){
				   					if(dataChild[kAPI_DATA_STATUS][kAPI_AFFECTED_COUNT] != 0){
					   					subtree = normalizeTree(dataChild, searchValue);
					                	subtree.id = node.id;
					                	level++;
					                    st.addSubtree(subtree, "animate", {
								            hideLabels: false,
								            onComplete: function() {
								            	st.onClick(node.id, {
										        	Move : {offsetX: 200},
										        	//setRightLevelToShow: level
										        })
								            }
								        });
					                	st.setRoot(subtree.id, 'animate')
							     	}
							     	else{
							     		st.onClick(node.id);
							     	}
			                	})
			                }
				        },
				        
				        onPlaceLabel: function(domElement, node){
				        	// add details button
				        	var details = $('<span id="details">details</span>');
							details.click(function(e){
								e.preventDefault();
								e.stopPropagation();
								openDetails(node.data.$gid);
							});
							$(domElement).has('span#details').children().remove();
							$(domElement).append('<br>').append(details);
							
							// add return button
				      //useButton.className = 'use';
							var useButton = $('<span id="use"></span>');
							useButton.attr('class', 'useTree');
							var useButtonValue = (node.data.$type=='ellipse') ? 'use ' : 'search ';
							useButton.append(useButtonValue);
							useButton.click(function(e){
								e.preventDefault();
								e.stopPropagation();
						      	var nameNode = node.name;
					            if(node.data.$type=='ellipse'){
									jQuery.prompt.close();
						            onClick(node.id, node.data.$gid, $elemClicked);
						            closeDialog();
								}
								else{
									searchForm(nameNode);
								}
							})
							$(domElement).has('span#use').children().remove();
							$(domElement).append('&nbsp;&nbsp;').append(useButton);
							
				        },
				        //This method is triggered right before plotting a node.
				        //This method is useful for adding style 
				        //to a node before it's being rendered.
				      /*  onBeforePlotNode: function(node) {
				            if (node._depth%2 == 1) {
				                node.data.$color = '#f77';
				            }
				        }*/
				    });
				    //load json data
				    st.loadJSON(jsonTree);
				    st.setRoot(term[kTAG_NODE][0], 'animate');
				    //compute node positions and layout
				    st.compute();
				    //Emulate a click on the root node.
				    st.onClick(st.root);
				    //end
				});
			}
			var $container = $('#center-container');
			$container.css("display","block")
			$container.click(function(e){
				e.preventDefault();
				e.stopPropagation();
			})
			initTree(); 
	        $html.append($container);
		}
		
        $html.show();
        updateCallback($html);
    }
	
	/**
	 * create the list with the search results
	 */
	function buildOntologyList(searchResult, searchValue, isRoot, updateCallback){
		var $html = $("<div></div>");
        var close = $("<div class='close'>close X</div>");
        close.click(function(){
            closeDialog();
            // close the details modal when click on use button
            jQuery.prompt.close();
        });
        $html.append(close);
		// view as graph
		if(typeof searchResult[0] !== 'undefined' && searchResult[0] !== null){
	        var graph = $("<div class='neo4j'>view as graph</div>");
	        graph.click(function(){
	            jQuery.prompt.close();			// close the details modal when click on use button 
	            $('#infovis').children().remove();
		    	$('#working_area').append($('#center-container').css("display","none"));
	        	buildOntologyGraph(searchResult, searchValue, isRoot, updateCallback);			// open the graph view
	        });
	        $html.append(graph);
	   	}
		/* view as tree
        if(searchResult.length==1 && typeof searchResult[0] !== 'undefined' && searchResult[0] !== null){
			var tree = $("<div class='tree'>view as tree</div>");
	        tree.click(function(){
	            jQuery.prompt.close();			// close the details modal when click on use button 
	            $('#infovis').children().remove();
		    	$('#working_area').append($('#center-container').css("display","none"));
	        	buildOntologyTree(searchResult, searchValue, isRoot, updateCallback);			// open the graph view
	        });
	        $html.append(tree);
       	}
       	*/
        var $searchForm = $('<input type="text" tabindex="0" placeholder="'+searchValue+'" name="q" id="search" autocomplete="off" class="ac_input" >');
        $searchForm.bind('keypress', function(e){
            if(e.keyCode == 13)
                searchForm(e);
        });
        $html.append('<br>');
        $html.append($searchForm);

        var $root = $("<div></div>");
		$root.attr("id", "listView");
        for(var i=0; i<searchResult.length; i++){					// for each search result
			if(!isRoot){
        		var term = searchResult[i];
        		var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_RELS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+term[kTAG_NODE]+']&'+kAPI_OPT_DIRECTION+'='+kAPI_DIRECTION_OUT+'&'+kAPI_OPT_LEVELS+'=-1';
        	}
       		else{
	        	if(typeof searchResult[i] !== 'undefined' && searchResult[i] !== null){
		        	var domain = '&'+kAPI_OPT_ATTRIBUTES+'={"'+kTAG_DOMAIN+'":["'+searchResult[i][kTAG_DOMAIN][0]+'"]}';
		        	var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_ROOTS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+domain;
		        }
		        else{
		        	var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_ROOTS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER;
		        }
	       	}
        	
        	$.getJSON(getJson, function(data){
				if(isRoot){
					createListRoot(searchResult, data, $root);
				}	
				else{
					createListElements(searchResult, data, $root);
				}	
				$html.append($root)		
			})
        }
        
        $html.show();
        updateCallback($html);

	}
	
	/**
	 * @param searchResult 	the result of the search
	 * @param data			the json from the query root 
	 * @param $root			the jQuery element to add the result
	 */
	function createListRoot(searchResult, data, $root){
		var dataTerm = data[kAPI_DATA_RESPONSE][kAPI_RESPONSE_TERMS];
		jQuery.each(dataTerm, function(key,value){
			var gid = value[kTAG_GID];
			var name = value[kTAG_NAME][0][kTAG_DATA];
			var def = (value[kTAG_DEFINITION]) ? value[kTAG_DEFINITION][0][kTAG_DATA] : '';
			var kind = (value[kTAG_KIND]) ? value[kTAG_KIND] : '';
			var type = (value[kTAG_TYPE]) ? value[kTAG_TYPE] : '';
			
			var ul = $("<ul></ul>");
			//ul.css('padding-left','0px');
			ul.attr('id', value[kTAG_NODE][0])
			var li = $("<li></li>");
			//li.attr('id', value[kTAG_NODE][0]);
			li.css('list-style-type','none');
			li.css('display','inline');
			var table = $("<table></table>");
			table.css('border-width', '1px');
			table.css('border-spacing', '2px');
			table.css('border-style', 'hidden');
			table.css('border-color', 'gray');
			table.css('border-collapse', 'separate');
			table.css('background-color', 'white');
			var tr = $("<tr></tr>");
			
			createElement(searchResult, value, tr, gid, name, def, kind, type);
			
			table.append(tr);
			li.append(table);
			ul.append(li)
			$root.append(ul);
		})
	}
	
	/**
	 * @param data			the json from the query root 
	 * @param $root			the jQuery element to add the result
	 */
	function createListElements(searchResult, data, $root){
		var response =  data[kAPI_DATA_RESPONSE];
		var term = response[kAPI_RESPONSE_TERMS];
		var nodes = response[kAPI_RESPONSE_NODES];
		var edges = response[kAPI_RESPONSE_EDGES];
		
		var documentApp = $("<div></div>");
		
		jQuery.each(term, function(key,value){
			if(jQuery.inArray(kTYPE_PREDICATE, value[kTAG_KIND]) == -1){
				var gid = value[kTAG_GID];
				var name = value[kTAG_NAME][0][kTAG_DATA];
				var def = (value[kTAG_DEFINITION]) ? value[kTAG_DEFINITION][0][kTAG_DATA] : '';
				var kind = (value[kTAG_KIND]) ? value[kTAG_KIND] : '';
				var type = (value[kTAG_TYPE]) ? value[kTAG_TYPE] : '';
				
				var ul = $("<ul></ul>");
				//ul.css('padding-left','0px');
				ul.attr('id', value[kTAG_NODE][0])
				var li = $("<li></li>");
				//li.attr('id', value[kTAG_NODE][0]);
				li.css('list-style-type','none');
				li.css('display','inline');
				var table = $("<table></table>");
				table.css('border-width', '1px');
				table.css('border-spacing', '2px');
				table.css('border-style', 'hidden');
				table.css('border-color', 'gray');
				table.css('border-collapse', 'separate');
				table.css('background-color', 'white');
				var tr = $("<tr></tr>");
				
				createElement(searchResult, value, tr, gid, name, def, kind, type);
				
				table.append(tr);
				li.append(table);
				ul.append(li);
				documentApp.append(ul)
			}
		})
		
		var arrayEdgesDone = Array(),
			arrayNodesDone = Array();
		
		jQuery.each(edges, function(key, value){
			var sub = value[kAPI_RESPONSE_SUBJECT];
			var obj = value[kAPI_RESPONSE_OBJECT];
			var pred = value[kAPI_RESPONSE_PREDICATE];
				
			var subElement = ($root.find("#"+sub).length) ? $root.find("#"+sub) : documentApp.children("#"+sub), 
				objElement = ($root.find("#"+obj).length) ? $root.find("#"+obj) :documentApp.children("#"+obj);
			
			// subElement.clone(true).appendTo(documentApp)
			// objElement.clone(true).appendTo(documentApp)
			
			if(jQuery.inArray(sub, arrayNodesDone)!=-1 && jQuery.inArray(key, arrayEdgesDone)==-1){
				var termID = nodes[sub][kTAG_TERM];
				var termValue = term[termID];
				
				var gid = termValue[kTAG_GID];
				var name = termValue[kTAG_NAME][0][kTAG_DATA];
				var def = (termValue[kTAG_DEFINITION]) ? termValue[kTAG_DEFINITION][0][kTAG_DATA] : '';
				var kind = (termValue[kTAG_KIND]) ? termValue[kTAG_KIND] : '';
				var type = (termValue[kTAG_TYPE]) ? termValue[kTAG_TYPE] : '';
				
				var tr = $("<tr></tr>");
				var ul = $("<ul></ul>");
				//ul.css('padding-left','0px');
				ul.attr('id', termValue[kTAG_NODE][0])
				var li = $("<li></li>");
				//li.attr('id', value[kTAG_NODE][0]);
				li.css('list-style-type','none');
				li.css('display','inline');
				var table = $("<table></table>");
				table.css('border-width', '1px');
				table.css('border-spacing', '2px');
				table.css('border-style', 'hidden');
				table.css('border-color', 'gray');
				table.css('border-collapse', 'separate');
				table.css('background-color', 'white');
				var tr = $("<tr></tr>");
				
				createElement(searchResult, termValue, tr, gid, name, def, kind, type);
				
				table.append(tr);
				li.append(table);
				ul.append(li);
				
				$(objElement).children("li").append(ul);
			}
			else{
				if($root.attr('id') == 'listView'){
					//console.log(objElement, subElement)
					objElement.children("li").append(subElement);
					$root.append(objElement);
				}
				else{
					$root.children("li").append(subElement);
				}
			}
			
			arrayEdgesDone.push(key);	
			arrayNodesDone.push(sub);
		})
	}
	
	/**
	 * 
	 */
	function createElement(searchResult, term, tr, gid, name, def, kind, type){
		if(searchResult.length == 1 && !(typeof searchResult[0] == 'undefined' && searchResult[0] == null)){
			var tdGetChild = $("<td></td>");
			tdGetChild.attr("class", "expand");
			//tdGetChild.append(' + ');
			tdGetChild.css('border-width', '1px');
			tdGetChild.css("padding", '1px');
			tdGetChild.css('border-style', 'outset');
			tdGetChild.css('border-color', 'gray');
			//tdGetChild.css('background-color', 'white');
			tdGetChild.click(function(){
				elementClicked = ($(this).parents('ul').first());
				if(tdGetChild.attr('class')=='expand'){
					tdGetChild.attr('class', 'collapse').removeClass('expand');
					$.getJSON(CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_GET_RELS+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_OPT_IDENTIFIERS+'=['+term[kTAG_NODE][0]+']&'+kAPI_OPT_DIRECTION+'='+kAPI_DIRECTION_IN, function(children){
						createListElements(searchResult, children, elementClicked);
					})
				}
				else{
					tdGetChild.attr('class', 'expand').removeClass('collapse');
						elementClicked.children('li').children('ul').remove();
				}
			})
			tr.append(tdGetChild);
		}
	
		var tdGID = $("<td></td>");
		tdGID.attr("class", "tdGid");
		tdGID.append(gid);
		tdGID.css('border-width', '1px');
		tdGID.css("padding", '1px');
		tdGID.css('border-style', 'outset');
		tdGID.css('border-color', 'gray');
		tdGID.css('background-color', 'white');
		tr.append(tdGID);
		
		var tdName = $("<td></td>");
		tdName.attr("class", "tdName");
		tdName.append(name);
		tdName.css('border-width', '1px');
		tdName.css("padding", '1px');
		tdName.css('border-style', 'outset');
		tdName.css('border-color', 'gray');
		tdName.css('background-color', 'white');
		tr.append(tdName);
		
		var tdDef = $("<td></td>");
		tdDef.attr("class", "tdDef");
		tdDef.append(def);
		tdDef.css('border-width', '1px');
		tdDef.css("padding", '1px');
		tdDef.css('border-style', 'outset');
		tdDef.css('border-color', 'gray');
		tdDef.css('background-color', 'white');
		tr.append(tdDef);
		
		var tdKind = $("<td></td>");
		tdKind.attr("class", "tdKind");
		$.each(kind, function(key, value){
			var spanKind = $("<span></span>");
			if(key){
				tdKind.append(", ");
			}
			spanKind.css('cursor', 'pointer');
			spanKind.append(value);
			spanKind.click(function(){
				openDetails(value);
			});
			tdKind.append(spanKind);
		});
		tdKind.css('border-width', '1px');
		tdKind.css("padding", '1px');
		tdKind.css('border-style', 'outset');
		tdKind.css('border-color', 'gray');
		tdKind.css('background-color', 'white');
		tr.append(tdKind);
/*			
			var tdType = $("<td></td>");
			tdType.attr("class", "tdType");
			tdType.append(type);
			tdType.css('border-width', '1px');
			tdType.css("padding", '1px');
			tdType.css('border-style', 'outset');
			tdType.css('border-color', 'gray');
			tdType.css('background-color', 'white');
			tr.append(tdType);
	*/
//		console.log('kind',kind)
		if(kind.indexOf(kTYPE_MEASURE) > -1){
			var tdUse = $("<td></td>");
			tdUse.attr("class", "tdUse");
			tdUse.append('Use');
			tdUse.css('border-width', '1px');
			tdUse.css("padding", '1px');
			tdUse.css('border-style', 'outset');
			tdUse.css('border-color', 'gray');
			tdUse.css('background-color', 'white');
			tdUse.click(function(){
				jQuery.prompt.close();
	            onClick(term[kTAG_NODE][0], gid, $elemClicked);
	            closeDialog();
			})
			tr.append(tdUse);
		}
		
//		console.log('length',searchResult.length)
		if(searchResult.length > 0 || (searchResult.length == 1 && typeof searchResult[0] == 'undefined' && searchResult[0] == null)){
			var tdSearchFor = $("<td></td>");
			tdSearchFor.attr("class", "tdSearchFor");
			tdSearchFor.append('Search for');
			tdSearchFor.css('border-width', '1px');
			tdSearchFor.css("padding", '1px');
			tdSearchFor.css('border-style', 'outset');
			tdSearchFor.css('border-color', 'gray');
			tdSearchFor.css('background-color', 'white');
			tdSearchFor.click(function(){
				searchForm(gid)
			})
			tr.append(tdSearchFor);
		}
	}
	
	/**
	 * normalize tree structure
	 * @param json the json returned by the api
	 * @return json the json with the structure for the SpaceTree 
	 */
	function normalizeTree(json, searchValue){
		var response =  json[kAPI_DATA_RESPONSE];
		var term = response[kAPI_RESPONSE_TERMS];
		var nodes = response[kAPI_RESPONSE_NODES];
		var edges = response[kAPI_RESPONSE_EDGES];
		var returnJSON;
		
		var nodeJson, parentJson, searchJson;
		
		var childrenNodes = Array();
		var direction = ['right', 'bottom', 'top', 'left'];
		var leaf;
		var countTree = -1;
		
		//jQuery.each(edges, function(index, value){
		if (!edges){
			for(var index in nodes){
				var nodeID = index;
				var nodeName = nodes[index][kTAG_TERM];
				var nodeGid = term[nodeName][kTAG_GID];
				searchJson = {id:nodeID, name:nodeName, data:{$color:"#FFFFFF", $orn:"left", $gid:nodeGid}};
//				nodeJson = '{"id":"'+nodeID+'","name":"'+nodeName+'","data":{"$color": "#FFFFFF", "$orn":"left", "$gid":"'+nodeGid+'"},"children":[]}';
//				returnJSON = jQuery.parseJSON(nodeJson);
			}
		}
		else{
			var count = 1;
			var len = 0;
			for(var index in edges){
				len++;
			}
			for(var index in edges){
				var value = edges[index];
				// SET NODE DETAILS
				var nodeID = value.s;
				var nodeTerm = nodes[nodeID][kTAG_TERM];
				var nodeName = term[nodeTerm][kTAG_CODE];
				var nodeGid = term[nodeTerm][kTAG_GID];
				var isSearched = (searchValue == nodeName);
				
				var nodeType = "rectangle";
				for(var kindIndex in nodes[nodeID][kTAG_KIND]){
					if (isSearched){
						nodeType = "circle";	
					}
					if(nodes[nodeID][kTAG_KIND][kindIndex] == kTYPE_MEASURE){
						nodeType = "ellipse";
					}
				}
				if(nodeGid==searchValue){
					countTree++;
				}
				else{
					countTree = (countTree==-1) ? 0 : countTree;
				}
				var orn = direction[countTree];
				
				if(len==1){
					searchJson = {id:nodeID, name:nodeName, data:{$color:"#FFFFFF", $type:nodeType, $orn:orn, $gid:nodeGid}};
					// SET PARENT DETAILS
					var parentID = value.o;
					var parentTerm = nodes[parentID][kTAG_TERM];
					var parentName = term[parentTerm][kTAG_CODE];
					var parentGid = term[parentTerm][kTAG_GID]
					
					var parentType = "rectangle";
					for(var kindIndex in nodes[parentID][kTAG_KIND]){
						if(nodes[parentID][kTAG_KIND][kindIndex] == kTYPE_MEASURE){
							parentType = "ellipse";
						}
					}
					parentJson = {id:parentID,name:parentName,data:{$color:"#FFFFFF",$type:parentType, $orn:orn, $gid:parentGid}};
					
					childrenNodes.push(parentJson);
				}
				else{
					if(nodeName==searchValue || nodeGid==searchValue){
						searchJson = {id:nodeID, name:nodeName, data:{$color:"#FFFFFF", $type:nodeType, $orn:orn, $gid:nodeGid}};
						if(count != 1){
							childrenNodes.push(nodeJson)
						}
					}
					else{
					//	if(nodeJson && nodeID == parentID){
						//	nodeJson = parentJson;
						//}
						//else{

							nodeJson = {id:nodeID,name:nodeName,data:{$color: "#FFFFFF",$type:nodeType, $orn:orn, $gid:nodeGid}};
					//	}
						// SET PARENT DETAILS
						var parentID = value.o;
						var parentTerm = nodes[parentID][kTAG_TERM];
						var parentName = term[parentTerm][kTAG_CODE];
						var parentGid = term[parentTerm][kTAG_GID]
						
						var parentType = "rectangle";
						for(var kindIndex in nodes[parentID][kTAG_KIND]){
							if(nodes[parentID][kTAG_KIND][kindIndex] == kTYPE_MEASURE){
								parentType = "ellipse";
							}
						}
						parentJson = {id:parentID,name:parentName,data:{$color: "#FFFFFF",$type:parentType, $orn:orn, $gid:parentGid}};
						
						nodeJson.children = parentJson;
						if(!searchJson){
							searchJson = nodeJson;
						}

						if(count == len){
							childrenNodes.push(nodeJson)
						}
						
					}
					count++;
				}
//				parentJson.children = Array(JSON.stringify(nodeJson));
			//	console.log(parentJson)
				
				//returnJSON = (parentID) ? (parentJson) : (nodeJson);
			}
		}
		searchJson.children = childrenNodes;
		return searchJson;	
	}
	
	/**
	 * normalize graph structure
	 * @param json the json returned by the api
	 * @return string the string with the structure for the ForceDirected graph
	 */
	function normalizeGraph(json, searchValue){
		var response =  json[kAPI_DATA_RESPONSE];
		var term = response[kAPI_RESPONSE_TERMS];
		var nodes = response[kAPI_RESPONSE_NODES];
		var edges = response[kAPI_RESPONSE_EDGES];
		var returnJSON;
		var returnArray = Array();
		var nodeCreated = Array();
		
		var returnString;
		var nodeFromID, nodeToID;
		var elementFrom, elementTo;
		
		if(!edges){
			jQuery.each(nodes, function(key,value){
				var nodeFromTerm = value[kTAG_TERM];
				var nodeFromGid = term[nodeFromTerm][kTAG_GID];
				var isSearchedFrom = (searchValue == term[nodeFromTerm][kTAG_CODE]);
				var nodeTypeFrom = (value[kTAG_TYPE]) ? "triangle" : (isSearchedFrom) ? "star" : "circle" ;
				elementFrom = '{"adjacencies": [{"nodeTo": "'+key+'","nodeFrom": "'+key+'","data": {}}],';
				elementFrom += '"data": {"$color": "#C74243","$type": "circle","$gid": "'+nodeFromGid+'"},';
				elementFrom += '"id": "'+key+'","name": "'+nodeFromTerm+'"}';
				returnString = elementFrom;
			})
		}
		else {	
			jQuery.each(edges, function(key, value){
				var notElementTo = true;
				nodeFromID = value.s;
				var nodeFromTerm = nodes[nodeFromID][kTAG_TERM];
				var nodeFromGid = term[nodeFromTerm][kTAG_GID];
				var isSearchedFrom = (searchValue == term[nodeFromTerm][kTAG_CODE]);
				//var nodeFromName = term[nodeFromTerm][kTAG_NAME][0][kTAG_DATA];
				var nodeFromName = term[nodeFromTerm][kTAG_CODE];
				//var nodeTypeFrom = (nodes[nodeFromID][kTAG_TYPE]) ? "triangle" : (isSearchedFrom) ? "star" : "circle" ;
				var nodeTypeFrom = "circle";
				for(var kindIndex in nodes[nodeFromID][kTAG_KIND]){
					if(isSearchedFrom){
						nodeTypeFrom = "star";
					}
					if(nodes[nodeFromID][kTAG_KIND][kindIndex] == kTYPE_MEASURE){
						nodeTypeFrom = "triangle";
					}
				}
				if(nodeToID && nodeFromID == nodeToID){
					notElementTo = false;
					removeElementFromArray(elementTo, returnArray);
					removeElementFromArray(nodeToID, nodeCreated);
				}
				
				nodeToID = value.o;
				var nodeToTerm = nodes[nodeToID][kTAG_TERM];
				var nodeToGid = term[nodeToTerm][kTAG_GID];
				var nodeToName = term[nodeToTerm][kTAG_CODE];
				var isSearchedTo = (searchValue == term[nodeToTerm][kTAG_CODE]);
				var nodeTypeTo = (nodes[nodeToID][kTAG_TYPE]) ? "triangle" : (isSearchedTo) ? "star" : "circle" ;
				
				var arcID = key;
				var arcName = value.p;
				
				if(jQuery.inArray(elementTo, returnArray) == -1 && !$('#infovis-canvas').length || $('#'+nodeFromID).length || jQuery.inArray(nodeFromID, nodeCreated) != -1){
					var direction = false;
				}	
				else{
					var direction = true;
				}

				elementFrom = '{"adjacencies": [{"nodeTo": "'+nodeToID+'","nodeFrom": "'+nodeFromID+'","data": {"$type": "labeled-arrow","$labeltext": "'+arcName+'","$labelid": "'+arcID+'","$direction":'+direction+'}}],';
				elementFrom += '"data": {"$color": "#C74243", "$type": "'+nodeTypeFrom+'","$gid": "'+nodeFromGid+'"},';
				elementFrom += '"id": "'+nodeFromID+'","name": "'+nodeFromName+'"}';
				if(jQuery.inArray(elementFrom, returnArray) == -1 ){
					returnArray.push(elementFrom);
					nodeCreated.push(nodeFromID);
				}
				
				elementTo = '{"adjacencies": [],';
				elementTo += '"data": {"$color": "#C74243", "$type": "'+nodeTypeTo+'","$gid": "'+nodeToGid+'"},'; 
			    elementTo += '"id": "'+nodeToID+'","name": "'+nodeToName+'"}'
			    
			    if(jQuery.inArray(elementTo, returnArray) == -1 && jQuery.inArray(nodeToID, nodeCreated) == -1){
					returnArray.push(elementTo);
					nodeCreated.push(nodeToID);
				}
				returnString = implode(",", returnArray);
			})	
		}
		
		//returnJSON = jQuery.parseJSON(returnString);
		
		return returnString;
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
	 * @param: gid -> the GID of the element clicked
	 * 
	 * @return the modal with the details
	 */
	function openDetails(gid){
		jQuery.prompt.close();
		
		var query = '[{"'+kOPERATOR_AND+'":[{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_LID+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_EQUAL+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_BINARY+'","'+kAPI_QUERY_DATA+'":{"'+kTAG_TYPE+'":"'+kTYPE_BINARY+'", "'+kTAG_DATA+'":"'+md5(gid)+'"}}]}]';

		//var query = '{"'+kOPERATOR_AND+'":[{"'+kAPI_QUERY_SUBJECT+'":"'+kTAG_LID+'","'+kAPI_QUERY_OPERATOR+'":"'+kOPERATOR_EQUAL+'","'+kAPI_QUERY_TYPE+'":"'+kTYPE_STRING+'","'+kAPI_QUERY_DATA+'":"'+gid+'"}]}';
		var getJson = CROPONTOLOGY_URL + '?'+kAPI_OPERATION+'='+kAPI_OP_MATCH+'&'+kAPI_FORMAT+'='+kTYPE_JSON+'&'+kAPI_DATABASE+'='+kDEFAULT_DATABASE+'&'+kAPI_CONTAINER+'='+kDEFAULT_CONTAINER+'&'+kAPI_DATA_QUERY+'='+query;
	   	$.getJSON(getJson, function(data){
		    var $details = $("<div></div>");
	   		var response = data[kAPI_DATA_RESPONSE];
	   		var name = response[0][kTAG_NAME][0][kTAG_DATA];
	   		var def = (response[0][kTAG_DEFINITION]) ? response[0][kTAG_DEFINITION][0][kTAG_DATA] : '';
	   		
		    var $gid = $("<h3 class='attributes'>"+gid+"</h3>");
		    $details.append($gid);
		    var $name= $("<div class='attributes'><label class='details'>Name</label><span class='details'>"+name+"</span></div>");
		    $details.append($name);
		    var $def = $("<div class='attributes'><label class='details'>Definition</label><span class='details'>"+def+"</span></div>");
		    (def) ? $details.append($def) : '';
		    // call modal
		    $.prompt($details.html(),{opacity: 0, persistent:false});
	   	});
	}
	
	/**
	 * create the modal with the details
	 * @param: gid -> the GID of the element clicked
	 * 
	 * @return the modal with the details
	 */
	function openChildren(json, exclude, fd, node, countChildren){
		jQuery.prompt.close();
		var div = $("<div></div>");
		//div.attr('id', 'jqi');
		div.attr('class', 'ui-dialog-content');
		var ul = $("<ul></ul>");
		$.each(json.nodes, function(key, value){
			if(jQuery.inArray(key, exclude) == -1){
				var nodeToAdd = {id:key, name:value[":TERM"], data:{"$color": "#C74243","$type": "star"}};
				var li = $("<li></li>");
				li.append(value[":TERM"]);
				li.css("cursor", "pointer");
				li.click(function(){
					var addNode = {id:key, name:value[":TERM"], data:{"$color": "#C74243","$type": "star"}};
					fd.graph.addNode(addNode);
		        	fd.graph.addAdjacence(node,addNode, {"$type": "labeled-arrow","$labeltext": ":ENUM-OF","$labelid": "multiVaue","$direction":true});
		        	$("#multi").children().remove();
		        	countChildren--;
		        	var newSpan = $("<span></span>");
		        	newSpan.attr('class','name');
		        	newSpan.append(countChildren+" nodes");
		        	$("#multi").append(newSpan)
		        	fd.refresh();
		        	div.dialog("close");
		        	exclude.push(key);
				})
				ul.append(li);
			}
		})	
		div.append(ul);
		    // call modal
	   // $.prompt(ul.html(), {opacity: 0, persistent:false});
	   // create dialog
	   div.dialog({modal:true});
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
