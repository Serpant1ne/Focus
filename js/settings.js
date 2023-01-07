let data = async() => {
    return await chrome.storage.sync.get();
}

async function setDataToStorage(data){
    chrome.storage.sync.set(data).then(console.log('data exported'))
}
function closeEditMenu(editMenu){
    editMenu.classList.add('hidden')
}

function openEditMenu(haveCreatedBefore, el, array, storage){
    console.log('storage', storage);
    console.log('array', array);
    let editMenuWrapper = document.getElementById('editMenu');
    editMenuWrapper.classList.remove('hidden')
    let editMenu = editMenuWrapper.children.item(0);
    let inputsCollection = editMenu.getElementsByClassName('input');
    let timeCollection = editMenu.getElementsByClassName('time-input');
    let menuHeader = document.getElementById('menu-header')
    let deleteBtn = document.getElementById('delete-btn');
    let form = document.getElementById('form');
    let backLink = document.getElementById('back')
    let inputsArray = Array.from(inputsCollection)
    let timeArray = Array.from(timeCollection)
    menuHeader.textContent = 'Add new limit information';
    if (haveCreatedBefore) {
        inputsArray[0].value = el.name;
        inputsArray[1].value = el.url;
        let timeInSeconds = el.limit;
        deleteBtn.classList.remove('hidden')
        menuHeader.textContent = 'Change limit information';
        let hours = Math.floor(timeInSeconds / 3600); 
        timeInSeconds = timeInSeconds - hours * 3600;
        let minutes = Math.floor(timeInSeconds / 60);
        timeArray[0].value = hours;
        timeArray[1].value = minutes;
    }
    window.onclick = (e) =>{
        if (e.target === editMenuWrapper){
            editMenuWrapper.classList.add('hidden')
        }
    }
    backLink.addEventListener('click', () =>{
        editMenuWrapper.classList.add('hidden')
    })
    deleteBtn.addEventListener('click', () => {
        el.limit = 0;
        editMenuWrapper.classList.add('hidden');
    })

    form.onsubmit = (e) => {
        e.preventDefault();
        // change to data from storage
        let objectToChange = {}
        if(haveCreatedBefore){
            objectToChange = el
        }
        
        console.log('original', objectToChange);
        let inputArray = Array.from(document.getElementsByClassName('input'));
        let timeArray = Array.from(document.getElementsByClassName('time-input'));
        let limit = timeArray[0].value*3600 + timeArray[1].value*60
        inputArray.forEach(el => {
            objectToChange[el.name] = el.value
        })
        objectToChange["limit"] = limit;
        // set to data to storage
        console.log('after🍎', objectToChange);
        let found = false
        array.forEach(el => {
            if(el.url === objectToChange.url && !found){
                el.name = objectToChange.name;
                el.limit = objectToChange.limit;
                found = true
                console.log(storage);
            }
            
        })
        if (!found){
            objectToChange['timeUsed'] = 0;
            array.push(objectToChange);
        }
        setDataToStorage(storage)
        editMenuWrapper.classList.add('hidden')
    }
    console.log(editMenu)
}

async function createTable(){
    let parent = document.createElement('table')
    let storage = await data();
    let array = await storage.array;
    
     array.forEach(el => {
        console.log(el)
        if(el.limit > 0){
            let tableRow = document.createElement('tr');

        let cellName = document.createElement('td');
        let cellUrl = document.createElement('td');
        let cellLimit = document.createElement('td');
        let cellTimeUsed = document.createElement('td');
        let buttonCell = document.createElement('td');
        

        let name = document.createElement('span')
        let url = document.createElement('span')
        let limit = document.createElement('span')
        let timeUsed = document.createElement('span')
        let changeButton = document.createElement('button')

        changeButton.addEventListener('click', function(){
            openEditMenu(true, el, array, storage)
        })

        name.textContent = el.name;
        url.textContent = el.url;
        limit.textContent = el.limit;
        timeUsed.textContent = el.timeUsed;
        changeButton.textContent = 'Change'

        cellName.append(name)
        cellUrl.append(url)
        cellLimit.append(limit)
        cellTimeUsed.append(timeUsed)
        buttonCell.append(changeButton)

        tableRow.append(cellName);
        tableRow.append(cellUrl);
        tableRow.append(cellLimit);
        tableRow.append(cellTimeUsed);
        tableRow.append(buttonCell);

        parent.append(tableRow);
        }
    });
// add button to new; add button to delete each ; add button to confirm changes
    
    let lastRow = document.createElement('tr');
    let createNewCell = document.createElement('td')
    let createNewBtn = document.createElement('button');
    createNewBtn.textContent = 'Create new limit';

    createNewBtn.addEventListener('click', () => {
        openEditMenu(false, {}, array,storage);
    })
    createNewCell.append(createNewBtn);
    lastRow.append(createNewCell);
    parent.append(lastRow);
    document.body.append(parent);
}





createTable();






