import axios from "axios";


const initialState = {
    sushi: [],
    count: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GETSUSHI' : {
            return {
                ...state,
                sushi: action.arr,
                count: action.arr.length
            }
        }
        default : return state
    }
}

export const getSushi = () => {
    return (dispatch) => {
        axios('http://localhost:8080/sushi')
            .then(({data}) => {
                return dispatch({type:'GETSUSHI', arr : data})
            })
    }
}