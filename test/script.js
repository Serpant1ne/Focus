console.log('hello world');


const form = document.getElementById('form');

form.onsubmit = (e) => {
    e.preventDefault();
    // change to data from storage
    let objOrig = {
        "name": "youtube",
        "url": "www.youtube.com",
        "limit": 5000,
        "timeUsed": 0,    };
    console.log('original', objOrig);
    let inputArray = Array.from(document.getElementsByClassName('input'));
    let timeArray = Array.from(document.getElementsByClassName('time-input'));
    let limit = timeArray[0].value*3600 + timeArray[1].value*60
    inputArray.forEach(el => {
        objOrig[el.name] = el.value
    })
    objOrig["limit"] = limit;
    // set to data to storage
    console.log('after🍎', objOrig);

    
    
    


}


const formData = new FormData(form);
