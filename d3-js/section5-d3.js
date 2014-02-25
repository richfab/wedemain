var consommationAmpoule = 60;

(function() {
    
    //recupere les donnees
    d3.csv("data/section5.csv", function(d) {
        return {
            name: d.name,
            dataConsommation: +d.dataConsommation //convert to number
        };
    }, function(error, dataset) {
        
        // this function will be run everytime we mouse over an element
        var changeWebsite = function(d) {
            
            //on remet tous les noms des sites en normal
            $("#section5-place-Ul li").removeClass("selected");
            
            //on selectionne le site correspondant
            $(this).addClass("selected");
            
            //on deplace le chevron
            $(".section5-websiteLi img.chevron-slector").css("visibility","hidden");
            $(this).children("img").css("visibility","visible");
            
            //on change les données
            //sa consammation
            $("#section5-dataConsommation-number").text(dataNumberToNice(d.dataConsommation));
            //les ampoules que cela représente
            var nombreAmpoules = d.dataConsommation/consommationAmpoule;
            $("#section5-dataAmpoules-number").text(dataNumberToNice(nombreAmpoules));
            
            
        };
        
        var sortedDataset = dataset.sort(function(a,b){ 
            return a.dataConsommation - b.dataConsommation; 
        });
        
        var websiteLis = d3.select("#section5-place-Ul").selectAll("li")
                .data(sortedDataset)
                .enter()
                .append("li");
        
        websiteLis
                .html(function(d){
                    return '<img class="chevron-slector" src="img/chevron-droit.png"/><span class="website">'+d.name+'</span>';
        })
                .attr("class", function(d,i){
                    
                    if(i===0){
                        float = "left";
                    }
                    else if(i===2){
                        float = "right";
                    }
                    return "section5-websiteLi website "+ float;
                })
                .attr("class", function(d,i){
                    var tooltip = "";
                    var title = "";
                    var float = "";
                    if(i===0){
                        float = " left";
                    }
                    if(i===1){
                        tooltip = " tooltip";
                        title = "400 habitants";
                    }
                    else if(i===2){
                        tooltip = " tooltip";
                        title = "100 000 habitants";
                        float = " right";
                    }
                    return "section5-websiteLi website"+ float + tooltip;
                })
                .attr("title", function(d,i){
                    var title = "";
                    if(i===1){
                        title = "400 habitants";
                    }
                    else if(i===2){
                        title = "100 000 habitants";
                    }
                    return title;
                })
                .on("mouseover", changeWebsite);
        
                $('.tooltip').tooltipster({maxWidth:200,position:'bottom'});
        
        //selectionne le premier site
        changeWebsite(dataset[0]);
        $('#section5-place-Ul li:first').addClass('selected');
        $('#section5-place-Ul li:first').children("img").css("visibility","visible");
    });
    
})();