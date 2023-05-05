

(() => {
    let player;
    let currentBookmarks = [];
    let currentVid = "";
    let controls;
    
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
    
        const { type, value, videoId } = msg
        
        if(type === "NEW"){
    
        currentVid = videoId
        addBookmarkBtn();
        console.log("Added bookmark")
        }
        
    //  switch(type) {
    //  case "NEW":
    //     currentVid = videoId
    //     addBookmarkBtn();
    //     console.log("Added bookmark")
    //     break;
    //     case "PLAY":
    //     player.currentTime = value
    //     break;
    //     case "DELETE":
    //     currentBookmarks = currentBookmarks.filter((b) => b.time != value)
    //     chrome.storage.sync.set({
    //         [currentVid]: JSON.stringify(currentBookmarks)
    //     })
    //     }
    
    response(currentBookmarks)

//return true;
});
 const addBookmarkBtn = () => {
   
    const bookmarkExists = document.getElementsByClassName("bookmark-btn")[0];
    console.log(bookmarkExists);
    if(!bookmarkExists){
        const bookmarkBtn = document.createElement('img')
        bookmarkBtn.src = chrome.runtime.getURL('assets/addition.png')
        bookmarkBtn.className = "ytp-button" + "bookmark-btn";
        bookmarkBtn.style.color = "blue";
        bookmarkBtn.title = 'Click to bookmark'
    
        player = document.getElementsByClassName("video-stream")[0];
        controls = document.getElementsByClassName("ytp-left-controls")[0];
        console.log(controls)

        controls?.append(bookmarkBtn)
    
        bookmarkBtn.addEventListener('click', addBookmark);
    }
    
}
async function addBookmark (){
   
   var bookmarkName = prompt('Please enter bookmark name', 'Bookmark name')
  const bookmarkTime = new Date(player.currentTime*1000).toISOString();
   const newBookmark = ({
     time: player.currentTime,
     text: bookmarkName,
     desc: "Bookmark at" + " " + bookmarkTime,
   })
   currentBookmarks = await fetchBookmarks()
   console.log(currentokmarks)
   chrome.storage.sync.set({
       [currentVid]: JSON.stringify([...currentBookmarks, newBookmark])
   })
}

async function fetchBookmarks (){
   
   
    await chrome.storage.sync.get([currentVid], function(result){
       return result.currentVid ? JSON.parse(...result.currentVid) : [] ;
    })
   
}

})();

