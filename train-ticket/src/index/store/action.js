export const ACTION_SET_FROM = 'set_from'
export const ACTION_SET_TO = 'set_to'
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'set_is_city_selector_visible'
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'set_is_date_selector_visible'
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'set_current_selecting_left_city'
export const ACTION_GET_CITY_DATA = 'get_city_data'
export const ACTION_SET_IS_LOADING_CITY_DATE = 'set_is_loading_city_date'
export const ACTION_SET_HIGHT_SPEED = 'set_hight_speed'
export const ACTION_SET_GET_LOCATION_CITY = 'action_set_get_location_city'
export const ACTION_SET_SELECTED_CITY = 'action_set_selected_city'
export const ACTION_SET_CITY_ALPHA = 'action_set_city_alpha'
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
//交换出发地和目的地
export const exchangeFromTo = () => {
    return (dispatch, getState) => {
        const { from, to } = getState()
        dispatch(setFrom(to))
        dispatch(setTo(from))
    }
}
//显示城市选择列表：
export const showCityDate = (payload) => ({
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload
})
export const getCityData = (payload) => ({
    type: ACTION_GET_CITY_DATA,
    payload,
})
//获取mock端返回的数据：
export const fetchCityData = () => {
    return (dispatch) => {
        const cityData = JSON.parse(localStorage.getItem('select_city_list') || '{}')
        if (cityData && Date.now() < cityData.expires) {
            dispatch(getCityData(cityData.city))
            return
        }
        fetch('city')
            .then(res => res.json())
            .then(cityData => {
                localStorage.setItem('select_city_list', JSON.stringify({
                    expires: Date.now() + 1 * 24 * 60 * 60 * 1000, //数据默认存储一天
                    city: cityData
                }))
                dispatch(getCityData(cityData))
            })
            .catch(err => console.error(err))
    }
}
export const leftStateSelected = (payload) => ({
    type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    payload
})
export const setLocationCity = (payload) => ({
    type: ACTION_SET_GET_LOCATION_CITY,
    payload
})
//获取当前用户网络定位：
export const getLocation = () => {
    return (dispatch, getState) => {
        const { currentLocation, historyCities, currentSelectingLeftCity } = getState()
        fetch("http://restapi.amap.com/v3/ip?key=fd580c21a8490716d0e56747100a2994")
            .then((res) => {
                if (res.ok) {
                    res.text().then((data) => {
                        const detail = JSON.parse(data)
                        const city = detail.city.split('').splice(0, detail.city.split('').length - 1).join('') //这里代码写的有点丑陋
                        dispatch(setLocationCity(city))
                        if (currentLocation !== '定位') {
                            currentSelectingLeftCity ? dispatch(setFrom(city)) : dispatch(setTo(city))
                            dispatch(leftStateSelected(false))
                            dispatch(hideCitySelector(false))
                        }
                        if (historyCities.indexOf(city) === -1) {
                            historyCities.unshift(city)
                        }
                    })
                }
            }).catch((res) => {
                console.log(res.status);
            });
    }
}
//选择城市回填至起始站和终点站：
export const selectCity = (city) => {
    return (dispatch, getState) => {
        const { currentSelectingLeftCity, historyCities } = getState()
        if (historyCities.indexOf(city) === -1) {
            historyCities.unshift(city)
        }
        if (currentSelectingLeftCity) {
            dispatch(setFrom(city))
            dispatch(leftStateSelected(false))
            dispatch(hideCitySelector(false))
        } else {
            dispatch(setTo(city))
            dispatch(leftStateSelected(false))
            dispatch(hideCitySelector(false))
        }
    }
}
//城市首字母提示框内容显示:
export const setCityAlpha = (payload) => ({
    type: ACTION_SET_CITY_ALPHA,
    payload
})
export const showCityAlpha = (alpha) => {
    document.querySelector(`[data-cate='${alpha}']`)
    .scrollIntoView()
    return dispatch => {
        dispatch(setCityAlpha(alpha))
    }
}
//日期选择
export const setIsDataSelector = (isDataSelector) => ({
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: isDataSelector
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
export const showCitySelectorLeft = (isCitySelectorVisible) => {
    return (dispatch) => {
        dispatch(hideCitySelector(isCitySelectorVisible))
        dispatch(leftStateSelected(true))
    }
}
export const showCitySelectorRight = (isCitySelectorVisible) => {
    return (dispatch) => {
        dispatch(hideCitySelector(isCitySelectorVisible))
        dispatch(leftStateSelected(false))
    }
}
//隐藏城市选择状态
export const hideCitySelector = (payload) => ({
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload
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
