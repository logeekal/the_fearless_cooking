export function genCompleteURL(
  URLWithPath: string,
  params: Record<string, string>
) {
  let qs = ''
  for (const key in params) {
    let ampersand = '&'
    if (qs.length == 0) {
      ampersand = '?'
    }

    qs =
      qs +
      ampersand +
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])} `
  }

  return `${URLWithPath}${qs}`
}

export const getStepURL = (
  sectionTitle: string,
  stepTitle: string,
  stepCounter: number
) => {
  let stepURL = ''
  if (sectionTitle) {
    stepURL = stepURL + sectionTitle.toLowerCase().replace(' ', '-')
    stepURL += '-'
  } else {
    stepURL += ''
  }

  if (stepTitle) {
    stepURL += stepTitle.toLowerCase().replace(' ', '-')
    stepURL += '-'
  } else {
    stepURL += ''
  }

  stepURL += `step-${stepCounter}`

  return stepURL
}
