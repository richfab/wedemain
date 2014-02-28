var consommationAmpoule = 60;

(function() {
    
    //recupere les donnees
    d3.csv("data/section4.csv", function(d) {
        return {
            name: d.name,
            dataConsommation: +d.dataConsommation //convert to number
        };
    }, function(error, dataset) {
        
        // this function will be run everytime we mouse over an element
        var changeWebsite = function(d) {
            
            //on remet tous les noms des sites en normal
            $(".section4-websiteLi").removeClass("selected");
            
            //on selectionne le site correspondant
            $(this).addClass("selected");
            
            //on deplace le chevron
            $(".section4-websiteLi img.chevron-slector").css("visibility","hidden");
            $(this).children("img").css("visibility","visible");
            
            //on change les données
            //le nom du site selectionné
            $("#section4-selectedWebsite").text(d.name);
            //sa consammation
            $("#section4-valeurConsommation").text(d.dataConsommation);
            //les ampoules que cela représente
            var nombreAmpoules = dataNumberToNice(d.dataConsommation/consommationAmpoule);
            $("#section4-nombreAmpoules").text(nombreAmpoules);
            
            
        };
        
        var sortedDataset = dataset.sort(function(a,b){ 
            return b.dataConsommation - a.dataConsommation; 
        });
        
        var scale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) { return d.dataConsommation; })]) //definition du domaine (input) 
                .range([chartColors[2],chartColors[0]]); //definition de l'affichage (output)
        
        var websiteLis = d3.select("#section4-webisteUl").selectAll("li")
                .data(sortedDataset)
                .enter()
                .append("li");
        
        websiteLis
                .html(function(d){
                    return '<img class="chevron-slector" src="img/chevron-droit.png"/> '+d.name;
        })
                .attr("class", "section4-websiteLi website")
                .on("mouseover", changeWebsite);
        
        //selectionne le premier site
        changeWebsite(dataset[0]);
        $('#section4-webisteUl li:first').addClass('selected');
        $('#section4-webisteUl li:first').children("img").css("visibility","visible");
    });
    
})();