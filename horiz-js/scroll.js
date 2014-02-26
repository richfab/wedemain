//indique si le travelling est avant ou arriere
var isZoomIn = true;
//indique si le viewport est sur la partie horizontale
var isHoriz = false;

//taille du travelling
var travellingHeight = 0;


// Shorthand for $( document ).ready()
$(function() {
    //on diminue la vitesse du scroll
    reverseScrolling(true);
    
    //on ajoute le listener sur les points qui changeront leur classe
    $(".point-navigation").click(function(){
        //on cache les tooltips
        $(".tooltip").tooltipster('hide');
    });
    
    //listeners pour les points de navigation lorsque le titre et la page de partage passent dans le viewport
    $(window).bind("scroll", function(event) {
        $("#titre:in-viewport").each(function() {
            if((isZoomIn) && (!isHoriz)){
                $(".point-navigation").removeClass("selected");
                $("#pn-titre").addClass("selected");
            }
        });
        
        $("#conclusion:in-viewport").each(function() {
            if((!isZoomIn) && (!isHoriz)){
                $(".point-navigation").removeClass("selected");
                $("#pn-conclu").addClass("selected");
            }
        });
    });
});

//fonction qui permet de relever le l'intro-outro
function leverTitre(){
    //+60px pour passer la premiere section (last.png)
    var titreHeight = $(".intro-outro").height();
    $("html, body").animate({scrollTop:titreHeight+60}, 1000);
    //on affiche l'aide a la navigation
    if(isZoomIn){
        $("#navigation-help").addClass("opened");
    }
}

//fonction qui permet de se rendre a une section de n'importe ou
function scrollToSection(section){
    if(!isHoriz){
        var documentHeight = $(document).height();
        $("html, body").animate({scrollTop:documentHeight}, 1000, function(){
            activateHorizontalScroll(section);
        });
    }
    else{
        $("html, body").animate({scrollLeft:section.offset().left}, 1000);
    }   
}

//fonction qui permet de se rendre a un texte d'outro de n'importe ou en specifiant la distance de scroll vertical
function scrollToTextOutro(distToScroll){
    
    if(distToScroll===-1){
        var distToScrollUp = 0;
    }
    else{
        var distToScrollUp = distToScroll + $(".intro-outro").height();
    }
    
    if(!isHoriz){
        if(isZoomIn){
            var documentHeight = $(document).height();
            $("html, body").animate({scrollTop:documentHeight}, 1000,
            function(){
                activateHorizontalScroll($("#post-last-section"),distToScrollUp,false);
            });
        }
        else{
            $("html, body").animate({scrollTop:distToScrollUp}, 1000);
        }  
    }
    else{
        activateHorizontalScroll($("#post-last-section"),distToScrollUp,false);
    }
}

//fonction qui permet de se rendre a un texte d'intro de n'importe ou en specifiant la distance de scroll vertical
function scrollToTextIntro(distToScroll){
    
    if(distToScroll===-1){
        var distToScrollUp = 0;
    }
    else{
        var distToScrollUp = distToScroll + $(".intro-outro").height();
    }
    
    if(!isHoriz){
        if(!isZoomIn){
            var documentHeight = $(document).height();
            $("html, body").animate({scrollTop:documentHeight}, 1000,
            function(){
                activateHorizontalScroll($("#pre-presentation"),distToScrollUp,true);
            });
        }
        else{
            $("html, body").animate({scrollTop:distToScrollUp}, 1000);
        }  
    }
    else{
        activateHorizontalScroll($("#pre-presentation"),distToScrollUp,true);
    }
}

//cette fonction clique sur pnToClick in si le travelling est en zoom avant, pnToClickOut sinon
function scrollZoomInOrOut(pnToClickIn, pnToClickOut){
    if(isZoomIn){
        pnToClickIn.click();
    }
    else{
        pnToClickOut.click();
    }
}

//si l'élément responsable du clic n'est ni un a, ni un li, ni un span on clique le bouton passé en parametre
//function clickToGoToNextSection(event, pnToClick){
//    if((event.target.nodeName!='A')&&(event.target.nodeName!='LI')&&(event.target.nodeName!='SPAN')&&(event.target.nodeName!='IMG')){
//        pnToClick.click();
//    }
//}

//fonction qui permet d'afficher les boutons continuer et retour
function displayButtonToHoriz(){
    if(!isHoriz){
        if(isZoomIn){
            $("#bouton-continuer").fadeIn();
        }
        else{
            $("#bouton-retour").fadeIn();
        }
    }
}

