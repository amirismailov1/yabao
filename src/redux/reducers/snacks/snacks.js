import axios from "axios";


const initialState = {
    snacks: [],
    count: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GETSNACKS' : {
            return {
                ...state,
                snacks: action.arr,
                count: action.arr.length
            }
        }
        default : return state
    }
}

export const getSnacks = () => {
    return (dispatch) => {
        axios('http://localhost:8080/snacks')
            .then(({data}) => {
                return dispatch({type:'GETSNACKS', arr : data})
            })
    }
}