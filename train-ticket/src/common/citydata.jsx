import React, { useState, useMemo, useEffect, memo } from 'react'
import { LeftOutlined, CloseCircleOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './citydata.less'

function HotItem(props) {
    const {
        name
    } = props
    return (
        <button className={'btn'}>{name}</button>
    )
}
function HotSection(props) {
    const {
        hotCities
    } = props
    return (
        <div className={'city-hot-item'}>
            {hotCities.map(item => {
                return (
                    <HotItem
                        key={item.name}
                        name={item.name}
                    ></HotItem>
                )
            })}
        </div>
    )
}
function CityItem(props) {
    const {
        name
    } = props
    console.log(name)
    return (
        <li className={'city-item'}>{name}</li>
    )
}
function CitySection(props) {
    const {
        cityList = [],
        title
    } = props
    return (
        <ul className={'city-list'}>
            <li className={'city-title'}>{title}</li>
            {cityList.map(city => {
                return <CityItem 
                    key={city.name}
                    name={city.name}
                />
            })}
        </ul>
    )
}
function CityWrapper(props) {
    const {
        cityList
    } = props
    return (
        <div className={'city-section-wrapper'}>
            {
                cityList.map(citySeries => {
                    return <CitySection
                        key={citySeries.title}
                        cityList={citySeries.citys}
                        title={citySeries.title}
                    />
                })
            }
        </div>
    )
}

export default function CityData(props) {
    const {
        show,
        isLoading,
        cityData,
        showCitySelector,
        fetchCityData
    } = props
    let city, hotCity, cityList
    if (cityData) {
        cityList = cityData.cityList
        hotCity = cityData.hotCities
    }
    const [searchKey, setSearchKey] = useState('')
    const key = useMemo(() => searchKey.trim(), [searchKey])
    useEffect(() => {
        if (!show) {
            return
        }
        fetchCityData()
    }, [show])

    const outputHotCity = () => {
        if (hotCity && show) {
            return <HotSection hotCities={hotCity} />
        } else {
            return <div>isLoading</div>
        }
    }
    const outputCityList = () => {
        if (cityList && show) {
            return <CityWrapper cityList={cityList} />
        } else {
            return <div>isLoading</div>
        }
    }
    return (
        <div>
            <div className={classnames('city-selector-wrapper', { hidden: !show })}>
                <div className={'city-search'}>
                    <LeftOutlined
                        className={'city-back'}
                        onClick={() => showCitySelector(false)}
                    />
                    <form className={'city-search-form'}>
                        <input
                            type='text'
                            placeholder={'城市、车站的中文或拼音'}
                            className={'city-search-input'}
                            onChange={(e) => setSearchKey(e.target.value)}
                            value={searchKey}
                        ></input>
                        <SearchOutlined className={'search-icon'} />
                        <CloseCircleOutlined
                            className={classnames('search-clean', { hidden: !key.length })}
                            onClick={() => setSearchKey('')}
                        />
                    </form>
                </div>
                <div className={'city-location'}>
                    <p className={'location-history'}>定位/历史</p>
                    <button className={'btn btn-location'}><EnvironmentOutlined className={'local-position'} />定位</button>
                    <button className={'btn btn-default'}>北京</button>
                    <p className={'city-hot'}>热门</p>
                    {outputHotCity()}
                </div>
                {outputCityList()}
                {/* <div className={'city-section-wrapper'}>
                    <div className={'city-section'}>
                        <li className={'city-title'}>A</li>
                        <ul className={'city-list'}>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                        </ul>
                    </div>
                    <div className={'city-section'}>
                        <p className={'city-title'}>A</p>
                        <ul className={'city-list'}>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                        </ul>
                    </div>
                    <div className={'city-section'}>
                        <p className={'city-title'}>A</p>
                        <ul className={'city-list'}>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                            <li className={'city-item'}>长沙</li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

CityData.propTypes = {
    citiData: PropTypes.object,
    fetchCityData: PropTypes.func.isRequired,
    showCitySelector: PropTypes.func.isRequired,
}