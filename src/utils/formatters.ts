const intl = new Intl.NumberFormat('en', { style: 'currency', currency: 'PKR' })

export const currencyFormater = (number: any) => {
  return intl.format(Number(number)).replace(/\D00(?=\D*$)/, '')
}
