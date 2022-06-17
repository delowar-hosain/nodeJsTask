# Requirement to run this node js task

1. Must have stable internet connection.
2. Must have node js installed on this device of any version of nodejs

# How to run this project

In the project directory, you can run:

### `npm install`

to your command prompt to install the node js package dependencies.

### `node app.js`

to run the output data of your input

## Note
1. You can store the input data in input.json file following desire format.
    #### date: string;
    #### user_id: number;
    #### user_type: string;
    #### type: string;
    #### operation: {
    ####   amount: number;
    ####    currency: string;
    #### };

# Task details

Requirements
============

 * there are no strict deadlines, but lets keep in touch - if you have any problems or have no free time available for the task, just contact us;
 * task must be made in JavaScript(ES5 or ES6) using node.js;
 * third party libraries, dependencies, tools, frameworks etc. can be used if seems necessary;
 * your system must be maintainable:
     * clear dependencies between separate parts of your code;
     * system must be both testable and tested (unit tests are required);
     * code understandable, readable, have a clear flow;
 * your system must be extensible:
     * adding new functionality or changing existing one should not require rewriting the system itself or it's core parts;
 * code must be [Airbnb style guide](https://github.com/airbnb/javascript) compatible;
 * minimal documentation should be provided:
     * how system should be ran (what command to run);
     * how to initiate system's tests (what command to run);
     * short description of functionality in more difficult places could be provided in the code itself;
 * do not use Paysera name in titles, descriptions or the code itself. This helps others to find the libraries that are really related to our services and/or are developed and maintained by our team.
 
Task
====

## Situation
Paysera users can go to a branch to cash in and/or cash out from Paysera account. There are also commission fees for both cash in and cash out. Only supported currency is EUR.

## Commission Fees

### For Cash In
Commission fee - 0.03% from total amount, but no more than 5.00 EUR.

You can get configuration from [API](http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in)

### For Cash Out
There are different commission fees for cash out for natural and legal persons.

#### Natural Persons
Default commission fee - 0.3% from cash out amount.

1000.00 EUR per week (from monday to sunday) is free of charge.

If total cash out amount is exceeded - commission is calculated only from exceeded amount (that is, for 1000.00 EUR there is still no commission fee).

You can get configuration from [API](http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural)

#### Legal persons
Commission fee - 0.3% from amount, but not less than 0.50 EUR for operation.

You can get configuration from [API](http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical)

### Rounding
After calculating commission fee, it's rounded to the smallest currency item (for example, for EUR currency - cents) to upper bound (ceiled). For example, 0.023 EUR should be rounded to 3 Euro cents.

## Input data
Input data is given in JSON file. Performed operations are given in that file. In each object following data is provided:
```js
{
    "date": "2016-01-05", // operation date in format `Y-m-d`
    "user_id": 1, // user id, integer
    "user_type": "natural", // user type, one of “natural”(natural person) or “juridical”(legal person)
    "type": "cash_in", // operation type, one of “cash_in” or “cash_out”
    "operation": {
        "amount": 200, // operation amount(for example `2.12` or `3`)
        "currency": "EUR" // operation currency `EUR`
    }
}
```
All operations are ordered by their date ascendingly.

## Expected Result
As a single argument program must accept a path to the input file.

Program must output result to stdout.

Result - calculated commission fees for each operation. In each line only final calculated commission fee must be provided without currency.

Example Data
============
```
➜  cat input.json
[
    { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } },
     { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
    { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 2, "user_type": "juridical", "type": "cash_in", "operation": { "amount": 1000000.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 3, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
    { "date": "2016-02-15", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
]

➜  node app.js input.json
0.06
0.90
87.00
3.00
0.30
0.30
5.00
0.00
0.00
```

Evaluation Criteria
===================
* all requirements must be met;
* code quality - it's maintainability, extensibility, testability; speed of the system can also be considered, but is not as important as other criteria.

Task Submission
===============
You can put the code publicly (in github or similar code control systems) if you want, but please note the requirement about Paysera name usage.

Send it in your favourite format (link to versioned code, code in zip file etc.) to one of the following emails based on your city, unless instructed otherwise:
* code-afr@paysera.com, if you've been asked to send the task to this email (not depending upon the city)
* code-zd@paysera.com, if you've been asked to send the task to this email (not depending upon the city)
* code-vilnius@paysera.com
* code-kaunas@paysera.com
* code-sofia@paysera.com
* code-manila@paysera.com
* code-dhaka@paysera.com
* code-saint-petersburg@paysera.com
* code-plovdiv@paysera.com
