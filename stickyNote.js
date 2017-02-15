window.onload = init;
function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;
    
    var stickiesarray = getStickiesarray();
    for (var i = 0; i < stickiesarray.length; i++) {
        var key = stickiesarray[i];
        var stickyObj = JSON.parse(localStorage[key]);
        addStickyToDOM(key, stickyObj);
    }
}

function addStickyToDOM(key, stickyObj) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    sticky.style.backgroundColor = stickyObj.color;
    sticky.setAttribute("id", key)
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = stickyObj.value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick = deleteSticky;
}

function createSticky() {
    var stickiesarray = getStickiesarray();
    var currentDate = new Date();
    var colorSelectObj = document.getElementById("note_color");
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;
    var key = "sticky_" + currentDate.getTime();
    var value = document.getElementById("note_text").value;
    var stickyObj = {
        "value": value,
        "color": color
    };
    localStorage.setItem(key, JSON.stringify(stickyObj));
    stickiesarray.push(key);
    localStorage.setItem("stickiesarray", JSON.stringify(stickiesarray));
    addStickyToDOM(key, stickyObj);
}

function getStickiesarray() {
    var stickiesarray = localStorage.getItem("stickiesarray");
    if (!stickiesarray) {
        stickiesarray = [];
        localStorage.setItem("stickiesarray", JSON.stringify(stickiesarray));
    } else {
        stickiesarray = JSON.parse(stickiesarray);
    }
    return stickiesarray;
}

function deleteSticky(eventObject){
    var key = eventObject.target.id;
    if(eventObject.target.tagName.toLowerCase() == "span"){
        key = eventObject.target.parentNode.id;
    }
    localStorage.removeItem(key);
    var stickiesArray = getStickiesarray();
    if(stickiesArray){
        for(var i=0; i<stickiesArray.length; i++){
            if(key == stickiesArray[i]){
                stickiesArray.splice(i, 1);
            }
        }
        localStorage.setItem("stickiesarray", JSON.stringify(stickiesArray));
        removeStickyFromDOM(key);
    }   
}

function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}
                                     
                             