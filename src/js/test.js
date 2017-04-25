import Vue from 'vue';
import VueRouter from 'vue-router';
import Page from 'components/test.vue';

Vue.use(VueRouter);

new Vue({
	el: '#app',
	components: {
		'page': Page,
	},
})
