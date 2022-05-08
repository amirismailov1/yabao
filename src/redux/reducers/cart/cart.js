
const initialState = {
    cart : [],

    open: false

}

export default (state = initialState, action) => {
    switch (action.type){
        case 'OPENCART' : {
            return {
                ...state,
                open:true,

            }
        }
        case 'CLOSECART':{
            return {
                ...state,
                open:false
            }
        }
        case "ADDCARD":{
            return {
                ...state,
                cart:  state.cart.findIndex((item)=>item.title === action.obj.title) > -1 ?
                    state.cart.map((item)=> item.title === action.obj.title ? {...item,count:item.count+1}: item) :
                    [...state.cart, {...action.obj, count:1}]
            }
        }
        case 'DELCARD' :{
            return {
                ...state,

                cart:state.cart.filter((item)=>  item.title!== action.title)
            }
        }
        case 'REMOVECARD' :{

            return {
                ...state,
                cart: state.cart.filter(item=> item.title === action.title)[0].count > 1 ?
                    state.cart.map(item=>item.title === action.title ? {...item,count:item.count-1}: item):
                    state.cart.filter((item)=>  item.title!== action.title)

            }

        }
        case "CARTLOCAL" : {
            return {
                ...state,
                cart:action.cart
            }
        }

        case 'CLEAR' :{
            return {
                ...state,
                cart:[]
            }
        }
        default : return state
    }
}
export const openCart  = (obj) => {
    return (dispatch) => {
        return dispatch({type:'OPENCART',obj})
    }
}

export const closeCart = () =>{
    return (dispatch) => {
        return dispatch({type:'CLOSECART'})
    }
}

export const addCard = (obj) =>{

    return (dispatch) =>{
        return dispatch({type:'ADDCARD',obj})
    }
}
export const deleteCard = (title) =>{

    return (dispatch) =>{
        return dispatch({type:'DELCARD',title})
    }
}
export const removeCard = (title) => {

    return (dispatch) => {
        return dispatch({type:'REMOVECARD',title})
    }
}
export const getCartLocalStorage = () =>{
    return (dispatch) =>{
        return dispatch({type:'CARTLOCAL',cart:JSON.parse(localStorage.getItem('cart'))})
    }
}
export const clearCart = () =>{
    return (dispatch) =>{
        return dispatch({type:'CLEAR'})
    }
}


