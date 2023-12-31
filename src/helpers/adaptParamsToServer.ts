import { isObject } from '@/helpers/checkIfObject'

export const adaptParamsToServer = <T>(
  queryObject?: T & any,
): T | undefined => {
  if (queryObject === undefined) return
  const newObject = {} as Record<string, unknown>

  if (Array.isArray(queryObject)) {
    return queryObject.map((v: any) => adaptParamsToServer(v)) as unknown as T
  } else if (isObject(queryObject)) {
    for (const camel in queryObject) {
      newObject[camel.replace(/([A-Z])/g, '_$1').toLowerCase()] =
        adaptParamsToServer(queryObject[camel])
    }
  } else {
    return queryObject
  }

  return newObject as unknown as T
}
