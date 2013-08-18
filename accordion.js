var english=0;

function changeState(e){
    if(document.getElementById(e+"-content").style.display=="none"){
        open(e);
    }else{
        close(e);
    }
}

function changeEnglish(){
    if (english==0){
        english=1;
        open("english");
    }
    else{
        english=0;
        close("english");
    }
}

function open(o){
    document.getElementById(o+"-content").style.display="block";
}

function close(o){
    document.getElementById(o+"-content").style.display="none";
}