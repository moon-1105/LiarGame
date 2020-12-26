var topic = document.getElementById('topic');
const database = firebase.database();
var rootRef = database.ref('data');
function init(){
    getData();
}
function getData(){
    rootRef.once('value').then((snapshot) => {
        datainfo = snapshot.val();
        var arr = datainfo["ans"].split(',');
        var idx = datainfo["num"];
        sessionStorage.setItem("idx",idx);

        console.log(arr[idx]);
        document.getElementById('topic').textContent = arr[idx];
    });
}

function endGame(){
    var idx = sessionStorage.getItem("idx");
    const newData = {
        num : parseInt(idx)+1
    }
    rootRef.update(newData);
    location.href="showAllUser.html";
}