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

        default : return state
    }
}

export const registerAccount = (obj, navigate) => {
    return (dispatch) => {
        axios.post('http://localhost:8080/register', obj)
            .then(({data}) => {
                navigate('/')
                return dispatch({type: 'ENTER', user: data.user })

            })
            .catch((err) => console.log('не получилось'))
    }
}



