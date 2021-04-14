import {ActionTypes} from "./actionTypes"

export function setIsDoctor(state){
    return {
        type : ActionTypes.SET_ISDOCTOR,
        payload: { isdoctor: state },
    };
}