!function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define("Percept",[],o):"object"==typeof exports?exports.Percept=o():t.Percept=o()}(self,(()=>(()=>{"use strict";var t={871:(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Constant=void 0,function(t){t[t.TAU=Math.PI/180]="TAU"}(o.Constant||(o.Constant={}))},426:(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Dimension=void 0;var e=function(){function t(t,o){this.width=t,this.height=o}return t.prototype.max=function(){return Math.max(this.width,this.height)},t}();o.Dimension=e},726:function(t,o,e){var n=this&&this.__createBinding||(Object.create?function(t,o,e,n){void 0===n&&(n=e);var i=Object.getOwnPropertyDescriptor(o,e);i&&!("get"in i?!o.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return o[e]}}),Object.defineProperty(t,n,i)}:function(t,o,e,n){void 0===n&&(n=e),t[n]=o[e]}),i=this&&this.__exportStar||function(t,o){for(var e in t)"default"===e||Object.prototype.hasOwnProperty.call(o,e)||n(o,t,e)};Object.defineProperty(o,"__esModule",{value:!0}),i(e(871),o),i(e(426),o),i(e(863),o),i(e(860),o),i(e(316),o)},863:function(t,o){var e=this&&this.__spreadArray||function(t,o,e){if(e||2===arguments.length)for(var n,i=0,s=o.length;i<s;i++)!n&&i in o||(n||(n=Array.prototype.slice.call(o,0,i)),n[i]=o[i]);return t.concat(n||Array.prototype.slice.call(o))};Object.defineProperty(o,"__esModule",{value:!0}),o.Matrix=void 0;var n=function(){function t(t){this.value=t}return t.prototype.multiply=function(o){var n;if(o instanceof t){n=e([],Array(this.value.length),!0).map((function(){return Array(o.value[0].length)}));for(var i=0;i<this.value.length;i++)for(var s=0;s<o.value[0].length;s++){for(var r=0,h=0;h<this.value[0].length;h++)r+=this.value[i][h]*o.value[h][s];n[i][s]=r}}else{n=e([],Array(this.value.length),!0).map((function(){return Array(o[0].length)}));for(i=0;i<this.value.length;i++)for(s=0;s<o[0].length;s++){for(r=0,h=0;h<this.value[0].length;h++)r+=this.value[i][h]*o[h][s];n[i][s]=r}}return new t(n)},t.prototype.multiplyInPlace=function(o){var n;if(o instanceof t){n=e([],Array(this.value.length),!0).map((function(){return Array(o.value[0].length)}));for(var i=0;i<this.value.length;i++)for(var s=0;s<o.value[0].length;s++){for(var r=0,h=0;h<this.value[0].length;h++)r+=this.value[i][h]*o.value[h][s];n[i][s]=r}}else{n=e([],Array(this.value.length),!0).map((function(){return Array(o[0].length)}));for(i=0;i<this.value.length;i++)for(s=0;s<o[0].length;s++){for(r=0,h=0;h<this.value[0].length;h++)r+=this.value[i][h]*o[h][s];n[i][s]=r}}return this.value=n,this},t.prototype.clone=function(){return new t([[this.value[0][0],this.value[0][1],this.value[0][2]],[this.value[1][0],this.value[1][1],this.value[1][2]],[this.value[2][0],this.value[2][1],this.value[2][2]]])},t.prototype.getRotation=function(){return Math.atan2(this.value[0][1],this.value[0][0])*(180/Math.PI)},t.Identity=function(){return new t([[1,0,0],[0,1,0],[0,0,1]])},t.Zero=function(){return new t([[0,0,0],[0,0,0],[0,0,0]])},t.Multiply=function(t,o){for(var n=e([],Array(t.length),!0).map((function(){return Array(o[0].length)})),i=0;i<t.length;i++)for(var s=0;s<o[0].length;s++){for(var r=0,h=0;h<t[0].length;h++)r+=t[i][h]*o[h][s];n[i][s]=r}return n},t}();o.Matrix=n},860:function(t,o,e){var n=this&&this.__spreadArray||function(t,o,e){if(e||2===arguments.length)for(var n,i=0,s=o.length;i<s;i++)!n&&i in o||(n||(n=Array.prototype.slice.call(o,0,i)),n[i]=o[i]);return t.concat(n||Array.prototype.slice.call(o))};Object.defineProperty(o,"__esModule",{value:!0}),o.Transform=void 0;var i=e(726),s=function(){function t(t,o,e,s,r,h){this._position=t,this._localRotation=o,this._rotation=e,this._scale=s,this.node=h,this._parent=null,this.childs=[],this.localTrasform=i.Matrix.Identity(),this.worldTransform=i.Matrix.Identity(),this.refControlPoints=this.relativeControlPoints(r),this.controlPoints=n([],r,!0)}return Object.defineProperty(t.prototype,"parent",{get:function(){return this._parent},set:function(t){this._parent&&this._parent.childs.indexOf(this)&&this._parent.childs.splice(this._parent.childs.indexOf(this),1),t&&t.childs.push(this),this._parent=t,this.parent&&this.parent.childs.sort((function(t,o){return t.node.order-o.node.order}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"position",{get:function(){return this._position},set:function(t){this._position=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"absolutePosition",{get:function(){return i.Vector2.Zero().transform(this.worldTransform)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rotation",{get:function(){return this._rotation},set:function(t){this._rotation=t%360},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"localRotation",{get:function(){return this._localRotation},set:function(t){this._localRotation=t%360},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"scale",{get:function(){return this._scale},set:function(t){this._scale=t},enumerable:!1,configurable:!0}),t.prototype.relativeControlPoints=function(t){var o=this,e=[];return t.forEach((function(t){e.push(t.subtract(o.position))})),e},t.prototype.updateWorldTransform=function(t){var o,e,n=this;this.localTrasform.value=[[1,0,0],[0,1,0],[this.position.x,this.position.y,1]],"#Root"!=this.parent.node.id&&(o=Math.cos(this.rotation*i.Constant.TAU),e=Math.sin(this.rotation*i.Constant.TAU),this.localTrasform=new i.Matrix([[1,0,0],[0,1,0],[this.position.x,this.position.y,1]]).multiply([[o,e,0],[-e,o,0],[0,0,1]]).multiply([[1,0,0],[0,1,0],[-this.position.x,-this.position.y,1]]).multiply(this.localTrasform)),o=Math.cos(this.localRotation*i.Constant.TAU),e=Math.sin(this.localRotation*i.Constant.TAU),this.localTrasform=new i.Matrix([[o,e,0],[-e,o,0],[0,0,1]]).multiply(this.localTrasform),this.localTrasform=new i.Matrix([[this.scale.x,0,0],[0,this.scale.y,0],[0,0,1]]).multiply(this.localTrasform),this.worldTransform=t?this.localTrasform.multiply(t):this.localTrasform.clone(),this.childs.forEach((function(t){t.updateWorldTransform(n.worldTransform)})),this.applyTransform()},t.prototype.applyTransform=function(){var t=this;this.refControlPoints.forEach((function(o,e){t.controlPoints[e]=o.transform(t.worldTransform)}))},t}();o.Transform=s},316:(t,o,e)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Vector2=void 0;var n=e(235),i=e(726),s=function(){function t(t,o){this.x=t,this.y=o}return t.prototype.toString=function(){return"["+this.x.toFixed(3)+", "+this.y.toFixed(3)+"]"},t.prototype.add=function(o,e){return o instanceof t?new t(this.x+o.x,this.y+o.y):new t(this.x+o,void 0===e?this.y+o:this.y+e)},t.prototype.addInPlace=function(o,e){return o instanceof t?(this.x+=o.x,this.y+=o.y):e?(this.x+=o,this.y+=e):(this.x+=o,this.y+=o),this},t.prototype.multiply=function(o,e){return o instanceof t?new t(this.x*o.x,this.y*o.y):new t(this.x*o,this.y*e)},t.prototype.multiplyInPlace=function(o,e){return o instanceof t?(this.x*=o.x,this.y*=o.y):e?(this.x*=o,this.y*=e):(this.x*=o,this.y*=o),this},t.prototype.subtract=function(o,e){return o instanceof t?new t(this.x-o.x,this.y-o.y):new t(this.x-o,this.y-e)},t.prototype.subtractInPlace=function(o,e){o instanceof t?(this.x-=o.x,this.y-=o.y):(this.x-=o,this.y-=e)},t.prototype.rotate=function(o,e){e*=i.Constant.TAU;var n=Math.cos(e),s=Math.sin(e);return new t(n*(this.x-o.x)-s*(this.y-o.y)+o.x,s*(this.x-o.x)+n*(this.y-o.y)+o.y)},t.prototype.rotateInPlace=function(t,o){o*=i.Constant.TAU;var e=Math.cos(o),n=Math.sin(o);return this.tmpX=e*(this.x-t.x)-n*(this.y-t.y)+t.x,this.tmpY=n*(this.x-t.x)+e*(this.y-t.y)+t.y,this.x=this.tmpX,this.y=this.tmpY,this},t.prototype.max=function(){return Math.max(this.x,this.y)},t.prototype.transform=function(o){var e=i.Matrix.Multiply([[this.x,this.y,1]],o.value);return new t(e[0][0],e[0][1])},t.prototype.transformInPlace=function(t){var o=i.Matrix.Multiply([[this.x,this.y,1]],t.value);this.x=o[0][0],this.y=o[0][1]},t.Midpoint=function(o,e){return new t((o.x+e.x)/2,(o.y+e.y)/2)},t.Distance=function(t,o){return Math.sqrt(Math.pow(o.x-t.x,2)+Math.pow(o.y-t.y,2))},t.Zero=function(){return new t(0,0)},t.One=function(){return new t(1,1)},t.Bounds=function(o){var e=new t(Number.MAX_VALUE,Number.MAX_VALUE),n=new t(Number.MIN_VALUE,Number.MIN_VALUE);return o.forEach((function(t){t.x<e.x&&(e.x=t.x),t.y<e.y&&(e.y=t.y),t.x>n.x&&(n.x=t.x),t.y>n.y&&(n.y=t.y)})),[e,n]},t.Average=function(o){var e=0,n=0;return o.forEach((function(t){e+=t.x,n+=t.y})),new t(e/o.length,n/o.length)},t.Random=function(o,e,i,s){return o instanceof n.Canvas?new t(Math.random()*o.width,Math.random()*o.height):new t(Math.random()*(e-o)+o,Math.random()*(s-i)+i)},t.Lerp=function(o,e,n){return new t(o.x+(e.x-o.x)*n,o.y+(e.y-o.y)*n)},t.prototype.clone=function(){return new t(this.x,this.y)},t}();o.Vector2=s},985:function(t,o,e){var n,i=this&&this.__extends||(n=function(t,o){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])},n(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}n(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)});Object.defineProperty(o,"__esModule",{value:!0}),o.Ellipse=void 0;var s=e(726),r=function(t){function o(o,e,n,i,s){var r=t.call(this,o,e,[e.subtract(0,n),e.add(i,0),e.add(0,n),e.subtract(i,0)])||this;return r.minor=n,r.major=i,r.props=s,!s&&(r.props={}),r.props.outlineColor&&"string"!=typeof r.props.outlineColor&&(r.props.outlineColor.node=r),r.props.fillColor&&"string"!=typeof r.props.fillColor&&(r.props.fillColor.node=r),r}return i(o,t),o.prototype._render=function(){if(this.props&&(this.props.outlineColor&&(this.context.strokeStyle="string"==typeof this.props.outlineColor?this.props.outlineColor:this.props.outlineColor.create(this.context)),this.props.fillColor&&(this.context.fillStyle="string"==typeof this.props.fillColor?this.props.fillColor:this.props.fillColor.create(this.context)),this.props.outlineWidth&&(this.context.lineWidth=this.props.outlineWidth),this.props.outlineDashSegments&&this.context.setLineDash(this.props.outlineDashSegments),this.props.shadowColor&&(this.context.shadowColor=this.props.shadowColor),this.props.shadowBlur&&(this.context.shadowBlur=this.props.shadowBlur),this.props.shadowOffset))if(this.props.staticShadow)this.context.shadowOffsetX=this.props.shadowOffset.x,this.context.shadowOffsetY=this.props.shadowOffset.y;else{var t=this.props.shadowOffset.transform(this.transform.worldTransform).subtract(this.absolutePosition);this.context.shadowOffsetX=t.x,this.context.shadowOffsetY=t.y}var o=this.absolutePosition;this.context.beginPath(),this.minor==this.major?this.context.arc(o.x,o.y,this.minor,0,2*Math.PI):this.context.ellipse(o.x,o.y,this.major,this.minor,Math.atan2(this.transform.controlPoints[1].y-o.y,this.transform.controlPoints[1].x-o.x),0,2*Math.PI),this.props.fill&&this.context.fill(),!this.props.outline&&this.props.fill||this.context.stroke()},o.prototype._offRender=function(){this.props.outlineWidth&&(this.offContext.lineWidth=this.props.outlineWidth),this.offContext.strokeStyle=this.hitColor,this.offContext.fillStyle=this.hitColor;var t=this.absolutePosition;this.offContext.beginPath(),this.minor==this.major?this.offContext.arc(t.x,t.y,this.minor,0,2*Math.PI):this.offContext.ellipse(t.x,t.y,this.major,this.minor,Math.atan2(this.transform.controlPoints[1].y-t.y,this.transform.controlPoints[1].x-t.x),0,2*Math.PI),this.props.fill&&this.offContext.fill(),!this.props.outline&&this.props.fill||this.offContext.stroke()},o.prototype.getDimension=function(){return new s.Vector2(s.Vector2.Distance(this.transform.controlPoints[1],this.transform.controlPoints[3]),s.Vector2.Distance(this.transform.controlPoints[0],this.transform.controlPoints[2]))},o}(e(697).Node);o.Ellipse=r},397:function(t,o,e){var n,i=this&&this.__extends||(n=function(t,o){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])},n(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}n(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)});Object.defineProperty(o,"__esModule",{value:!0}),o.Empty=void 0;var s=e(726),r=function(t){function o(o,e){return t.call(this,o,e,[])||this}return i(o,t),o.prototype._render=function(){},o.prototype._offRender=function(){},o.prototype.getDimension=function(){return s.Vector2.Zero()},o}(e(697).Node);o.Empty=r},700:function(t,o,e){var n,i=this&&this.__extends||(n=function(t,o){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])},n(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}n(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)});Object.defineProperty(o,"__esModule",{value:!0}),o.Image=void 0;var s=e(726),r=function(t){function o(o,e,n,i,s,r){var h=t.call(this,o,e,[])||this;return h.width=i,h.height=s,h.props=r,!r&&(h.props={}),"string"==typeof n?(h._source=new window.Image,h._source.src=n):h._source=n,h._source.crossOrigin="Anonymous",h}return i(o,t),o.prototype._render=function(){if(this.props&&(this.props.shadowColor&&(this.context.shadowColor=this.props.shadowColor),this.props.shadowBlur&&(this.context.shadowBlur=this.props.shadowBlur),this.props.shadowOffset))if(this.props.staticShadow)this.context.shadowOffsetX=this.props.shadowOffset.x,this.context.shadowOffsetY=this.props.shadowOffset.y;else{var t=this.props.shadowOffset.transform(this.transform.worldTransform).subtract(this.absolutePosition);this.context.shadowOffsetX=t.x,this.context.shadowOffsetY=t.y}this.context.translate(this.absolutePosition.x,this.absolutePosition.y),this.context.rotate(this.transform.worldTransform.getRotation()*(Math.PI/180)),this.context.translate(-this.absolutePosition.x,-this.absolutePosition.y);var o=this.absolutePosition.subtract(this.width*this.transform.scale.x/2,this.height*this.transform.scale.y/2);this.context.drawImage(this._source,o.x,o.y,this.width*this.transform.scale.x,this.height*this.transform.scale.y)},o.prototype._offRender=function(){this.offContext.fillStyle=this.hitColor,this.offContext.translate(this.absolutePosition.x,this.absolutePosition.y),this.offContext.rotate(this.transform.worldTransform.getRotation()*(Math.PI/180)),this.offContext.translate(-this.absolutePosition.x,-this.absolutePosition.y);var t=this.absolutePosition.subtract(this.width*this.transform.scale.x/2,this.height*this.transform.scale.y/2);this.offContext.fillRect(t.x,t.y,this.width*this.transform.scale.x,this.height*this.transform.scale.y)},o.prototype.getDimension=function(){return new s.Vector2(this.width,this.height)},o}(e(697).Node);o.Image=r},605:function(t,o,e){var n,i=this&&this.__extends||(n=function(t,o){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])},n(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}n(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)});Object.defineProperty(o,"__esModule",{value:!0}),o.Line=void 0;var s=e(726),r=e(697),h=function(t){function o(o,e,n,i,r){var h=t.call(this,o,e instanceof s.Vector2&&n instanceof s.Vector2?i?e.add((n.x-e.x)*i,(n.y-e.y)*i):e.clone():s.Vector2.Zero(),e instanceof s.Vector2&&n instanceof s.Vector2?[e,n]:[])||this;return h._from=e,h._to=n,h.props=r,!r&&(h.props={}),h.props.color&&"string"!=typeof h.props.color&&(h.props.color.node=h),h}return i(o,t),Object.defineProperty(o.prototype,"from",{get:function(){return this._from instanceof r.Node?this._from.absolutePosition:this.transform.controlPoints[0]},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"to",{get:function(){return this._to instanceof r.Node?this._to.absolutePosition:this.transform.controlPoints[1]},enumerable:!1,configurable:!0}),o.prototype._render=function(){if(this.props&&(this.props.color&&(this.context.strokeStyle="string"==typeof this.props.color?this.props.color:this.props.color.create(this.context)),this.props.lineWidth&&(this.context.lineWidth=this.props.lineWidth),this.props.lineCap&&(this.context.lineCap=this.props.lineCap),this.props.lineDashSegments&&this.context.setLineDash(this.props.lineDashSegments),this.props.shadowColor&&(this.context.shadowColor=this.props.shadowColor),this.props.shadowBlur&&(this.context.shadowBlur=this.props.shadowBlur),this.props.shadowOffset))if(this.props.staticShadow)this.context.shadowOffsetX=this.props.shadowOffset.x,this.context.shadowOffsetY=this.props.shadowOffset.y;else{var t=this.props.shadowOffset.transform(this.transform.worldTransform).subtract(this.absolutePosition);this.context.shadowOffsetX=t.x,this.context.shadowOffsetY=t.y}this.context.beginPath(),this.context.moveTo(this.from.x,this.from.y),this.context.lineTo(this.to.x,this.to.y),this.context.stroke()},o.prototype._offRender=function(){this.props.lineWidth&&(this.offContext.lineWidth=this.props.lineWidth),this.offContext.strokeStyle=this.hitColor,this.offContext.beginPath(),this.offContext.moveTo(this.from.x,this.from.y),this.offContext.lineTo(this.to.x,this.to.y),this.offContext.stroke()},o.prototype.getDimension=function(){return new s.Vector2(s.Vector2.Distance(this.transform.controlPoints[0],this.transform.controlPoints[1]),0)},o}(r.Node);o.Line=h},834:function(t,o,e){var n,i=this&&this.__extends||(n=function(t,o){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])},n(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}n(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)});Object.defineProperty(o,"__esModule",{value:!0}),o.Polygon=void 0;var s=e(726),r=function(t){function o(o,e,n,i){var r=t.call(this,o,n instanceof s.Vector2?n:s.Vector2.Average(e),e)||this;return r.props=i,!i&&(r.props={}),r.props.outlineColor&&"string"!=typeof r.props.outlineColor&&(r.props.outlineColor.node=r),r.props.fillColor&&"string"!=typeof r.props.fillColor&&(r.props.fillColor.node=r),r}return i(o,t),o.prototype._render=function(){if(this.props&&(this.props.outlineColor&&(this.context.strokeStyle="string"==typeof this.props.outlineColor?this.props.outlineColor:this.props.outlineColor.create(this.context)),this.props.fillColor&&(this.context.fillStyle="string"==typeof this.props.fillColor?this.props.fillColor:this.props.fillColor.create(this.context)),this.props.outlineWidth&&(this.context.lineWidth=this.props.outlineWidth),this.props.outlineDashSegments&&this.context.setLineDash(this.props.outlineDashSegments),this.props.shadowColor&&(this.context.shadowColor=this.props.shadowColor),this.props.shadowBlur&&(this.context.shadowBlur=this.props.shadowBlur),this.props.shadowOffset))if(this.props.staticShadow)this.context.shadowOffsetX=this.props.shadowOffset.x,this.context.shadowOffsetY=this.props.shadowOffset.y;else{var t=this.props.shadowOffset.transform(this.transform.worldTransform).subtract(this.absolutePosition);this.context.shadowOffsetX=t.x,this.context.shadowOffsetY=t.y}this.context.beginPath(),this.context.moveTo(this.transform.controlPoints[0].x,this.transform.controlPoints[0].y);for(var o=1;o<this.transform.controlPoints.length;o++)this.context.lineTo(this.transform.controlPoints[o].x,this.transform.controlPoints[o].y);this.context.closePath(),this.props.fill&&this.context.fill(),!this.props.outline&&this.props.fill||this.context.stroke()},o.prototype._offRender=function(){this.props.outlineWidth&&(this.offContext.lineWidth=this.props.outlineWidth),this.offContext.strokeStyle=this.hitColor,this.offContext.fillStyle=this.hitColor,this.offContext.beginPath(),this.offContext.moveTo(this.transform.controlPoints[0].x,this.transform.controlPoints[0].y);for(var t=1;t<this.transform.controlPoints.length;t++)this.offContext.lineTo(this.transform.controlPoints[t].x,this.transform.controlPoints[t].y);this.offContext.closePath(),this.props.fill&&this.offContext.fill(),!this.props.outline&&this.props.fill||this.offContext.stroke()},o.prototype.getDimension=function(){var t=s.Vector2.Bounds(this.transform.controlPoints);return new s.Vector2(Math.abs(t[0].x-t[1].x),Math.abs(t[0].y-t[1].y))},o}(e(697).Node);o.Polygon=r},265:function(t,o,e){var n,i=this&&this.__extends||(n=function(t,o){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])},n(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}n(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)});Object.defineProperty(o,"__esModule",{value:!0}),o.Rectangle=void 0;var s=e(726),r=function(t){function o(o,e,n,i,s){var r=t.call(this,o,e,[e.add(-n/2,-i/2),e.add(n/2,-i/2),e.add(n/2,i/2),e.add(-n/2,i/2)])||this;return r.props=s,!s&&(r.props={}),r.props.outlineColor&&"string"!=typeof r.props.outlineColor&&(r.props.outlineColor.node=r),r.props.fillColor&&"string"!=typeof r.props.fillColor&&(r.props.fillColor.node=r),r}return i(o,t),o.prototype._render=function(){if(this.props&&(this.props.outlineColor&&(this.context.strokeStyle="string"==typeof this.props.outlineColor?this.props.outlineColor:this.props.outlineColor.create(this.context)),this.props.fillColor&&(this.context.fillStyle="string"==typeof this.props.fillColor?this.props.fillColor:this.props.fillColor.create(this.context)),this.props.outlineWidth&&(this.context.lineWidth=this.props.outlineWidth),this.props.outlineDashSegments&&this.context.setLineDash(this.props.outlineDashSegments),this.props.shadowColor&&(this.context.shadowColor=this.props.shadowColor),this.props.shadowBlur&&(this.context.shadowBlur=this.props.shadowBlur),this.props.shadowOffset))if(this.props.staticShadow)this.context.shadowOffsetX=this.props.shadowOffset.x,this.context.shadowOffsetY=this.props.shadowOffset.y;else{var t=this.props.shadowOffset.transform(this.transform.worldTransform).subtract(this.absolutePosition);this.context.shadowOffsetX=t.x,this.context.shadowOffsetY=t.y}this.context.beginPath(),this.context.moveTo(this.transform.controlPoints[0].x,this.transform.controlPoints[0].y),this.context.lineTo(this.transform.controlPoints[1].x,this.transform.controlPoints[1].y),this.context.lineTo(this.transform.controlPoints[2].x,this.transform.controlPoints[2].y),this.context.lineTo(this.transform.controlPoints[3].x,this.transform.controlPoints[3].y),this.context.lineTo(this.transform.controlPoints[0].x,this.transform.controlPoints[0].y),this.props.fill&&this.context.fill(),!this.props.outline&&this.props.fill||this.context.stroke()},o.prototype._offRender=function(){this.props.outlineWidth&&(this.offContext.lineWidth=this.props.outlineWidth),this.offContext.strokeStyle=this.hitColor,this.offContext.fillStyle=this.hitColor,this.offContext.beginPath(),this.offContext.moveTo(this.transform.controlPoints[0].x,this.transform.controlPoints[0].y),this.offContext.lineTo(this.transform.controlPoints[1].x,this.transform.controlPoints[1].y),this.offContext.lineTo(this.transform.controlPoints[2].x,this.transform.controlPoints[2].y),this.offContext.lineTo(this.transform.controlPoints[3].x,this.transform.controlPoints[3].y),this.offContext.lineTo(this.transform.controlPoints[0].x,this.transform.controlPoints[0].y),this.props.fill&&this.offContext.fill(),!this.props.outline&&this.props.fill||this.offContext.stroke()},o.prototype.getDimension=function(){return new s.Vector2(s.Vector2.Distance(this.transform.controlPoints[0],this.transform.controlPoints[1]),s.Vector2.Distance(this.transform.controlPoints[1],this.transform.controlPoints[2]))},o}(e(697).Node);o.Rectangle=r},940:function(t,o,e){var n,i=this&&this.__extends||(n=function(t,o){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])},n(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}n(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)});Object.defineProperty(o,"__esModule",{value:!0}),o.Text=void 0;var s=e(726),r=function(t){function o(o,e,n,i){var s=t.call(this,o,e,[])||this;s.props=i,!i&&(s.props={}),s.text=n,s.props.outlineColor&&"string"!=typeof s.props.outlineColor&&(s.props.outlineColor.node=s),s.props.fillColor&&"string"!=typeof s.props.fillColor&&(s.props.fillColor.node=s);var r=document.createElement("canvas").getContext("2d");return s.props.font&&(r.font=s.props.font),s._originalWidth=r.measureText(n).width,s._originalHeight=r.measureText("M").width,s}return i(o,t),Object.defineProperty(o.prototype,"text",{get:function(){return this._text},set:function(t){this._text=t},enumerable:!1,configurable:!0}),o.prototype._render=function(){if(this.props){if(this.props.outlineColor&&(this.context.strokeStyle="string"==typeof this.props.outlineColor?this.props.outlineColor:this.props.outlineColor.create(this.context)),this.props.fillColor&&(this.context.fillStyle="string"==typeof this.props.fillColor?this.props.fillColor:this.props.fillColor.create(this.context)),this.props.outlineWidth&&(this.context.lineWidth=this.props.outlineWidth),this.props.shadowColor&&(this.context.shadowColor=this.props.shadowColor),this.props.shadowBlur&&(this.context.shadowBlur=this.props.shadowBlur),this.props.shadowOffset)if(this.props.staticShadow)this.context.shadowOffsetX=this.props.shadowOffset.x,this.context.shadowOffsetY=this.props.shadowOffset.y;else{var t=this.props.shadowOffset.transform(this.transform.worldTransform).subtract(this.absolutePosition);this.context.shadowOffsetX=t.x,this.context.shadowOffsetY=t.y}this.props.font&&(this.context.font=this.props.font)}this.context.translate(this.absolutePosition.x,this.absolutePosition.y),this.context.scale(this.scale.x,this.scale.y),this.context.rotate(this.transform.worldTransform.getRotation()*(Math.PI/180)),this.context.translate(-this.absolutePosition.x,-this.absolutePosition.y),this.props.outline&&this.context.strokeText(this.text,this.absolutePosition.x-this._originalWidth/2,this.absolutePosition.y+this._originalHeight/2),(this.props.fill||!this.props.outline)&&this.context.fillText(this.text,this.absolutePosition.x-this._originalWidth/2,this.absolutePosition.y+this._originalHeight/2)},o.prototype._offRender=function(){this.offContext.fillStyle=this.hitColor,this.offContext.translate(this.absolutePosition.x,this.absolutePosition.y),this.offContext.scale(this.scale.x,this.scale.y),this.offContext.rotate(this.transform.worldTransform.getRotation()*(Math.PI/180)),this.offContext.translate(-this.absolutePosition.x,-this.absolutePosition.y),this.offContext.fillRect(this.absolutePosition.x-this._originalWidth/2,this.absolutePosition.y-this._originalHeight/2,this._originalWidth,this._originalHeight)},o.prototype.getDimension=function(){return new s.Vector2(s.Vector2.Distance(this.transform.controlPoints[0],this.transform.controlPoints[1]),0)},o}(e(697).Node);o.Text=r},842:function(t,o,e){var n=this&&this.__createBinding||(Object.create?function(t,o,e,n){void 0===n&&(n=e);var i=Object.getOwnPropertyDescriptor(o,e);i&&!("get"in i?!o.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return o[e]}}),Object.defineProperty(t,n,i)}:function(t,o,e,n){void 0===n&&(n=e),t[n]=o[e]}),i=this&&this.__exportStar||function(t,o){for(var e in t)"default"===e||Object.prototype.hasOwnProperty.call(o,e)||n(o,t,e)};Object.defineProperty(o,"__esModule",{value:!0}),o.RadialGradient=o.LinearGradient=void 0;var s=e(726),r=e(900);i(e(985),o),i(e(397),o),i(e(700),o),i(e(605),o),i(e(834),o),i(e(265),o),i(e(940),o);var h=function(){function t(t,o,e,n,i){this.offset=t,this.degrees=o,this.length=e,this.colors=n,this.weights=i}return t.prototype.create=function(t){var o,e,n,i,h=this,a=new s.Vector2(0,0);return i=this.length==r.Handle.AUTO?this.node.getDimension().max():this.length,a.x=i/2*Math.cos(this.degrees*s.Constant.TAU),a.y=i/2*Math.sin(this.degrees*s.Constant.TAU),e=this.offset.subtract(a).transform(this.node.transform.worldTransform),n=this.offset.add(a).transform(this.node.transform.worldTransform),o=t.createLinearGradient(e.x,e.y,n.x,n.y),this.colors.forEach((function(t,e){o.addColorStop(h.weights[e],t)})),o},t}();o.LinearGradient=h;var a=function(){function t(t,o,e,n,i,s){this.fromOffset=t,this.fromRadius=o,this.toOffset=e,this.toRadius=n,this.colors=i,this.weights=s}return t.prototype.create=function(t){var o,e,n,i=this,s=this.fromOffset.transform(this.node.transform.worldTransform),h=this.toOffset.transform(this.node.transform.worldTransform);return this.fromRadius==r.Handle.AUTO||this.toRadius==r.Handle.AUTO?(e=1,n=this.node.getDimension().max()/2):(e=this.fromRadius,n=this.toRadius),o=t.createRadialGradient(s.x,s.y,e,h.x,h.y,n),this.colors.forEach((function(t,e){o.addColorStop(i.weights[e],t)})),o},t}();o.RadialGradient=a},235:(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Canvas=void 0;var e=function(){function t(t,o,e){this.drawingHandle=-1,t?t instanceof HTMLDivElement?(this.canvasElement=document.createElement("canvas"),o&&e?(this.canvasElement.width=o,this.canvasElement.height=e):(this.canvasElement.width=t.clientWidth,this.canvasElement.height=t.clientHeight),t.appendChild(this.canvasElement)):(this.canvasElement=t,o&&e&&(this.canvasElement.width=o,this.canvasElement.height=e)):(this.canvasElement=document.createElement("canvas"),this.canvasElement.width=document.body.clientWidth,this.canvasElement.height=document.body.clientHeight,document.body.appendChild(this.canvasElement)),this.width=this.canvasElement.width,this.height=this.canvasElement.height,this.context=this.canvasElement.getContext("2d"),this.offCanvasElement=new OffscreenCanvas(this.width,this.height),this.offContext=this.offCanvasElement.getContext("2d")}return t.prototype.draw=function(t){-1!=this.drawingHandle&&window.cancelAnimationFrame(this.drawingHandle),window.requestAnimationFrame(t.render.bind(t))},t}();o.Canvas=e},148:(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Color=void 0;var e=function(){function t(){}return t.Random=function(){return"#"+Math.floor(16777215*Math.random()).toString(16)},t.rgbToHex=function(o){return"#"+t._componentToHex(o[0])+t._componentToHex(o[1])+t._componentToHex(o[2])},t._componentToHex=function(t){var o=t.toString(16);return 1==o.length?"0"+o:o},t}();o.Color=e},346:(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Debug=void 0;var e=function(){function t(){}return t.debugPoint=function(o,e,n,i,s){t.limitDebugCalls(e,o,s),e.debugCalls[o].push({debugFunction:t._debugPoint,arguments:[e.canvas.context,n.clone(),i]})},t._debugPoint=function(t,o,e){t.fillStyle=e.color,t.beginPath(),t.arc(o.x,o.y,e.radius?e.radius:2,0,2*Math.PI),t.fill()},t.debugLine=function(o,e,n,i,s,r){t.limitDebugCalls(e,o,r),e.debugCalls[o].push({debugFunction:t._debugLine,arguments:[e.canvas.context,n.clone(),i.clone(),s]})},t._debugLine=function(t,o,e,n){t.strokeStyle=n.color,t.lineWidth=n.width?n.width:1,t.beginPath(),t.moveTo(o.x,o.y),t.lineTo(e.x,e.y),t.stroke(),t.fillStyle="green",t.beginPath(),t.arc(o.x,o.y,2,0,2*Math.PI),t.fill(),t.fillStyle="red",t.beginPath(),t.arc(e.x,e.y,2,0,2*Math.PI),t.fill()},t.show=function(t,o){for(var e in t)for(var n=0,i=t[e];n<i.length;n++){var s=i[n];o.save(),s.debugFunction.apply(s,s.arguments),o.restore()}},t.limitDebugCalls=function(t,o,e){e&&t.debugCalls[o]&&e-1<t.debugCalls[o].length?t.debugCalls[o].shift():(!t.debugCalls[o]||!e)&&(t.debugCalls[o]=[])},t}();o.Debug=e},333:(t,o,e)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Drawing=void 0;var n=e(346),i=e(726),s=e(842),r=e(697),h=e(148),a=function(){function t(t,o){this.canvas=t,this.globalUpdate=o;var e=new s.Empty("#Root",i.Vector2.Zero());e.context=this.canvas.context,e.drawing=this,this.renderTree=e,this.debugCalls={},this.mousePos=i.Vector2.Zero(),this.colorToNode={},this._registerEvents()}return t.prototype._registerEvents=function(){var t,o,e,n=this,i=null;this.canvas.canvasElement.onmousemove=function(s){e=n.canvas.canvasElement.getBoundingClientRect(),n.mousePos.x=s.clientX-e.left,n.mousePos.y=s.clientY-e.top,(t=n._getHitNode(n.mousePos))!=o&&(o&&o.call("mouseexit"),t&&t.call("mouseenter")),o=t,i&&i.call("drag",[n.mousePos.clone()])},this.canvas.canvasElement.onmousedown=function(){i=t;var o=n._getHitNode(n.mousePos);o&&o.call("mousedown")},this.canvas.canvasElement.onmouseup=function(){i=null;var t=n._getHitNode(n.mousePos);t&&t.call("mouseup")},this.canvas.canvasElement.onclick=function(){var t=n._getHitNode(n.mousePos);t&&t.call("click")},this.canvas.canvasElement.oncontextmenu=function(t){t.preventDefault();var o=n._getHitNode(n.mousePos);o&&o.call("rightclick")}},t.prototype._getHitNode=function(t){return this.colorToNode[h.Color.rgbToHex(this.canvas.offContext.getImageData(t.x,t.y,1,1).data)]},t.prototype.render=function(){this.canvas.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.canvas.offContext.clearRect(0,0,this.canvas.width,this.canvas.height),this.renderTree.call("update"),this.globalUpdate&&this.globalUpdate(),this.renderTree.transform.childs.forEach((function(t){t.updateWorldTransform()})),this.renderTree.transform.childs.forEach((function(t){t.node.render()})),n.Debug.show(this.debugCalls,this.canvas.context),window.requestAnimationFrame(this.render.bind(this))},t.prototype.add=function(t){var o=this;t instanceof r.Node?(t.parent=this.renderTree,t.setContext(this.canvas.context,this.canvas.offContext),t.setDrawing(this),t.setHitColor()):t.forEach((function(t){t.parent=o.renderTree,t.setContext(o.canvas.context,o.canvas.offContext),t.setDrawing(o),t.setHitColor()}))},t.prototype.remove=function(t){t instanceof r.Node&&(t=t.id);var o,e=[];for(e.push(this.renderTree);o=e.shift();)o.id==t?o.transform.parent.childs.splice(o.transform.parent.childs.indexOf(o.transform),1):o.transform.childs.forEach((function(t){e.push(t.node)}))},t.prototype._debugSceneGraph=function(t,o){var e=this;console.log(o+t.id+"["+t.order+"]"),t.transform.childs.forEach((function(t){e._debugSceneGraph(t.node," "+o)}))},t}();o.Drawing=a},900:(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.Handle=void 0,function(t){t[t.AUTO=-1]="AUTO"}(o.Handle||(o.Handle={}))},697:function(t,o,e){var n=this&&this.__spreadArray||function(t,o,e){if(e||2===arguments.length)for(var n,i=0,s=o.length;i<s;i++)!n&&i in o||(n||(n=Array.prototype.slice.call(o,0,i)),n[i]=o[i]);return t.concat(n||Array.prototype.slice.call(o))};Object.defineProperty(o,"__esModule",{value:!0}),o.Node=void 0;var i=e(726),s=e(148),r=function(){function t(t,o,e){this.id=t,this.transform=new i.Transform(o,0,0,i.Vector2.One(),e,this),this.registeredEvents={},this.order=0}return Object.defineProperty(t.prototype,"zIndex",{get:function(){return this.order},set:function(t){this.order=t,this.parent&&this.parent.transform.childs.sort((function(t,o){return t.node.order-o.node.order}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"parent",{get:function(){return this.transform.parent.node},set:function(t){this.transform.parent=t.transform},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"childs",{get:function(){return this.transform.childs.map((function(t){return t.node}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"position",{get:function(){return this.transform.position},set:function(t){this.transform.position=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"absolutePosition",{get:function(){return this.transform.absolutePosition},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rotation",{get:function(){return this.transform.rotation},set:function(t){this.transform.rotation=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"localRotation",{get:function(){return this.transform.localRotation},set:function(t){this.transform.localRotation=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"scale",{get:function(){return this.transform.scale},set:function(t){this.transform.scale=t},enumerable:!1,configurable:!0}),t.prototype.setHitColor=function(){for(var t=s.Color.Random();this.drawing.colorToNode[t];)t=s.Color.Random();this.hitColor=t,this.drawing.colorToNode[t]=this,this.transform.childs.forEach((function(t){t.node.setHitColor()}))},t.prototype.on=function(t,o){this.registeredEvents[t]=o},t.prototype.render=function(){this.context.save(),this._render(),this.context.restore(),this.offRender();for(var t=0,o=this.transform.childs;t<o.length;t++){o[t].node.render()}},t.prototype.offRender=function(){this.offContext.save(),this._offRender(),this.offContext.restore()},t.prototype.call=function(t,o){var e;this.registeredEvents[t]&&(o?(e=this.registeredEvents)[t].apply(e,n([this],o,!1)):this.registeredEvents[t](this));for(var i=0,s=this.transform.childs;i<s.length;i++){s[i].node.call(t,o)}},t.prototype.setContext=function(t,o){this.context=t,this.offContext=o,this.transform.childs.forEach((function(e){e.node.setContext(t,o)}))},t.prototype.setDrawing=function(t){this.drawing=t,this.transform.childs.forEach((function(o){o.node.setDrawing(t)}))},t.prototype.dispose=function(){this.drawing.remove(this.id)},t}();o.Node=r},229:function(t,o,e){var n=this&&this.__createBinding||(Object.create?function(t,o,e,n){void 0===n&&(n=e);var i=Object.getOwnPropertyDescriptor(o,e);i&&!("get"in i?!o.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return o[e]}}),Object.defineProperty(t,n,i)}:function(t,o,e,n){void 0===n&&(n=e),t[n]=o[e]}),i=this&&this.__exportStar||function(t,o){for(var e in t)"default"===e||Object.prototype.hasOwnProperty.call(o,e)||n(o,t,e)};Object.defineProperty(o,"__esModule",{value:!0}),o.View=void 0,i(e(900),o),i(e(333),o),i(e(346),o),i(e(148),o),i(e(235),o),o.View=e(842),i(e(726),o)}},o={};var e=function e(n){var i=o[n];if(void 0!==i)return i.exports;var s=o[n]={exports:{}};return t[n].call(s.exports,s,s.exports,e),s.exports}(229);return e})()));
//# sourceMappingURL=percept.js.map