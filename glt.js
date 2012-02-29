// ---
/*
	GLT is developed by Robert Nyman, http://www.robertnyman.com
	For more information and copyright information, please see http://www.robertnyman.com/glt
*/
var GLT = {
	// Customization parameters
	titleClassName : "glt-elm",	
	topImagePath : "images/rounded-top.gif",
	bottomImagePath : "images/rounded-bottom.gif",
	suppressAltTooltipsInIE : true,
	timeBeforeShow : 5,
	titleOffsetX : 50,
	titleOffsetY : 10,
	fadeInTitle : true,
	fadeOutTitle : true,
	fadeStartLevel : 0.5,
	originalFadeLevel : 0.9,
	fadeIncrement : 0.1,
	timePerFadeStep : 50,
	
	// GLT parameters
	titleElm : null,
	titleTextElm : null,
	titleTopImage : null,
	titleBottomImage : null,
	elementsWithTitles : null,
	currentElm : null,
	currentTitle : "",
	currentFadeLevel : 0,
	fadeTimer : null,
	
	init : function (){
		if(document.getElementById){
			this.elementsWithTitles = getElementsByAttribute(document, "*", "title");
			if(this.elementsWithTitles.length > 0){
				this.titleElm = document.createElement("div");
				this.titleElm.className = this.titleClassName;
				if(this.topImagePath){
					this.titleTopImage = document.createElement("img");
					this.titleTopImage.setAttribute("src", this.topImagePath);
					this.titleElm.appendChild(this.titleTopImage);
				}				
				this.titleTextElm = document.createElement("p");
				this.titleElm.appendChild(this.titleTextElm);
				if(this.bottomImagePath){
					this.titleBottomImage = document.createElement("img");
					this.titleBottomImage.setAttribute("src", this.bottomImagePath);
					this.titleElm.appendChild(this.titleBottomImage);
				}
				document.body.appendChild(this.titleElm);
				this.useMSFilter = typeof this.titleElm.style.filter != "undefined";
				this.applyEvents();
			}			
		}
	},
	
	applyEvents : function (){
		var oElm;
		var strClassName;
		for(var i=0; i<this.elementsWithTitles.length; i++){
			oElm = this.elementsWithTitles[i];
			if(this.suppressAltTooltipsInIE){
				oElm.setAttribute("alt", "");
			}
			oElm.onmouseover = GLT.mouseOverElm;
			oElm.onmouseout = GLT.mouseOutElm;
                                                oElm.onclick = GLT.mouseClickElm;
		}
	},
	
	mouseOverElm : function (oEvent){
		var oEvent = (typeof oEvent != "undefined")? oEvent : event;
		if(typeof GLT != "undefined"){
			GLT.startTimer(this, oEvent);
			oEvent.cancelBubble = true;
			oEvent.returnValue = false;
			if(oEvent.stopPropagation){
				oEvent.stopPropagation();
			}
		}
	},
	
	mouseOutElm : function (oEvent){
		var oEvent = (typeof oEvent != "undefined")? oEvent : event;
		if(typeof GLT != "undefined"){
			GLT.hideTitle(this, oEvent);
		}
	},
        
                mouseClickElm : function (oEvent){
		var oEvent = (typeof oEvent != "undefined")? oEvent : event;
		if(typeof GLT != "undefined"){
			GLT.hideTitle(this, oEvent);
		}
	},
	
	startTimer : function (oElm, oEvent){
		if(!this.currentElm || this.currentElm != oElm || this.fadeTimer > 0){
			if(this.fadeTimer){
				clearTimeout(this.fadeTimer);
			}	
			if(this.currentElm){
				this.hideTitle(null, false, true);
			}
			this.currentElm = oElm;
			this.currentTitle = this.currentElm.getAttribute("title");
			this.currentElm.setAttribute("title", "");
			this.currentX = oEvent.clientX;
			this.currentY = oEvent.clientY;
			this.fadeTimer = setTimeout("GLT.showTitle()", GLT.timeBeforeShow);
		}
    },
	
	stopTimer : function (oElm){
		clearTimeout(GLT.fadeTimer);
    },
	
	showTitle : function (){
		this.setTitlePos();
		this.titleTextElm.innerHTML = this.currentTitle;
		this.titleElm.style.visibility = "visible";
		if(this.fadeInTitle){
			this.currentFadeLevel = this.fadeStartLevel;
			this.fadeIn();
		}
	},
	
	hideTitle : function (oElm, oEvent, forceHide){		
		if(this.currentElm && (oElm || forceHide)){
			var bIsChildOfCurrentElm = false;
			if(typeof oEvent != "undefined" && typeof oEvent == "object"){
				var oEventTarget = (typeof oEvent.relatedTarget != "undefined")? oEvent.relatedTarget : oEvent.toElement;
				if(oEventTarget){
					while(!bIsChildOfCurrentElm && oEventTarget && oEventTarget.nodeName && oEventTarget.nodeName.search(/body/i) == -1){
						if(oEventTarget == oElm){
							bIsChildOfCurrentElm = true;
							break;
						}
						oEventTarget = oEventTarget.parentNode;
					}
				}
			}
			if(!bIsChildOfCurrentElm){
				this.stopTimer();
				if(this.fadeOutTitle && (typeof forceHide == "undefined" || !forceHide)){
					this.fadeOut();
				}
				else{
					clearTimeout(this.fadeTimer);
					this.currentElm.setAttribute("title", this.currentTitle);
					this.currentElm = null;
					this.titleElm.style.visibility = "hidden";
				}
			}
		}
	},
	
	setTitlePos : function (){	
		var arrScroll = this.getWinSizeAndScroll();
		var intTitleElmWidthAndPos = this.titleElm.offsetWidth + this.currentX + this.titleOffsetX;
		var intDiff = intTitleElmWidthAndPos - arrScroll[0];
		var intX = (intDiff > 0)? (this.currentX - intDiff) : (this.currentX + this.titleOffsetX);
		this.titleElm.style.left = intX + arrScroll[2] + "px";
		this.titleElm.style.top = this.currentY + arrScroll[3] + this.titleOffsetY + "px";
	},
	
	fadeIn : function (fadeOut){
		this.currentFadeLevel = this.currentFadeLevel + this.fadeIncrement;
		if(this.currentFadeLevel < this.originalFadeLevel){
			this.fadeTimer = setTimeout("GLT.fadeIn()", GLT.timePerFadeStep);
		}
		else{
			this.currentFadeLevel = this.originalFadeLevel;
			clearTimeout(this.fadeTimer);
		}
		this.setFade();
	},
	
	fadeOut : function (){
		this.currentFadeLevel = this.currentFadeLevel - this.fadeIncrement;
		if(this.currentFadeLevel > this.fadeStartLevel){
			this.fadeTimer = setTimeout("GLT.fadeOut()", GLT.timePerFadeStep);
		}
		else{
			this.currentFadeLevel = this.originalFadeLevel;
			this.hideTitle(null, false, true);
		}
		this.setFade();
	},
	
	setFade : function (){
		// This line is b/c of a floating point bug in JavaScript
		this.currentFadeLevel = Math.round(this.currentFadeLevel * 10) / 10;
		if(this.titleElm){
			if(this.useMSFilter){
				this.titleElm.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + (this.currentFadeLevel * 100) + ")";
			}
			else{
				this.titleElm.style.opacity = this.currentFadeLevel;
			}
		}
	},
	
	getWinSizeAndScroll : function (){
		var intWidth = document.body.offsetWidth;
		var intHeight = (typeof window.innerHeight != "undefined")? window.innerHeight : (document.documentElement && document.documentElement.clientHeight > 0)? document.documentElement.clientHeight : document.body.clientHeight;		
		var intXScroll = (typeof window.pageXOffset != "undefined")? window.pageXOffset : document.body.scrollLeft;		
		var intYScroll = (typeof window.window.pageYOffset != "undefined")? window.window.pageYOffset : (document.documentElement && document.documentElement.scrollTop > 0)? document.documentElement.scrollTop : document.body.scrollTop;
		return [intWidth, intHeight, intXScroll, intYScroll];
	},
	
	closeSession : function (oEvent){		
		this.removeEvent(window, "load", function(){GLT.init();}, false);
		GLT = null;
		delete GLT;
	},
	
	addEvent : function (oObject, strEvent, oFunction, bCapture){
		if(oObject){
			if(oObject.addEventListener){
				oObject.addEventListener(strEvent, oFunction, bCapture);
			}
			else if(window.attachEvent){
				oObject.attachEvent(("on" + strEvent), oFunction)
			}
		}
	},

	removeEvent : function (oObject, strEvent, oFunction, bCapture){
		if(oObject){
			if(oObject.removeEventListener){
				oObject.removeEventListener(strEvent, oFunction, false);
			}
			else if(window.detachEvent){
				oObject.detachEvent(("on" + strEvent), oFunction)
			}
		}
	}
};
// ---
GLT.addEvent(window, "load", function(){GLT.init();}, false);
// ---
// Utility functions
// ---
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}
// ---
if(typeof Array.prototype.push != "function"){
	Array.prototype.push = ArrayPush;
	function ArrayPush(value){
		this[this.length] = value;
	}
}
// ---