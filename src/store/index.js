import { createStore } from 'vuex'
import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'


const store = createStore({
    state,
    actions,
    mutations,
    getters:{
        getObjectById: (state) => (id) => {

            return state.deputies[id]
    },
    getLawById: (state) => (id) => {
        let found
        console.log(id)
        state.searchedLaws.laws.forEach(element => {
            
            if (element.id===id){
                console.log(element)
                found=element
            }

        });
        return found
}

}
})

export default store;