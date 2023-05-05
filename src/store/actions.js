import axiosClient from '../axiosClient'
export function searchMeals({commit}, keyword){
    axiosClient.get(`search.php?s=${keyword}`)
        .then(({data})=>{            
            commit('setSearchedMeals',data.meals)
        })
}

export function searchMealsByLetter({commit}, letter){
    axiosClient.get(`search.php?f=${letter}`)
        .then(({data})=>{    
            console.log(data)         
        
            commit('setMealsByLetter',data.meals)
        })
}

export function searchMealsByIngredient({commit}, ingredient){

    axiosClient.get(`filter.php?i=${ingredient}`)
        .then(({data})=>{   
            console.log(data)
            commit('setMealsByIngredient',data.meals)
        })
}

export function setDeputies({commit}, deputies){
    commit('setDeputiesList', deputies)
  
}