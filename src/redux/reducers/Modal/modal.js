import axios from "axios";


const initialState = {
    product : {
        id: 1,
        title: '',
        image: '',
        price: '',
        composition: ''
    },
    open: false

}

export default (state = initialState, action) => {
    switch (action.type){
        case 'OPEN' : {
            return {
                ...state,
                open:true,
                product: action.obj
            }
        }
        case 'CLOSE':{
            return {
                ...state,
                open:false
            }
        }
        default : return state
    }
}

export const open  = (obj) => {
    return (dispatch) => {
        return dispatch({type:'OPEN',obj})
            }
    };

export const close = () =>{
    return (dispatch) => {
        return dispatch({type:'CLOSE'})
    }
};
