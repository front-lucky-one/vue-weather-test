import Vue from 'vue'
import Vuex from 'vuex'
import main from '@/store/modules/main'
import geolocation from '@/store/modules/geolocation'
import snackbar from '@/store/modules/snackbar'
Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        main,
        geolocation,
        snackbar
    }
})