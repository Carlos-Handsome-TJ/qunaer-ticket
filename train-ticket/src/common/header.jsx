import React from 'react'
import './header.less'
import { LeftOutlined } from '@ant-design/icons'


export default function Header(props) {
    const { onBack, title } = props
    return (
        <div>
            <div className={'header-wrapper'}>
                <div className={'header-nav'}>
                    <LeftOutlined
                        className={'header-arrow'}
                        title={title}
                        onClick={() => onBack}
                    />
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    )
}