export default {
    actions: {
        userGeolocation({ commit, dispatch }) {
            if (navigator.onLine) {
                navigator.geolocation.getCurrentPosition(

                    function(position) {

                        dispatch('requestDataWithLocation', position)

                    },

                    function(error) {
                        commit('CALL_SNACKBAR')
                        console.error(error)
                    }

                )
            } else(commit('CALL_SNACKBAR', 'Отсутствует интернет соединение'))




        },
        requestDataWithLocation({ commit }, position) {
            return fetch(`https://api.openweathermap.org/data/2.5/weather?&lang=ru&units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=a8d0ca61d29418146def7187a7895305`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                }).then(data => {
                    if (data) commit('ADD_DATA_STATE', data)
                }).catch(() => {
                    commit('CALL_SNACKBAR')
                })
        }
    }

}