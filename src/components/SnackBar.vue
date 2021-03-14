<template>
	<md-snackbar
		:md-position="position"
		:md-active="showSnackbar()"
		md-persistent
	>
		<span>{{ getMessage() }}</span>
	</md-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
	name:"SnackBar",
	data() {
		return {
			showSnackbar: this.getStateSnackbar,
			position: "center",
		};
	},
	methods: {
		...mapGetters(["getMessage", "getStateSnackbar"]),
	},
	computed: {
		...mapMutations(["CALL_SNACKBAR"]),
	},
	
};
</script>

<style scoped>
</style>
