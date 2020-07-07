export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE'
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE'
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY'
export const ACTION_SET_CITY_DATE = 'SET_CITY_DATE'
export const ACTION_SET_IS_LOADING_CITY_DATE = 'SET_IS_LOADING_CITY_DATE'
export const ACTION_SET_HIGHT_SPEED = 'SET_HIGHT_SPEED'

//初始出发车站
export const setFrom = (from) => ({
    type: ACTION_SET_FROM,
    payload: from
})
//初始目的车站
export const setTo = (to) => ({
    type: ACTION_SET_TO,
    payload: to
})
//日期选择
export const setIsDataSelector = (isDataSelector) => ({
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: isDataSelector
})
//显示选择日期表单
export const showCityDate = () => ({
    type: ACTION_SET_CITY_DATE,
    payload: true
})
//隐藏选择日期表单
export const hideCityDate = () => ({
    type: ACTION_SET_CITY_DATE,
    payload: false
})
//是否正在加载城市日期
export const setIsLoading = (isLoading) => ({
    type: ACTION_SET_IS_LOADING_CITY_DATE,
    payload: isLoading
})
//切换车次选择状态
export const toggleHightSpeed = () => {
    return (dispatch, getState) => {
        const { heighSpeed } = getState()
        dispatch({
            type: ACTION_SET_HIGHT_SPEED,
            payload: !heighSpeed
        })
    }
}
//显示城市选择状态
export const showCitySelector = (isCitySelectorVisible) => {
    return (dispatch) => {
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true
        })
        dispatch({
            type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: isCitySelectorVisible
        })
    }
}
//隐藏城市选择状态
export const hideCitySelector = () => ({
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
})
//城市选择
export const setCitySelected = (city) => {
    return (dispatch, getState) => {
        const { isCitySelectorVisible } = getState()
        if (isCitySelectorVisible) {
            dispatch(setFrom(city))
        } else {
            dispatch(setTo(city))
        }
    }
}
//交换出发地和目的地
export const exchangeFromTo = () => {
    return (dispatch, getState) => {
        const { from, to } = getState()
        dispatch(setFrom(to))
        dispatch(setTo(from))
    }
}