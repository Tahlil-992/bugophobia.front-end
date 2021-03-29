import {ActionTypes} from "../action/actionTypes"
const initialstate = { test : "Undefined"}
export default (state = initialstate, { type, payload }) => {
    switch (type) {
     
      case ActionTypes.test:
          return{
            ...state, 
            test : "1"
          };
        
    default : return state;

    }
}