<template>
	<div>
		<p class="p1">暂未完成</p>
		<h5crop :isUpload="false"></h5crop>
		<div class="a">
			<div class="b">
				<p class="p2">2</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Tool from 'js/tool.js';
	import H5crop from 'h5crop/src/components/h5crop.vue';

	export default {
		components: {
			'h5crop': H5crop,
		},
		data() {
			return {
			}
		},
		mounted() {
			var self = this;

			
		},
		watch: {
		},
		methods: {
			
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
	
</style>
