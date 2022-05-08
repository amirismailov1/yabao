import {combineReducers} from "redux";
import drinks from "./drinks/drinks";
import set from "./set/set";
import snacks from "./snacks/snacks";
import sous from "./sous/sous";
import soup from "./soup/soup";
import sushi from "./sushi/sushi";
import user from "./user/user";
import cart from "./cart/cart";


const rootReducer = () =>{
return combineReducers({
drinks,
    set,
snacks,
    soup,
    sous,
    sushi,
    user,
    cart
})
};

export default rootReducer