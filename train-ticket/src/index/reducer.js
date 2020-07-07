import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
    ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    ACTION_SET_CITY_DATE,
    ACTION_SET_IS_LOADING_CITY_DATE,
    ACTION_SET_HIGHT_SPEED
} from './action'
const defaultState = {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    isDateSelectorVisible: false,
    currentSelectingLeftCity: false,
    cityDate: null,
    isLoadingCityDate: false,
    hightSpeed: false
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_FROM:
            return action.payload;
        case ACTION_SET_TO:
            return action.payload;
        case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
            return action.payload;
        case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
            return action.payload;
        case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
            return action.payload;
        case ACTION_SET_CITY_DATE:
            return action.payload;
        case ACTION_SET_IS_LOADING_CITY_DATE:
            return action.payload;
        case ACTION_SET_HIGHT_SPEED:
            return action.payload;
        default:
            return state
    }
}