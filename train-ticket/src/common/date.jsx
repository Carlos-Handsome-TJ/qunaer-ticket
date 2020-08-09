import React, { memo } from 'react'
import { LeftOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import './date.less'

const DaySection = (props) => {
    const {
        day,
        months
    } = props
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    const currentDate = now.getDate()
    const currentMonth = now.getMonth()
    const dayStyles = []
    const month = new Date(months).getMonth()
    //日期小于当前日期的，添加灰色不可点击样式
    if (day < currentDate && currentMonth === month) {
        dayStyles.unshift('day-disable')
    }
    //周末日期添加橙色字体样式：
    const dayIndex = new Date(new Date(months).setDate(day)).getDay()
    if (dayIndex % 7 === 0 || dayIndex % 7 === 6) {
        dayStyles.unshift('day-weekend')
    }
    return (
        <td className={classnames(dayStyles)}>
            {day}
        </td>
    )
}
const WeekSection = (props) => {
    const {
        week,
        months
    } = props
    return (
        <tr className={'date-day'}>
            {
                week.map((day, index) => {
                    return <DaySection
                        key={index}
                        day={day}
                        months={months}
                    />
                })
            }
        </tr>
    )
}
const MonthSection = (props) => {
    const {
        months
    } = props
    const year = new Date(months).getFullYear()
    const month = new Date(months).getMonth()
    //获取这个月1号的星期：
    const currentMonthWeekday = new Date(months).getDay()
    //获取当月的总天数：
    const currentMonthAllDays = new Date(year, month + 1, 0).getDate()
    let currentMonthAllDaysArr = []
    for (let i = 1; i <= currentMonthAllDays; i++) {
        currentMonthAllDaysArr.push(i)
    }
    //判断当月第一天的星期，根据返回的0~6数字，插入对应的空元素：
    currentMonthAllDaysArr = currentMonthWeekday ? Array.prototype.concat.apply((new Array(currentMonthWeekday).fill(null)), currentMonthAllDaysArr) : currentMonthAllDaysArr
    let weeks = []
    for (let row = 0; row < Math.ceil(currentMonthAllDaysArr.length / 7); row++) {
        const week = currentMonthAllDaysArr.slice(row * 7, (row + 1) * 7)
        weeks.push(week)
    }
    return (
        <table className={'date-table'}>
            <thead className={'date-header'}>
                <tr>
                    <th>{year}年{month + 1}月</th>
                </tr>
            </thead>
            <tbody>
                {
                    weeks.map((week, index) => {
                        return <WeekSection
                            key={index}
                            week={week}
                            months={months}
                        />
                    })
                }
            </tbody>
        </table>
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
    now.setDate(1)
    //保存当月时间
    const monthSequence = [now.getTime()]
    now.setMonth(now.getMonth() + 1)
    //保存下个月时间
    monthSequence.push(now.getTime())
    now.setMonth(now.getMonth() + 1)
    //保存下下个月时间:
    monthSequence.push(now.getTime())

    const weekday = ['日', '一', '二', '三', '四', '五', '六']
    return (
        <div>
            <div className={classnames('date-choose-wrapper', { showDateSelector: isDateSelectorVisible })}>
                <div className={'date-choose-nav'}>
                    <LeftOutlined
                        className={'date-choose-arrow'}
                        onClick={() => selectDateDepart(false)}
                    />
                    <h3>日期选择</h3>
                    <div className={'data-weekday'}>
                        {weekday.map(day => {
                            return <span key={day}>{day}</span>
                        })}
                    </div>
                </div>
                <div className={'date-month-section'}>
                    {monthSequence.map(month => {
                        return <MonthSection
                            key={month}
                            months={month}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}
export default DateSelector