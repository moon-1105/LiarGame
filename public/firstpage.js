var username = document.getElementById('name');
var ip = document.getElementById('client-ip');

const database = firebase.database();

function putData(){
    
    console.log("이름 : "+ username.value);
    console.log("아이피 : "+ip.value);

    var rootRef = database.ref('/users/');

    rootRef.child(username.value).set({
        "ip": ip.value,
        "name": username.value,
        "number": Math.random()
    });
    console.log("did writeUserData");
    var tmp = confirm("등록완료!");
    if(tmp){
        location.href="showAllUser.html";
    }
}
