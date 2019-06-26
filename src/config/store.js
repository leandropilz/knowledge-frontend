import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: 'Usuário Mock',
            email: 'mock@gmail.com'
        }
    },
    mutations: {
        toggleMenu(state, isMenuVisible) {
            if (isMenuVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isMenuVisible
            }
        }
    }
})