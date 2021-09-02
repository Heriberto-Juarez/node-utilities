/**
 Copyright 2021 Heriberto Juárez
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function getByType(items, type, level) {
    if (!items || !items.length) {
      throw new Error('Items are not defined')
      return ''
    }
    let s = null
    level = level || ''
    const search = type + level
    for (const idx in items) {
      try{
        if (items[idx].types && items[idx].types.includes(search)) {
          s = items[idx].long_name
        }
      }catch (e){
        console.error(e)
        throw new Error('Error in items')
      }
    }
    return s
}
function getState(items, level) {
    const type = 'administrative_area_level_'
    level = level || 1
    let d =  getByType(items, type, level)

    if (!d) {
      if (level === 1){
        d =  getByType(items, type, 2)
      }else{
        d =  getByType(items, type, 1)
      }
    }
    return d
}
function getStreetNumber(items) {
    return getByType(items, 'street_number')
}
function getPostalCode(items) {
    return getByType(items, 'postal_code')
}
function getCity(items) {
    return getByType(items, 'locality')
}
function getCountry(items) {
    return getByType(items, 'country')
}
function getRoute(items) {
    return getByType(items, 'route')
}

function getColloquial(items){
  return getByType(items, 'colloquial_area')
}

function getSubLocality(items, level) {
    level = level || 1
    const type = 'sublocality_level_'
    let d = getByType(items, type, level)
    if (!d){
      if (level === 1){
        d = getByType(items, type, 2)
      }else{
        d = getByType(items, type, 1)
      }
    }
    return d
}

function removeEmpty(arr){
  const c = []
  for (let o in arr){
    if (arr[o] && arr[o] !== ''){
      c.push(arr[o])
    }
  }
  return c
}
function getShort(items){
    return removeEmpty([getCity(items), getState(items), getCountry(items)]).join(', ') + '.'
}

function getLong(items){
    return removeEmpty([getColloquial(items),getRoute(items), getStreetNumber(items), getPostalCode(items), getCity(items), getState(items), getState(items, 2), getCountry(items)]).join(', ')
}
// dates is array
function days_difference(dates){
  if (dates === undefined || !dates){
    throw new Error('dates must be an array')
  }
  let days = 1
  if (dates.length === 2) {
    const d1 = new Date(dates[0]).getTime()
    const d2 = new Date(dates[1]).getTime()
    days = Math.abs((d1 - d2) / (1000 * 3600 * 24)) + 1
  }
  return days
}

function currencyFormat(amount, currency, iso) {
  currency = currency || 'USD'
  iso = iso || 'es-US'
  return amount.toLocaleString(iso, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  })
}

function random_number(digits){
  if (!digits || digits === undefined) {
    throw new Error('Digits must be a number')
  }
  let base = 1
  for (let i = 0; i< digits - 1; i++) base *= 10
  return Math.floor(base + Math.random() * 9000)
}

// Return the amount representing the *percentage* of *number*
function get_percentage_value (number, percentage) {
  if (number === undefined || percentage === undefined || !number || !percentage) {
    throw new Error('Invalid parameters')
  }
  return number * (percentage / 100)
}

function minusPercentage (number, percentage) {
  if (number === undefined || percentage === undefined || !number || !percentage) {
    throw new Error('Invalid parameters')
  }
  return number - get_percentage_value(number, percentage)
}

module.exports = {
    getDateStr: function (date, iso) {
      if (!date || date === undefined || !iso || iso === undefined){
        throw new Error('Invalid parameters in getDateStr')
      }
      return new Date(date).toLocaleDateString(iso, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
    },
    location: {
        getState: getState,
        getStreetNumber: getStreetNumber,
        getPostalCode: getPostalCode,
        getCity: getCity,
        getCountry: getCountry,
        getRoute: getRoute,
        getSubLocality: getSubLocality,
        getShort: getShort,
        getLong: getLong,
    },
    currencyFormat: currencyFormat,
    random_number: random_number,
    /* Return the amout of items needed
      Eg. I have 10 passengers and each car has a max capacity of 4 passengers.
      items_needed(10, 4); // 3 items (cars)
    */
    items_needed: function (total, max_capacity){
      if (!total || !max_capacity || total === undefined || max_capacity === undefined){
        throw new Error('Invalid parameters in items_needed');
      }
      return Math.ceil(total / max_capacity)
    },
    get_percentage_value: get_percentage_value,
    minusPercentage: minusPercentage,
    days_difference: days_difference,
}
