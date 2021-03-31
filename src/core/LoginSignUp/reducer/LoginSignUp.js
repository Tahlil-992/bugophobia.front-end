<<<<<<< HEAD
import {LoginSignUpActionType} from "../action/LoginSignUpActionType"
const initialstate = { test : "Undefined"}
const Todo = (state = initialstate, { type, payload }) => {
  switch (type) {
   
    case LoginSignUpActionType.test:
        return{
          ...state, 
          test : "1"
        };
      
  default : return state;

  }
}
export default Todo;
=======
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
>>>>>>> 121aa22959cb9d0fbcfc042c88de6f596ec52985
