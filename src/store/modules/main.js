export default {
    state: {
        countries: [],
        currentCity: {},
    },
    mutations: {
        ADD_DATA_STATE(state, data) {

            let id = state.countries.some(id => id.id === data.id)

            let sessionData = sessionStorage.getItem('weather')

            if (sessionData) {

                let parseArr = JSON.parse(sessionData)

                let arr = parseArr.some(e => {
                    return e.id === data.id
                })
                if (!arr) {
                    let addArrInStorage = [...parseArr]

                    addArrInStorage.push(data)

                    sessionStorage.setItem('weather', JSON.stringify(addArrInStorage))
                }



            } else {

                const arr = []

                arr.push(data)

                sessionStorage.setItem('weather', JSON.stringify(arr))
            }
            if (!id && data) {

                state.countries.push(data)

                state.currentCity = data


            }

        },
        ADD_CONTENT_FROM_STORAGE(state, data) {

            state.countries = data

        },
        REMOVE_CITY(state, data) {

            let sessionData = sessionStorage.getItem('weather')

            let parseArr = JSON.parse(sessionData)

            parseArr.splice(data.index, 1)

            state.countries.splice(data.index, 1)

            sessionStorage.setItem('weather', JSON.stringify(parseArr))


        },
        MAKE_DATA_UPDATE(state, data) {

            let a = state.countries.findIndex(e => e.id === data.id)

            let dataInStorage = JSON.parse(sessionStorage.getItem('weather'))

            let searcElementInARR = dataInStorage.findIndex(e => e.id === data.id)

            dataInStorage.splice(searcElementInARR, 1, data)

            state.countries.splice(a, 1, data)

            sessionStorage.setItem('weather', JSON.stringify(dataInStorage))


        },
        GET_FULL_INFO_ABOUT_WEATHER(state, data) {

            let sessionData = sessionStorage.getItem('weather')

            state.currentCity = JSON.parse(sessionData).find(e => e.name === data)

        },


    },
    actions: {
        searchCity({ commit }, city) {

            if (city) {
                return fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=a8d0ca61d29418146def7187a7895305&lang=ru`
                    )
                    .then(response => {

                        if (response.ok) {

                            return response.json();
                        }

                    }).then(data => {

                        if (data != undefined) {

                            commit('ADD_DATA_STATE', data)

                        } else {

                            throw data
                        }



                    }).catch(() => {

                        commit('CALL_SNACKBAR', 'Возможно вы ввели неправильный город или сервер временно недоступен!')

                    })
            }


        },

        removeThisCard({ commit }, data) {

            commit('REMOVE_CITY', data)
        },
        updateThisCard({ commit }, city) {

            fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=a8d0ca61d29418146def7187a7895305&lang=ru`
                )
                .then(response => {

                    if (response.ok) {

                        return response.json();
                    }
                }).then(data => {

                    commit('CALL_SNACKBAR', 'Данные успешно обновлены')

                    commit('MAKE_DATA_UPDATE', data)

                }).catch(() => commit('CALL_SNACKBAR', 'Что-то пошло не так!'))
        },
        requesthOnFullWeather({ commit }, city) {

            commit('GET_FULL_INFO_ABOUT_WEATHER', city)
        },
        renderContentFromSessionSTORAGE({ commit }, arr) {

            commit('ADD_CONTENT_FROM_STORAGE', arr)
        },


    },
    getters: {
        getWeather(state) {

            return state.countries
        },
        fullWeatherCurrentCity(state) {

            return state.currentCity
        },



    }
}