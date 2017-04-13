<!-- 
* vue scrollbar
* Copyright (c) 2017/4/13 vcxiaohan
* vcxiaohan@foxmail.com
 -->
<template>
	<div class="SC_outer" v-el="el.SC_outer" :style="style.SC_outer">
		<div class="SC_inner" v-el="el.SC_inner" :style="style.SC_inner">
			<slot name="SC_inner">滚动外框</slot>
		</div>
		<div class="SC_backCtn" :class="classes.SC_backCtn" v-el="el.SC_backCtn" :style="style.SC_backCtn">
			<div class="SC_frontCtn" :class="classes.SC_frontCtn" v-el="el.SC_frontCtn" :style="style.SC_frontCtn"></div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Extend from 'js/extend.js';
	import Move from 'js/move.min.js';
	import Tool from 'js/tool.js';

	export default {
		data() {
			return {
				deltaY: 50,// [int] 竖向滚动单位
				el: {// 指令、元素数据
					SC_outer: 'SC_outer',
					SC_inner: 'SC_inner',
					SC_backCtn: 'SC_backCtn',
					SC_frontCtn: 'SC_frontCtn',
				},
				SC_backCtn: {// [string]
					SC_backCtn_pc: true,
					SC_backCtn_phone: false,
				},
				classes: {// class数据
					SC_backCtn: {// [string]
						SC_backCtn_pc: true,
						SC_backCtn_phone: false,
					},
					SC_frontCtn: {// [string]
						SC_frontCtn_pc: true,
						SC_frontCtn_phone: false,
					},
				},
				style: {// 样式数据 _代表获取该属性
					SC_outer: {
						_height: 0,// [int]
					},
					SC_inner: {
						top: '0px',// [string]
						_height: 0,// [int]
					},
					SC_backCtn: {
						opacity: 0,// [int]
					},
					SC_frontCtn: {
						top: '0px',// [string]
						_height: 0,// [int]
					},
				},
			}
		},
		props: ['SC_scrollTo'],
		computed: {  
			maxScroll() {// [int] 内框滚动最大值
				return this.style.SC_inner._height - this.style.SC_outer._height;
			},
			maxTop() {// [int] 拖动块最大top
				return this.style.SC_outer._height - this.style.SC_frontCtn._height;
			},
			ratio() {// [float] 滚动时比率
				return this.maxScroll/this.maxTop;
			},
			state() {// [int] -2-位于顶部以上、-1-位于顶部、0-顶部到底部之间、1-位于底部、2-位于底部以下 top-具体的滚动位置
				var state = 0,
					SC_frontCtn_top = -parseFloat(this.style.SC_frontCtn.top);

				switch(true) {
					case SC_frontCtn_top>0:
						state = -2;
						break;
					case SC_frontCtn_top==0:
						state = -1;
						break;
					case SC_frontCtn_top>-this.maxTop&&SC_frontCtn_top<0:
						state = 0;
						break;
					case SC_frontCtn_top==-this.maxTop:
						state = 1;
						break;
					case SC_frontCtn_top<-this.maxTop:
						state = 2;
						break;
				}
				return state;
			},
		},
		watch: {
			'style.SC_inner'(newVal, oldVal) {// 控制拖动块的top
				var oldState = this.state;
				var SC_frontCtn_top = parseFloat(newVal.top)/this.ratio;
				this.style.SC_frontCtn = Extend({}, this.style.SC_frontCtn, {
					top: -SC_frontCtn_top +'px',
				})
				this.$emit('SC_scroll', -SC_frontCtn_top, this.state, oldState);// 滚动回调
			},
			SC_scrollTo(newVal, oldVal) {
				this.scrollTo(newVal);
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.setPos();// 预处理
				this.$nextTick(function() {
					this.getStyle();// 获取样式数据
					this.events();// 事件绑定
					this.scrollTo(this.SC_scrollTo);// 滚动到固定位置
				})
			},
			// 预处理
			setPos() {
				// 设置样式
				if(Tool.getStyle(this.el.SC_outer, 'position') == 'static') {
					this.style.SC_outer = Extend({}, this.style.SC_outer, {
						position: 'relative'
					})
				}

				// 是否是pc
				this.classes.SC_backCtn = Extend({}, this.classes.SC_backCtn, {
					SC_backCtn_pc: Tool.isPC(),
					SC_backCtn_phone: !Tool.isPC(),
				})
				this.classes.SC_frontCtn = Extend({}, this.classes.SC_frontCtn, {
					SC_frontCtn_pc: Tool.isPC(),
					SC_frontCtn_phone: !Tool.isPC(),
				})
			},
			// 获取样式数据
			getStyle() {
				this.style.SC_outer = Extend({}, this.style.SC_outer, {
					_height: Tool.getStyle(this.el.SC_outer, 'height', true),
				})
				this.style.SC_inner = Extend({}, this.style.SC_inner, {
					_height: Tool.getStyle(this.el.SC_inner, 'height', true),
				})
				this.style.SC_frontCtn = Extend({}, this.style.SC_frontCtn, {
					_height: Tool.getStyle(this.el.SC_frontCtn, 'height', true),
				})
			},
			// 事件绑定
			events() {
				var self = this;

				/* pc端 BEGIN */
				// 滚动条显隐
				Tool.on(self.el.SC_outer, 'mouseenter.SC', function(e) {
					fade('in');
				})
				// 滚动条显隐
				Tool.on(self.el.SC_outer, 'mouseleave.SC', function(e) {
					fade('out');
				})

				// 滚轮滚动
				Tool.on(self.el.SC_outer, 'wheel.SC', function(e) {
					e.preventDefault();// 阻止页面滚动
					e.stopPropagation();// 阻止事件冒泡
					if(self.ratio > 0) {// 允许滚动
						var SC_inner_top = parseFloat(self.style.SC_inner.top);

						if(e.deltaY<0) {// 内框top递减
							SC_inner_top += self.deltaY;
						}else {// 内框top递增
							SC_inner_top -= self.deltaY;
						}

						SC_inner_top = SC_inner_top>0?0:SC_inner_top;
						SC_inner_top = SC_inner_top<-self.maxScroll?-self.maxScroll:SC_inner_top;

						self.style.SC_inner = Extend({}, self.style.SC_inner, {
							top: SC_inner_top +'px',
						})
					}
				})

				// 按下
				Tool.on(self.el.SC_frontCtn, 'mousedown.SC', function(e) {
					Tool.addClass(document.body, 'SC_select_no');

					var clientY = e.clientY,
						top = parseFloat(self.style.SC_inner.top);

					// 拖动
					Tool.on(document, 'mousemove.SC', function(e) {
						var _clientY = e.clientY,
							diffY = _clientY - clientY,
							SC_inner_top = top - diffY*self.ratio;

						SC_inner_top = SC_inner_top>0?0:SC_inner_top;
						SC_inner_top = SC_inner_top<-self.maxScroll?-self.maxScroll:SC_inner_top;

						self.style.SC_inner = Extend({}, self.style.SC_inner, {
							top: SC_inner_top +'px',
						})
					})
				})

				// 取消拖动
				Tool.on(document, 'mouseup.SC', function(e) {
					Tool.off(this, 'mousemove.SC');
					Tool.removeClass(document.body, 'SC_select_no');
				});
				/* pc端 END */

				/* 手机端 BEGIN */
				var speedY = 0;// 拖动停止时的速度

				// 按下
				Tool.on(self.el.SC_outer, 'touchstart.SC', function(e) {
					e.preventDefault();// 阻止页面滚动
					e.stopPropagation();// 阻止事件冒泡
					fade('in');

					var clientY = e.targetTouches[0].pageY,
						speedClientY = clientY,
						top = parseFloat(self.style.SC_inner.top);

					speedY = 0;// 清零速度

					// 拖动
					Tool.on(self.el.SC_outer, 'touchmove.SC', function(e) {
						var _clientY = e.targetTouches[0].pageY,
							diffY = _clientY - clientY,
							SC_inner_top = top + diffY;

						speedY = _clientY - speedClientY;
						speedClientY = _clientY;

						SC_inner_top = SC_inner_top>0?SC_inner_top/3:SC_inner_top;
						SC_inner_top = SC_inner_top<-self.maxScroll?top+diffY/3:SC_inner_top;

						self.style.SC_inner = Extend({}, self.style.SC_inner, {
							top: SC_inner_top +'px',
						})
					})
				})

				// 取消拖动
				Tool.on(self.el.SC_outer, 'touchend.SC', function(e) {
					e.preventDefault();// 阻止页面滚动
					e.stopPropagation();// 阻止事件冒泡
					Tool.off(this, 'touchmove.SC');

					var SC_inner_top = parseFloat(self.style.SC_inner.top);

					if(SC_inner_top>0) {// 上出现空白
						Move.ease([SC_inner_top, 0], 300, function(v){
							self.style.SC_inner = Extend({}, self.style.SC_inner, {
								top: v +'px',
							})
						}, function() {
							fade('out');
						});
					}else if(SC_inner_top<-self.maxScroll) {// 下出现空白
						Move.ease([SC_inner_top, -self.maxScroll], 300, function(v){
							self.style.SC_inner = Extend({}, self.style.SC_inner, {
								top: v +'px',
							})
						}, function() {
							fade('out');
						});
					}else {// 拖动停止时的惯性滚动
						endMove(SC_inner_top, speedY);
					}
					
				})

				// 浏览器缩放
				Tool.on(window, 'resize.SC', function(e) {
					self.getStyle();
				});

				// 内容改变
				var SC_inner_text = self.el.SC_inner.innerText;
				setInterval(function() {
					var _SC_inner_text = self.el.SC_inner.innerText;

					if(SC_inner_text != _SC_inner_text) {
						self.getStyle();
						SC_inner_text = _SC_inner_text;
					}
				}, 100);

				// 拖动停止时的惯性滚动
				function endMove(SC_inner_top, speedY) {
					if(SC_inner_top>0) {// 上出现空白
						self.style.SC_inner = Extend({}, self.style.SC_inner, {
							top: '0px',
						})
						fade('out');
					}else if(SC_inner_top<-self.maxScroll) {// 下出现空白
						self.style.SC_inner = Extend({}, self.style.SC_inner, {
							top: -self.maxScroll +'px',
						})
						fade('out');
					}else {// 拖动停止时的惯性滚动
						Move.linear([SC_inner_top, SC_inner_top+speedY], 10, function(v){
							self.style.SC_inner = Extend({}, self.style.SC_inner, {
								top: v +'px',
							})
						}, function() {
							if(Math.abs(speedY)>1) {
								speedY *= .95;
								endMove(SC_inner_top+speedY, speedY);
							}else {
								fade('out');
							}
						});
					}
				}

				// 渐隐渐显
				function fade(type) {
					var moveArr = [],
						SC_backCtn_opacity = self.style.SC_backCtn.opacity;

					if(type == 'in') {
						moveArr = [SC_backCtn_opacity, 1];
					}else {
						moveArr = [SC_backCtn_opacity, 0];
					}

					Move.ease(moveArr, 500, function(v){// 滚动条显示
						self.style.SC_backCtn = Extend({}, self.style.SC_backCtn, {
							opacity: v,
						})
					});
				}
				/* 手机端 END */
			},
			// 滚动到固定位置
			scrollTo(SC_inner_top) {
				var self = this;

				if(SC_inner_top == 'top') {
					SC_inner_top = 0;
				}else if(SC_inner_top == 'bottom') {
					SC_inner_top = -self.maxScroll;
				}else {
					SC_inner_top = SC_inner_top?-SC_inner_top:0;
				}

				SC_inner_top = SC_inner_top>0?0:SC_inner_top;
				SC_inner_top = SC_inner_top<-self.maxScroll?-self.maxScroll:SC_inner_top;

				Move.ease([parseFloat(this.style.SC_inner.top), SC_inner_top], 500, function(v){// 滚动条显示
					self.style.SC_inner = Extend({}, self.style.SC_inner, {
						top: v +'px',
					})
				});
			}
		},
		directives: {
			el: {
				inserted: function(el, binding, vnode) {
					var self = vnode.context;

					if(binding.value == 'SC_outer') {// 外框
						self.el = Extend({}, self.el, {
							SC_outer: el,
						})
					}
					
					if(binding.value == 'SC_inner') {// 内框
						self.el = Extend({}, self.el, {
							SC_inner: el,
						})
					}
					
					if(binding.value == 'SC_backCtn') {// 滚动条
						self.el = Extend({}, self.el, {
							SC_backCtn: el,
						})
					}

					if(binding.value == 'SC_frontCtn') {// 滚动条
						self.el = Extend({}, self.el, {
							SC_frontCtn: el,
						})
					}
				},
			}
		}
	}


