var moment = require('moment')

var date = moment()

// When You Print Date And Month With The Date Method With Date() There Was A Huge Problem So Solving THis Problem We Use moment

// date.add(1,'year').subtract(9,'months')
// console.log(date.format('MMMM Do YYYY'))

// date.format('MMMM')  =>  For Month

// date.format('YYYY') => For Year

// date.format('Do') => For Day

console.log(date.format('h:mm a'))

// For Addding In dates

// FOr Hour => h

// For Minute => mm

// for AM , PM => a
