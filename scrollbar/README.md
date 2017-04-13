# scrollbar 说明文档

#### demo 示例
1. [http://v3.faqrobot.org/hvb/vue-plugins/dist/scrollbar/demo.html](http://v3.faqrobot.org/hvb/vue-plugins/dist/scrollbar/demo.html)
2. 没有提供滚动回调，待完善

#### 使用说明

1. 滚动条样式分为**pc端**(宽度大，方便鼠标拖动滚动条)和**mobile端**(宽度小，手指拖动可视区域即可)，均可自定义

		.SC_backCtn_pc: {/* pc滚动条底色样式 */}
		.SC_backCtn_phone: {/* phone滚动条底色样式 */}
		.SC_frontCtn_pc: {/* pc滚动条拖动块样式 */}
		.SC_frontCtn_phone: {/* phone滚动条拖动块样式 */}

2. 提供滚动时的回调
3. 兼容>=ie9、手机端
4. 模板结构

		<scroll class="bodyOuter" :SC_scrollTo="bScrollTo" @SC_scroll="scrollHandler">
	        <div slot="SC_inner">
	            <!-- 正文 BEGIN -->
	            <div class="bodyInner">您的内容</div>
	            <!-- 正文 END -->
	        </div>
	    </scroll>
    	
#### 调用示例

	<template>
	    <!-- 
	    1. 直接写 <scroll></scroll> 标签，来使用插件
	    2. SC_scrollTo-初始位置
		3. @SC_scroll-绑定滚动时的事件
		4. scroll 标签里面必须要有一个名称为SC_inner的slot
	    -->
	    <scroll class="bodyOuter" :SC_scrollTo="bScrollTo" @SC_scroll="scrollHandler">
	        <div slot="SC_inner">
	            <!-- 正文 BEGIN -->
	            <div class="bodyInner">您的内容</div>
	            <!-- 正文 END -->
	        </div>
	    </scroll>
	</template>
	
	<script>
	    import Vue from 'vue';
	    import Scroll from 'scrollbar/src/components/scroll.vue';// 引入插件
	
	    export default {
	        components: {
	            'scroll': Scroll,// 注册组件
	        },
	        data() {
	            return {
	                bScrollTo: 200,
	            }
	        },
			methods: {
				// 滚动回调 state--2-位于顶部以上、-1-位于顶部、0-顶部到底部之间、1-位于底部、2-位于底部以下 top-具体的滚动位置
				scrollHandler(state, top) {
					console.log(state, top)
				}
			}
	    }
	</script>
	
	<style lang="sass">
		/* 自定义样式 */
		.SC_backCtn_pc: {/* pc滚动条底色样式 */}
		.SC_backCtn_phone: {/* phone滚动条底色样式 */}
		.SC_frontCtn_pc: {/* pc滚动条拖动块样式 */}
		.SC_frontCtn_phone: {/* phone滚动条拖动块样式 */}
	</style>




