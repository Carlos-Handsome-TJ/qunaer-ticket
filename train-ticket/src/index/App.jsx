import React, { useMemo, useCallback } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Header from "../common/header";
import Journey from "./journey/journey";
import CityData from "../common/citydata";
import DateSelector from "../common/date";
import SearchButton from "../common/button";
import Depart from "./depart/depart";
import './App.less'
import {
  exchangeFromTo,
  showCitySelectorLeft,
  showCitySelectorRight,
  fetchCityData,
  getLocation,
  selectCity,
  showCityAlpha,
  selectDateDepart,
  chooseDepartDate,
} from "./store/action";

function App() {
  const dispatch = useDispatch();
  const props = useSelector((state) => state);
  const {
    from,
    to,
    isCitySelectorVisible,
    isLoadingCityDate,
    cityData,
    currentLocation,
    historyCities,
    cityAlpha,
    isDateSelectorVisible,
    dateDepart,
    isToday,
  } = props;
  const onBack = useCallback(() => {
    window.history.back(-1);
  }, []);
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelectorLeft,
        showCitySelectorRight,
        fetchCityData,
        getLocation,
        selectCity,
        showCityAlpha,
      },
      dispatch
    );
  }, []);
  const setDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        selectDateDepart,
        chooseDepartDate,
      },
      dispatch
    );
  }, []);
  return (
    <div>
      <Header title={"火车票"} onBack={onBack} />
      <form encType={"multipart/form-data"} action={"../../public/query.html"} className={'app-form'}>
        <Journey from={from} to={to} {...cbs}></Journey>
        <Depart dateDepart={dateDepart} isToday={isToday} {...setDateCbs} />
        <SearchButton />
      </form>
      <DateSelector
        isDateSelectorVisible={isDateSelectorVisible}
        {...setDateCbs}
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
  );
}

export default App;
