import { combineReducers } from "redux";
import { reducer as firebase } from "react-redux-firebase";
import { firestoreReducer as firestore } from 'redux-firestore' // <- needed if using firestore
import visibilityFilter from "./filter";


const rootReducer = combineReducers({
    firebase,
    firestore,
    visibilityFilter
});

export default rootReducer;
