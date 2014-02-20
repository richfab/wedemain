var chartColors = ['#A93721','#CF8F0B','#FCCE19'];

(function() {
    
    //variable pour ne lancer la transition du chart1 que une fois
    var chartHasBeenShowed = false;
    
    $(window).bind("scroll", function(event) {
        
        if(!chartHasBeenShowed){
            
            $("#section1-chart-limit:in-viewport").each(function() {
                chartHasBeenShowed = true;
                init();
            });
            
        }
    });
    
    function init(){
        
        var clientColors = ['#A93721','#CF8F0B','#FCCE19'],
        trajetColors = ['#c2442f','#f2a80e','#ffe627'],
        serveurColors = ['#591f17','#ab760b','#9c8011'];
        
        var dispatch = d3.dispatch("load", "statechange");
        
        var groups = [
            "client",
            "trajet",
            "serveur"
        ];
        
        var stateById;
        
        d3.csv("data/section1.csv", type, function(error, states) {
            if (error) throw error;
            stateById = d3.map();
            states.forEach(function(d) { stateById.set(d.name, d); });
            dispatch.load(stateById);
            //recupere le premier site
            var firstWebsite = $("#section1-websiteList a:first");
            //le graphe est initialisé sur ce site
            dispatch.statechange(stateById.get(firstWebsite.text()));
        });
        
        //ajout de l'événement du clic sur un site web
        $("#section1-websiteList a").each(function(){
            $(this).mouseover(
                    function() {
                        dispatch.statechange(stateById.get($(this).text()));
                
                //le nom du site est mis en valeur
                $("#section1-websiteList a").removeClass('selected');
                $(this).addClass('selected');
            });
        });
        
        // A bar chart to show total population; uses the "bar" namespace.
        dispatch.on("load.bar", function(stateById) {
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 80 - margin.left - margin.right,
            height = 460 - margin.top - margin.bottom;
            
            var y = d3.scale.linear()
                    .domain([0, d3.max(stateById.values(), function(d) { return d.total; })])
                    .rangeRound([height, 0])
                    .nice();
        });
        
        // A pie chart to show population by age group; uses the "pie" namespace.
        dispatch.on("load.pie", function(stateById) {
            var width = 500,
            height = 460,
            radius = Math.min(width, height) / 2;
            
            var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(radius - 100);
            
            var pi = Math.PI;
            
            var pie = d3.layout.pie()
                    .value(function(d) { return d.value; })
                    .startAngle(-90 * (pi/180))
                    .endAngle(90 * (pi/180))
                    .sort(null);
            
            var svg = d3.select("#section1-chartConsommation").append("svg")
                    .attr("width", width)
                    .attr("height", height/2)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
            var path = svg.selectAll("path")
                    .data(groups)
                    .enter().append("path")
                    .on("mouseout",function(){
                         $(".section1-legend-name").removeClass('selected');
            })
                    .attr("class", function(d,i){
                        switch (i){
                            case 0: 
                        return "client";
                    case 1: 
                        return "trajet";
                    case 2: 
                        return "serveur";
                }
            })
                    .each(function() { this._current = {startAngle: 0, endAngle: 0}; });
            
            dispatch.on("statechange.pie", function(d) {
                //on remplit chaque section selon le site selectionné
                svg.selectAll(".client").style("fill",clientColors[d.id]);
                svg.selectAll(".trajet").style("fill",trajetColors[d.id]);
                svg.selectAll(".serveur").style("fill",serveurColors[d.id]);
                
                //on met a jour la legende
                $("#section1-legend-color-client").css("background-color",clientColors[d.id]);
                $("#section1-legend-color-trajet").css("background-color",trajetColors[d.id]);
                $("#section1-legend-color-serveur").css("background-color",serveurColors[d.id]);
                
                path.data(pie.value(function(g) { return d[g]; })(groups)).transition()
                        .attrTween("d", function(d) {
                            var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                });
            });
            
            //ajout de l'événement du passage sur une section
            $(".client").mouseover(function(){
                //le nom du site est mis en valeur
                $("#section1-legend-name-client").addClass('selected');
            });
            
            $(".trajet").mouseover(function(){
                //le nom du site est mis en valeur
                $("#section1-legend-name-trajet").addClass('selected');
            });
            
            $(".serveur").mouseover(function(){
                //le nom du site est mis en valeur
                $("#section1-legend-name-serveur").addClass('selected');
            });
            
            
        });
        
        
        // Coerce population counts to numbers and compute total per state.
        function type(d) {
            d.total = d3.sum(groups, function(k) { return d[k] = +d[k]; });
            return d;
        }
    }
})();