<!-- 
* vue h5crop
* Copyright (c) 2017/4/13 vcxiaohan
* vcxiaohan@foxmail.com
 -->
<template>
	<div class="CR_outer">
		<div class="CR_inputCtn">
			<input class="CR_input" @change="change" v-el="el.CR_input" type="file" />
		</div>
		<div class="CR_inner" :style="style.CR_inner">
			<div class="CR_editCtn">
				<div class="CR_editHeadCtn">
					<span>图片裁剪</span>
					<span class="CR_close">×</span>
				</div>
				<div class="CR_editBodyCtn">
					<div class="CR_cropCtn" v-if="!isUpload">
						<div class="CR_cropImgCtn" v-el="el.CR_cropImgCtn">
							<img class="CR_cropImg" v-el="el.CR_cropImg" :src="src.CR_cropImg" :style="style.CR_cropImg" />
						</div>
						<div class="CR_cropEditCtn">
							<span class="CR_reduce">-</span>
							<span class="CR_slideCtn">
								<i class="CR_slide" v-el="el.CR_slide"></i>
							</span>
							<span class="CR_add">+</span>
						</div>
						<div class="CR_cropShowCtn">
							<canvas class="CR_canvas" v-el="el.CR_canvas" :width="size" :height="size"></canvas>
						</div>
					</div>
					<div class="CR_uploadCtn" v-if="isUpload">
						123
					</div>
				</div>
			</div>
			<i class="CR_mask"></i>
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
				files: [],// [array] 图片来源
				size: 300,// [int] 基础大小
				img: {// [obj] 缓存的图片资源数据
					source: null,// [new Image] 来源
					width: 0,// [float] 宽度
					height: 0,// [float] 高度
					ratio: 0,// [float] 宽高比
					range: 0,// [float] 放大的范围
					type: 0,// [int] 0-size最小 1-size不是最小
				},
				crop: {// [obj] 定位的数据
					min: 0,// []
				},
				src: {// 图片数据
					CR_cropImg: '',// [string] base64
				},
				el: {// 指令、元素数据
					CR_input: 'CR_input',// 上传input
					CR_cropImgCtn: 'CR_cropImgCtn',// 显示图片框
					CR_cropImg: 'CR_cropImg',// 原图片
					CR_canvas: 'CR_canvas',// canvas
					CR_slide: 'CR_slide',// 滑块
				},
				style: {// 样式数据 _代表获取该属性
					CR_inner: {
						display: 'none',
					},
					CR_canvas: {
					},
					CR_cropImg: {

					},
				},
			}
		},
		props: ['isUpload'],
		computed: {  
			canvasCtx() {// [obj] canvas上下文
				return this.el.CR_canvas.getContext('2d');
			},
			a() {
				return 2;
			}

		},
		watch: {
			files() {
				this.getImg();
			},
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.events();
				this.$nextTick(function() {
				})
			},
			// 选择文件时
			change(e) {
				if(this.el.CR_input.files[0]) {// 选择文件后
					this.files = this.el.CR_input.files;
				}
				this.style.CR_inner = Extend({}, this.style.CR_inner, {
					display: 'block',
				})
			},
			// 显示图片
			getImg() {
				var self = this;

				for(var i=0,len=self.files.length; i<len; i++) { 
			        try {  
			            var reader = new FileReader();// <=IE9 不支持 FileReader  
			            if(self.files[i].type.indexOf('image')+1) {// 可预览  
			                reader.readAsDataURL(self.files[i]);  
			                reader.onload = function(e) {  
								self.src.CR_cropImg = e.target.result;// 显示原图

								self.img.source = new Image();  
	                            self.img.source.onload = function() {  
	                            	// 获取图片基础信息
	                            	self.img = Extend({}, self.img, {
	                            		width: self.img.source.width,
	                            		height: self.img.source.height,
										ratio: self.img.source.width/self.img.source.height,
	                            		type: Math.min(self.img.source.width, self.img.source.height)>self.size?0:1,
	                            	})

									// 获取图片展示的合适宽高
	                            	var width = 0,
	                            		height = 0;

	                            	if(self.img.type) {// size不是最小
	                            		self.img.range = 0;
	                            		if(self.img.width>self.img.height) {
	                            			width = self.img.width*self.size/self.img.height;
	                            			height = self.size;
	                            		}else {
	                            			width = self.size;
	                            			height = self.img.height*self.size/self.img.width;
	                            		}
	                            	}else {// size是最小
	                            		if(self.img.width>self.img.height) {
	                            			self.img.range = self.img.height-self.size;
	                            		}else {
	                            			self.img.range = self.img.width-self.size;
	                            		}
	                            		width = self.img.width;
	                            		height = self.img.height;
	                            	}

	                            	// 设置图片展示的合适宽高
	                            	self.style.CR_cropImg = Extend({}, self.style.CR_cropImg, {
	                            		top: 0,
	                            		left: 0,
	                            		width: width +'px',
	                            		height: height +'px',
	                            	})
	                            }
	                            self.img.source.src = e.target.result;
								self.canvasCtx.drawImage(self.img.source, 0, 0, self.size, self.size);// [图片资源, 开始剪切的x坐标位置, 开始剪切的y坐标位置, 被剪切图像的宽度, 被剪切图像的高度] img转换为canvas，显示canvas
			                }  
			            }else {  
			            }  
			        }catch(e) {}  
				}  
			},
			// 事件绑定
			events() {
				var self = this;

				/* pc端 BEGIN */
				// 按下
				Tool.on(self.el.CR_cropImgCtn, 'mousedown.CR', function(e) {
					Tool.addClass(document.body, 'CR_select_no');

					var clientY = e.clientY,
						top = parseFloat(self.style.CR_cropImg.top),
						maxScroll_top = parseFloat(self.style.CR_cropImg.height)-self.size;
					var clientX = e.clientX,
						left = parseFloat(self.style.CR_cropImg.left),
						maxScroll_left = parseFloat(self.style.CR_cropImg.width)-self.size;

					// 拖动
					Tool.on(document, 'mousemove.CR', function(e) {
						var _clientY = e.clientY,
							diffY = _clientY - clientY,
							CR_cropImg_top = top + diffY;
						var _clientX = e.clientX,
							diffX = _clientX - clientX,
							CR_cropImg_left = left + diffX;

						self.style.CR_cropImg = Extend({}, self.style.CR_cropImg, {
							top: self.getPos(CR_cropImg_top, maxScroll_top) +'px',
							left: self.getPos(CR_cropImg_left, maxScroll_left) +'px',
						})
					})
				})

				// 取消拖动
				Tool.on(document, 'mouseup.CR', function(e) {
					Tool.off(this, 'mousemove.CR');
					Tool.removeClass(document.body, 'CR_select_no');
				});
				/* pc端 END */
			},
			// 获取规定范围内的位置
			getPos(pos, maxPos) {
				pos = pos>0?0:pos;
				pos = pos<-maxPos?-maxPos:pos;
				return pos;
			},
		},
		directives: {
			el: {
				inserted: function(el, binding, vnode) {
					var self = vnode.context;

					if(binding.value == 'CR_input') {// 上传input
						self.el = Extend({}, self.el, {
							CR_input: el,
						})
					}
					if(binding.value == 'CR_cropImgCtn') {// 显示图片框
						self.el = Extend({}, self.el, {
							CR_cropImgCtn: el,
						})
					}
					if(binding.value == 'CR_cropImg') {// 原图片
						self.el = Extend({}, self.el, {
							CR_cropImg: el,
						})
					}
					if(binding.value == 'CR_canvas') {// canvas
						self.el = Extend({}, self.el, {
							CR_canvas: el,
						})
					}
					if(binding.value == 'CR_slide') {// 滑块
						self.el = Extend({}, self.el, {
							CR_slide: el,
						})
					}
					
					
				},
			}
		}
	}


