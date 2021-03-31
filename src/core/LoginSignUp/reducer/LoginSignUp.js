import {test} from "../action/LoginSignUpAction"
const initialstate = { test : "Undefined"}
const Todo = (state = initialstate, { type, payload }) => {
  switch (type) {
   
    case test().type:
        return{
          ...state, 
          test : "1"
        };
      
  default : return state;

  }
}
export default Todo;