<template>
	<div class="ctn">
		<h2>选择相应的插件</h2>
		<div class="items">
			<div class="item">
				<a class="link" href="scrollbar/demo.html" target="_blank">
					<p class="title">滚动条插件-scrollbar</p>
					<iframe class="iframe" src="scrollbar/demo.html" frameborder="0"></iframe>
					<i class="mask"></i>
				</a>
			</div>
			<div class="item">
				<a class="link" href="h5crop/demo.html" target="_blank">
					<p class="title">图片裁剪上传插件-h5crop</p>
					<iframe class="iframe" src="h5crop/demo.html" frameborder="0"></iframe>
					<i class="mask"></i>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style lang="sass">
	* {
		margin: 0;
		padding: 0;
	}
	.ctn {
		padding: 10px;
	}
	.items {
		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}
	.item {
		width: 33.3%;
		height: 250px;
		float: left;
		padding: 20px;
		box-sizing: border-box;
		&:hover .title {
			opacity: 1;
		}
	}
	.link {
		display: inline-block;
		font-size: 14px;
		border: 6px solid #1a1e1f;
		width: 100%;
		height: 100%;
		position: relative;
	}
	.title {
		$h: 50px;
		opacity: 0;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: $h;
	    line-height: $h;
	    background-color: rgba(0, 0, 0, .7);
	    color: #fff;
	    font-size: 22px;
	    transition: opacity 0.5s;
        padding: 0 5px;
        box-sizing: border-box;
	}
	.mask {
		position: absolute;
		width: 100%;
		height: 100%;
		display: block;
		top: 0;
		left: 0;
	}
	.iframe {
		width: 100%;
		height: 100%;
	}
</style>
