import React, { memo } from 'react'
import { LeftOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import './date.less'

const DaySection = (props) => {
    const {
        day,
        monthIndex,
        months,
        selectDateDepart,
        chooseDepartDate
    } = props
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    //当月日期，当月的总天数
    const year = now.getFullYear()
    const currentDate = now.getDate()
    const currentMonth = now.getMonth()
    const currentMonthAllDays = new Date(year, currentMonth + 1, 0).getDate()
    //下月总天数：
    now.setMonth(now.getMonth() + 1)
    const nextMonthAllDays = new Date(year, now.getMonth() + 1, 0).getDate()
    //下下个月总天数：
    now.setMonth(now.getMonth() + 1)
    const lastMonthAllDays = new Date(year, now.getMonth() + 1, 0).getDate()
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
    //日期是今天，添加一个背景提示色：
    if (month === currentMonth && day === currentDate) {
        dayStyles.unshift('day-today')
    }
    //30天后的日期需要预约，且预约的时间也只能预约到60之内,日期下面显示预约提示框：
    const appointDay = 30
    const hiddenAppointStyle = []
    if (day - currentDate >= 30) {
        hiddenAppointStyle.unshift('show-appoint')
    }
    //下个月需要补的天数：
    const nextMonthDiffDays = appointDay - (currentMonthAllDays - currentDate)
    if (month - currentMonth === 1 && appointDay <= nextMonthAllDays && day > currentDate && day) {
        hiddenAppointStyle.unshift('show-appoint')
    }
    //下下个月需要补全的天数：
    if (month - currentMonth === 2 && day <= nextMonthDiffDays && day) {
        hiddenAppointStyle.unshift('show-appoint')
    }


    return (
        <td
            className={classnames('date-detail', dayStyles)}
            onClick={() => {
                if (day >= currentDate || month > currentMonth) {
                    chooseDepartDate({ day, monthIndex })
                    selectDateDepart(false)
                }
            }}
        >
            <span>{day}</span>
            <span className={classnames('hidden-appoint', hiddenAppointStyle)}>预约</span>
        </td>
    )
}
const WeekSection = (props) => {
    const {
        week,
        months,
        monthIndex,
        chooseDepartDate,
        selectDateDepart
    } = props
    return (
        <tr className={'date-day'}>
            {
                week.map((day, index) => {
                    return <DaySection
                        key={index}
                        day={day}
                        monthIndex={monthIndex}
                        months={months}
                        chooseDepartDate={chooseDepartDate}
                        selectDateDepart={selectDateDepart}
                    />
                })
            }
        </tr>
    )
}
const MonthSection = (props) => {
    const {
        months,
        selectDateDepart,
        chooseDepartDate
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
                            monthIndex={month}
                            months={months}
                            selectDateDepart={selectDateDepart}
                            chooseDepartDate={chooseDepartDate}
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
        selectDateDepart,
        chooseDepartDate
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
            <div className={classnames('date-choose-wrapper', { showDateSelector: !isDateSelectorVisible })}>
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
                            selectDateDepart={selectDateDepart}
                            chooseDepartDate={chooseDepartDate}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}
export default DateSelector