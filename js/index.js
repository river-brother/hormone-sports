var level3=[{"name":"111","value":"1","child":[{"name":"222","value":"3","child":[{"name":"fff","value":"3"},{"name":"ggg","value":"4"},{"name":"hhh","value":"5"},{"name":"yyy","value":"6"}]},{"name":"333","value":"4","child":[{"name":"222","value":"3"},{"name":"333","value":"4"},{"name":"4444","value":"5"},{"name":"555","value":"6"}]},{"name":"4444","value":"5","child":[{"name":"222","value":"3"},{"name":"333","value":"4"},{"name":"4444","value":"5"},{"name":"555","value":"6"}]},{"name":"555","value":"6","child":[{"name":"fff","value":"3"},{"name":"ggg","value":"4"},{"name":"hhh","value":"5"},{"name":"yyy","value":"6"}]},{"name":"4444","value":"5","child":[{"name":"fff","value":"3"},{"name":"ggg","value":"4"},{"name":"hhh","value":"5"},{"name":"yyy","value":"6"}]},{"name":"555","value":"6","child":[{"name":"fff","value":"3"},{"name":"ggg","value":"4"},{"name":"hhh","value":"5"},{"name":"yyy","value":"6"}]}]},{"name":"ddd","value":"2","child":[{"name":"fff","value":"3"},{"name":"ggg","value":"4"},{"name":"hhh","value":"5"},{"name":"yyy","value":"6"}]},{"name":"www","value":"3","child":[{"name":"收到额外人","value":"3"},{"name":"啦啦啦","value":"4"},{"name":"饿的方式度过","value":"5"},{"name":"收到额外人","value":"6"}]},{"name":"rrr","value":"4","child":[{"name":"收到额外人","value":"3"},{"name":"啦啦啦","value":"4"},{"name":"饿的方式度过","value":"5"},{"name":"收到额外人","value":"6"}]},{"name":"yyy","value":"5","child":[{"name":"收到额外人","value":"3"},{"name":"啦啦啦","value":"4"},{"name":"饿的方式度过","value":"5"},{"name":"收到额外人","value":"6"}]},{"name":"uuu","value":"6","child":[{"name":"收到额外人","value":"3"},{"name":"啦啦啦","value":"4"},{"name":"饿的方式度过","value":"5"},{"name":"收到额外人","value":"6"}]}];var cityData=[{"id":"100000","name":"北京市","shortName":"北京","parentId":"100000","level":"1"},{"id":"110000","name":"天津市","shortName":"天津","parentId":"100000","level":"1"},{"id":"120000","name":"上海市","shortName":"上海","parentId":"100000","level":"1"},{"id":"130000","name":"杭州市","shortName":"杭州","parentId":"100000","level":"1"},{"id":"140000","name":"金华市","shortName":"金华","parentId":"100000","level":"1"},{"id":"150000","name":"厦门市","shortName":"厦门","parentId":"100000","level":"1"},{"id":"160000","name":"武汉市","shortName":"武汉","parentId":"100000","level":"1"},{"id":"170000","name":"广州市","shortName":"广州","parentId":"100000","level":"1"},{"id":"180000","name":"深圳市","shortName":"深圳","parentId":"100000","level":"1"},{"id":"190000","name":"重庆市","shortName":"重庆","parentId":"100000","level":"1"},{"id":"200000","name":"成都市","shortName":"成都","parentId":"100000","level":"1"}];(function(){var data=[],data2=[];cityData=JSON.stringify(cityData).replace(/\"id\":/g,'"value":');cityData=JSON.parse(cityData);for(var i=0,length=cityData.length;i<length;i++){if(cityData[i].parentId!=="100000"){data2.push(cityData[i])}else{data.push(cityData[i])}}$.each(data,function(index,val){var parentId=val.value;var _val=val;_val.child=[];$.each(data2,function(index,val){if(val.parentId===parentId){_val.child.push(val)}})});window.dataJson=data})();function __dealCssEvent(eventNameArr,callback){var events=eventNameArr,i,dom=this;function fireCallBack(e){if(e.target!==this){return}callback.call(this,e);for(i=0;i<events.length;i++){dom.off(events[i],fireCallBack)}}if(callback){for(i=0;i<events.length;i++){dom.on(events[i],fireCallBack)}}}$.fn.animationEnd=function(callback){__dealCssEvent.call(this,["webkitAnimationEnd","animationend"],callback);return this};$.fn.transitionEnd=function(callback){__dealCssEvent.call(this,["webkitTransitionEnd","transitionend"],callback);return this};$(function(){var mPickerDefaults={display:"bottom",shadow:false,level:1,rows:4,Linkage:false,dataJson:"",height:36,idDefault:false,splitStr:" ",isshort:false,header:'<div class="mPicker-header"></div>',footer:'<div class="mPicker-footer"><a href="javascript:;" class="mPicker-confirm">确定</a><a href="javascript:;" class="mPicker-cancel">取消</a></div>',confirm:function(){},cancel:function(){}};var moveStartLock;var ulWidth=["100%","50%"];var $body=$("body");var $mask=$('<div class="mPicker-mask hide"></div>');var $mPicker=$('<div class="mPicker hide"></div>');var lock,timeTouchend;if(!$(".mPicker").length){$body.append($mPicker);$mPicker.append($mask)}$body.on("touchmove",function(event){if(lock){event.preventDefault();event.stopPropagation()}});$body.on({touchstart:function(event){event.preventDefault();lock=1},touchmove:function(event){event.preventDefault();clearTimeout(timeTouchend);timeTouchend=setTimeout(function(){lock=0},100)},touchend:function(event){event.preventDefault();lock=0}},".mPicker-main");function MPicker(ele,options){if(!ele.length){return false}this.container=ele;this.mpicker=$(".mPicker");this.mask=this.mpicker.find(".mPicker-mask");this.options=$.extend({},mPickerDefaults,options);this.init();this.event();this.container.data("mPicker",this)}MPicker.prototype={init:function(ele,options){this.middleRowIndex=parseInt(this.options.rows/2.5);this.disy=this.options.display==="bottom"?"mPicker-bottom down":"mPicker-modal";
this.container.attr("readonly",true)},render:function(){var listStr;var jsonData=[];var mainStr;var self=this;jsonData.push(self.options.dataJson);if(self.options.level===2){var childStr=getChildJson(self.options.dataJson[0]);jsonData.push(childStr)}listStr=concatHtmlList.call(self,jsonData);mainStr='<div class="mPicker-main '+self.disy+'" data-pickerId="'+self.pickerId+'">'+self.options.header+'<div class="mPicker-content">'+listStr+'</div><div class="mPicker-shadow"></div>'+self.options.footer+"</div>";self.mpicker.append(mainStr);self.mpickerMain=self.mpicker.find(".mPicker-main");var $content=self.mpickerMain.find(".mPicker-content");var $list=self.mpickerMain.find(".mPicker-list");var $listUl=$list.find("ul");self.options.level>1?$list.width(ulWidth[self.options.level-1]):false;$list.append('<div class="mPicker-active-box"></div>');$list.find(".mPicker-active-box").height(self.options.height);var activeBoxMarginTop=self.options.rows%2===0?-self.options.height-2+"px":-self.options.height*0.5-2+"px";$content.find(".mPicker-active-box").css({"margin-top":activeBoxMarginTop});$content.height(self.options.height*self.options.rows);$list.height(self.options.height*self.options.rows)},showPicker:function(){var self=this;self.mpicker.data("object",self);self.render();var $list=self.mpicker.find(".mPicker-list");self.container.focus();self.container.blur();self.mpicker.removeClass("hide");self.mask.removeClass("hide");clearTimeout(self.timer);self.timer=setTimeout(function(){self.mpickerMain.removeClass("down")},10);if(!self.noFirst&&self.options.idDefault){matchDefaultData.call(self)}var id=[];setTransitionY(self.container,0);$list.each(function(index,ele){var dataVal=self.container.data("id"+(index+1))?self.container.data("id"+(index+1)):0;id.push(dataVal)});setItemMultiple.call(self,id)},hidePicker:function(callback){var self=this;self.mask.addClass("hide");if(self.options.display==="bottom"){self.mpicker.find(".mPicker-main").addClass("down").transitionEnd(function(){self.mpicker.addClass("hide");self.mpicker.find(".mPicker-main").remove();if(typeof(callback)==="function"){callback.call(self)}});return false}self.mpicker.addClass("hide");callback.call(self);self.mpicker.find(".mPicker-main").remove()},updateData:function(data){var self=this;if(!data.length){return}self.noFirst=false;for(var i=0;i<self.options.level;i++){self.container.data("id"+(i+1),0);self.container.data("value"+(i+1),"")}self.options.dataJson=data;self.mpicker.find(".mPicker-main").remove()},confirm:function(){var self=this;var str="";var $list=self.mpicker.find(".mPicker-main").find(".mPicker-list");var $listUl=$list.find("ul");self.noFirst=true;$.each($listUl,function(index,ele){var $active=$(ele).find(".active");var splitStr=index===0?"":self.options.splitStr;if($active.length>0){index=index+1;self.container.data("value"+index,$active.data("value"));self.container.data("id"+index,$active.data("id"));str+=splitStr+$active.text()}});self.container.val(str);self.hidePicker(self.options.confirm)},cancel:function(){var self=this;self.hidePicker(self.options.cancel)},event:function(){var self=this;this.container.off("touchstart.container click.container").on("touchstart.container click.container",function(e){e.preventDefault();e.stopPropagation();self.showPicker()});this.mpicker.off("touchstart.confirm click.confirm").on("touchstart.confirm click.confirm",".mPicker-confirm",function(e){e.preventDefault();var self=$(".mPicker").data("object");self.confirm()});this.mpicker.off("touchstart.cancel click.cancel").on("touchstart.cancel click.cancel",".mPicker-cancel",function(e){e.preventDefault();var self=$(".mPicker").data("object");self.cancel()});this.mpicker.off("touchstart.mask click.mask").on("touchstart.mask click.mask",".mPicker-mask",function(e){e.preventDefault();var self=$(".mPicker").data("object");if(self.options.shadow){self.cancel()}});var startY;var curY;var moveY;this.mpicker.off("touchstart.list mousedown.list").on("touchstart.list mousedown.list",".mPicker-list",function(event){fnTouches(event);var $this=$(this).find("ul");var tranY=getTranslateY($this);startY=getTouches(event).y-tranY;changeTime(0,$this);moveStartLock=true});this.mpicker.off("touchmove.list mousemove.list").on("touchmove.list mousemove.list",".mPicker-list",function(event){event.preventDefault();if(!moveStartLock){return false}var self=$(".mPicker").data("object");fnTouches(event);var translate;var $this=$(this).find("ul");var listHeight=$this.height();var itemHeight=self.options.height*self.options.rows;var transMaxY=itemHeight-listHeight-parseInt(self.options.rows/2)*self.options.height;var transMinY=self.middleRowIndex*self.options.height;curY=getTouches(event).y;moveY=curY-startY;translate=Math.round(moveY);translate=translate>transMinY?transMinY:translate;translate=translate<transMaxY?transMaxY:translate;setTransitionY($this,translate);clearTimeout(self.timeTouchend);self.timeTouchend=setTimeout(function(){touchEndFn.call(self,$this)},100)});this.mpicker.off("touchend.list mouseup.list").on("touchend.list mouseup.list",".mPicker-list",function(event){event.preventDefault();
var self=$(".mPicker").data("object");var $this=$(this).find("ul");touchEndFn.call(self,$this)})}};function getTouches(event){if(event.touches!==undefined){return{x:event.touches[0].pageX,y:event.touches[0].pageY}}if(event.touches===undefined){if(event.pageX!==undefined){return{x:event.pageX,y:event.pageY}}if(event.pageX===undefined){return{x:event.clientX,y:event.clientY}}}}function touchEndFn(ele){clearTimeout(this.timeTouchend);var result=setActiveItem.call(this,ele);var resultId=result.target.data("id");var itemIndex=this.mpicker.find(".mPicker-list ul").index(ele);if(this.options.Linkage&&itemIndex===0){refreshItemTwo.call(this,resultId)}changeTime(400,ele);moveStartLock=false}function matchDefaultData(){var self=this;var inputVal=this.container.val().split(this.options.splitStr);var defaultId=[];var defaultValue=[];var dataLevel2;var hasLevel2;var nameEach=function(data,index){$.each(data,function(key,val){if(val.name==inputVal[index]){defaultId[index]=key;defaultValue[index]=val.value;self.container.data("value"+(index+1),defaultValue[index]);self.container.data("id"+(index+1),defaultId[index]);return false}})};if(typeof(inputVal)!=="object"||!inputVal.length||!self.mpicker.find(".mPicker-main")){return}nameEach(this.options.dataJson,0);dataLevel2=this.options.Linkage?this.options.dataJson[defaultId[0]]:this.options.dataJson[0];if(this.options.Linkage&&this.options.level===2&&defaultId[0]&&inputVal.length>1){hasLevel2=1}if(!this.options.Linkage&&this.options.level===2&&inputVal.length>1){hasLevel2=1}if(hasLevel2){dataLevel2=getChildJson(dataLevel2);nameEach(dataLevel2,1)}}function setActiveItem(obj,val){var result;var y=Math.round((getTranslateY(obj)/this.options.height));var index=typeof(val)==="number"?obj.find("li").index(obj.find('li[data-id="'+val+'"]')):this.middleRowIndex-y;var y2=-this.options.height*(index-this.middleRowIndex);setTransitionY(obj,y2);obj.find("li").eq(index).addClass("active").siblings("li").removeClass("active");result={target:obj.find("li").eq(index),index:index};return result}function refreshItemTwo(index){var $itemTwo=this.mpicker.find(".mPicker-list ul").eq(1);var data=getChildJson(this.options.dataJson[index]);if(this.options.level===2){var str=concatHtmlItem.call(this,data);$itemTwo.html(str);setActiveItem.call(this,$itemTwo,0)}}function setItemMultiple(index){var $item=this.mpicker.find(".mPicker-list ul");var index1=index[0]?index[0]:0;var index2=index[1]?index[1]:0;if(this.options.Linkage){refreshItemTwo.call(this,index1)}setActiveItem.call(this,$item.eq(0),index1);if(this.options.level===2){setActiveItem.call(this,$item.eq(1),index2)}}function getChildJson(data){if(!data){return[]}var result=({}).hasOwnProperty.call(data,"child")?data.child:[];return result}function concatHtmlItem(data){var str="";var self=this;$.each(data,function(index,val){var name=self.options.isshort?val.shortName:val.name;str+='<li data-value="'+val.value+'" data-id="'+index+'">'+name+"</li>"});return str}function concatHtmlList(data){var html="";for(var i=0;i<data.length;i++){var itemStr=concatHtmlItem.call(this,data[i]);html+='<div class="mPicker-list"><ul>'+itemStr+"</ul></div>"}return html}function changeTime(times,obj){obj.css({"-webkit-transition-duration":times+"ms","transition-duration":times+"ms"})}function fnTouches(e){if(!e.touches){e.touches=e.originalEvent.touches}}function setTransitionY(obj,y){obj.css({"-webkit-transform":"translateY("+y+"px)",transform:"translateY("+y+"px)"})}function getTranslateY(obj){var transZRegex=/\.*translateY\((.*)px\)/i;var result;if(obj[0].style.WebkitTransform){result=parseInt(transZRegex.exec(obj[0].style.WebkitTransform)[1])}else{if(obj[0].style.transform){result=parseInt(transZRegex.exec(obj[0].style.transforms)[1])}}return result}$.fn.mPicker=function(options){return this.each(function(){new MPicker($(this),options)})}}());var method3=$(".select-value3").mPicker({level:1,dataJson:dataJson,Linkage:false,rows:6,idDefault:true,header:'<div class="mPicker-header">城市选择</div>',confirm:function(){},cancel:function(){}});