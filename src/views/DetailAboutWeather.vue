<template>
	<div>
		<transition name="fade" mode="out-in">
			<div class="detail-about-weather" v-if="showContent">
				<div class="head-wrapp">
					<h1 class="section-title">
						{{ fullInfoAboutCity.name }}({{ fullInfoAboutCity.sys.country }})
					</h1>
					<router-link class="back" to="/" custom v-slot="{ navigate }">
						<md-button
							class="md-raised md-primary"
							@keypress.enter="navigate"
							@click="navigate"
							role="link"
							>BACK</md-button
						>
					</router-link>
				</div>

				<div class="weather">
					<div class="weather__wrapp-info">
						<img
							:src="`http://openweathermap.org/img/wn/${fullInfoAboutCity.weather[0].icon}@4x.png`"
							alt=""
							class="weather__img"
						/>
						<div class="weather__sky">
							{{ fullInfoAboutCity.weather[0].description }}
						</div>
					</div>

					<div class="weather__temp">
						{{ Math.round(fullInfoAboutCity.main.temp) }}°
					</div>

					<div class="weather__info">
						<div class="weather__all-info">
							<i class="wi wi-strong-wind"></i>
							Ветер: {{ fullInfoAboutCity.wind.speed }} м/c
						</div>

						<div class="weather__all-info">
							<i class="wi wi-humidity"></i>
							Влажность: {{ fullInfoAboutCity.main.humidity }} %
						</div>
						<div class="weather__all-info">
							<i class="wi wi-barometer"></i>
							Давление: {{ fullInfoAboutCity.main.pressure }} гПа
						</div>
					</div>
					<div class="weather__sun">
						<div class="weather__sunrise positions">
							<i class="wi wi-sunrise"></i>
							Рассвет: {{ fullInfoAboutCity.sys.sunrise | msFilterDate }}
						</div>
						<div class="weather__sunset positions">
							<i class="wi wi-sunset"></i>
							Закат: {{ fullInfoAboutCity.sys.sunset | msFilterDate }}
						</div>
					</div>
				</div>
			</div>
			
		</transition>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	name:"DetailAboutWeather",
	data() {
		return {
			fullInfoAboutCity: {},
			showContent: false,
			
		};
	},
	methods: {
		...mapActions(["requesthOnFullWeather"]),
		...mapGetters(["fullWeatherCurrentCity"]),
	},
	filters: {
		msFilterDate(data) {
			return new Date(data * 1000).toLocaleTimeString();
		},
		upperCase(e) {
			return e.toUpperCase();
		},
	},
	
	mounted() {
		if (Object.keys(this.fullWeatherCurrentCity()).length) {
			this.fullInfoAboutCity = this.fullWeatherCurrentCity();
			this.showContent = true;
		} else {
			this.requesthOnFullWeather(this.$route.params.name).then(() => {
				this.fullInfoAboutCity = this.fullWeatherCurrentCity();
				this.showContent = true;
			});
		}
	},
};
</script>

<style lang='scss'>
.head-wrapp {
	display: flex;
}
.wrapp-load-spinner {
	display: flex;
	justify-content: center;
}

.weather {
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
	&__temp {
		font-size: 100px;
		line-height: 100%;
		@media screen and (max-width: 768px) {
			margin-bottom: 20px;
		}
	}
	&__info {
		display: flex;
		flex-direction: column;
		@media screen and (max-width: 768px) {
			margin-bottom: 30px;
		}
	}
	&__all-info {
		margin-bottom: 20px;
		font-size: 19px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	&__wrapp-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	&__sky {
		font-size: 15px;
		text-transform: uppercase;
		@media screen and (max-width: 768px) {
			margin-bottom: 30px;
		}
	}
	.positions {
		margin-bottom: 20px;
		font-size: 19px;
		&:last-child {
			margin-bottom: 0;
		}
	}
}
.back {
	text-align: center;
}
.chart-temp {
	display: flex;
	margin: 40px 0;
}
.temp {
	padding: 5px;
	position: relative;
	border: 1px solid black;
	background-color: orange;
}
</style>
