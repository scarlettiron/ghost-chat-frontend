import {addMinutes} from 'date-fns'
import moment, {isBetween, isAfter, isBefore} from 'moment'


    const convertLocalToDbTime = (year, month, day, hour, minutes) => {
        month = parseInt(month) - 1
        let date = new Date(year, month , day, hour, minutes)
        let utcDate = date.toUTCString()
        let utcDateObj = new Date(utcDate).toISOString()
        return utcDateObj
    }

    const checkIsFuture = (futureDateString) => {
        const mDate = moment(futureDateString)
        const now = new Date().toUTCString()
        if(mDate.isAfter(now)){
            return true
        }
        return false
    }

    const addAndConvertToDbTime = (startDate, offset) => {
        let newDate = new Date(startDate)
        let futureDate = addMinutes(newDate, offset)
        let utcDate = futureDate.toUTCString()
        let isoDate = new Date(utcDate).toISOString()
        return isoDate
    }

    const convertHoursToUtc = (localHours) => {
        let date = new Date().setHours(localHours)
        let newDate = new Date(date)
        let utcObj = newDate.getUTCHours()
        return utcObj
    }

    const convertToFormattedSiteDate = (date) => {
        let newDateObj = new Date(date)
        return newDateObj.toDateString()
    }

    const convertToFormattedSiteDateShort = (date) => {
        let newDateObj = new Date(date)
        let longDate = newDateObj.toDateString()
        let formated = `${longDate.split(' ')[1]} ${longDate.split(' ')[2]}`
        return formated
    }

    const convertToFormattedSiteTime = (data) => {
        let newDateObj = new Date(data)
        let localDate = newDateObj.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hour12:true})
        return localDate
    } 

    const videoIsActive = (start, end) => {
        let startTime = new Date(start)
        let endTime = new Date(end)
        let started = moment().isBetween(startTime, endTime)
        return started
    }

    export {convertLocalToDbTime, addAndConvertToDbTime, convertHoursToUtc, 
        convertToFormattedSiteDate, videoIsActive, convertToFormattedSiteTime, 
        checkIsFuture, convertToFormattedSiteDateShort}