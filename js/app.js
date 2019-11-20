var levelContent = document.getElementById("levelContent");
var result = document.getElementById("result");
var proposition = document.getElementById("proposition");
var propositionBtn = document.getElementById("propositionBtn");
var alert = document.getElementById("alert");
var replay = document.getElementById("replay");
var formContent = document.getElementById("formContent");
var levelBtn = document.getElementsByClassName("level");
var listNumberContent = document.getElementById("listNumberContent");
var level="";
var tofind;
var limit;
var limitNoob=5;
var limitPgm=10;
var counter=0;
var maxTry=3;
var tries=maxTry-counter;
var listNumber=[];
for(var btn of levelBtn){
    btn.onclick=function(){
        level = this.innerHTML;
        if(level === "Noob"){
            limit = limitNoob;
        } else if(level === "PGM"){
            limit = limitPgm;
        }
        playGame();
    }
}
propositionBtn.onclick=function(){
    if(proposition.value > 0 && proposition.value <= limit){
        alert.classList.add('is-hide');
        alert.classList.remove('is-show');
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
        alert.classList.add('is-show');
        alert.classList.remove('is-hide');
    }
};

document.getElementById("replayBtn").onclick=function(){
    playGame();
    togggleVisibility(formContent);
    togggleVisibility(replay);
    listNumber=[];
    result.innerHTML='';
    showNumbers();
    counter=0;
    maxTry=3;
    tries=maxTry-counter;
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
    tofind=Math.floor(Math.random() * limit + 1);

    levelContent.innerHTML= "<h3>Entrez un nombre entre 1 et "+limit+"</h3>";

    var form = document.getElementById("form");
    form.style.cssText=("display:block");
    console.log("Goal: "+tofind);
}