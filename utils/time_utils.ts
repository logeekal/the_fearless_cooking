import { IDuration } from '../types/common'
import { ICompleteRecipe } from './types'

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
  recipeContent: ICompleteRecipe['content']
) => {
  const defaultDuration: IDuration = { hours: 0, minutes: 0 }

  if (
    !recipeContent.prepTime ||
    !recipeContent.cookTime ||
    !recipeContent.prepTime
  ) {
    /* eslint-disable-next-line */
    console.warn('Prep time or cook time is missing')
  }

  const totalDuration = addDurations([
    {
      ...defaultDuration,
      [getTimeUnitName(recipeContent.cookTimeUnit) as string]:
        parseInt(recipeContent.cookTime) || 2,
    },
    {
      ...defaultDuration,
      [getTimeUnitName(recipeContent.prepTimeUnit) as string]:
        parseInt(recipeContent.prepTime) || 5,
    },
  ])

  return totalDuration
}
