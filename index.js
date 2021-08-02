/**
 Copyright 2021 Heriberto Juárez
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function getByType(items, type, level) {
    if (!items && !items.length) {
      throw new Error('First argument must be an array')
    }
    let s = null
    level = level || ''
    const search = type + level
    for (const idx in items) {
      if (items[idx].types && items[idx].types.includes(search)) {
        s = items[idx].long_name
      }
    }
    return s
}
function getState(items, level) {
    level = level || 1
    return getByType(items, 'administrative_area_level_', level)
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
function getSubLocality(items, level) {
    level = level || 1
    return getByType(items, 'sublocality_level_', level)
}

function getShort(items){
    return [getCity(items), getState(items), getCountry(items)].join(', ') + '.'
}

function getLong(items){
    return [getRoute(items), getStreetNumber(items), getPostalCode(items), getCity(items), getState(items), getCountry(items)].join(', ')
}

module.exports = {
    getDateStr: function (date, iso) {
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
    }
}