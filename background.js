/*

chrome.tabs.onUpdated.addListener((tabId,tab)=>{
     console.log(tab.url)
     const params = new URLSearchParams(tab.url.search)
    
        if (tab.url && tab.url.includes("youtube.com/watch")) {
          
          chrome.tabs.query({active: true, currentWindow: true},function(tabs){
            const activeTab = tabs[0]
            chrome.tabs.sendMessage(activeTab.id, {
           
          },()=>{
            console.log('ID sent')
          });
          })
        } 
})
*/
try{
  chrome.tabs.onUpdated.addListener((tabId)=>{
    if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError); //sendMessage()
      throw Error("Unable to inject script into tab " + activeTab.id);
      
    }
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
      console.log(tabId)
      if(tabs[0].url && tabs[0].url.includes("youtube.com/watch")){
        chrome.scripting.executeScript({ target: {tabId: tabs[0].id, allFrames: true},  files: ["./bookmark.js"] }, function(){console.log('script injected')})
        let query = tabs[0].url.split("?")[1];
        const params  = new URLSearchParams(query)
        
          chrome.tabs.sendMessage(tabs[0].id, {
        type: "NEW",
        videoId:params.get("v"),   
    }, ()=>{
      console.log('ID sent')
    }); 
    
      }else{
        console.log('Not a Youtube page')
      }
    })
  })
}catch(err){
  console.log(err)
}
/*
try{
  function sendMessage(){
   chrome.tabs.onUpdated.addListener(()=>{

    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
      const activeTab = tabs[0]
      console.log(tabs)
      if(tabs.url && tabs.url.includes("youtube.com/watch")){
       // chrome.scripting.executeScript({ target: {tabId: activeTab.id, allFrames: true},  files: ["./bookmark.js"] }, function(){
   
    // OK, now it's injected and ready
    console.log('fg')
    let query = tabs.url.split("?")[1];
    const params  = new URLSearchParams(query)
    
      chrome.tabs.sendMessage(tabId, {
    type: "NEW",
    videoId:params.get("v"),   
}, ()=>{
  console.log('ID sent')
}); 
    })
   )
    }else{
        console.log('Not a Youtube page')
      }
if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError); //sendMessage()
      throw Error("Unable to inject script into tab " + activeTab.id);
      
    }
 // });
      
  
}
    }
sendMessage();
}
catch(err){
  console.log(err)
}

/*
chrome.tabs.onUpdated.addListener((tab,tabId) => {
  console.log('background script')
  const activeTab = chrome.tabs.query({
    active: true,
    currentWindow: true,
});
    chrome.tabs.get(activeTab.id, (c) => {
    
      if (/^https:\/\/www\.youtube/.test(c.url)) {
    
        chrome.scripting.executeScript( { target: {tabId: tabId},  files: ["./bookmark.js"] }, () => {
          console.log("Injected content script on tab activation");
        });
      }
    })
});
*/