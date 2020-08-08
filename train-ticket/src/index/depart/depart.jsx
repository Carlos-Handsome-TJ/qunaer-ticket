import React, { memo} from 'react'
import './depart.less'

const Depart = memo((props) =>  {
    const {
        selectDateDepart
    } = props
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    const month = now.getMonth()
    const day = now.getDate()
    return (
        <div>
            <div className={'date-wrapper'}>
                <div className={'date-depart'} onClick={() => selectDateDepart(true)}>
                    <span className={'depart-month'}>{month + 1}月</span>
                    <span className={'depart-day'}>{day}号</span>
                    <span className={'depart-tip'}>(今天)</span>
                </div>
            </div>
        </div>
    )
})
export default Depart