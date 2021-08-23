var priceBill = 0;
var tipPercent = 0;
var totalPerson = 0;
const eTipBill = document.querySelector(".output__tip-money .money span");
const eTotalBill = document.querySelector(".output__pay-money .money span");
const eTotalPerson = document. querySelector(".input .input__total-person input");
const eWarning = document.querySelector(".input .input__total-person label:nth-child(2)");
const eInputBill = document.querySelector(".input .input__payment input");
const eButtonsPercent = document.querySelectorAll(".input .input__percent-tip button");
const eCustomPercent = document. querySelector(".input .input__percent-tip input");
const eReset = document.querySelector(".output .output__btn button");

function getPriceBill(){
    priceBill = eInputBill.value || 0;
}

function getTipPercent(){
    eButtonsPercent.forEach(function(eButtonPercent, index){
        eButtonPercent.addEventListener('click', function(){
            //Set Custom to empty
            eCustomPercent.value = "";
            //Set css when change value
            eButtonsPercent.forEach(function(eButtonPercentOld){
                eButtonPercentOld.classList.remove("active");
            })

            //Set css for new value
            this.classList.add("active");

            //Set new value for tipPercent
            tipPercent = this.value;
        })
    })

    eCustomPercent.addEventListener('focus', function(){
        //Set css for button which not custom
        eButtonsPercent.forEach(function(eButtonPercentOld){
            eButtonPercentOld.classList.remove("active");
        })

        //Set new value
        setInterval(function(){
            if(eCustomPercent.value !== ""){
                tipPercent = eCustomPercent.value;
            }
        }, 100)
    })
}

function getTotalPerson(){
    totalPerson = eTotalPerson.value || 0;
}

function tipAmount(){
    var tip = priceBill*(tipPercent/100)/totalPerson;
    return tip.toFixed(2);
}

function totalPayment(){
    var payment =  priceBill*(1 + tipPercent/100)/totalPerson;
    return payment.toFixed(2);
}

function reset(){
    eReset.addEventListener('click', function(){
        //Reset CSS Bill Input
        eInputBill.value = "";

        //Reset CSS tip percent
        eButtonsPercent.forEach(function(eButtonPercentOld){
            eButtonPercentOld.classList.remove("active");
        })

        //Reset CSS total person
        eTotalPerson.value = "";

        //Reset result
        eTipBill.innerText = '0.00';
        eTotalBill.innerText = '0.00';
        
        //Reset value globle
        priceBill = 0;
        tipPercent = 0;
        totalPerson = 0;
    })
}

function main(){
    reset();
    getTipPercent();    
    setInterval(function(){
        getPriceBill();
        getTotalPerson();

        //CSS for waring when user dont input total person
        if(priceBill != 0 && totalPerson == 0){
            eTotalPerson.classList.add("active");
            eWarning.classList.add("active");
        }

        if(totalPerson != 0){
            //Set CSS for element input person
            eTotalPerson.classList.remove("active");
            eWarning.classList.remove("active");

            //Calculator for requiment
            eTipBill.innerText = tipAmount();
            eTotalBill.innerText = totalPayment();
        }

        if(priceBill != 0 && totalPerson != 0){

        }
        console.log('bill: ' + priceBill);
        console.log('tip: ' + tipPercent);
        console.log('person: ' + totalPerson);
    }, 500)
}

main();