import React, { memo } from 'react'
import { LeftOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import './date.less'

const MonthSection = (props) => {
    const {

    } = props
    return (
        <div></div>
    )
}

const DateSelector = (props) => {
    const {
        isDateSelectorVisible,
        selectDateDepart
    } = props
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    //保存当月时间
    const monthSequence = [now.getTime()]
    now.setMonth(now.getMonth() + 1)
    //保存下个月时间
    monthSequence.push(now.getTime())
    now.setMonth(now.getMonth() + 1)
    //保存下下个月时间:
    monthSequence.push(now.getTime())
    console.log(monthSequence)

    const weekday = ['日', '一', '二', '三', '四', '五', '六']
    return (
        <div>
            <div className={classnames('date-choose-wrapper', { showDateSelector: !isDateSelectorVisible })}>
                <div className={'date-choose-nav'}>
                    <LeftOutlined
                        className={'date-choose--arrow'}
                        onClick={() => selectDateDepart(false)}
                    />
                    <h3>日期选择</h3>
                    <div className={'data-weekday'}>
                        {weekday.map(day => {
                            return <span key={day}>{day}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DateSelector