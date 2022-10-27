import { AxiosError } from 'axios'
import { AppConstants } from './appConstants'

export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

export function isNetworkError(err: AxiosError) {
  return !!err.isAxiosError && !err.response
}

export function getToken() {
  return localStorage.getItem(AppConstants.TOKEN_ID)
}

export function getDayStartDate(date?: Date): Date {
  if (!date) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    return startDate;
  }
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getDayEndDate(date?: Date): Date {
  if (!date) {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    return endDate;
  }
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @description - This function is used to encode the string to base64
 * @param str string to be encoded to base64
 * @returns string encoded to base64
 */
export function encodeToBase64(str: string): string {
  return window.btoa(encodeURIComponent(str))
}

/**
 * @description - This function is used to strip html tags
 * @param str string to be striped
 * @returns string striped
 */

export function stripTags(str: string): string {
  return str.replace(/(<([^>]+)>)/gi, '').trim()
}

/**
 * @description - This function is used to format the date as yyyy-mm-dd
 * @param date
 * @returns `string` formatted date as yyyy-mm-dd
 */
export const formatDateWithDashes = (date: Date | undefined) => {
  if (typeof date !== 'object') {
    return ''
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}
