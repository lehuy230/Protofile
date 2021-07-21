import produce from "immer";
import { actionTypes } from "../actions/UserActions";

let initialState = {
    user:null,
}
const successGetUser = (draft, data)=>{
    draft.user = data
}
const reducer = (state = initialState, action)=>{
    return produce(state, draft=>{
        // eslint-disable-next-line default-case
        switch(action.type){
            case actionTypes.GET_USER_SUCCESS:
                successGetUser(draft,action.payload.data);
                break;
        }
    })
}
export default reducer;