<template>
	<div class="card-content">
		<transition name="fade" mode="out-in">
			<div v-if="getWeather().length">
				<transition-group class="wrapp-cards" name="fade" mode="out-in" apper>
					<md-content
						class="md-elevation-6"
						v-for="(item, index) in getWeather()"
						:key="item.id"
						@click="addRoute($event, index + 1, item.name)"
					>
						<button
							class="button remove"
							@click="removeThisCard({ index, name: item.name })"
						>
							+
						</button>
						<h2>{{ item.name }}</h2>
						<img
							:src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
						/>
						<span>{{ Math.round(item.main.temp) }}°</span>
						<p>{{ item.weather[0].description | upperCase }}</p>

						<button class="button update" @click="updateThisCard(item.name)">
							Обновить
						</button>
					</md-content>
				</transition-group>
			</div>

			<h2 class="info-title" v-else>Здесь появится погода!</h2>
		</transition>
	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
	name:"CardWeather",
	data() {
		return {
			update: true,
		};
	},
	methods: {
		...mapGetters(["getWeather"]),
		...mapActions([
			"removeThisCard",
			"updateThisCard",
			"requesthOnFullWeather",
		]),
		addRoute(e, id, name) {
			if (!e.target.classList.contains("button")) {
				this.$router.push(`/${id}/${name}`);

				this.requesthOnFullWeather(name);
			}
		},
	},
	filters: {
		upperCase(e) {
			return e.toUpperCase();
		},
	},
};
</script>

<style lang="scss" scoped>
.wrapp-cards {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.md-content {
	position: relative;
	width: 300px;
	margin: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	cursor:pointer
}

.info-title {
	text-align: center;
	text-transform: uppercase;
}
.button {
	cursor: pointer;
}
.remove {
	position: absolute;
	margin: 0;
	top: 6px;
	right: 7px;
	transform: rotate(45deg) scale(1.5);
	background-color: transparent;
	border: none;
}
.update {
	box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
		0 1px 5px 0 rgb(0 0 0 / 12%);
	width: 100%;
	height: 36px;
	text-transform: uppercase;
	border-radius: 3px;
	transition: 0.5s;
	border: none;
	&:hover {
		color: #ffffff;
		background-color: #448aff;
	}
}
</style>
