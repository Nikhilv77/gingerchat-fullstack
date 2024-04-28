import { applyMiddleware,compose,legacy_createStore as createStore } from "redux";
import reducers from "../Reducers/Index";
import {thunk} from 'redux-thunk'

const setInLocalStorage = (store)=>{
try {
  localStorage.setItem('store',JSON.stringify(store));
} catch (error) {
  console.log(error);
}
}
const loadFromLocalStorage = ()=>{
 try {
 const localStore = localStorage.getItem('store');
 if(localStore === null){
  return undefined
 }else{
  return JSON.parse(localStore)
 }

 } catch (error) {
  console.log(error);
  return undefined
 }
}
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const persistedStore = loadFromLocalStorage();
const store = createStore(reducers,persistedStore,composeEnhancers(applyMiddleware(thunk)))
store.subscribe(()=>setInLocalStorage(store.getState()))

export default store