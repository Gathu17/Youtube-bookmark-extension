export const getCurrentTabURL = async () => {
    const [tabs] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
  
    return tabs[0];
}


//addBookmarkBtn()


// (() => {
//     let player; 
//     let currentBookmarks = [];
//     let controls;
//     let currentVideo = "";
//     /*
//     chrome.runtime.onMessage.addListener((msg, sender, response) => {
//         const { type, value, videoId } = msg;

//         if (type === "NEW") {
//             currentVideo = videoId;
//             addBookmarkBtn();
//             console.log('hhh')
//         }
//         response(currentVideoBookmarks)
//     });
//     */
//     chrome.runtime.onMessage.addListener((msg, sender, response) => {
    
//         const { type, value, videoId } = msg
//         if(type === "NEW"){
    
//         currentVideo = videoId
//         addBookmarkBtn();
//         console.log(currentVideo)
//         console.log("Added bookmark")
//         }
//    /*
//     break;
//     case "PLAY":
//     ytPlayer.currentTime = value
//     break;
//     case "DELETE":
//     currentBookmarks = currentBookmarks.filter((b) => b.time != value)
//     chrome.storage.sync.set({
//         [currentVid]: JSON.stringify(currentBookmarks)
//     })
//     */
//     response(currentBookmarks)

// //return true;
// });
//     const addBookmarkBtn = () => {
//         const bookmarkExists = document.getElementsByClassName("bookmark-btn")[0];
//         console.log(bookmarkExists);

//         if (!bookmarkExists) {
//             const bookmarkBtn = document.createElement('img');

//             bookmarkBtn.src = chrome.runtime.getURL("assets/addition.png");
//             bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            
//             bookmarkBtn.title = "Click to bookmark current timestamp";

//             controls = document.getElementsByClassName("ytp-left-controls")[0];
//             player = document.getElementsByClassName("video-stream")[0];
            
//             controls?.append(bookmarkBtn);
//             bookmarkBtn.addEventListener('click', addBookmark);
//         }
//     }
//  /*
//     const addNewBookmarkEventHandler = async () => {
//         const currentTime = player.currentTime;
//         const newBookmark = ({
//             time: currentTime,
//             desc: "Bookmark at " + getTime(currentTime),
//         });
//         console.log(newBookmark);

//         chrome.storage.sync.set({
//             [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
//         });
//     }
//   */
//     async function addBookmark (){
//         console.log('add bookmark')
//         var bookmarkName = prompt('Please enter bookmark name', 'Bookmark name')
//        // var bookmarkTime = new Date(ytPlayer.currentTime*1000).toISOString();
//         const newBookmark = ({
//           time: player.currentTime,
//           text: bookmarkName
//         })
//        // currentBookmarks = await fetchBookmarks()
//         // chrome.storage.sync.set({
//         //     [currentVideo]: JSON.stringify([...currentBookmarks, newBookmark])
//         // })
//         chrome.storage.local.get([currentVideo], function(result) {
            
//             if (currentVideo in result) {
//                 currentBookmarks = JSON.parse(result[currentVideo]);
//             }
        
//             currentBookmarks.push(newBookmark);
        
//             chrome.storage.local.set({
//                 [currentVideo]: JSON.stringify(currentBookmarks)
//             }, function() {
//                 console.log('Bookmark saved:', newBookmark);
//             });
//         }); 
//     }


//   //  newVideoLoaded();
// })();

// const getTime = t => {
//     var date = new Date(0);
//     date.setSeconds(1);

//     return date.toISOString().substr(11, 0);
// }
