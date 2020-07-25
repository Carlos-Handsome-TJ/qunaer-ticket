import React, { useMemo, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../common/header'
import Journey from './journey/journey'
import CityData from '../common/citydata'
import { exchangeFromTo, showCitySelector, fetchCityData } from './store/action'

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        isLoadingCityDate,
        cityData,
        dispatch,
    } = props
    const onBack = useCallback(() => {
        window.history.back(-1)
    }, [])
    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
            fetchCityData
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