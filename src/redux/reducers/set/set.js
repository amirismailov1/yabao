import axios from "axios";


const initialState = {
    set: [],
    count: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GETSET' : {
            return {
                ...state,
                set: action.arr,
                count: action.arr.length
            }
        }
        default : return state
    }
}

export const getSet = () => {
    return (dispatch) => {
        axios('https://yabao.vercel.app/api/set')
            .then(({data}) => {
                return dispatch({type:'GETSET', arr : data})
            })
    }
}