</script>

<style lang="sass">
	.SC_outer {
		overflow: hidden;
	}
	.SC_inner {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
	}
	.SC_backCtn {
	    height: 100%;
	    position: absolute;
	    top: 0;
	    right: 2px;
	    opacity: 0;
	    background: #000;
	    background: rgba(0, 0, 0, 0.4);
	    width: 2px;
	    border-radius: 20px;
	}
	.SC_frontCtn {
	    position: absolute;
	    top: 0;
	    cursor: pointer;
	    background: #fff;
	    background: rgba(255, 255, 255, 0.75);
	    width: 2px;
	    height: 20px;
	    border-radius: 5px;
	}
	.SC_frontCtn:hover {
	    background: rgba(255, 255, 255, 1);
	}
	.SC_backCtn_pc {
	}
	.SC_backCtn_phone {
	}
	.SC_frontCtn_pc {
	    right: -1px;
	    width: 4px;
	}
	.SC_frontCtn_phone {
	    right: 0;
	    width: 2px;
	}
	.SC_select_no {
	    -moz-user-select: none;/*火狐*/
	    -webkit-user-select: none;/*webkit浏览器*/
	    -ms-user-select: none;/*IE10*/
	    -khtml-user-select: none;/*早期浏览器*/
	    user-select: none;
	};
</style>
