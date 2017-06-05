/*!
 * Vue-RecyclerView.js v0.3.3
 * (c) 2017 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.RecyclerView=e()}(this,function(){"use strict";function t(t){if(!t)return r;if(l.test(t.type)){var e=t.touches[0];return{x:e.clientX,y:e.clientY}}return h.test(t.type)?{x:t.clientX,y:t.clientY}:r}function e(t,e){for(var i in e)if(e[i].test(t[i]))return!0;return!1}function i(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var i=Object(t),s=1;s<arguments.length;s++){var o=arguments[s];if(o)for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(i[n]=o[n])}return i}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=t.getBoundingClientRect();return i.top<window.innerHeight*e&&i.bottom>0&&i.left<window.innerWidth*e&&i.right>0}function o(t,e,i,s){this.RUNWAY_ITEMS=s.prerender,this.RUNWAY_ITEMS_OPPOSITE=s.remain,this.ANIMATION_DURATION_MS=s.animation_duration_ms,this.TOMBSTONE_CLASS=s.tombstone_class,this.INVISIBLE_CLASS=s.invisible_class,this.MAX_COUNT=c,this.column=s.column||1,this.waterflow=s.waterflow,this.anchorItem={index:0,offset:0},this.timer=null,this.firstAttachedItem_=0,this.lastAttachedItem_=0,this.anchorScrollTop=0,this.tombstoneSize_=0,this.tombstoneWidth_=0,this.tombstones_=[],this.scroller_=t,this.source_=i,this.items_=e||[],this.loadedItems_=0,this.requestInProgress_=!1,this.source_.fetch||this.setItems(e),this.curPos=0,this.unusedNodes=[],this.baseNode=document.createElement("div"),this.scroller_.addEventListener("scroll",this.onScroll_.bind(this)),window.addEventListener("resize",this.onResize_.bind(this)),window.addEventListener("orientationchange",this.onResize_.bind(this)),this.onResize_()}function n(t){var e=(arguments.length>1&&void 0!==arguments[1]&&arguments[1],v(t));return t.component(e.name,e),e}var r={x:0,y:0},h=/mouse(down|move|up)/,l=/touch(start|move|end)/,a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},c=1/0;o.prototype={onResize_:function(){var t=this.source_.createTombstone(this.baseNode.cloneNode(!0));t.style.position="absolute",this.scroller_.appendChild(t),t.classList.remove(this.INVISIBLE_CLASS),this.tombstoneSize_=t.offsetHeight/this.column,this.tombstoneWidth_=t.offsetWidth,this.scroller_.removeChild(t);for(var e=0;e<this.items_.length;e++)this.items_[e].top=-1,this.items_[e].height=this.items_[e].width=0;this.onScroll_()},onScroll_:function(){var t=this.scroller_.scrollTop-this.anchorScrollTop;0==this.scroller_.scrollTop?this.anchorItem={index:0,offset:0}:this.anchorItem=this.calculateAnchoredItem(this.anchorItem,t),this.anchorScrollTop=this.scroller_.scrollTop;var e=this.calculateAnchoredItem(this.anchorItem,this.scroller_.offsetHeight);t<0?this.fill(this.anchorItem.index-this.RUNWAY_ITEMS,e.index+this.RUNWAY_ITEMS_OPPOSITE):this.fill(this.anchorItem.index-this.RUNWAY_ITEMS_OPPOSITE,e.index+this.RUNWAY_ITEMS)},calculateAnchoredItem:function(t,e){if(0===e)return t;e+=t.offset;var i=t.index,s=0;if(e<0){for(;e<0&&i>0&&this.items_[i-1].height;)e+=this.items_[i-1].height,i--;s=Math.max(-i,Math.ceil(Math.min(e,0)/this.tombstoneSize_))}else{for(;e>0&&i<this.items_.length&&this.items_[i].height&&this.items_[i].height<e;)e-=this.items_[i].height,i++;(i>=this.items_.length||!this.items_[i].height)&&(s=Math.floor(Math.max(e,0)/this.tombstoneSize_))}return i+=s,e-=s*this.tombstoneSize_,i=Math.min(i,this.MAX_COUNT-1),{index:Math.floor(i/this.column)*this.column,offset:e}},fill:function(t,e){this.firstAttachedItem_=Math.max(0,t),this.lastAttachedItem_=e,this.attachContent()},getTombstone:function(){var t=this.tombstones_.pop();return t?(t.classList.remove(this.INVISIBLE_CLASS),t.style.opacity=1,t.style.transform="",t.style.transition="",t):this.source_.createTombstone(this.baseNode.cloneNode(!0))},getUnUsedNodes:function(){if(this.waterflow)for(var t=0;t<this.items_.length;t++)this.items_[t].node&&!s(this.items_[t].node)&&(this.items_[t].vm?this.clearItem(this.items_[t]):this.clearTombstone(this.items_[t]),this.items_[t].vm=null,this.items_[t].node=null);else for(var e=0;e<this.items_.length;e++)e!==this.firstAttachedItem_?(this.items_[e].vm?this.clearItem(this.items_[e]):this.clearTombstone(this.items_[e]),this.items_[e].vm=null,this.items_[e].node=null):e=this.lastAttachedItem_-1},clearItem:function(t){t.vm&&(t.vm.$destroy(),t.node&&this.unusedNodes.push(t.node))},clearTombstone:function(t){t.node&&(t.node.classList.contains(this.TOMBSTONE_CLASS)?(this.tombstones_.push(t.node),this.tombstones_[this.tombstones_.length-1].classList.add(this.INVISIBLE_CLASS)):this.unusedNodes.push(t.node))},clearUnUsedNodes:function(){for(;this.unusedNodes.length;)this.scroller_.removeChild(this.unusedNodes.pop())},getNodePosition:function(){this.anchorScrollTop=0;for(var t=0;t<this.anchorItem.index;t++)this.anchorScrollTop+=this.items_[t].height||this.tombstoneSize_;this.anchorScrollTop+=this.anchorItem.offset,this.curPos=this.anchorScrollTop-this.anchorItem.offset;for(var e=this.anchorItem.index;e>this.firstAttachedItem_;)this.curPos-=this.items_[e-1].height||this.tombstoneSize_,e--;for(;e<this.firstAttachedItem_;)this.curPos+=this.items_[e].height||this.tombstoneSize_,e++},tombstoneLayout:function(t){var e=void 0,i=void 0,s=void 0;for(e in t)i=t[e],s=e%this.column*this.items_[e].width,this.items_[e].node.style.transform="translate3d("+s+"px,"+(this.anchorScrollTop+i[1])*this.column+"px, 0) scale("+this.tombstoneWidth_/this.items_[e].width+", "+this.tombstoneSize_/this.items_[e].height+")",this.items_[e].node.offsetTop,i[0].offsetTop,this.items_[e].node.style.transition="transform "+this.ANIMATION_DURATION_MS+"ms"},itemLayout:function(t){var e=this,i=void 0,s=void 0,o=0,n=0,r=0;this.waterflow&&!this.posList&&(this.posList={data:{0:Array.from({length:this.column}).map(function(t){return e.curPos})},get:function(t,e){var i=this;return this.data[t]||(this.data[t]=Array.from({length:this.column}).map(function(t){return i.curPos})),void 0===e?this.data[t]:this.data[t][e]},set:function(t,e,i){this.get(t)[e]=i}});for(i=this.firstAttachedItem_;i<this.lastAttachedItem_;i++)s=t[i],this.waterflow&&(r=Math.floor(i/this.column)),o=i%this.column*(this.items_[i].width||this.tombstoneWidth_),n=this.waterflow?this.posList.get(r,i%this.column):this.curPos,s&&(s[0].style.transition="transform "+this.ANIMATION_DURATION_MS+"ms, opacity "+this.ANIMATION_DURATION_MS+"ms",s[0].style.transform="translate3d("+o+"px,"+n+"px, 0) scale("+this.items_[i].width/this.tombstoneWidth_+", "+this.items_[i].height/this.tombstoneSize_+")",s[0].style.opacity=0),this.curPos!==this.items_[i].top&&(s||(this.items_[i].node.style.transition=""),this.items_[i].node.style.transform="translate3d("+o+"px,"+n+"px, 0)"),this.items_[i].top=n,(i+1)%this.column==0&&(this.curPos+=(this.items_[i].height||this.tombstoneSize_)*this.column),this.waterflow&&this.posList.set(r+1,i%this.column,n+(this.items_[i].height||this.tombstoneSize_)*this.column)},setAnimatePosition:function(t){this.tombstoneLayout(t),this.itemLayout(t)},renderItems:function(){var t={},e=void 0,i=[],s=void 0,o=Math.floor((this.lastAttachedItem_+this.RUNWAY_ITEMS)/this.column)*this.column;for(o>this.MAX_COUNT&&(this.lastAttachedItem_=this.MAX_COUNT),s=this.firstAttachedItem_;s<this.lastAttachedItem_;s++){for(;this.items_.length<=s;)this.addItem_();if(this.items_[s].node){if(!this.items_[s].node.classList.contains(this.TOMBSTONE_CLASS)||!this.items_[s].data)continue;this.ANIMATION_DURATION_MS?(this.items_[s].node.style.zIndex=1,t[s]=[this.items_[s].node,this.items_[s].top-this.anchorScrollTop]):(this.items_[s].node.classList.add(this.INVISIBLE_CLASS),this.tombstones_.push(this.items_[s].node)),this.items_[s].node=null}e=this.items_[s].data?this.source_.render(this.items_[s].data,this.unusedNodes.pop()||this.baseNode.cloneNode(!0),this.items_[s]):this.getTombstone(),e.style.position="absolute",this.items_[s].top=-1,this.items_[s].node=e,i.push(e)}var n=i.length;for(s=0;s<n;s++)this.scroller_.appendChild(i[s]);return t},cacheItemHeight:function(t){for(var e=this.firstAttachedItem_;e<this.lastAttachedItem_;e++)!this.items_[e].data||!t&&this.items_[e].height||(this.items_[e].height=this.items_[e].node.offsetHeight/this.column,this.items_[e].width=this.items_[e].node.offsetWidth)},attachContent:function(){var t=this;this.getUnUsedNodes();var e=this.renderItems();this.clearUnUsedNodes(),this.cacheItemHeight(),this.getNodePosition(),this.setAnimatePosition(e),this.ANIMATION_DURATION_MS&&setTimeout(function(){t.tombstoneAnimation(e)},this.ANIMATION_DURATION_MS),this.maybeRequestContent()},setItems:function(t){t=t||[],this.items_=t,this.MAX_COUNT=t.length},scrollToIndex:function(t){var e=this.lastAttachedItem_-this.firstAttachedItem_;this.fill(t-e,t+1)},setScrollRunway:function(){this.scrollRunwayEnd_=Math.max(this.scrollRunwayEnd_,this.curPos+this.SCROLL_RUNWAY),this.scrollRunway_.style.transform="translate(0, "+this.scrollRunwayEnd_+"px)",this.scroller_.scrollTop=this.anchorScrollTop},tombstoneAnimation:function(t){var e=void 0;for(var i in t)e=t[i],e[0].classList.add(this.INVISIBLE_CLASS),this.tombstones_.push(e[0]);t=null},maybeRequestContent:function(){var t=this;if(!this.requestInProgress_){var e=this.lastAttachedItem_-this.loadedItems_;e<=0||(this.requestInProgress_=!0,this.source_.fetch&&this.source_.fetch(e,this.loadedItems_).then(function(e){t.MAX_COUNT=e.count,t.addContent(e.list)}))}},addItem_:function(){this.items_.push({vm:null,data:null,node:null,height:0,width:0,top:0})},addContent:function(t){if(t.length){this.requestInProgress_=!1;for(var e=void 0,i=0;i<t.length;i++)this.items_.length<=this.loadedItems_&&this.addItem_(),this.loadedItems_<=this.MAX_COUNT&&(e=this.loadedItems_++,this.items_[e].data=t[i]);this.attachContent()}},clear:function(){this.loadedItems_=0,this.requestInProgress_=!1,this.firstAttachedItem_=-1,this.lastAttachedItem_=-1,this.getUnUsedNodes(),this.clearUnUsedNodes(),this.items_=[],this.onResize_()},destroy:function(){this.scroller_.removeEventListener("scroll",this.onScroll_),window.removeEventListener("resize",this.onResize_),window.removeEventListener("orientationchange",this.onResize_),this.clear()}};var m=(function(){function t(t){this.value=t}function e(e){function i(t,e){return new Promise(function(i,o){var h={key:t,arg:e,resolve:i,reject:o,next:null};r?r=r.next=h:(n=r=h,s(t,e))})}function s(i,n){try{var r=e[i](n),h=r.value;h instanceof t?Promise.resolve(h.value).then(function(t){s("next",t)},function(t){s("throw",t)}):o(r.done?"return":"normal",r.value)}catch(t){o("throw",t)}}function o(t,e){switch(t){case"return":n.resolve({value:e,done:!0});break;case"throw":n.reject(e);break;default:n.resolve({value:e,done:!1})}n=n.next,n?s(n.key,n.arg):r=null}var n,r;this._invoke=i,"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),u=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),d=function(){function t(e,i,s,o){m(this,t),this.itemRender=i,this.TombstoneRender=s,this.fetch=e,this.Vue=o}return u(t,[{key:"createTombstone",value:function(t){var e=this;return new this.Vue({el:t,render:function(t){return t(e.TombstoneRender)}}).$el}},{key:"render",value:function(t,e,i){var s=this,o=new this.Vue({el:e,render:function(e){return e(s.itemRender,{props:{data:t}})}});return i.vm=o,o.$el}}]),t}(),_={render:function(t){return t("div",{attrs:{class:"recyclerview-loading"}},"Loading...")}},f={render:function(t){return t("div",{attrs:{class:"recyclerview-item tombstone"},style:{height:"100px",width:"100%"}},"")}},p={preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/},distance:50,animation_duration_ms:200,tombstone_class:"tombstone",invisible_class:"invisible",prerender:20,remain:10,preventDefault:!1,column:1,waterflow:!1},v=function(s){return{name:"RecyclerView",props:{fetch:Function,list:Array,item:Object,loading:Object,tombstone:{type:Object,default:function(){return f}},column:Number,prerender:Number,remain:Number,waterflow:Boolean,preventDefault:Boolean,options:Object,tag:{type:String,default:"div"}},render:function(t){return t(this.tag,{attrs:{class:"recyclerview-container"}},[t(this.loading||_),t(this.tag,{attrs:{class:"recyclerview"},on:{touchstart:this._start,touchmove:this._move,touchend:this._end,touchcancel:this._end,mousedown:this._start,mousemove:this._move,mouseup:this._end}})])},data:function(){return{startPointer:{x:0,y:0},_options:{},distance:0,pulling:!1,contentSource:new d(this.fetch,this.item,this.tombstone,s),scroller:null}},mounted:function(){this.init()},beforeDestroy:function(){this.scroller.destroy(),this.scroller=null},methods:{init:function(){this._options=i({},p,{prerender:this.prerender||p.prerender,remain:this.remain||p.remain,column:this.column||p.column,waterflow:this.waterflow||p.waterflow},this.options),this.$list=this.$el.querySelector(".recyclerview"),this.scroller=new o(this.$list,this.list,this.contentSource,this._options)},scrollToIndex:function(t){var e=this;if(this.waterflow)for(var i=0,s=this.scroller.items_.length;i<s;i++)i===t&&this._scrollTo(this.scroller.items_[i].top-this.scroller.items_[i].height*this._options.column+this.$list.offsetWidth);else t=Number(t),this.scroller.scrollToIndex(t),this.$nextTick(function(){e._scrollToBottom()})},_scrollTo:function(t){t=t||0,this.$list.scrollTop=Number(t)},_scrollToBottom:function(){this._scrollTo(this.$list.scrollHeight)},_renderListStyle:function(){this.$list.style.transform="translate3d(0, "+this.distance+"px, 0)"},_start:function(i){this.$list.scrollTop>0||(this.pulling=!0,this.startPointer=t(i),this.$list.style.transition="transform .2s",this.preventDefault&&!e(i.target,this._options.preventDefaultException)&&i.preventDefault())},_move:function(i){if(this.pulling){var s=t(i),o=s.y-this.startPointer.y;if(o<0)return void this._scrollTo(-o);this.preventDefault&&!e(i.target,this._options.preventDefaultException)&&i.preventDefault(),this.distance=Math.floor(.5*o),this.distance>this._options.distance&&(this.distance=this._options.distance),a(this._renderListStyle.bind(this))}},_end:function(t){var i=this;this.pulling&&(this.preventDefault&&!e(t.target,this._options.preventDefaultException)&&t.preventDefault(),this.pulling=!1,this.$list.style.transition="transform .3s",this.$nextTick(function(){i.$list.style.transform=""}),this.distance>=this._options.distance&&(this.distance=0,this.scroller.clear()))}}}};!function(t,e){if("undefined"==typeof document)return e;t=t||"";var i=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",s.styleSheet?s.styleSheet.cssText=t:s.appendChild(document.createTextNode(t)),i.appendChild(s)}(".recyclerview-container{position:relative}.recyclerview-loading{position:absolute;top:0;left:0;width:100%;text-align:center;padding:10px;font-size:14px;color:#9e9e9e}.recyclerview{background:#fff;margin:0;padding:0;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;width:100%;height:100%;position:absolute;box-sizing:border-box;contain:layout;will-change:transform}",void 0);var I={install:n};return"undefined"!=typeof window&&window.Vue&&window.Vue.use(n),I});
