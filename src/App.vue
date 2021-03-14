<template>
	<div id="app">
		<div class="page-container">
			<md-app md-waterfall md-mode="overlap">
				<md-app-toolbar class="md-primary md-large">
					<div class="md-toolbar-row">
						<span class="md-title">Погода v1.0</span>
					</div>
				</md-app-toolbar>
				<md-app-content>
					<transition name="fade" mode="out-in">
						<router-view />
					</transition>
				</md-app-content>
			</md-app>
		</div>
	</div>
</template>

<script>

export default {
	name:'App',
	data() {
		return {};
	},
};
</script>
<style>
body {
	background-color: #448aff;
}
#app {
	overflow: hidden;
}


.fade-enter-active,
.fade-leave-active {
	transition: opacity .3s ease;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
