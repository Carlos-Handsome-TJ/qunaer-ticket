import React, { useMemo, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../common/header'
import Journey from './journey/journey'
import CityData from '../common/citydata'
import {
    exchangeFromTo,
    showCitySelectorLeft,
    showCitySelectorRight,
    fetchCityData,
    getLocation,
    selectCity,
    showCityAlpha
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
        cityAlpha
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
    return (
        <div>
            <Header title={'火车票'} onBack={onBack} />
            <Journey
                from={from}
                to={to}
                {...cbs}
            />
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