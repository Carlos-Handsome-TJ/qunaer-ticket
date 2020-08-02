import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
    ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    ACTION_GET_CITY_DATA,
    ACTION_SET_GET_LOCATION_CITY,
    ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    ACTION_SET_IS_LOADING_CITY_DATE,
    ACTION_SET_HIGHT_SPEED
} from './action'
const defaultState = {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    isLoadingCityDate: false,
    cityData: null,
    isDateSelectorVisible: false,
    currentLocation: '定位',
    currentSelectingLeftCity: false,
    historyCities: [],
    hightSpeed: false
}
export default (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case ACTION_SET_FROM:
            newState = Object.assign({}, state)
            newState.from = action.payload
            return newState
        case ACTION_SET_TO:
            newState = Object.assign({}, state)
            newState.to = action.payload
            return newState
        case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
            newState = Object.assign({}, state)
            newState.isCitySelectorVisible = action.payload
            return newState
        case ACTION_GET_CITY_DATA:
            newState = Object.assign({}, state)
            newState.cityData = action.payload
            return newState
        case ACTION_SET_GET_LOCATION_CITY:
            newState = Object.assign({}, state)
            newState.currentLocation = action.payload
            return newState
        case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
            newState = Object.assign({}, state)
            newState.currentSelectingLeftCity = action.payload
            return newState
        default:
            return state
    }
}