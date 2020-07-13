import React from 'react'
import { SwapOutlined } from '@ant-design/icons'
import './journey.less'

export default function Journey(props) {
    const { from, to, exchangeFromTo, showCitySelector } = props
    return (
            <div className={'journey-wrapper'}>
                <form className={'journey-station'}>
                    <input
                        type='text'
                        name='form'
                        readOnly
                        className={'station right'}
                        value={from}
                        onClick={() => showCitySelector(true)}
                    ></input>
                    <SwapOutlined
                        style={{outline: 'none'}}
                        onClick={exchangeFromTo}
                        className={'journey-switch'} />
                    <input
                        type='text'
                        name='form'
                        readOnly
                        className={'station left'}
                        value={to}
                        onClick={() => showCitySelector(true)}
                        // onClick={() => console.log(123)}
                    ></input>
                </form>
            </div>
    )
}