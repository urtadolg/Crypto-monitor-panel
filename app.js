const mainScreenValue = document.querySelector('.value');
const lhScreenValue = document.querySelector('.lastHourChangeValue');
const lmScreenValue = document.querySelector('.lastMinChangeValue');
const graph = document.querySelector('.graph');
let graphPoints = [10,15,7,18,20];
let oldValue = 0;

const update = async function(){
    try{
        let req = await axios.request('https://api.cryptonator.com/api/ticker/btc-usd');
        let target = req.data.ticker.target;
        let value = req.data.ticker.price;
        let lastHourValue = req.data.ticker.change;
        lastMinChangeHandler(oldValue,value,target);
        lastHourChangeHandler(lastHourValue,target);
        let txtValue = `$ ${value} ${target}`;
        mainScreenValue.innerText = txtValue;
        oldValue = value;
        console.log(req);
    } catch(e){
        console.log('Error',e);
    }
}

function lastMinChangeHandler(oldValue,currentValue,target){
    let result = currentValue - oldValue;
    if(result == currentValue){
        lmScreenValue.classList.add('updatingChange');
        lmScreenValue.innerText = "Updating...";
    } else if(result > 0) {
        lmScreenValue.classList.add('positiveChange');
        lmScreenValue.classList.remove('negativeChange');
        lmScreenValue.classList.remove('updatingChange');
        result = result.toFixed(8)
        lmScreenValue.innerText = `+ $ ${result} ${target}`;
    } else {
        result = result * -1;
        lmScreenValue.classList.add('negativeChange');
        lmScreenValue.classList.remove('updatingChange');
        lmScreenValue.classList.remove('positiveChange');
        result = result.toFixed(8)
        lmScreenValue.innerText = `- $ ${result} ${target}`;
    }
}

function lastHourChangeHandler(value,target){
    if(value == 0){
        lhScreenValue.classList.add('updatingChange');
        lhScreenValue.classList.remove('negativeChange');
        lhScreenValue.classList.remove('positiveChange');
        lhScreenValue.innerText = "Updating...";
    } else if(value > 0) {
        lhScreenValue.classList.add('positiveChange');
        lhScreenValue.classList.remove('negativeChange');
        lhScreenValue.classList.remove('updatingChange');
        lhScreenValue.innerText = `+ $ ${value} ${target}`;
    } else {
        value = value * -1;
        lhScreenValue.classList.add('negativeChange');
        lhScreenValue.classList.remove('updatingChange');
        lhScreenValue.classList.remove('positiveChange');
        lhScreenValue.innerText = `- $ ${value} ${target}`;
    }
}

function plogGraph (graphPoints,graph){
    
}

update();
setInterval(() => {
  update();
}, 60000);