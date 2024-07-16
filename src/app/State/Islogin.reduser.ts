
import {createReducer, on} from "@ngrx/store"
import { derement, increment, reset } from "./Counter.action";
import { state } from "@angular/animations";
 
export interface IsloginState{
    islogin:boolean;
}

export  const initiaCounterState : IsloginState ={
    islogin:false
}

export const counterReducer = createReducer(
    initiaCounterState,
    on(increment,state=>({...state,count:state.count +1})),
    on(derement,state=>({...state,count:state.count - 1})),
    on(reset,state=>({...state,count:0}))
)