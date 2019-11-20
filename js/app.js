var levelContent = document.getElementById("levelContent");
var result = document.getElementById("result");
var proposition = document.getElementById("proposition");
var propositionBtn = document.getElementById("propositionBtn");
var alerts = document.getElementById("alert");
var replay = document.getElementById("replay");
var formContent = document.getElementById("formContent");
var levelBtn = document.getElementsByClassName("level");
var listNumberContent = document.getElementById("listNumberContent");
var level="";
var tofind;
var limit;
var limitNoob=200;
var limitPgm=500;
var counter=0;
var maxTry=8;
var tries=maxTry-counter;

var listNumber=[];


if(readCookie("result1") == "undefined" || readCookie("result1") == undefined){
    createCookie('result1',99,99);
}

if(readCookie("result2") === "undefined" || readCookie("result2") == undefined){
    createCookie('result2',99,99);
}
if(readCookie("result3") === "undefined" || readCookie("result3") == undefined){
    createCookie('result3',99,99);
}

var results=[
    parseInt(readCookie("result1")),
    parseInt(readCookie("result2")),
    parseInt(readCookie("result3"))
];
refreshResults();
for(var btn of levelBtn){
    btn.onclick=function(){

        level = this.innerHTML;

        if(level === "Noob"){
            limit = limitNoob;
        } else if(level === "PGM"){
            limit = limitPgm;
        }

        playGame();
        tofind=Math.floor(Math.random() * limit + 1);

        //console.log("Goal: "+tofind);
    }
}
propositionBtn.onclick=function(){
    if(proposition.value > 0 && proposition.value <= limit){
        alerts.classList.add('is-hide');
        alerts.classList.remove('is-show');
        listNumberContent.classList.add('is-show');
        listNumberContent.classList.remove('is-hide');
        counter++;
        tries=maxTry-counter;
        if(proposition.value > tofind && tries > 0){
            setMessage(tries)
            result.innerHTML="Le chiffre proposé est trop grand, "+message;
            listNumber.push(proposition.value);
            showNumbers();

        } else if (proposition.value < tofind && tries > 0){
            setMessage(tries)
            result.innerHTML="Le chiffre proposé est trop petit, "+message;
            listNumber.push(proposition.value);
            showNumbers();
        } else if (proposition.value == tofind && tries >= 0){
            tries=0;
            togggleVisibility(formContent);
            togggleVisibility(replay);
            listNumber.push(proposition.value);
            showNumbers(true);
            setResults(counter);
            results=[
                parseInt(readCookie("result1")),
                parseInt(readCookie("result2")),
                parseInt(readCookie("result3"))
            ];
            refreshResults();
            if(counter === 1){
                result.innerHTML=`Vous avez gagné ! En ${counter} essai`;
            } else {
                result.innerHTML=`Vous avez gagné ! En ${counter} essais`;
            }
        } else {
            result.innerHTML="Désolé vous avez perdu, le chiffre correct était le " + tofind;
            listNumber.push(proposition.value);
            showNumbers();
            togggleVisibility(formContent);
            togggleVisibility(replay);
        }
    } else{
        alerts.classList.add('is-show');
        alerts.classList.remove('is-hide');
    }
};

document.getElementById("replayBtn").onclick=function(){
    counter=0;
    maxTry=8;
    tries=maxTry-counter;
    playGame();

    togggleVisibility(replay);
    togggleVisibility(listNumberContent);
    togggleVisibility(formContent);
    listNumber=[];
    result.innerHTML='';
    showNumbers();
    proposition.value="";
};


function setMessage(tries){
    if(tries==1){
        message=`il vous reste ${tries} essai`;
    } else{
        message=`il vous reste ${tries} essais`;
    }
}

function togggleVisibility(e){
    e.classList.toggle('is-hide');
    e.classList.toggle('is-show');
}

function showNumbers(){
    document.getElementById("listNumber").innerHTML="";
    for(ar of listNumber){
        var li = document.createElement("li");
        li.setAttribute("class","list-group-item");
        li.innerHTML=ar;
        document.getElementById("listNumber").appendChild(li);
    }
}
function playGame(){

    togggleVisibility(levelContent);
    togggleVisibility(formContent);
    document.getElementById("instructions").innerHTML= "<h3>Entrez un nombre entre 1 et "+limit+"</h3>";
}


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
function setResults(counter){

    if(counter <= parseInt(results[0])){

        createCookie("result1",counter,99);
        createCookie("result2",parseInt(results[0]),99);
        createCookie("result3",parseInt(results[1]),99);

    } else if(counter <= results[1]){
        createCookie("result2",counter,99);
        createCookie("result3",parseInt(results[1]),99);

    } else if(counter <= parseInt(results[2])){
        createCookie("result3",counter,99);

    }
}
function refreshResults(){
    document.getElementById("charts").innerHTML=" ";
    for(var chart of results){
        if(chart != 99){
            var li = document.createElement("li");
            li.setAttribute("class","list-group-item");
            li.innerHTML=chart+' essais';
            document.getElementById("charts").appendChild(li);
        }
    }
}


document.getElementById('resetCookie').onclick=function(){
    createCookie('result1',99,99);
    createCookie('result2',99,99);
    createCookie('result3',99,99);
    document.getElementById("charts").innerHTML=" ";
}
