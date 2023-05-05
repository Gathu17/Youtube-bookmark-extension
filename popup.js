import {getCurrentTabURL} from './util.js'
var bookmarks = [];
var videoId = ''
const getBookmarks = () => {
     bookmarks = chrome.storage.local.get([videoId], function(result){
            if(result.length > 0) {
                result.map((bookmark) => {
                    var bookmarksElement = document.getElementById('bookmarks')
                    return addBookmark(bookmarksElement, bookmark)
                })
            }
        })
}
const addBookmark = (bookmarksElement, bookmark) => {
   
   var bookmarkTitle = document.createElement('div');
   var bookmarkText = document.createTextNode(bookmark.name)
   var controlsElement = document.createElement('div');
   var newBookmark = document.createElement('div');
   bookmarkTitle.innerHTML = bookmark.desc;
   bookmarkText.className = 'text';


   newBookmark.className = 'bookmark';
   newBookmark.id = "bookmark-" + bookmark.time;
   newBookmark.setAttribute('timestamp',bookmark.time)

   setControls('play',onPlay,controlsElement);
   setControls('delete',onDelete,controlsElement);

   newBookmark.appendChild(bookmarkTitle)
   newBookmark.appendChild(bookmarkText)
   newBookmark.appendChild(controlsElement)
   bookmarksElement.appendChild(newBookmark)

}
document.addEventListener('DOMContentLoaded', async function() {
   // const currentTab  = await getCurrentTabURL();
   const [tabs] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
});
    console.log(tabs)
    if (tabs.url && tabs.url.includes("youtube.com/watch")) {
        const params = new URLSearchParams(tabs.url.search);
       videoId = params.get('v')
       getBookmarks();
    }else{
        document.getElementsByClassName('container')[0].innerHTML = '<p>This is not a youtube page</p>';
    }

})
function setControls(str, handler, element){
   var controls = document.createElement('img');
   controls.src = chrome.runtime.getURL('assets/'+ str + '.png')
   controls.addEventListener('click', handler)

   element.appendChild(controls)
}
async function onPlay(e){
   const currentTab  = await getCurrentTabURL()
   var bookmarkTime = e.target.parentNode.parentNode.getAttribute('timestamp')
   chrome.runtime.sendMessage(currentTab.id,{
    type: 'PLAY',
    value: bookmarkTime
   })
}
async function  onDelete(e) {
    const currentTab  = await getCurrentTabURL()
    var bookmarkTime = e.target.parentNode.parentNode.getAttribute('timestamp')
    var bookmarkToDelete = document.getElementsById('bookmark-'+bookmarkTime)
    bookmarkToDelete.parentNode.removeChild(bookmarkToDelete)
    chrome.runtime.sendMessage(currentTab.id,{ 
        type: 'DELETE',
        value: bookmarkTime
    })
}