import axios from "axios";


const initialState = {
    soup: [],
    count: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GETSOUP' : {
            return {
                ...state,
                soup: action.arr,
                count: action.arr.length
            }
        }
        default : return state
    }
}

export const getSoup = () => {
    return (dispatch) => {
        axios('https://yabao.vercel.app/api/soup')
            .then(({data}) => {
                return dispatch({type:'GETSOUP', arr : data})
            })
    }
}