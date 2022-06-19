import axios from "axios";



const initialState = {
    user: {
        login : '',
        email: '',
        tel: '',
        street:''
    }
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'ENTER' : {
            return {
                ...state,
                user : {...action.user}
            }
        }
        case 'LOGOUT' : {
            return  {
                ...state,
                user: {
                    login : '',
                    email: '',
                    phone: ''
                }
            }
        }
        case 'LOCAL' : {
            return {
                ...state,
                user : {...action.user}
            }
        }

        default : return state
    }
}

export const registerAccount = (obj, navigate) => {
    return (dispatch) => {
        axios.post('http://localhost:8080/register', obj)
            .then(({data}) => {
                navigate('/');
                localStorage.setItem('user', JSON.stringify(data.user))
                return dispatch({type: 'ENTER', user: data.user })

            })
            .catch((err) => console.log('не получилось'))
    }
};
export const loginAccount = (obj,navigate) =>{
    return (dispatch) => {
        axios.post('http://localhost:8080/login', obj)
            .then(({data}) => {
                navigate('/account');
                localStorage.setItem('user', JSON.stringify(data.user));
                return dispatch({type: 'ENTER', user: data.user })

            })
            .catch((err) => console.log('Проверьте правильность введённых данных'))
    }
};
export const getLocalStorage = () => {
    return (dispatch) => {
        return dispatch({type: 'LOCAL', user: JSON.parse(localStorage.getItem('user'))})
    }
};
export const logOut = () => {
    return (dispatch) => {
        localStorage.removeItem('user');
        return dispatch({type: 'LOGOUT'})
    }
};
export const changeAccount = (data,user) =>{
    return (dispatch) =>{
        axios.patch(`http://localhost:8080/users/${user.id}`,data)
            .then((res)=>{
                localStorage.setItem('user',JSON.stringify((res.data)));
                return dispatch({type: 'ENTER', user: res.data })
            })
    }

};


