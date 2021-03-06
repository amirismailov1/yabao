import axios from "axios";


const initialState = {
    sous: [],
    count: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GETSOUS' : {
            return {
                ...state,
                sous: action.arr,
                count: action.arr.length
            }
        }
        default : return state
    }
}

export const getSous = () => {
    return (dispatch) => {
        axios('http://localhost:8080/sous')
            .then(({data}) => {
                return dispatch({type:'GETSOUS', arr : data})
            })
    }
}