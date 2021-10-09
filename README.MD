# Node utilities

This package may be used in node.js projects.

## What are the available utilities?

There are a lot of common functionalities, some may be useful for you, and some may not.
This project is oriented for any kind of apps, specially modern ones.

## How to install?

        npm i @herii/node-utilities

## How to use

### 1. You can import the whole utilities

        const utilities = require("@herii/node-utilities")
        utilities.utilityName(arguments) // example, calling a utility named utilityName

### 2. You can import only what you need (Recommended)

        const {utilityName} = require("@herii/node-utilities")
        utilityName(args) // call utility

## Utilities List

### random_number(n)

<details>
    <summary>
        Generate a random number of *n* digits.
    </summary>

    Example:
            console.log('4 digits', random_number(4)) // Output: 6090
            console.log('6 digits', random_number(6)) // Output: 105388
            console.log('10 digits', random_number(10)) // Output: 1000004099

</details>

### today(timezone)
<details>
<summary>
Returns the current day in the specified timezone.
</summary>

        today('America/Argentina/Buenos_Aires') // output: 09/09/2021
</details>


### dateReverse(date)
<details>
<summary>
Reverse a date and replace / with -
</summary>

        dateReverse(today('America/Argentina/Buenos_Aires')) // output: 2021-09-09
</details>

### getDateStr(date,iso, timezone)
<details>
<summary>
Get a string formatted according to an ISO.
</summary>

You can call the function to get a string in a specific language.

        getDateStr("2021/08/02", "es-MX")

Output: lunes, 2 de agosto de 2021

You could optionally add a third parameter "timezone".

        getDateStr("2021/08/02", "es-AR", "America/Argentina/Buenos_Aires")

</details>


### items_needed(total, max_capacity)
<details>
<summary>
This function is used to get an int number with an amout of items needed of X.
</summary>
Eg: I have 10 passengers, and I want to know how many cars (items), I need; Each car has a max capacity of 4 passengers.

        items_needed(10,4); // Output is 3. We need 3 cars or items.

This function can be used to determine how many rooms you need to host people in a hotel, etc.
</details>

### get_percentage_value(number, percentage)
<details>
<summary>
Return the value representing *percentage* of a *number*
</summary>
Example:

        // What is 10% of 100?
        get_percentage_value(100, 10) // Output: 10

</details>

### minusPercentage(number, percentage)
<details>
<summary>
Return the value minus its percentage.
</summary>
Example:
        // How much is 100 minus 10%?
        minusPercentage(100, 10) // Output is 90
</details>

### days_difference(dates)
<details>
<summary>
    Get the difference in days between two dates.
</summary>

        days_difference(dates) // dates is an array of dates.
</details>

### currencyFormat(amount, currency, iso)
<details>
<summary>
Returns a currency formatted string.
</summary>
Parameters:
        Amount: Amount is a Number. Eg: 100
        currency: The currency. Default USD. Other examples: EUR, JPY
        iso: The language's iso. EG: en-US, de-DE, es-ES

Example:
        currencyFormat(123456.789, 'EUR', 'de-DE')
        // Output: 123.456,79 €
</details>

## location
<details>
<summary>
Location is an object containing methods to get parts of an address.  The address is extracted from address_components (Object returned by Google Maps API).
</summary>
Very useful if you store address_components coming from google's autocomplete implementation.
Of couse you could use a google maps API instance to do all of that, but this is useful when you just want to call a method
and forget about google's api.
### How to use?

Don't forget this is an object of methods, to use it:

        const {location} = require("@herii/node-utils")
        const {getState} = location 
        console.log(getState(address_components))

Or you can:

        const {location} = require("@herii/node-utils")
        console.log(location.getState(address_components))

The methods contained inside of location are:

### getColloquial(address_components)

Returns the colloquial name of the location. Eg: Area 51

### getState(address_components, level)

Get the state from address_components (Default level is 1).  
Sometimes google has:

1. administrative_area_level_1
2. administrative_area_level_2

You can specify level (1 or 2, etc) adding the argument level.

        // Example
        const state2 = getState(address_components, 2) // Returns value at administrative_area_level_2
        const state1 = getState(address_components, 1) // Returns value at administrative_area_level_1

### getStreetNumber(address_components)

Get street number from address_components

### getPostalCode(address_components)

Get postal code from address_components

### getCity(address_components)

Get the city from address_components

### getCountry(address_components)

Get the country from address_components

### getRoute(address_components)

Get the route  from address_components

### getSubLocality(address_components, level)

Get the sublocality  from address_components (Default level is 1)

Sometimes google has:

1. sublocality_1
2. sublocality_2
You can specify level (1 or 2, etc) adding the argument level.

        // Example
        const state2 = getSubLocality(address_components, 2) // Returns value at sublocality_level_2
        const state1 = getSubLocality(address_components, 1) // Returns value at sublocality_level_1

### getShort(address_components)

Get a short description of the address.

    // Example:
    const address = getShort(address_components)
    console.log(address) // outputs: City, State, Country.

### getLong(address_components)
Get a long description of the address

### getMiddle(address_components)
Get a not so long description (without the colloquial name of the place)

-------------
#### Structure of address_components
**address_components** 
<details>
<summary>
contains the following structure:
</summary>

            [
                    {
                        "long_name": "bajo derecha",
                        "short_name": "bajo derecha",
                        "types": [
                            "subpremise"
                        ]
                    },
                    {
                        "long_name": "24",
                        "short_name": "24",
                        "types": [
                            "street_number"
                        ]
                    },
                    {
                        "long_name": "Calle Álvarez de Castro",
                        "short_name": "Calle Álvarez de Castro",
                        "types": [
                            "route"
                        ]
                    },
                    {
                        "long_name": "Almería",
                        "short_name": "Almería",
                        "types": [
                            "locality",
                            "political"
                        ]
                    },
                    {
                        "long_name": "Almería",
                        "short_name": "AL",
                        "types": [
                            "administrative_area_level_2",
                            "political"
                        ]
                    },
                    {
                        "long_name": "Andalucía",
                        "short_name": "AN",
                        "types": [
                            "administrative_area_level_1",
                            "political"
                        ]
                    },
                    {
                        "long_name": "España",
                        "short_name": "ES",
                        "types": [
                            "country",
                            "political"
                        ]
                    },
                    {
                        "long_name": "04002",
                        "short_name": "04002",
                        "types": [
                            "postal_code"
                        ]
                    }
                ]

</details>
</details>