<template>
	<div class="ctn">
		<router-view></router-view>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VueRouter from 'vue-router';
	import A from 'components/a.vue';
	import B from 'components/b.vue';

	Vue.use(VueRouter);
	const routes = [
	    { path: '/A', component: A },
	    { path: '/B', component: B },
	]
	const router = new VueRouter({
	  routes
	})
	export default {
		router,
	}
</script>

<style lang="sass">
	* {
		margin: 0;
		padding: 0;
	}
</style>
