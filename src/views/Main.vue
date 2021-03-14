<template>
	<div>
		<SearchLine />

		<CardWeather />

		<SnackBar />
	</div>
</template>
<script>
import SearchLine from "@/components/SearchLine";
import CardWeather from "@/components/CardWeather";
import SnackBar from "@/components/SnackBar";
import { mapActions } from "vuex";
export default {
	name:'Main',
	components: {
		SearchLine,
		CardWeather,
		SnackBar,
	},
	methods: {
		...mapActions(["renderContentFromSessionSTORAGE", "userGeolocation"]),
	},
	mounted() {
		let sessionData = sessionStorage.getItem("weather");
		if (sessionData) {
			this.renderContentFromSessionSTORAGE(JSON.parse(sessionData));
		} else {
			this.userGeolocation();
		}
	},
};
</script>