# Node utilities

This package may be used in node.js projects.

## What are the available utilities?

There are a lot of common functionalities, some may be useful for you, and some may not.
This project is oriented for any kind of apps, specially modern ones. 

## How to install?
        npm i @herii/node-utilities

## How to use

### 1. You can import the whole utilities:
        const utilities = require("@herii/node-utilities")
        utilities.utilityName(arguments) // example, calling a utility named utilityName

### 2. You can import only what you need (Recommended)
        const {utilityNmae} = require("@herii/node-utilities")
        utilityName(args) // call utility


## Utilities List

### getDateStr(date,iso)

Get a string formatted according to an ISO.
Example:

        getDateStr("2021/08/02", "es-MX")

Output: lunes, 2 de agosto de 2021


### locationString(parts)

If you are using Google Maps API, and you store the address_components array then you can call this function to receive a formatted string.

        locationString(address_components)


**address_components** contains the following structure:
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
Output: 
bajo derecha, 24, Calle Álvarez de Castro, Almería, Almería, Andalucía, España, 04002