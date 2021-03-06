imageOpacityVine=function(a,b,c,d,e,f,g,h,i){function j(d,e){return e=d[a]=d[a]||b++,c[e]||(c[e]={b:{},e:{}})}function k(a){return a.charAt?g.getElementById(a):a}return h={d:j,id:k,Event:i=function(a,b,c){c=this;for(b in a)c[b]=c[b]||a[b];c.timestamp=+(new Date),c.target||(c.target=c.srcElement)},bind:function(a,b,c,g,i,l,m,n){if((n=(m=b.split(" ")).length)>1)while(n--)h.bind(a,m[n],c);else{a=k(a),i=j(a);if(l=/^(.+)\.([^\.]+)$/.exec(b))b=l[2],l=l[1];(i.e[b]||(i.e[b]=[])).push({n:l,f:c,d:g||{}}),!i.b[b]&&(i.b[b]=1,a[e]?a[e](b,function(c){h.trigger(a,b,c)[d]&&c.preventDefault()},null):a[f]("on"+b,function(){return!h.trigger(a,b,window.event)[d]}))}},trigger:function(a,b,c,e,f,h,l,m,n){a=k(a);if(!c&&a.nodeType){if(!a.fireEvent)return l=g.createEvent((init=/click|mousedown|mouseup|mousemove/.test(b))?"MouseEvents":"HTMLEvents"),l[init?"initMouseEvent":"initEvent"](b,!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),a.dispatchEvent(l),l;try{return new i({defaultPrevented:a[b==="click"?b:fireEvent]("on"+b)})}catch(o){}}l=new i(c||{});if(e=j(a).e[b]){for(f=0,h=e.length;f<h;f++)if(n=e[f])l.namespace=n.n,l.data=n.d,m=m||n.f.call(a,l)===!1;l[d]=l[d]||m}return l},unbind:function(b,d,e,f,g,h,i){b=k(b);if(!d)return c[b[a]]=b[a]=null;e=j(b);if(d.charAt)if(d.charAt(0)==="."){d=d.substring(1);for(g in e.e){i=e.e[g],h=i.length;for(f=0;f<h;f++)i[f].n===d&&(i[f]=null)}}else e.e[d]=[];else for(g in e.e){i=e.e[g],h=i.length;for(f=0;f<h;f++)i[f].f===d&&(i[f]=null)}}},i.prototype={defaultPrevented:!1,preventDefault:function(){this[d]=!0}},h}(+(new Date),1,{},"defaultPrevented","addEventListener","attachEvent",document);
var gui = gui || {};