</script>

<style lang="sass">
	$CR_editHeadCtn_padding: 10px;

	@mixin size($top: 0, $left: 0, $width: 100%, $height: 100%, $position: absolute) {
		top: $top;
		left: $left;
		width: $width;
		height: $height;
		position: $position;
	}
	/* 清除浮动 */
	@mixin clear() {
		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}

	.CR_outer {
		.CR_inner {
			@include size($position: fixed);
		    z-index: 999;
		    font-size: 14px;
		    .CR_mask {
		    	@include size();
		        background: rgba(0, 0, 0, 0.4);
		        z-index: 1;
		    }
		}
	}
	.CR_editCtn {
		$t: 50%;
		top: $t;
		left: $t;
		position: absolute;
		background: #fff;
		z-index: 2;
		transform: translate(-$t, -$t);
		.CR_imgMask {
			@include size();
			display: block;
		    background: rgba(0, 0, 0, 0.4);
		}
	}
	.CR_editHeadCtn {
		$h: 30px;
		position: relative;
		height: $h;
		line-height: $h;
		background: #619085;
		padding: 0 $CR_editHeadCtn_padding;
		span {
			color: #fff;
		}
		.CR_close {
			float: right;
			text-align: right;
			font-size: 20px;
			cursor: pointer;
		}
	}
	.CR_cropCtn {
		$w: 300px;
		.CR_cropImgCtn {
		    width: $w;
		    height: $w;
			margin: $CR_editHeadCtn_padding;
		    position: relative;
		    overflow: hidden;
		    outline: 1px solid #ddd;
		    &:after {
		    	@include size();
		    	content: '';
		    	display: block;
		    }
		    .CR_cropImg {
		    	@include size($width: auto, $height: auto);
		    	display: block;
		    }
		}
		.CR_cropEditCtn {
			$w: 16px;
			$w2: 12px;
			$h: 2px;
			$color: #bebebe;
			padding: 0 $CR_editHeadCtn_padding $CR_editHeadCtn_padding;
			@include clear;
			font-size: 0;
			span, i {
				display: inline-block;
				vertical-align: middle;
				cursor: pointer;
			}
			.CR_reduce, .CR_add {
				width: $w;
				height: $w;
				line-height: $w;
				font-size: 20px;
				text-align: center;
				color: $color;
				border: 1px solid $color;
				border-radius: 100%;
			}
			.CR_slideCtn {
				width: 200px;
				height: $h;
				margin: 0 10px;
				background: $color;
				position: relative;
				.CR_slide {
					position: absolute;
					left: 0;
					top: -($w2+(-$h))/2;
					width: $w2;
					height: $w2;
					background: #12B7F5;
					border-radius: 100%;
				}
			}
		}
		.CR_cropShowCtn {
			position: absolute;
		    top: 0;
		    left: 320px;
		    outline: 1px solid red;
		}
	}
	.CR_uploadCtn {

	}
	
	.CR_select_no {
	    -moz-user-select: none;/*火狐*/
	    -webkit-user-select: none;/*webkit浏览器*/
	    -ms-user-select: none;/*IE10*/
	    -khtml-user-select: none;/*早期浏览器*/
	    user-select: none;
	}
</style>
