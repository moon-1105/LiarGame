var username = document.getElementById('name');
var ip = document.getElementById('client-ip');

const database = firebase.database();

function putData(){
    
    console.log("이름 : "+ username.value);
    console.log("아이피 : "+ip.value);

    var rootRef = database.ref('/users/');
    rootRef.once('value').then((snapshot) => {
        userinfo = snapshot.val();
        console.log(userinfo);
    });

    rootRef.child(username.value).set({
        "ip": ip.value,
        "name": username.value, 
        "number": Math.random()
    });
    console.log("did writeUserData");

    loadData(username.value)

    alert("등록 시도 중입니다... 잠시 기다려주세요");
}

function loadData(username){
    var rootRef = database.ref('/users/');
    rootRef.once('value').then((snapshot) => {
        userinfo = snapshot.val();

        var len = Object.keys(userinfo).length;
        for(var i=0;i<len;i++){
            var pk = Object.keys(userinfo)[i];
            var detail = userinfo[pk];
            
            if( username == detail["name"]){
                var tmp = confirm("등록완료! 확인 버튼을 누르면 게임에 참가하게 됩니다");
                if(tmp){
                    location.href="showAllUser.html";
                }
            }
        }
        return false;    
    });
}
