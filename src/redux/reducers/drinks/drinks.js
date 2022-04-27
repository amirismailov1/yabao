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
        axios('http://localhost:8080/drinks')
            .then(({data}) => {
                return dispatch({type:'GETDRINKS', arr : data})
            })
    }
}