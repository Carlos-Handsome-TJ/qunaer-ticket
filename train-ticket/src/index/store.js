import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

export default createStore(combineReducers(reducer), {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    isDateSelectorVisible: false,
    currentSelectingLeftCity: false,
    cityDate: null,
    isLoadingCityDate: false,
    hightSpeed: false
}, applyMiddleware(thunk))