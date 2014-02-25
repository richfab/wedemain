(function() {
    
    //variables d'opacité des bars
    var maxOpacity = 1;
    var minOpacity = 0.75;
    
    var unselectedColor = "#285C68";
    
    //variable de durée d'animation em ms
    var animationDuration = 1000;
    var delayDuration = 50;
    
    //recupere les donnees
    d3.csv("data/section2.csv", function(d) {
        return {
            name: d.name,
            dataQuantiteDonnees: +d.dataQuantiteDonnees, //convert to number
            dataConsommation: +d.dataConsommation, //convert to number
            viewsPerDay: +d.viewsPerDay //convert to number
        };
    }, function(error, dataset) {
	
        //variable pour ne lancer la transition du chart1 que une fois
        var chartHasBeenShowed = false;
        
        $(window).bind("scroll", function(event) {
            
            if(!chartHasBeenShowed){
                
                $("#section2-bar-chart-limit:in-viewport").each(function() {
                    chartHasBeenShowed = true;
                    //barChart init
                    init();
                    displayFirstWebsite();
                });
                
            }
        });
        
        function init(){
            
            var barPad = 5;
            var barWidth = 50;
            
            var w = (barWidth+barPad)*dataset.length;
            var h = 150;
            
            var scale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) { return d.dataQuantiteDonnees; })]) //definition du domaine (input) 
                    .range([0, h]); //definiation de l'affichage (output)
            
            var svg = d3.select("#section2-bar-chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
            
            var bars = svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("rect")
                    .on("mouseover", changeWebsite);
            
            var websiteLis = d3.select("#section2-webisteUl").selectAll("li")
                    .data(dataset)
                    .enter()
                    .append("li");
            
            //nom du site
            websiteLis
                    .html(
                            function(d,i){
                                return '<span class="website site'+i+'">'+d.name+'</span><span class="tooltip" title="'+dataNumberToNice(d.viewsPerDay)+' pages vues par jour"></span>';
                            });
                            
            $('.tooltip').tooltipster({maxWidth:200,position:'bottom',iconDesktop:true,iconTouch:true});
            
            //données et evts
            websiteLis
                    .attr("class","section2-websiteLi")
                    .attr("index", function(d, i) {
                        return i;
            })
                    .attr("data-quantite", function(d, i) {
                        return d.dataQuantiteDonnees;
            })
                    .attr("data-consommation", function(d, i) {
                        return d.dataConsommation;
            })
                    .on("mouseover", changeWebsite);
            
            var websiteLisbis = d3.select("#section2bis-webisteUl").selectAll("li")
                    .data(dataset)
                    .enter()
                    .append("li");
            
            //nom du site
            websiteLisbis
                    .html(
                            function(d,i){
                                return '<span class="website site'+i+'">'+d.name+'</span><span class="tooltip" title="'+dataNumberToNice(d.viewsPerDay)+' pages vues par jour"></span>';
                            });
                            
            $('.tooltip').tooltipster({maxWidth:200,position:'bottom',iconDesktop:true,iconTouch:true});
            
            //données et evts
            websiteLisbis
                    .attr("class","section2-websiteLi")
                    .attr("index", function(d, i) {
                        return i;
            })
                    .attr("data-quantite", function(d, i) {
                        return d.dataQuantiteDonnees;
            })
                    .attr("data-consommation", function(d, i) {
                        return d.dataConsommation;
            })
                    .on("mouseover", changeWebsite);
            
            
            
            
            bars
                    .attr("x", function(d, i) {
                        return i * (w / dataset.length);
            })
                    .attr("fill",function(d,i){
                        if(i===0){
                            return chartColors[0];
                        }
                        else{
                            return unselectedColor;
                        }
            })
                    .attr("index", function(d, i) {
                        return [i];
            })
                    .attr("class","bar")
                    .attr("width", w / dataset.length - barPad)
                    .attr("height",0)		
                    .attr("y",h)
                    .transition()
                    .delay(function (d,i){ return i * delayDuration;})
                    .duration(animationDuration)
                    .attr("y", function(d) { return h-scale(d.dataQuantiteDonnees); })
                    .attr("height", function(d) {
                        return scale(d.dataQuantiteDonnees);
            });
            
            //on indique que la transition est terminée
            var barTimeout = setTimeout(function() {
                bars.attr("class","bar animationComplete");
            }, animationDuration+delayDuration*dataset.length);
        }
        
        //////////////////SUNBURST/////////////////
        
        var datasetInit = [0,0,0];
        var convertedDataSet = [];
        
        for(var i in dataset){
            convertedDataSet[i] = dataset[2-i].dataConsommation;
        }
        
        var sunburstWidth = 230,
        sunburstHeight = 230;
        
        // set constants
        var PI = Math.PI;
        var arcMin = 15;        // inner radius of the first arc
        var arcWidth = 30;      // width + pad
        var arcPad = 5;
        
        // Create the SVG container, and apply a transform such that the origin is the
        // center of the canvas. This way, we don't need to position arcs individually.
        var svg = d3.select("#section2-sunburst-chart").append("svg")
                .attr("width", sunburstWidth)
                .attr("height", sunburstHeight)
                .append("g")
                .attr("transform", "translate(" + sunburstWidth / 2 + "," + sunburstHeight / 2 + ")");
        
        var render = function(dataset, isInit) {
            
            //definition de l'echelle
            var scale = d3.scale.linear()
                    .domain([0, d3.max(convertedDataSet)*1.5]) //definition du domaine (input)
                    .range([0, 2*Math.PI]); //definiation de l'affichage (output)	
            
            // arc accessor
            //  d and i are automatically passed to accessor functions,
            //  with d being the data and i the index of the data
            var drawArc = d3.svg.arc()
                    .innerRadius(function(d, i) {
                        return  arcMin + i*(arcWidth) + arcPad;
            })
                    .outerRadius(function(d, i) {
                        return arcMin + (i+1)*(arcWidth);
            })
                    .startAngle(0)
                    .endAngle(function(d) {
                        return -scale(d);
            });
            
            // bind the data
            var arcs = svg.selectAll("path").data(dataset)
                    .on("mouseover", changeWebsite);
            
            // update red arcs
            
            // custom tween function used by the attrTween method to draw the intermediary steps.
            //  attrTween will actually pass the data, index, and attribute value of the current
            //  DOM object to this function, but for our purposes, we can omit the attribute value
            function arc2Tween(d, indx) {
                
                var interp = d3.interpolate(this._current, d);    // this will return an interpolater
                //  function that returns values
                //  between 'this._current' and 'd'
                //  given an input between 0 and 1
                
                this._current = d;                    // update this._current to match the new value
                
                return function(t) {                  // returns a function that attrTween calls with
                    //  a time input between 0-1; 0 as the start time,
                    //  and 1 being the end of the animation
                    
                    var tmp = interp(t);                // use the time to get an interpolated value
                    //  (between this._current and d)
                    
                    return drawArc(tmp, indx);          // pass this new information to the accessor
                    //  function to calculate the path points.
                    //  make sure sure you return this.
                    
                    // n.b. we need to manually pass along the
                    //  index to drawArc so since the calculation of
                    //  the radii depend on knowing the index. if your
                    //  accessor function does not require knowing the
                    //  index, you can omit this argument
                }
            };
            
            
            
            // *** update arcs -- using attrTeen and a custom tween function ***
            arcs.transition()
                    .delay(function (d,i){ return i * delayDuration;})
                    .duration(animationDuration)
                    .attr("fill", function(d,i){
                        if(i===2){
                            return chartColors[0];
                        }
                        else{
                            return unselectedColor;
                        }
                    })
                    .attrTween("d", arc2Tween);
            
            // drawing the red arcs for new data
            //  similar to above, except for 
            arcs.enter().append("svg:path")
                    .attr("fill", function(d,i){
                        if(i===2){
                            return chartColors[0];
                        }
                        else{
                            return unselectedColor;
                        }
                    })
                    .attr("index", function(d, i) {
                        return 2-i;
            })
                    .attr("class","arc")
                    .attr("d", drawArc)
                    .each(function(d){
                        this._current = d;
            })
            
            //on indique que la transition est terminée (si les donnees ne sont pas celles d'init)
            if(!isInit){
                var arcTimeout = setTimeout(function() {
                    arcs.attr("class","arc animationComplete");
                }, animationDuration+delayDuration*dataset.length);
            }
            
        }
        
        render(datasetInit, true);
        
        //variable pour ne lancer la transition du chart1 que une fois
        var arcChartHasBeenShowed = false;
        
        $(window).bind("scroll", function(event) {
            
            if(!arcChartHasBeenShowed){
                
                $("#section2-sunburst-chart-limit:in-viewport").each(function() {
                    arcChartHasBeenShowed = true;
                    render(convertedDataSet, false);
                    displayFirstWebsite();
                });
                
            }
        });
        
        //////////////////BOTH//////////////////
        
        // this function will be run everytime we mouse over an element
        var changeWebsite = function() {
            
            //on remet toutes les bars a l'opacité normale
            var bars = d3.selectAll(".bar.animationComplete");
            bars.transition().duration(300)
                    .attr("fill", unselectedColor);
            
            //on selectionne la bar correspondante
            var bar = d3.select(".bar.animationComplete[index='"+$(this).attr("index")+"']");
            bar.transition().duration(300)
                    .attr("fill", chartColors[$(this).attr("index")]);
            
            //on remet toutes les arcs a l'opacité normale
            var arcs = d3.selectAll(".arc.animationComplete");
            arcs.transition().duration(300)
                    .attr("fill", unselectedColor);
            
            //on selectionne l'arc correspondant
            var arc = d3.select(".arc.animationComplete[index='"+$(this).attr("index")+"']");
            arc.transition().duration(300)
                    .attr("fill", chartColors[$(this).attr("index")]);
            
            //on remet tous les noms des sites en normal
            $(".section2-websiteLi span").removeClass("selected");
            
            //on selectionne le site correspondant
            var websiteLiName = $(".section2-websiteLi[index='"+$(this).attr("index")+"'] span");
            websiteLiName.addClass("selected");
            
            //on change les données
            var websiteLi = $(".section2-websiteLi[index='"+$(this).attr("index")+"']");
            
            $("#section2-dataQuantiteDonnees").text(dataNumberToNice(websiteLi.attr("data-quantite")));
            $("#section2-dataConsommation").text(dataNumberToNice(websiteLi.attr("data-consommation")));
            $("#section2-bar-chart-usb-number").text(dataNumberToNice(websiteLi.attr("data-quantite")/1000));
            $('#section2-bar-chart-ampoule-number').text(dataNumberToNice(websiteLi.attr("data-consommation")/60));
        };
        
        function displayFirstWebsite(){
            //on n'affiche pas l'arc et la bar en opacite max car la transition est encore en cours
            
            //on remet tous les noms des sites en normal
            $(".section2-websiteLi span").removeClass("selected");
            
            //on selectionne le site correspondant
            var websiteLiName = $(".section2-websiteLi[index='0'] span");
            websiteLiName.addClass("selected");
            
            //on change les données
             var websiteLi = $(".section2-websiteLi[index='0']");
            
            $("#section2-dataConsommation").text(dataNumberToNice(websiteLi.attr("data-consommation")));
            $("#section2-dataQuantiteDonnees").text(dataNumberToNice(websiteLi.attr("data-quantite")));
            $("#section2-bar-chart-usb-number").text(dataNumberToNice((websiteLi.attr("data-quantite")/1000)));
            $('#section2-bar-chart-ampoule-number').text(dataNumberToNice((websiteLi.attr("data-consommation")/60)));
        }
    });
    
})();