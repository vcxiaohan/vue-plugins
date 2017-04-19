<template>
	<scrollbar class="bodyOuter">
		<div slot="SC_inner">
			<div class="bodyInner">
				<div class="demo">
					<h2>demo1</h2>
					<scrollbar class="aOuter outer" SC_scrollTo="top">
						<div slot="SC_inner">
							<div class="aInner inner">
				                <h3>假如生活欺骗了你</h3>
				                <p>人生很短暂，一辈子能遇到几个真心懂你的、爱你的知心朋友，也许你沮丧、失落。可是空落落的心哪能承受的起那么多。曾经假想，假如那一切没发生，爱你的人没有离你而去，又会怎样，假如生活欺骗了你，你是否可以坦然面对呢？你是否可以宽容以待？</p>
				                <p>逝去的已逝去，何必留恋呢？没有人会同情弱者，你只有崛起，那又何必悲伤、何必停留。世界没有你照样转。哪有为何做不必要的等待、牺牲。</p>
				                <p>生活很美好，现实很骨感，那有何必因为一些事、一些人所牵绊呢？</p>
				                <p>假如生活欺骗了你，不要悲伤、不要抱怨。从现在起，收获所拥有的，忘却没有的，这样你才会慢慢坚强起来。</p>
				                <p>假如生活欺骗了你，即使暂时无法抚平受伤的心灵，总有一天幸福会降临。</p>
				                <p>假如生活欺骗了你，学会包容，学会孤单，即使寂寞，也不要表现出来，不要给小瞧你的人机会鄙视，学会隐忍。</p>
				                <p>也许生活并没有童话的美好，但是领悟了就好了，人性的自私并不是你所能改变，学会适应才是王道也。</p>
				                <p>也许生活并不是预料的美好，请不要忧伤，人生并不是一帆风顺，即使失败，笑着面对，一切都会过去。</p>
				                <p>也许容易得到的，你不一定珍惜，那又何必呢？坎坷的路上，虽然艰辛，但拥有一颗恒心，梦想总会花开。</p>
				                <p>暂时的失败并不代笔什么，重要的是你要拥有一颗平常心，微笑的对待，生活会更美好。</p>
				                <p>这一刻，也许你跌倒了，也许跌疼了，也许落泪了，请不要伤心。擦干你的泪水继续前行。总有一天你会体会收获的喜悦。</p>
				                <p>看远处的鲜花在向你招手，哭泣后的喜悦马上要降临。加油。</p>
				                <p>生活欺骗了你，只是为你下一次的路途搬走拌石，生活欺骗了你，只是为了你下一次的重生。那又何必纠结呢？为何不收起你那份受伤的心呢？选择原谅，选择坚强。才会让此刻的你继续前行。那就放手，丢去不必要的烦恼。继续航帆前行。</p>
				            </div>
				        </div>
					</scrollbar>
		        </div>
				<div class="demo">
					<h2>demo2</h2>
					<scrollbar class="bOuter outer" :SC_scrollTo="bScrollTo" @SC_scroll="scrollHandler">
						<div slot="SC_inner">
							<div class="bInner inner">
				                <h3>假如生活欺骗了你</h3>
				                <p>人生很短暂，一辈子能遇到几个真心懂你的、爱你的知心朋友，也许你沮丧、失落。可是空落落的心哪能承受的起那么多。曾经假想，假如那一切没发生，爱你的人没有离你而去，又会怎样，假如生活欺骗了你，你是否可以坦然面对呢？你是否可以宽容以待？</p>
				                <p>逝去的已逝去，何必留恋呢？没有人会同情弱者，你只有崛起，那又何必悲伤、何必停留。世界没有你照样转。哪有为何做不必要的等待、牺牲。</p>
				                <p>生活很美好，现实很骨感，那有何必因为一些事、一些人所牵绊呢？</p>
				                <p>假如生活欺骗了你，不要悲伤、不要抱怨。从现在起，收获所拥有的，忘却没有的，这样你才会慢慢坚强起来。</p>
				                <p>假如生活欺骗了你，即使暂时无法抚平受伤的心灵，总有一天幸福会降临。</p>
				                <p>假如生活欺骗了你，学会包容，学会孤单，即使寂寞，也不要表现出来，不要给小瞧你的人机会鄙视，学会隐忍。</p>
				                <p>也许生活并没有童话的美好，但是领悟了就好了，人性的自私并不是你所能改变，学会适应才是王道也。</p>
				                <p>也许生活并不是预料的美好，请不要忧伤，人生并不是一帆风顺，即使失败，笑着面对，一切都会过去。</p>
				                <p>也许容易得到的，你不一定珍惜，那又何必呢？坎坷的路上，虽然艰辛，但拥有一颗恒心，梦想总会花开。</p>
				                <p>暂时的失败并不代笔什么，重要的是你要拥有一颗平常心，微笑的对待，生活会更美好。</p>
				                <p>这一刻，也许你跌倒了，也许跌疼了，也许落泪了，请不要伤心。擦干你的泪水继续前行。总有一天你会体会收获的喜悦。</p>
				                <p>看远处的鲜花在向你招手，哭泣后的喜悦马上要降临。加油。</p>
				                <p>生活欺骗了你，只是为你下一次的路途搬走拌石，生活欺骗了你，只是为了你下一次的重生。那又何必纠结呢？为何不收起你那份受伤的心呢？选择原谅，选择坚强。才会让此刻的你继续前行。那就放手，丢去不必要的烦恼。继续航帆前行。</p>
				            </div>
				        </div>
					</scrollbar>
	            </div>
	            <div class="explain">
	                <button class="toBottom">demo2滚动到底部</button>
	            </div>
	            <div class="explain">
                    <h3>demo解释</h3>
                    <p>1. demo1 是最简单的调用示例</p>
                    <p>2. body和demo2 通过写css自定义了滚动条的样式</p>
                    <p>3. demo2 初始位置为200</p>
                    <p>4. 插件可嵌套使用(如：body和demo1、2嵌套使用)</p>
                </div>
                <div class="ctn">
	                <div class="blue">
	                	<p>状态：-2-位于顶部以上</p>
	                	<p>状态：-1-位于顶部</p>
	                	<p>状态：0-顶部到底部之间</p>
	                	<p>状态：1-位于底部</p>
	                	<p>状态：2-位于底部以下</p>
	                	<p class="red">状态-2和2请在手机端模拟</p>
	                	<p class="red">通过状态变化可以模拟“上拉加载”和“下拉刷新”动作</p>
	                </div>
                </div>
			</div>
		</div>
	</scrollbar>
