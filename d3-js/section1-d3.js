var chartColors = ['#A93721','#CF8F0B','#FCCE19'];

(function() {
    
    //variables d'opacité des bars
    var maxOpacity = 1;
    var minOpacity = 0.75;
    
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
        
        var donutColors = ["#224F56","#285C68","#2F6F75"];
        
        var dispatch = d3.dispatch("load", "statechange");
        
        var groups = [
            "serveur",
            "trajet",
            "client"
        ];
        
        var stateById;
        var scale;
        var percentages = [];
        var percentage;
        
        d3.csv("data/section1.csv", type, function(error, states) {
            if (error) throw error;
            stateById = d3.map();
            states.forEach(function(d) { stateById.set(d.name, d); });
            dispatch.load(stateById);
            dispatch.statechange(stateById.get("MOYENNE"));
            $("#section1-category2").mouseover();
        });
        
        //ajout de l'événement du clic sur un site web
        $("#section1-categoryList a").each(function(){
            $(this).mouseover(
                    function() {
                        
                        $("#section1-categoryList a").removeClass("selected");
                        
                        $(".serveur").css("fill",donutColors[0]);
                        $(".trajet").css("fill",donutColors[1]);
                        $(".client").css("fill",donutColors[2]);
                        
                        if($(this).hasClass("category0")){
                            $(".serveur").css("fill","#FCCE19");
                            percentage.text(Math.round(percentages[0])+"%");
                        }
                        else if($(this).hasClass("category1")){
                            $(".trajet").css("fill","#FCCE19");
                            percentage.text(Math.round(percentages[1])+"%");
                        }
                        else{
                            $(".client").css("fill","#FCCE19");
                            percentage.text(Math.round(percentages[2])+"%");
                        }
                        
                //le nom du site est mis en valeur
                $(this).addClass("selected");
                
            });
        });
        
        // A bar chart to show total population; uses the "bar" namespace.
        dispatch.on("load.bar", function(stateById) {
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 80 - margin.left - margin.right,
            height = 460 - margin.top - margin.bottom;
            
            scale = d3.scale.linear()
                    .domain([0, d3.max(stateById.values(), function(d) { return d.total; })])
                    .range([0, 100]);
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
                    .attr("class", function(d) { return d; })
                    .on("mouseover",function(d,i){
                        switch (i){
                            case 0:
                                $("#section1-category0").mouseover();
                                break;
                            case 1:
                                $("#section1-category1").mouseover();
                                break;
                            case 2:
                                $("#section1-category2").mouseover();
                                break;
                            }
                    })
                    .on("mouseout",function(d){ $(this).attr("class",d.data);})
                    .each(function() { this._current = {startAngle: 0, endAngle: 0}; });
            
            percentage = svg.append("text")
                    .attr("x",-50)
                    .attr("y",-10)
                    .attr("class","section1-percentage");
            
            dispatch.on("statechange.pie", function(d) {
                
                path.data(pie.value(function(g,i) { percentages[i] = scale(d[g]); return d[g]; })(groups)).transition()
                        .attrTween("d", function(d) {
                            var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                });
            });
            
            
        });
        
        
        // Coerce population counts to numbers and compute total per state.
        function type(d) {
            d.total = d3.sum(groups, function(k) { return d[k] = +d[k]; });
            return d;
        }
    }
})();