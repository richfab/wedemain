(function() {
    
    var circonferenceTerre = 40075;
    
    //variable pour ne lancer l'animation de la carte que une fois la limite visible
    var mapHasBeenShowed = false;
    
    $(window).bind("scroll", function(event) {
        
        if(!mapHasBeenShowed){
            
            $("#section4-map-limit:in-viewport").each(function() {
                mapHasBeenShowed = true;
                mapInit();
                $("#section4-websiteLi1").mouseover();
            });
            
        }
    });
    
    var nantes = {lat: 47.2309954, lon: -1.5626992};
    
    //variable de durée d'animation em ms
    var animationDuration = 2000;
    
    function mapInit(){
        
        var mapHeight = $(window).height()/2.25;
        
        $("#section4-map").height(mapHeight);
        $("#section4-map").width(mapHeight*2);
        
        var map = new Datamap({
            
            element: document.getElementById('section4-map'),
            
            fills: {
                defaultFill: '#285C68', //any hex, color name or rgb/rgba value
                cityFill: 'white'
            },
            geographyConfig: {
                borderWidth: 1,
                borderColor: '#285C68',
                popupOnHover: false, //disable the popup while hovering
                highlightOnHover: false
            }
            
        });
        
        var changeWebsiteMap = function(dataUrl, index){
            
            //recupere les donnees
            d3.csv(dataUrl, function(d) {
                return {
                    value: +d.value,
                    iso3: d.iso3,
                    latitude: d.lat,
                    longitude: d.lon,
                    name: d.name,
                    radius: 5,
                    yeild: 400
                };
            }, function(error, cities) {
                
                //draw bubbles for bombs
                map.bubbles(cities, {
                    borderWidth: 2,
                    fillKey: 'cityFill',
                    borderColor: chartColors[index],
                    popupOnHover: true,
                    popupTemplate: function (geo, data) { 
                        return ['<div class="hoverinfo"><strong>' +  data.name +'</strong>',
                            '<br/>' +  data.value + ' mWh',
                            '</div>'].join('');
                    },
                    fillOpacity: 0.75,
                    highlightOnHover: true,
                    highlightFillColor: "grey",
                    highlightBorderColor: chartColors[index],
                    highlightBorderWidth: 2,
                    highlightFillOpacity: 0.85
                });
                
                var arcs = [];
                for(var i in cities){
                    arcs[i] = {
                        origin: {
                            latitude: nantes.lat,
                            longitude: nantes.lon
                        },
                        destination: {
                            latitude: cities[i].latitude,
                            longitude: cities[i].longitude
                        }
                    };
                }
                
                var arcsBack = [];
                for(var i in cities){
                    arcsBack[i] = {
                        destination: {
                            latitude: nantes.lat,
                            longitude: nantes.lon
                        },
                        origin: {
                            latitude: cities[i].latitude,
                            longitude: cities[i].longitude
                        }
                    };
                }
                
                arcOptions = {
                    strokeWidth: 2, 
                    strokeColor: chartColors[index], 
                    arcSharpness: 0.6, 
                    animationSpeed: animationDuration
                };
                
                map.arc(arcs, arcOptions);
                
                setTimeout(function(){
                    
                    map.arc([]);
                    map.arc(arcsBack, arcOptions);
                    
                }, animationDuration);
                
            });
        };
        
        //ajout de l'événement du clic sur un site web
        $("#section4-websiteUl li").each(function(){
            $(this).mouseover(
                    function() {
                        changeWebsiteMap($(this).attr('data-url'),$(this).attr('data-index'));
                
                //le nom du site est mis en valeur
                $("#section4-websiteUl span").removeClass('selected');
                $(this).children("span").addClass('selected');
                
                //les donnees sont mises a jour
                $("#section4-distance").text(dataNumberToNice($(this).attr('distance')));
                $("#section4-terre-lune").text(dataNumberToNice($(this).attr('distance')/circonferenceTerre));
            });
        });
        
    }
    
})();