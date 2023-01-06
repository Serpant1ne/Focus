let data = async() => {
    return await chrome.storage.sync.get();
}

async function setDataToStorage(data){
    chrome.storage.sync.set(data).then(console.log('data exported'))
}

function openEditMenu(){
    
}

async function createTable(){
    let parent = document.createElement('table')
    let storage = await data();
    let array = storage.array;
    let i = 0;
     array.forEach(el => {
        console.log(el)
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
        i = i+1;
    });
// add button to new; add button to delete each ; add button to confirm changes
    
    let lastRow = document.createElement('tr');
    let createNewCell = document.createElement('td')
    let createNewBtn = document.createElement('button');
    createNewBtn.textContent = 'Create new limit';
    createNewCell.append(createNewBtn);
    lastRow.append(createNewCell);
    parent.append(lastRow);
    document.body.append(parent);
}



createTable();






