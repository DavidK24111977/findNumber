var levelContent = document.getElementById("levelContent");
var result = document.getElementById("result");
var proposition = document.getElementById("proposition");
var propositionBtn = document.getElementById("propositionBtn");
var levelBtn = document.getElementsByClassName("level");
var propositionValue;
var level="";
var tofind;
var limit;
for(var btn of levelBtn){
    btn.onclick=function(){
        level = this.innerHTML;
        if(level === "Noob"){
            limit = 5;
        } else if(level === "PGM"){
            limit = 10;
        }
        tofind=Math.floor(Math.random() * limit + 1);
        var h3=document.createElement("h3");
        levelContent.appendChild(h3);
        levelContent.innerHTML= "<h3>Entrez un nombre entre 1 et "+limit+"</h3>" ;
        var form = document.getElementById("form");
        form.style.cssText=("display:block");
    }
}

propositionBtn.onclick=()=>{
    propositionValue=proposition.value;
    if(propositionValue > tofind){
        result.innerHTML="Le chiffre proposé est trop grand";
    } else if (propositionValue < tofind){
        result.innerHTML="Le chiffre proposé est trop petit";
    } else {
        result.innerHTML="Vous avez gagné !";
    }
};

