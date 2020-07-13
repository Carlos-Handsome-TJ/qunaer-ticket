import React, { useState, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { LeftOutlined, CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import './citydata.less'

export default function CityData(props) {
    const {
        show,
        isLoading,
        data,
        showCitySelector,
        fetchCityData
    } = props
    const [searchKey, setSearchKey] = useState('')
    const key = useMemo(() => searchKey.trim(), [searchKey])
    useEffect(() => {
        if (!show) {
            return
        }
        fetchCityData()
    }, [show])
    return (
        <div>
            <div className={classnames('city-selector-wrapper', { hidden: !show})}>
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
                        <SearchOutlined className={'search-icon'}/>
                        <CloseCircleOutlined 
                            className={classnames('search-clean', {hidden: !key.length})}
                            onClick={() => setSearchKey('')}
                            />
                    </form>
                </div>
            </div>
        </div>
    )
}