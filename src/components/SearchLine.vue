<template>
	<form class="search-line" @submit.prevent>
		<md-field>
			<label>Введите название города</label>
			<md-input
				v-model="city"
				md-counter="30"
				@keydown.enter="addCityInList()"
			></md-input>
			<div class="geolocation-btn md-primary" @click="userGeolocation()">
				<md-icon>my_location</md-icon>
			</div>
		</md-field>

		<md-button class="md-raised md-primary" @click="addCityInList()"
			>Поиск</md-button
		>
	</form>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name:'SearchLine',
	data() {
		return {
			city: "",
		};
	},
	methods: {
		...mapActions(["searchCity", "userGeolocation"]),
		addCityInList() {
			if (this.city) {
				this.searchCity(this.city);
				this.city = "";
			}
		},
	},
};
</script>

<style scoped>
.md-field {
	position: relative;
}
.search-line {
	display: flex;
	align-items: center;
	max-width: 413px;
    margin: 0 auto;
}
.geolocation-btn {
	position: absolute;
	right: 0;
	cursor: pointer;
	bottom: 4px;
}
</style>
