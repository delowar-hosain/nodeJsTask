//import the input JSON
const json = require('./input.json')
//import node-ftech packege for fetch the API
const fetch =  require('node-fetch');
var cashOutNaturalData = {}
//the main function which run input/output operation
outPutOfTheInput()
async function outPutOfTheInput() {
    //To fetch cash in commision data
    const cashInData = await fetch("http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in").then((data) => {
        return data.json()
    })
    //To fetch cash out natural user commision data
    cashOutNaturalData = await fetch("http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural").then((data) => {
        return data.json()
    })
    //To fetch cash out natural user commision data
    const cashOutJuridicalData = await fetch("http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural").then((data) => {
        return data.json()
    })

    //check the input json length
    if (json.length > 0) {
        json.map((item, key) => {
            //Check the cash in commision
            if (item?.type === 'cash_in') {
                const commission = (item?.operation?.amount * (cashInData?.percents / 100))
                if (commission >= cashInData?.max?.amount) {
                    console.log(parseRoundFigure(cashInData?.max?.amount))
                } else {
                    console.log(parseRoundFigure(commission))
                }
            //Check the cash out commision
            } else if (item?.type === 'cash_out') {
                //natural user comission
                if (item?.user_type === 'natural') {
                    const commission = DayWiseCommisionRate(item, key)
                    console.log(parseRoundFigure(commission))
                //juridical user comission
                } else if (item?.user_type === 'juridical') {
                    const commission = (item?.operation?.amount * (cashOutJuridicalData?.percents / 100))
                    if (commission <= cashOutJuridicalData?.min?.amount) {
                        console.log(parseRoundFigure(cashOutJuridicalData?.min?.amount))
                    } else {
                        console.log(parseRoundFigure(commission))
                    }
                }
            }
        })
    }
}

//round figure the value upto 2 digit
function parseRoundFigure(value) {
    return parseFloat(value).toFixed(2)
}

//calculate day wise commision rate of each week
function DayWiseCommisionRate(item, key) {
    var commision = 0
    var total_cashOut = 0
    var d = new Date(item.date);
    //If selected day is SUNDAY
    if (d.getDay() === 0) {
        var first = (d.getDate() - 6) - d.getDay();
        var last = first + 6;
        var firstday = new Date(d.setDate(first) + 1);
        var lastday = new Date(d.setDate(last) + 1);
    } else {
        var first = (d.getDate() + 1) - d.getDay();
        var last = first + 6;
        var firstday = new Date(d.setDate(first) + 1);
        var lastday = new Date(d.setDate(last) + 1);
    }
    json.map((value, index) => {
        var newValue = new Date(value?.date);
        if (index <= key && (newValue >= firstday && newValue <= lastday) && value?.user_id === item?.user_id && value?.type === 'cash_out') {
            total_cashOut = total_cashOut + value?.operation?.amount
        }
    })
    if (total_cashOut > cashOutNaturalData?.week_limit?.amount) {
        commision = ((total_cashOut - cashOutNaturalData?.week_limit?.amount) * (cashOutNaturalData.percents / 100) - getOldCommisionRate(item, key))
    }

    return commision
}

//calculate old commision rate from the selected date of each week
function getOldCommisionRate(item, key) {
    var commision = 0
    var total_cashOut = 0

    var d = new Date(item.date);
    if (d.getDay() === 0) {
        var first = (d.getDate() - 6) - d.getDay();
        var last = first + 6;
        var firstday = new Date(d.setDate(first) + 1);
        var lastday = new Date(d.setDate(last) + 1);
    } else {
        var first = (d.getDate() + 1) - d.getDay();
        var last = first + 6;
        var firstday = new Date(d.setDate(first) + 1);
        var lastday = new Date(d.setDate(last) + 1);
    }
    json.map(function (value, index) {
        var newValue = new Date(value?.date);
        if (index < key && (newValue >= firstday && newValue <= lastday) && value?.user_id === item.user_id && value?.type === 'cash_out') {
            total_cashOut = total_cashOut + value?.operation?.amount
        }
    })
    if (total_cashOut > cashOutNaturalData?.week_limit?.amount) {
        commision = (total_cashOut - cashOutNaturalData?.week_limit?.amount) * (cashOutNaturalData?.percents / 100)
    }
    return commision
}