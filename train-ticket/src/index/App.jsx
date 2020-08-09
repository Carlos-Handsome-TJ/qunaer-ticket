import React, { useMemo, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../common/header'
import Journey from './journey/journey'
import CityData from '../common/citydata'
import DateSelector from '../common/date'
import Depart from './depart/depart'
import {
    exchangeFromTo,
    showCitySelectorLeft,
    showCitySelectorRight,
    fetchCityData,
    getLocation,
    selectCity,
    showCityAlpha,
    selectDateDepart,
    chooseDepartDate
} from './store/action'

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        isLoadingCityDate,
        cityData,
        dispatch,
        currentLocation,
        historyCities,
        cityAlpha,
        isDateSelectorVisible,
        dateDepart,
        isToday
    } = props
    const onBack = useCallback(() => {
        window.history.back(-1)
    }, [])
    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelectorLeft,
            showCitySelectorRight,
            fetchCityData,
            getLocation,
            selectCity,
            showCityAlpha
        }, dispatch)
    }, [])
    const setDateCbs = useMemo(() => {
        return bindActionCreators({
            selectDateDepart,
            chooseDepartDate
        }, dispatch)
    }, [])
    return (
        <div>
            <Header title={'火车票'} onBack={onBack} />
            <form>
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <Depart
                    dateDepart={dateDepart}
                    isToday={isToday}
                    {...setDateCbs}
                />
                <DateSelector
                    isDateSelectorVisible={isDateSelectorVisible}
                    {...setDateCbs}
                />
            </form>
            <CityData
                show={isCitySelectorVisible}
                isLoading={isLoadingCityDate}
                cityData={cityData}
                currentLocation={currentLocation}
                historyCities={historyCities}
                cityAlpha={cityAlpha}
                {...cbs}
            />
        </div>
    )
}
const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)