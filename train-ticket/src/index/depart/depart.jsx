import React, { memo} from 'react'
import './depart.less'

const Depart = memo((props) =>  {
    const {
        selectDateDepart,
        dateDepart,
        isToday
    } = props
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const dayTip = currentMonth ===dateDepart.monthIndex ? isToday[dateDepart.day - currentDate]: ''
    return (
        <div>
            <div className={'date-wrapper'}>
                <div className={'date-depart'} onClick={() => selectDateDepart(true)}>
                    <span className={'depart-month'}>{dateDepart.monthIndex + 1}月</span>
                    <span className={'depart-day'}>{dateDepart.day}号</span>
                    <span className={'depart-tip'}>{dayTip}</span>
                </div>
            </div>
        </div>
    )
})
export default Depart