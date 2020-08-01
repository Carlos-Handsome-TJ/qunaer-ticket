import React, { useState, useMemo, useEffect, memo, useCallback } from 'react'
import { LeftOutlined, CloseCircleOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './citydata.less'

const HotItem = memo((props) => {
    const {
        name
    } = props
    return (
        <button className={'btn'}>{name}</button>
    )
})
HotItem.propTypes = {
    name: PropTypes.string.isRequired
}
const HotSection = memo((props) => {
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
})
HotSection.propTypes = {
    hotCities: PropTypes.array.isRequired
}
const CityItem = memo((props) => {
    const {
        name
    } = props
    return (
        <li className={'city-item'}>{name}</li>
    )
})
CityItem.propTypes = {
    name: PropTypes.string.isRequired
}
const CitySection = memo((props) => {
    const {
        cityList = [],
        title
    } = props
    return (
        <ul className={'city-list'} data-cate={title}>
            <li className={'city-title'}>{title}</li>
            {cityList.map(city => {
                return <CityItem
                    key={city.name}
                    name={city.name}
                />
            })}
        </ul>
    )
})
CitySection.propTypes = {
    cityList: PropTypes.array,
    title: PropTypes.string.isRequired
}
const CityWrapper = memo((props) => {
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
})
CityWrapper.propTypes = {
    cityList: PropTypes.array.isRequired
}
const AlphaIndex = memo((props) => {
    const {
        alpha,
        scrollToAlpha
    } = props
    return (
        <div className={'alpha-item'} onClick={() => scrollToAlpha(alpha)}>{alpha}</div>
    )
})
AlphaIndex.propTypes = {
    alpha: PropTypes.string.isRequired,
    scrollToAlpha: PropTypes.func.isRequired
}

const Alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index)
})
const CityData = memo((props) => {
    const {
        show,
        cityData,
        showCitySelector,
        fetchCityData
    } = props
    let hotCity, cityList
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
    const scrollToAlpha = useCallback((alpha) => {
        document.querySelector(`[data-cate='${alpha}']`)
            .scrollIntoView()
    }, [])
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
                    <p className={'location-history'} data-cate={'history'}>定位/历史</p>
                    <button className={'btn btn-location'}><EnvironmentOutlined className={'local-position'} />定位</button>
                    <button className={'btn btn-default'}>北京</button>
                    <p className={'city-hot'} data-cate={'hot'}>热门</p>
                    {outputHotCity()}
                </div>
                {outputCityList()}
                <div className={'alpha-list'}>
                    <div onClick={() => scrollToAlpha('history')}>历史</div>
                    <div onClick={() => scrollToAlpha('hot')}>热门</div>
                    {Alphabet.map(alpha => {
                        return <AlphaIndex
                            key={alpha}
                            alpha={alpha}
                            scrollToAlpha={scrollToAlpha}
                        />
                    })}
                </div>
            </div>
        </div>
    )
})

CityData.propTypes = {
    citiData: PropTypes.object,
    fetchCityData: PropTypes.func.isRequired,
    showCitySelector: PropTypes.func.isRequired,
}

export default CityData