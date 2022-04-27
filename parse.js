const fs = require('fs')

function parseBill(path) {

    //let path = 'condoworktest.txt' //change path for different files
    let text = fs.readFileSync(path, 'utf-8'); // reads the text file
    let billArr = text.split(/(\s+)/); // split on spaces

    let printCustomer = false; // track if each element is printed
    let printPeriod = false;
    let printDate = false;
    let printCharges = false;

    billArr = billArr.filter(checkSpace); // filter out spaces left

    for(let i = 0; i < billArr.length; i++){
        if (billArr[i] == 'Customer' && billArr[i + 1] == 'no.' && !printCustomer){ // customer and account number
            console.log('Customer Number: ' + billArr[i + 8]);
            console.log('Account Number: ' + billArr[i + 10]);
            printCustomer = true;
        }

        else if(!printPeriod && billArr[i] == 'Activity' && billArr[i + 1] == 'since' && billArr[i + 2] == 'last'){ // bill period
            console.log('Bill Period');
            console.log(billArr[i - 7] + ' ' + billArr[i - 6] + ' ' + billArr[i - 5] + ' ' + billArr[i - 4]
                        + ' ' + billArr[i - 3] + ' ' + billArr[i - 2] + ' ' + billArr[i - 1]);
            printPeriod = true;
        }

        if(!printDate && billArr[i] == 'Bill' && billArr[i + 1] == 'date:'){ // bill date
            console.log('Bill Date');
            console.log(billArr[i + 2] + ' ' + billArr[i + 3] + ' ' + billArr[i + 4]);
            printDate = true;
        }

        if(!printCharges && billArr[i] == 'Total' && billArr[i + 1] == 'new' && billArr[i + 2] == 'charges'){ // total new charges
            console.log('Total New Charges');
            console.log(billArr[i + 3]);
            printCharges = true;
        }
    }
}

//customer number and account number
// bill period
// bill number
// bill date
// total new charges 

function checkSpace(e) {
    if(/\s/.test(e)){
        return false;
    }
    return true;
}

parseBill('condoworktest.txt')
