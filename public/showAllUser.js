const database = firebase.database();
var rootRef = database.ref('users');
var numlist = [];
var namelist = [];
var iplist = [];
var userinfo;
function init(){
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
            //console.log(detail);
            //console.log( Object.keys(detail));
            //console.log( "ip : "+detail["ip"]);
            //console.log( "name : "+detail["name"]);
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
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://jsonip.com/?callback=DisplayIP";
    document.getElementsByTagName("head")[0].appendChild(script);
}
function DisplayIP(response) {
    console.log(response.ip);  // alerts  ip address
    sessionStorage.setItem("myIp", response.ip);
}

function getRandom(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function goData(){
    var numlist = sessionStorage.getItem("numlist").split(",");
    var iplist = sessionStorage.getItem("iplist").split(",");
    var namelist = sessionStorage.getItem("namelist").split(",");
    console.log(numlist);
    console.log(iplist);
    console.log(namelist);
    var target = getRandom(numlist);
    var target_idx = numlist.indexOf(target);
    console.log("범인은 => ");
    console.log(numlist[target_idx]);
    console.log(iplist[target_idx]);
    console.log(namelist[target_idx]);
    var myIp = sessionStorage.getItem("myIp");
    console.log("my ip : "+ myIp);
    
    if(myIp == iplist[target_idx]){
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