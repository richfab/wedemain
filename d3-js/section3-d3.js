var consommationAmpoule = 60;

(function() {
    
    //recupere les donnees
    d3.csv("data/section3.csv", function(d) {
        return {
            name: d.name,
            dataConsommation: +d.dataConsommation //convert to number
        };
    }, function(error, dataset) {
        
        // this function will be run everytime we mouse over an element
        var changeWebsite = function(d) {
            
            //on remet tous les noms des sites en normal
            $(".section3-websiteLi").removeClass("selected");
            
            //on selectionne le site correspondant
            $(this).addClass("selected");
            
            //on change les données
            //le nom du site selectionné
            $("#section3-selectedWebsite").text(d.name);
            //sa consammation
            $("#section3-valeurConsommation").text(d.dataConsommation);
            //les ampoules que cela représente
            var nombreAmpoules = dataNumberToNice(d.dataConsommation/consommationAmpoule);
            $("#section3-nombreAmpoules").text(nombreAmpoules);
            
            
        };
        
        var sortedDataset = dataset.sort(function(a,b){ 
            return a.dataConsommation - b.dataConsommation; 
        });
        
        var scale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) { return d.dataConsommation; })]) //definition du domaine (input) 
                .range([chartColors[2],chartColors[0]]); //definition de l'affichage (output)
        
        var websiteLis = d3.select("#section3-webisteUl").selectAll("li")
                .data(sortedDataset)
                .enter()
                .append("li");
        
        websiteLis
                .text(function(d){
                    return d.name;
        })
                .attr("class", "section3-websiteLi website")
                .on("mouseover", changeWebsite);
        
        //selectionne le premier site
        changeWebsite(dataset[0]);
        $('#section3-webisteUl li:first').addClass('selected');
    });
    
})();