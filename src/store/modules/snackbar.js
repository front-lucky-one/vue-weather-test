export default {
    state: {
        message: '',
        visibleSnackBar: false
    },
    mutations: {
        CALL_SNACKBAR(state, message) {
            state.message = message || 'Что-то пошло не так!'
            state.visibleSnackBar = true
            setTimeout(() => {
                state.visibleSnackBar = false
            }, 3000)

        }
    },
    getters: {
        getMessage(state) {
            return state.message
        },
        getStateSnackbar(state) {

            return state.visibleSnackBar
        }
    }
}