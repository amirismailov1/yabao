import axios from "axios";


const initialState = {
    drinks: [],
    count: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GETDRINKS' : {
            return {
                ...state,
                drinks: action.arr,
                count: action.arr.length
            }
        }
        default : return state
    }
}

export const getDrinks = () => {
    return (dispatch) => {
        axios('https://yabao.vercel.app/api/drinks')
            .then(({data}) => {
                return dispatch({type:'GETDRINKS', arr : data})
            })
    }
}