(function()
{
   gui.ImageOpacitySlider = function() {};
   gui.ImageOpacitySlider.prototype = {

   		/*
		*********************************************VARS
		*/
   		beingDragged:false,
   		dragIntervalID:null,
   		dragLeftBounds:null,
   		dragRightBounds:null,
   		dragPrevX:null,
   		changeOpacityStep:false,
   		holderWidth:null,
   		holderLeft:null,
   		intervalID:null,
   		animateTargetOpacity:1,
   		animationStepChange:0.05,

		/*
		*********************************************METHODS
		*/
		init: function(firstImagePath, secondImagePath, optionalImageWidth) {
			
			var touchSupport = 'ontouchend' in document;
			var dragSupport = 'ondragend' in document;

			this.holder = document.createElement('div');
			this.holder.style.position = 'relative';
			if (optionalImageWidth) {
				this.holder.style.width = optionalImageWidth + 'px';
			}
			this.holder.style.maxWidth = '100%';
			this.holder.style.overflow = 'hidden';

			var firstImage = document.createElement('img');
			firstImage.src = firstImagePath;
			firstImage.style.width = '100%';
			firstImage.style.height = 'auto';
			this.holder.appendChild(firstImage);

			this.secondImage = document.createElement('img');
			this.secondImage.src = secondImagePath;
			this.secondImage.style.width = '100%';
			this.secondImage.style.height = 'auto';
			this.secondImage.style.opacity = 1;
			this.secondImage.style.position = 'absolute';
			this.secondImage.style.top = 0;
			this.secondImage.style.left = 0;
			this.holder.appendChild(this.secondImage);

			//construct slider
			var sliderHolder = document.createElement('div');
			if (optionalImageWidth) {
				sliderHolder.style.width = optionalImageWidth + 'px';
			}
			sliderHolder.style.padding = '10px 0';
			sliderHolder.style.position = 'relative';
			this.holder.appendChild(sliderHolder);

			this.sliderBg = document.createElement('div');
			this.sliderBg.style.backgroundColor = '#cdcdcd';
			this.sliderBg.style.width = '100%';
			this.sliderBg.style.height = '2px';
			sliderHolder.appendChild(this.sliderBg);

			this.grabberHolder = document.createElement('div');
			this.grabberHolder.style.width = '100px';
			this.grabberHolder.style.height = '100px';
			//this.grabberHolder.style.backgroundColor = '#00ff00';
			this.grabberHolder.style.position = 'absolute';
			this.grabberHolder.style.top = '-35px';
			this.grabberHolder.style.left = '-41px';
			sliderHolder.appendChild(this.grabberHolder);

			this.sliderGrabber = document.createElement('div');
			this.sliderGrabber.style.position = 'absolute';
			this.sliderGrabber.style.top = '37px';
			this.sliderGrabber.style.left = '50%';
			this.sliderGrabber.style.marginLeft = '-9px';
			this.sliderGrabber.style.backgroundColor = '#fff';
			this.sliderGrabber.style.width = this.sliderGrabber.style.height = '15px'
			this.sliderGrabber.style.border = '1px solid #999';
			this.sliderGrabber.style.borderRadius = '10px';
			this.grabberHolder.appendChild(this.sliderGrabber);

			if (touchSupport) {
				this.grabberHolder.style.left = '-32px';
				this.sliderGrabber.style.width = this.sliderGrabber.style.height = '20px';
				this.sliderGrabber.style.marginLeft = '-18px';
				this.sliderGrabber.style.top = '35px';
				sliderHolder.style.marginTop = '5px';
				this.sliderGrabber.style.borderRadius = '15px';
				this.holder.style.paddingBottom = '5px';
			}

			var btnHolder = document.createElement('div');
			btnHolder.style.margin = '10px 0px';
			btnHolder.style.position = 'relative';
			this.holder.appendChild(btnHolder);

			var beforeBtn = document.createElement('span');
			beforeBtn.style.fontSize = '12px';
			beforeBtn.style.fontFamily = 'Helvetica, Arial, sans'
			beforeBtn.style.color = '#999';
			beforeBtn.style.backgroundColor = '#fff';
			beforeBtn.style.padding = '4px 8px';
			beforeBtn.style.border = '1px solid #999';
			beforeBtn.style.borderRadius = '3px';
			beforeBtn.style.cssFloat = 'left';
			beforeBtn.style.cursor = 'pointer';
			beforeBtn.innerHTML = '1912';
			btnHolder.appendChild(beforeBtn);

			var afterBtn = document.createElement('span');
			afterBtn.style.fontSize = '12px';
			afterBtn.style.fontFamily = 'Helvetica, Arial, sans'
			afterBtn.style.color = '#999';
			afterBtn.style.backgroundColor = '#fff';
			afterBtn.style.padding = '4px 8px';
			afterBtn.style.border = '1px solid #999';
			afterBtn.style.borderRadius = '3px';
			afterBtn.style.cssFloat = 'right';
			afterBtn.style.cursor = 'pointer';
			afterBtn.innerHTML = '2013';
			btnHolder.appendChild(afterBtn);


			var parentElem = document.getElementById('imageOpacitySlider').parentNode;
			parentElem.appendChild(this.holder);

			this.holderWidth = this.holder.clientWidth;
			this.holderLeft = this.holder.getBoundingClientRect().left;

			//set bounds vars
			var grabberRect = this.grabberHolder.getBoundingClientRect();

			this.dragLeftBounds = (touchSupport) ? -32 : -41;
			this.dragRightBounds = this.dragLeftBounds + (this.holderWidth - (this.sliderGrabber.clientWidth + 2));

			//add Event listeners
			var vineDataObj = {thisRef:this};
			if (touchSupport) {
				imageOpacityVine.bind(this.grabberHolder, "touchstart", this.handleGrabberTouchstart, vineDataObj);
				imageOpacityVine.bind(document, "touchend", this.handleGrabberTouchend, vineDataObj);
				
				//add slider support to the image as well as the grabber
				imageOpacityVine.bind(this.secondImage, "touchstart", this.handleImageTouchstart, vineDataObj);
				imageOpacityVine.bind(this.secondImage, "touchmove", this.handleImageTouchmove, vineDataObj);
			}
			else {
				imageOpacityVine.bind(this.grabberHolder, "mousedown", this.handleGrabberMouseDown, vineDataObj);
				imageOpacityVine.bind(document, "mouseup", this.handleGrabberMouseUp, vineDataObj);
			}

			imageOpacityVine.bind(window, "resize", this.handleWindowResize, vineDataObj);

			imageOpacityVine.bind(beforeBtn, "click", this.handleBeforeBtnClick, vineDataObj);
			imageOpacityVine.bind(afterBtn, "click", this.handleAfterBtnClick, vineDataObj);

		},

		handleGrabberMouseDown:function(e) {
			e.preventDefault();
			clearInterval(e.data.thisRef.intervalID);
			if (!e.data.thisRef.beingDragged) {
				//start the dragging process!
				e.data.thisRef.beingDragged = true;

				e.data.thisRef.dragPrevX = e.pageX;

				imageOpacityVine.bind(document, "mousemove", e.data.thisRef.updateGrabberMove, e.data);
			}
		},

		updateGrabberMove:function(e) {
			var currentPageX = e.pageX;
			var plusDiff = currentPageX - e.data.thisRef.dragPrevX;
			
			var grabberLeft = +e.data.thisRef.grabberHolder.style.left.replace(/[^-0-9\.]/g,'');
			var targetLeft = (grabberLeft + plusDiff);

			if (targetLeft < e.data.thisRef.dragLeftBounds) {
				targetLeft = e.data.thisRef.dragLeftBounds;
			}else if (targetLeft > e.data.thisRef.dragRightBounds) {
				targetLeft = e.data.thisRef.dragRightBounds;
			}

			e.data.thisRef.grabberHolder.style.left = targetLeft + 'px';
			e.data.thisRef.dragPrevX = currentPageX;

			//set the opacity of the first image accordingly
			var targetOpacity = Math.abs(((targetLeft - e.data.thisRef.dragLeftBounds) / (e.data.thisRef.dragRightBounds - e.data.thisRef.dragLeftBounds)) - 1);
			e.data.thisRef.secondImage.style.opacity = targetOpacity;

		},

		handleGrabberMouseUp:function(e) {
			//remove the mouse move listener
			imageOpacityVine.unbind(document, "mousemove", e.data.thisRef.updateGrabberMove);
			e.data.thisRef.beingDragged = false;
		},

		handleGrabberTouchstart:function(e) {
			e.preventDefault();
			clearInterval(e.data.thisRef.intervalID);
			if (!e.data.thisRef.beingDragged && e.touches.length === 1) {
				//start the dragging process!
				e.data.thisRef.beingDragged = true;

				var touch = e.touches[0];

				e.data.thisRef.dragPrevX = touch.pageX;

				imageOpacityVine.bind(document, "touchmove", e.data.thisRef.handleGrabberTouchmove, e.data);
			}
		},

		handleGrabberTouchmove:function(e) {
			
			if (e.data.thisRef.changeOpacityStep) {
				var grabber = e.data.thisRef.grabberHolder;
				var touch = e.touches[0];
				var currentPageX = touch.pageX;
				var plusDiff = currentPageX - e.data.thisRef.dragPrevX;
				
				var grabberLeft = +e.data.thisRef.grabberHolder.style.left.replace(/[^-0-9\.]/g,'');
				var targetLeft = (grabberLeft + plusDiff);

				if (targetLeft < e.data.thisRef.dragLeftBounds) {
					targetLeft = e.data.thisRef.dragLeftBounds;
				}else if (targetLeft > e.data.thisRef.dragRightBounds) {
					targetLeft = e.data.thisRef.dragRightBounds;
				}

				e.data.thisRef.grabberHolder.style.left = targetLeft + 'px';
				e.data.thisRef.dragPrevX = currentPageX;

				//set the opacity of the first image accordingly
				var targetOpacity = Math.abs(((targetLeft - e.data.thisRef.dragLeftBounds) / (e.data.thisRef.dragRightBounds - e.data.thisRef.dragLeftBounds)) - 1);
				e.data.thisRef.secondImage.style.opacity = targetOpacity;
				
				e.data.thisRef.changeOpacityStep = false;
			}
			else {
				e.data.thisRef.changeOpacityStep = true;
			}
		},

		handleGrabberTouchend:function(e) {
			//e.preventDefault();
			//remove the mouse move listener
			imageOpacityVine.unbind(document, "touchmove", e.data.thisRef.handleGrabberTouchmove);
			e.data.thisRef.beingDragged = false;
		},

		handleImageTouchstart:function(e) {
			e.preventDefault();
			clearInterval(e.data.thisRef.intervalID);
		},

		handleImageTouchmove:function(e) {
			
			var imageXPos = e.touches[0].pageX - e.data.thisRef.holderLeft;
			var imageWidth = e.data.thisRef.secondImage.clientWidth;
			var opacitydec = imageXPos / imageWidth, targetOpacity = Math.abs(opacitydec - 1);
			e.data.thisRef.secondImage.style.opacity = targetOpacity;

			var grabberBoundsWidth = e.data.thisRef.dragRightBounds - e.data.thisRef.dragLeftBounds;
			var targetGrabberX = e.data.thisRef.dragLeftBounds + (grabberBoundsWidth * opacitydec);
			if (targetGrabberX > e.data.thisRef.dragRightBounds) {
				targetGrabberX = e.data.thisRef.dragRightBounds;
			}
			else if (targetGrabberX < e.data.thisRef.dragLeftBounds) {
				targetGrabberX = e.data.thisRef.dragLeftBounds;
			}

			e.data.thisRef.grabberHolder.style.left = targetGrabberX + 'px';
		},

		handleBeforeBtnClick:function(e) {
			e.data.thisRef.animateTargetOpacity = 1;
			clearInterval(e.data.thisRef.intervalID);
			e.data.thisRef.intervalID = window.setInterval(e.data.thisRef.handleAnimateUpdate, 100, e.data.thisRef);
		},

		handleAfterBtnClick:function(e) {
			e.data.thisRef.animateTargetOpacity = 0;
			clearInterval(e.data.thisRef.intervalID);
			e.data.thisRef.intervalID = window.setInterval(e.data.thisRef.handleAnimateUpdate, 100, e.data.thisRef);
		},
		
		handleAnimateUpdate:function(thisRef) {
			var currentOpacity = +thisRef.secondImage.style.opacity;
			if (thisRef.animateTargetOpacity) {
				//add to the opacity
				thisRef.secondImage.style.opacity = (+thisRef.secondImage.style.opacity < 1) ? +thisRef.secondImage.style.opacity + thisRef.animationStepChange : thisRef.handleStopInterval(thisRef, 1);
			}
			else {
				//minus from the opacity
				thisRef.secondImage.style.opacity = (+thisRef.secondImage.style.opacity > thisRef.animationStepChange) ? +thisRef.secondImage.style.opacity - thisRef.animationStepChange : thisRef.handleStopInterval(thisRef, 0);
			}

			var grabberBoundsWidth = thisRef.dragRightBounds - thisRef.dragLeftBounds, opacityDec = Math.abs(+thisRef.secondImage.style.opacity - 1);;
			var targetGrabberX = thisRef.dragLeftBounds + (grabberBoundsWidth * opacityDec);
			if (targetGrabberX > thisRef.dragRightBounds) {
				targetGrabberX = thisRef.dragRightBounds;
			}
			else if (targetGrabberX < thisRef.dragLeftBounds) {
				targetGrabberX = thisRef.dragLeftBounds;
			}

			thisRef.grabberHolder.style.left = targetGrabberX + 'px';
		},

		handleStopInterval:function(thisRef, returnNum) {
			clearInterval(thisRef.intervalID);
			return returnNum;
		},

		handleWindowResize:function(e) {
			if (e.data.thisRef.holder.clientWidth !== e.data.thisRef.holderWidth) {
				e.data.thisRef.holderWidth = e.data.thisRef.holder.clientWidth;
				e.data.thisRef.dragRightBounds = e.data.thisRef.dragLeftBounds + (e.data.thisRef.holderWidth - (e.data.thisRef.sliderGrabber.clientWidth + 2));
				//set the position of the grabber
				var range = e.data.thisRef.dragRightBounds - e.data.thisRef.dragLeftBounds;
				var dec = Math.abs(1 - e.data.thisRef.secondImage.style.opacity);
				e.data.thisRef.grabberHolder.style.left = (e.data.thisRef.dragLeftBounds + (range * dec)) + 'px';
			}
		}

	};

}());