//fonction qui permet d'activer le scroll horizontal
//parametre section (optionnel) : permet de se rendre a la section après avoir activé le scroll horiz
//paremetre distanceToScrollUp (optionnel) : permet de scroller de la distance voulue apres l'activation du scroll horiz et le deplacement a la section
function activateHorizontalScroll(section,distToScrollUp,wantToScrollUpZoomIn){
    
    isHoriz = true;
    
    //on cache le titre et la conclusion, slide le travelling a gauche et affiche l'horizontal par la droite
    var directionShow = 'right';
    if(!isZoomIn){
        directionShow = 'left';
    }
    
    //on s'assure d'avoir fermer les aides à la navigation
    $("#navigation-help, #navigation-help-out").removeClass("opened");
    //on reaffiche le tooltip qui supprime la scroll bar horizontale
    $('#tooltip-hide-scroll').tooltipster('show');
    
    $(".intro-outro").hide();
    $(".infobulle").removeClass("opened");
    $("#travelling").fadeOut(200);
    $("#horizontal").show('slide', { direction: directionShow }, 1500,
    function(){
        if(section!==undefined){
            $("html, body").animate({scrollLeft:section.offset().left}, 1000, 
            function (){
                if(distToScrollUp!==undefined){
                    //active le scrolling avant ou arriere
                    activateTravelling(wantToScrollUpZoomIn);
                    $("html, body").animate({scrollTop:distToScrollUp}, 1000);
                }
            });
        }
    });
    
    //on cache les boutons continuer
    $("#bouton-continuer").fadeOut();
    $("#bouton-retour").fadeOut();
    
    //la page reprend sa hauteur initiale
    $("body").css("height","inherit");
    
    //le scroll vertical modifie la position horizontale du viewport
    $("html, body").mousewheel(function(event, delta) {
        this.scrollLeft -= (delta * 30);
        event.preventDefault();
    });
    
    //force la position du scroll a 100px de la gauche si on vient du zoomIn
    if(isZoomIn){
        $(window).scrollLeft(100);
    }

    //listeners pour les points de navigation lorsque les sections passe dans le viewport
    $(window).bind("scroll", function(event) {
        $("#transition5:in-viewport").each(function() {
            $(".point-navigation").removeClass("selected");
            $("#pn-transition5").addClass("selected");
        });
        $("#section3:in-viewport").each(function() {
            $(".point-navigation").removeClass("selected");
            $("#pn-section3").addClass("selected");
        });
         $("#transition2:in-viewport").each(function() {
            $(".point-navigation").removeClass("selected");
            $("#pn-transition2").addClass("selected");
        });
        $("#transition3:in-viewport").each(function() {
            $(".point-navigation").removeClass("selected");
            $("#pn-transition3").addClass("selected");
        });
        $("#transition4:in-viewport").each(function() {
            $(".point-navigation").removeClass("selected");
            $("#pn-transition4").addClass("selected");
        });
        $("#section1:in-viewport").each(function() {
            $(".point-navigation").removeClass("selected");
            $("#pn-section1").addClass("selected");
        });
        $("#presentation:in-viewport").each(function() {
            $(".point-navigation").removeClass("selected");
            $("#pn-presentation").addClass("selected");
        });
    });
    
}

function activateTravelling(wantZoomIn){
    
    isHoriz = false;
    
    isZoomIn = wantZoomIn;
    reverseScrolling(wantZoomIn);
    
    $("body").css("height",travellingHeight);
    
    $(window).scrollTop(travellingHeight-100);
    
    //on cache le titre, slide le travelling a gauche et affiche l'horizontal par la droite
    var introOutroToShow;
    if(wantZoomIn){
        introOutroToShow = $("#titre");
    }
    else{
        introOutroToShow = $("#conclusion");
    }
    introOutroToShow.show();
    
    //on affiche l'aide a la navigation du zoom out
    if(!wantZoomIn){
        $("#navigation-help-out").addClass("opened");
    }
    
    window.setTimeout(function(){  
        $("#travelling").fadeIn(1000);
        $("#horizontal").fadeOut(1000);
    }, 200);
    
}

//cette fonction inverse le sens du scroll 
function reverseScrolling(wantZoomIn){
    
    //facteur qui inverse le sens du scroll
    var factor = -1;
    
    //si on est dans le travelling avant, on remet le sens du scroll a sa valeur par défaut
    if(wantZoomIn){
        factor = 1;
    }
    
    $("html, body").unbind('mousewheel');
    $("html, body").mousewheel(function(event, delta) {
        this.scrollTop -= factor*(delta * 30);
        event.preventDefault();
    });
}