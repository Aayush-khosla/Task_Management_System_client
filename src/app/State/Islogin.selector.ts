// import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { state } from "@angular/animations";

export const selectCounterState=(state:AppState)=>state.counter


export const selectCount =createSelector(
    selectCounterState,(state )=>state.count
)