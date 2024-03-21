import { Duration } from 'tinyduration'

import { IDuration } from '../types/common'
import { RecipeContent } from './types'

export const addDurations = (durations: IDuration[]) => {
  const totalDuration: IDuration = {
    hours: 0,
    minutes: 0,
  }

  durations.forEach((duration) => {
    totalDuration.hours += duration.hours
    totalDuration.minutes += duration.minutes
  })

  return convertTimeToHighestUnit(totalDuration)
}

export const convertTimeToHighestUnit = (duration: IDuration): IDuration => {
  let additionalHours = 0
  let leftoverMinutes: number | undefined = undefined
  if (duration.minutes >= 60) {
    additionalHours = Math.floor(duration.minutes / 60)
    leftoverMinutes = duration.minutes % 60
  }

  if (typeof leftoverMinutes === 'undefined' || isNaN(leftoverMinutes)) {
    leftoverMinutes = duration.minutes
  }

  return {
    hours: duration.hours + additionalHours,
    minutes: leftoverMinutes,
  }
}

export const convertDurationToISO8601 = (duration: IDuration): string => {
  let result = 'PT'

  //if(!duration.hours && !duration.minutes){
  //throw new Error(`Invalid Duration value :${JSON.stringify(duration) }`)
  //}

  if (duration.hours > 0) {
    result = `${result}${duration.hours} H`
  }

  if (duration.minutes > 0) {
    result = `${result}${duration.minutes} M`
  }

  return result
}

export const getTimeUnitName = (unit: string) => {
  if (unit.toLowerCase().startsWith('m')) return 'minutes'
  if (unit.toLowerCase().startsWith('h')) return 'hours'
}

export const calculateTotalDuration = (
  recipeContent: RecipeContent,
  recipeURL?: string
) => {
  const defaultDuration: IDuration = { hours: 0, minutes: 0 }

  if (
    !recipeContent.prepTime ||
    !recipeContent.cookTime ||
    !recipeContent.prepTime
  ) {
    /* eslint-disable-next-line */
    console.warn('Prep time or cook time is missing for -> ', recipeURL)
  }

  const prepTimeInDurations = {
    ...defaultDuration,
    [getTimeUnitName(recipeContent.prepTimeUnit) as string]:
      parseInt(recipeContent.prepTime) || 5,
  }

  const cookTimeInDurations = {
    ...defaultDuration,
    [getTimeUnitName(recipeContent.cookTimeUnit) as string]:
      parseInt(recipeContent.cookTime) || 2,
  }
  const totalDuration = addDurations([prepTimeInDurations, cookTimeInDurations])

  return {
    prepTimeInDurations,
    cookTimeInDurations,
    totalDuration,
  }
}

export const getMilliSecondsFromDuration = (time: Duration) => {
  return (
    ((time.weeks ?? 0) * 7 * 24 * 60 * 60 +
      (time.days ?? 0) * 24 * 60 * 60 +
      (time.hours ?? 0) * 60 * 60 +
      (time.minutes ?? 0) * 60 +
      (time.seconds ?? 0)) *
    1000
  )
}

export const convertWPtimeToReadabletime = (gmtDateTime: string) => {
  const date = new Date(gmtDateTime)
  const now = Date.now()

  const diff = now - date.getTime()

  const diffInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  if (diffInYears > 0) {
    return `${diffInYears} years ago`
  }

  const diffInMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
  if (diffInMonths > 0) {
    return `${diffInMonths} months ago`
  }

  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (diffInDays > 0) {
    return `${diffInDays} days ago`
  }

  const diffInHours = Math.floor(diff / (1000 * 60 * 60))
  if (diffInHours > 0) {
    return `${diffInHours} hours ago`
  }

  const diffInMinutes = Math.floor(diff / (1000 * 60))
  if (diffInMinutes < 5) {
    return 'Just now'
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes} minutes ago`
  }

  return date.toDateString()
}
