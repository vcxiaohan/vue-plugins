export default {
	/* 
	绑定事件 (>=ie9)
	Tool.on(el, 'mousedown', function() {// 给el绑定一个随机标记的mousedown事件，仅在移除el所有事件时才能清除该绑定事件
		console.log(1)
	})
	Tool.on(el, 'mousedown.a', function() {// 给el绑定一个标记a的mousedown事件
		console.log(2)
	})
	*/
	on(el, event, callback) {
		event = event.match(/([^\.]+)\.*([^\.]*)/);
		var eventType = event[1],
			eventMark = event[2];

		if(!eventMark) {
			eventMark = (''+ Math.random()).replace('.', '');
		}
		if(!this.event) {
			this.event = {};
		}
		this.event[eventMark] = callback;

		el.addEventListener(eventType, this.event[eventMark]);
	},
	/* 
	移除事件 (>=ie9)
	Tool.off(el, 'mousedown')// 移除el绑定的所有mousedown事件
	Tool.off(el, 'mousedown.a')// 仅移除el绑定的标记是a的mousedown事件
	*/
	off(el, event) {
		event = event.match(/([^\.]+)\.*([^\.]*)/);
		var eventType = event[1],
			eventMark = event[2];

		el.removeEventListener(eventType, this.event[eventMark]);
		if(!eventMark) {
			for(var key in this.event) {
				el.removeEventListener(eventType, this.event[key]);
			}
		}
	},
	/* 
	获取样式 (>=ie9)
	*/
	getStyle(el, attr, bool) {
		if(bool) {
	    	return parseFloat(getComputedStyle(el, null)[attr]);
		}else {
	    	return getComputedStyle(el, null)[attr];
		}
	},
	/* 
	创建元素
	createEl('span', {
		'id': 'a', 
		'class': 'b'
	})   
	*/
	createEl(tagName, attrs, style, text) {      
	    var el = document.createElement(tagName);      
	
	    if(attrs) {      
	        for (key in attrs) {      
	            if (key == "className") {      
	                el.className = attrs[key];      
	            } else if (key == "id") {      
	                el.id = attrs[key];      
	            } else {      
	                el.setAttribute(key, attrs[key]);      
	            }      
	        }      
	    }      
	    if(style) {      
	        for (key in style) {      
	            el.style[key] = style[key];      
	        }      
	    }      
	    if(text) {      
	        el.appendChild(document.createTextNode(text));      
	    }      
	    return el;      
	},
	insertAfter(newEl, targetEl) {    
	    var parentEl = targetEl.parentNode;    
	
	    if(parentEl.lastChild == targetEl) {    
	        parentEl.appendChild(newEl);    
	    }else {    
	        parentEl.insertBefore(newEl, targetEl.nextSibling);    
	    }    
	},
	/* 
	判断样式是否存在
	*/
	hasClass(obj, cls) {  
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	},
	/* 
	为指定的dom元素添加样式
	cls-[string] 可以同时添加多个class
	Tool.addClass(obj, 'a b c')
	*/
	addClass(obj, cls) {  
		cls = cls.split(' ');
		for(var i=0; i<cls.length; i++) {
			if(!this.hasClass(obj, cls[i])) obj.className += (obj.className?' ':'') + cls[i];
		}
	},  
	/* 
	删除指定dom元素的样式 
	*/
	removeClass(obj, cls) {  
	    if (this.hasClass(obj, cls)) {  
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	        obj.className = obj.className.replace(reg, ' ').replace(/(^\s*)|(\s*$)/g, '');  
	    }  
	},  
	/* 
	如果存在(不存在)，就删除(添加)一个样式  
	*/
	toggleClass(obj, cls){  
	    if(this.hasClass(obj, cls)){  
	        this.removeClass(obj, cls);  
	    }else{  
	        this.addClass(obj, cls);  
	    }  
	},
	/*
	判断pc还是phone true-pc 参数bool为true时，返回具体型号
	Tool.isPC()
	*/
	isPC(bool) {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["android", "iphone",
	                "symbianos", "windows phone",
	                "ipad", "ipod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.toLowerCase().indexOf(Agents[v]) > 0) {
	            if(bool) {
	                return Agents[v];
	            }
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	},
}