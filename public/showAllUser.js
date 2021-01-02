const database = firebase.database();
var rootRef = database.ref('users');
var numlist = [];
var namelist = [];
var iplist = [];
var userinfo;

function init(){
    //get 참가자
    rootRef.once('value').then((snapshot) => {
        userinfo = snapshot.val();

        var len = Object.keys(userinfo).length;
        var maintable = document.getElementById('maintable');
        for(var i=0;i<len;i++){
            
            var row = maintable.insertRow( maintable.rows.length ); // 하단에 추가
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            var pk = Object.keys(userinfo)[i];
            var detail = userinfo[pk];

            cell1.innerHTML = detail["name"];
            cell2.innerHTML = detail["ip"];

            numlist.push(detail["number"]);
            iplist.push(detail["ip"]);
            namelist.push(detail["name"]);
        }    
        sessionStorage.setItem("numlist",numlist);
        sessionStorage.setItem("iplist",iplist);
        sessionStorage.setItem("namelist",namelist);
    });

    //getIp
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://jsonip.com/?callback=DisplayIP";
    document.getElementsByTagName("head")[0].appendChild(script);
    
    //getLiar
    var secondrootRef = database.ref('/crime/');
    secondrootRef.once('value').then((snapshot) => {
        targetinfo = snapshot.val();
        imposter = targetinfo["target_ip"];
        sessionStorage.setItem("imposter", imposter);

        if(imposter != ""){
            document.getElementById("res").textContent = "거짓말쟁이가 정해져있어요. 게임시작 버튼을 눌러주세요.";
        }//imposter
        else{
            document.getElementById("res").textContent = "아직 거짓말쟁이가 정해지지 않았어요";
            sessionStorage.setItem("imposter", "");
        }
    });

}//init

function DisplayIP(response) {
    console.log(response.ip);  // alerts  ip address
    sessionStorage.setItem("myIp", response.ip);
}

function getRandom(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function setLiar(){
    var numlist = sessionStorage.getItem("numlist").split(",");
    var iplist = sessionStorage.getItem("iplist").split(",");
    var namelist = sessionStorage.getItem("namelist").split(",");
    
    var target = getRandom(numlist);
    var target_idx = numlist.indexOf(target);

    var rootRef = database.ref('/crime/');
    rootRef.set({
        "target_ip": iplist[target_idx]
    });

    findImposter();

    alert("거짓말쟁이를 정하는 중입니다. 잠시만 기다려주세요");
    
}

function findImposter(){
    var rootRef = database.ref('/crime/');
    rootRef.once('value').then((snapshot) => {
        targetinfo = snapshot.val();
        imposter = targetinfo["target_ip"];

        if(imposter != ""){
            var con = confirm("거짓말쟁이가 정해졌어요. 게임을 진행할까요?");
            if(!con){
                return;
            }
            document.getElementById("res").textContent = "거짓말쟁이가 정해졌어요. 게임시작 버튼을 눌러주세요.";
        }//imposter
        else{
            document.getElementById("res").textContent = "아직 거짓말쟁이가 정해지지 않았어요";
        }
    });
}

function deleteLiar(){
    var rootRef = database.ref('/crime/');
    rootRef.set({
        "target_ip": ""
    });
    alert("거짓말쟁이가 사라졌어요");
    sessionStorage.setItem("imposter", "");
    location.href = location.href;
}

function startGame(){
    var imposter = sessionStorage.getItem("imposter");
    var myIp = sessionStorage.getItem("myIp");
    if(imposter == ""){
        alert("아직 거짓말쟁이가 없어요");
        return;
    }
    if(myIp == imposter){
        location.href="liar.html";
    }else{
        location.href="non-liar.html";
    }
}

function moveMainPage(){
    location.href="index.html";
}

function deleteData(){
    arr = sessionStorage.getItem("namelist").split(",");
    console.log(arr);
    for(var i =0; i<arr.length;i++){
        //console.log(arr);
        var deleteRef = database.ref('users/'+arr[i]);
        console.log('users/'+arr[i]+" 지움");
        deleteRef.remove();
    }
    
}