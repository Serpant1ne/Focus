console.log('-----------------------------------')
// this object is used as a local storage prototype
var localData = {
    "isUpdated": false,
    "date": 0,
    "array": [
        {
            "name": "youtube",
            "url": "www.youtube.com",
            "limit": 5000,
            "timeUsed": 0,
            "isBlocked": false
        },
        {
            "name": "stackoverflow",
            "url": "stackoverflow.com",
            "limit": 3000,
            "timeUsed": 0,
            "isBlocked": false
        },
    ]
}




async function getDataFromStorage(){
    let data = await chrome.storage.sync.get();
    console.log('data imported')
    return data
}

async function setDataToStorage(data){
    chrome.storage.sync.set(data).then(console.log('data exported'))
}

async function checkCurrentUrl(hostName){
    console.log(hostName)
    if (hostName === "www.youtube.com"){
        chrome.action.setBadgeText({
            text: "ON",
          });
    }
    else{
        chrome.action.setBadgeText({
            text: "OFF",
          });
    }
    
}

async function getUrlOnUpdate(tabId){
    // function used to unify callbacks from onUpdated and onActivated and make callbacks as a hostname
    const tab = await chrome.tabs.get(tabId)
    const hostName = new URL(tab.url).hostname
    checkCurrentUrl(hostName)
}

async function getUrlOnActivate(activeInfo){
    // function used to unify callbacks from onUpdated and onActivated and make callbacks as a hostname
    const tab = await chrome.tabs.get(activeInfo.tabId)
    const hostName = new URL(tab.url).hostname
    checkCurrentUrl(hostName)
}

chrome.tabs.onActivated.addListener(
    getUrlOnActivate
)

chrome.tabs.onUpdated.addListener(
    getUrlOnUpdate
)

async function launchApp(){
    // This part of code was used from developers.google.com
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    const hostName =  new URL(tab.url).hostname
    checkCurrentUrl(hostName)
    let data = await getDataFromStorage()
    return data
}

chrome.runtime.onInstalled.addListener(async () => {
    let data = await launchApp()
});