</template>

<script>
	import Vue from 'vue';
	import Tool from 'js/tool.js';
	import Scrollbar from 'scrollbar/src/components/scrollbar.vue';

	export default {
		components: {
			'scrollbar': Scrollbar,
		},
		data() {
			return {
				bScrollTo: 100,
			}
		},
		mounted() {
			var self = this;

			document.querySelector('.toBottom').addEventListener('click', function() {
				self.bScrollTo = 'bottom';
			});
		},
		watch: {
		},
		methods: {
			// 滚动回调 state--2-位于顶部以上、-1-位于顶部、0-顶部到底部之间、1-位于底部、2-位于底部以下 oldState-上一次状态 top-具体的滚动位置
			scrollHandler(top, state, oldState) {
				var innerHTML = '';
				if(state==-1 && oldState==-2) {// 此状态模拟下拉松手刷新动作
					innerHTML = '<span class="blue">上边界回弹滚动</span><em class="green">-|-</em>';
				}
				if(state==-1 && oldState==0) {
					innerHTML = '<span class="blue">滚动到顶部</span><em class="green">-|-</em>';
				}
				if(state==0 && oldState==0) {
					innerHTML = '正常滚动<em class="green">-|-</em>';
				}
				if(state==1 && oldState==0) {// 此状态模拟上拉加载动作
					innerHTML = '<span class="blue">滚动到底部</span><em class="green">-|-</em>';
				}
				if(state==1 && oldState==2) {
					innerHTML = '<span class="blue">下边界回弹滚动</span><em class="green">-|-</em>';
				}
				if(innerHTML) {
					document.querySelector('.ctn').innerHTML += innerHTML;
				}
			}
		}
	}
</script>

<style lang="sass">
	* {
		margin: 0;
		padding: 0;
	}
	body, html {
		width: 100%;
		height: 100%;
		background: #eee;
		overflow: hidden;
	}
	#app {
		width: 100%;
		height: 100%;
	}
	.bodyOuter {
		height: 100%;
	}
	.bodyInner {
		height: 1000px;
	}
	.demo {
	    float: left;
	    padding: 10px;
	}
	.outer {
        width: 200px;
        height: 300px;
        border-radius: 5px;
    }
    .inner {
        padding: 10px;
    }
    .aOuter {
        background: #333333;
        color: #eee;
    }
    .bOuter {
        background: #C2BEB2;
    }
    h3 {
        text-align: center;
    }
    .explain, .ctn {
        float: left;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 20px;
        padding: 10px;
    }
    .green {
        background: green;
    }
    .blue {
        color: blue;
    }
    .red {
        color: red;
    }
    /* 浏览器自定义样式 BEGIN */
    .bodyOuter>.SC_backCtn_pc {
        width: 6px;
        right: 0;
    }
    .bodyOuter>.SC_backCtn_pc .SC_frontCtn_pc {
        width: 100%;
        height: 40px;
        right: 0;
    }
    /* 浏览器自定义样式 END */

    /* demo2自定义样式 BEGIN */
    .bOuter .SC_backCtn_pc {
        background: rgba(0,0,0,0.15);
        width: 2px;
        border-radius: 5px;
        right: 5px;
    }
    .bOuter .SC_frontCtn_pc {
    	background: rgba(0,0,0,0.6);
    	width: 10px;
    	height: 10px;
    	border-radius: 50%;
    	right: -4px;
    }
    .bOuter .SC_frontCtn_pc:hover {
    	background: rgba(0,0,0,0.9);
    }
    /* demo2自定义样式 END */
</style>
