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