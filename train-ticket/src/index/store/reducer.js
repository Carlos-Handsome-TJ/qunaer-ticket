import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
    ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    ACTION_GET_CITY_DATA,
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
    cityDate: null,
    isDateSelectorVisible: false,
    currentSelectingLeftCity: false,
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
            newState.cityDate = action.payload
            return newState
        default:
            return state
    }
}