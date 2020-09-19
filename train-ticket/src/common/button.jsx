import React from 'react'
import './button.less'

export default function SearchButton() {
    return (
        <div>
            <div>
            <span>只看高铁动车</span>
                <input
                    type='checkbox'
                    name='highSpeed'
                >
                </input>
                <span>学生票</span>
                <input
                    type='checkbox'
                    name='studentTicket'
                >
                </input>
                <button
                    type='submit'
                    className={'search-button'}
                >搜索</button>
            </div>
        </div>
    )
}