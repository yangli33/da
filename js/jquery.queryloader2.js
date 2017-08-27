(function($){function OverlayLoader(parent){this.parent=parent;this.container;this.loadbar;this.percentageContainer;};OverlayLoader.prototype.createOverlay=function(){var overlayPosition="absolute";if(this.parent.element.tagName.toLowerCase()=="body"){overlayPosition="fixed";}else{var pos=this.parent.$element.css("position");if(pos!="fixed"||pos!="absolute"){this.parent.$element.css("position","relative");}}
this.container=$("<div id='"+ this.parent.options.overlayId+"'></div>").css({width:"100%",height:"100%",backgroundColor:this.parent.options.backgroundColor,backgroundPosition:"fixed",position:overlayPosition,zIndex:666999,top:0,left:0}).appendTo(this.parent.$element);this.loadbar=$("<div id='qLbar'></div>").css({height:this.parent.options.barHeight+"px",marginTop:"-"+(this.parent.options.barHeight/2)+"px",backgroundColor:this.parent.options.barColor,width:"0%",position:"absolute",top:"50%"}).appendTo(this.container);if(this.parent.options.percentage==true){this.percentageContainer=$("<div id='qLpercentage'></div>").text("0%").css({height:"105px",width:"104px",background:'url(http://www.271721.cn/OA/Public/Home/images/load_img.gif) no-repeat',position:"absolute",'line-height:':'104px','text-align':'center',fontSize:"22px",top:"50%",left:"50%",marginTop:"-140"+"px",marginLeft:"-52px",color:'#da251d'}).appendTo(this.container);}
if(!this.parent.preloadContainer.toPreload.length||this.parent.alreadyLoaded==true){this.parent.destroyContainers();}};OverlayLoader.prototype.updatePercentage=function(percentage){this.loadbar.stop().animate({width:percentage+"%",minWidth:percentage+"%"},200);if(this.parent.options.percentage==true){this.percentageContainer.text(Math.ceil(percentage)+"%");}};function PreloadContainer(parent){this.toPreload=[];this.parent=parent;this.container;};PreloadContainer.prototype.create=function(){this.container=$("<div></div>").appendTo("body").css({display:"none",width:0,height:0,overflow:"hidden"});this.processQueue();};PreloadContainer.prototype.processQueue=function(){for(var i=0;this.toPreload.length>i;i++){if(!this.parent.destroyed){this.preloadImage(this.toPreload[i]);}}};PreloadContainer.prototype.addImage=function(src){this.toPreload.push(src);};PreloadContainer.prototype.preloadImage=function(url){var image=new PreloadImage();image.addToPreloader(this,url);image.bindLoadEvent();};function PreloadImage(parent){this.element;this.parent=parent;};PreloadImage.prototype.addToPreloader=function(preloader,url){this.element=$("<img />").attr("src",url);this.element.appendTo(preloader.container);this.parent=preloader.parent;};PreloadImage.prototype.bindLoadEvent=function(){this.parent.imageCounter++;var src=this.element.attr("src");this.element.removeAttr("src");var that=this;setTimeout(function(){that.element.on("load error",that,function(e){e.data.completeLoading();});that.element.attr("src",src);},1);};PreloadImage.prototype.completeLoading=function(){this.parent.imageDone++;var percentage=(this.parent.imageDone/this.parent.imageCounter)*100;this.parent.overlayLoader.updatePercentage(percentage);if(this.parent.imageDone==this.parent.imageCounter){this.parent.endLoader();}};function QueryLoader2(element,options){this.element=element;this.$element=$(element);this.options=options;this.foundUrls=[];this.destroyed=false;this.imageCounter=0;this.imageDone=0;this.alreadyLoaded=false;this.preloadContainer=new PreloadContainer(this);this.overlayLoader=new OverlayLoader(this);this.defaultOptions={onComplete:function(){},backgroundColor:"#000",barColor:"#fff",overlayId:'qLoverlay',barHeight:1,percentage:false,deepSearch:true,completeAnimation:"fade",minimumTime:500};this.init();};QueryLoader2.prototype.init=function(){this.options=$.extend({},this.defaultOptions,this.options);var images=this.findImageInElement(this.element);if(this.options.deepSearch==true){var elements=this.$element.find("*:not(script)");for(var i=0;i<elements.length;i++){this.findImageInElement(elements[i]);}}
this.preloadContainer.create();this.overlayLoader.createOverlay();};QueryLoader2.prototype.findImageInElement=function(element){var url="";var obj=$(element);var type="normal";if(obj.css("background-image")!="none"){url=obj.css("background-image");type="background";}else if(typeof(obj.attr("src"))!="undefined"&&element.nodeName.toLowerCase()=="img"){url=obj.attr("src");}
if(!this.hasGradient(url)){url=this.stripUrl(url);var urls=url.split(", ");for(var i=0;i<urls.length;i++){if(this.validUrl(urls[i])&&this.urlIsNew(urls[i])){var extra="";if(this.isIE()||this.isOpera()){extra="?rand="+ Math.random();this.preloadContainer.addImage(urls[i]+ extra);}else{if(type=="background"){this.preloadContainer.addImage(urls[i]+ extra);}else{var image=new PreloadImage(this);image.element=obj;image.bindLoadEvent();}}
this.foundUrls.push(urls[i]);}}}};QueryLoader2.prototype.hasGradient=function(url){if(url.indexOf("gradient")==-1){return false;}else{return true;}};QueryLoader2.prototype.stripUrl=function(url){url=url.replace(/url\(\"/g,"");url=url.replace(/url\(/g,"");url=url.replace(/\"\)/g,"");url=url.replace(/\)/g,"");return url;};QueryLoader2.prototype.isIE=function(){return navigator.userAgent.match(/msie/i);};QueryLoader2.prototype.isOpera=function(){return navigator.userAgent.match(/Opera/i);};QueryLoader2.prototype.validUrl=function(url){if(url.length>0&&!url.match(/^(data:)/i)){return true;}else{return false;}};QueryLoader2.prototype.urlIsNew=function(url){if(this.foundUrls.indexOf(url)==-1){return true;}else{return false;}};QueryLoader2.prototype.destroyContainers=function(){this.destroyed=true;this.preloadContainer.container.remove();this.overlayLoader.container.remove();};QueryLoader2.prototype.endLoader=function(){this.destroyed=true;this.onLoadComplete();};QueryLoader2.prototype.onLoadComplete=function(){if(this.options.completeAnimation=="grow"){var animationTime=500;this.overlayLoader.loadbar[0].parent=this;this.overlayLoader.loadbar.stop().animate({"width":"100%"},animationTime,function(){$(this).animate({top:"0%",width:"100%",height:"100%"},500,function(){this.parent.overlayLoader.container[0].parent=this.parent;this.parent.overlayLoader.container.fadeOut(500,function(){this.parent.destroyContainers();this.parent.options.onComplete();});});});}else{this.overlayLoader.container[0].parent=this;this.overlayLoader.container.fadeOut(500,function(){this.parent.destroyContainers();this.parent.options.onComplete();});}};if(!Array.prototype.indexOf){Array.prototype.indexOf=function(elt){var len=this.length>>>0;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0)
from+=len;for(;from<len;from++){if(from in this&&this[from]===elt)
return from;}
return-1;};}
$.fn.queryLoader2=function(options){return this.each(function(){(new QueryLoader2(this,options));});};})(jQuery);