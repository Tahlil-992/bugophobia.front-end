import { ActionTypes } from "../action/actionTypes";
const initialstate = {
  isdoctor: false,
}
export default (state = initialstate, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ISDOCTOR:
      return {
        ...state,
        isdoctor: payload.isdoctor,
      };
    default: return state;
  }
}