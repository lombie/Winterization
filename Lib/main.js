 
    // Load the JSON file(s)
    queue()
        .defer(d3.json, "Lib/turkey.json") // Load TotalPoC.json
		.defer(d3.json, "Lib/NonSatelliteCities.json") // Load NonSatelliteCities.json
		.defer(d3.json, "Lib/SatelliteCities.json") // Load NonSatelliteCities.json
        .await(loadGeom); 
		
    function loadGeom(error, TotalPoC, NonSatelliteCities, SatelliteCities){
       
        var TotalPoC = L.geoJson(TotalPoC.features, {
            style: densityStyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<div id='tipContainer'><div id='tipLocation'><b>"+ feature.properties.name +"</div>"+"<div id='tipKey'>"+"All: "+ feature.properties.TotalPoC+'<br />'+"Afghanistan: "+ feature.properties.Afghan+'<br />'+"Iran: "+ feature.properties.Iranian+'<br />'+"Iraq: "+ feature.properties.Iraqi+'<br />'+"Somali: "+ feature.properties.Somali+'<br />'+"Others: "+ feature.properties.Others +"</div><div class='tipClear'></div></div>");
            }
        });
		
		var NonSatelliteCities = L.geoJson(NonSatelliteCities.features, {
            style: densityStyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<div id='tipContainer'><div id='tipLocation'><b>"+ feature.properties.name +"</div>"+"<div id='tipKey'>"+"All: "+ feature.properties.TotalPoC+'<br />'+"Afghanistan: "+ feature.properties.Afghan+'<br />'+"Iran: "+ feature.properties.Iranian+'<br />'+"Iraq: "+ feature.properties.Iraqi+'<br />'+"Somali: "+ feature.properties.Somali+'<br />'+"Others: "+ feature.properties.Others +"</div><div class='tipClear'></div></div>");
            }
        });
		
		var SatelliteCities = L.geoJson(SatelliteCities.features, {
            style: densityStyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<div id='tipContainer'><div id='tipLocation'><b>"+ feature.properties.name +"</div>"+"<div id='tipKey'>"+"All: "+ feature.properties.TotalPoC+'<br />'+"Afghanistan: "+ feature.properties.Afghan+'<br />'+"Iran: "+ feature.properties.Iranian+'<br />'+"Iraq: "+ feature.properties.Iraqi+'<br />'+"Somali: "+ feature.properties.Somali+'<br />'+"Others: "+ feature.properties.Others +"</div><div class='tipClear'></div></div>");
            }
        });
 
 
        function densityStyle(feature){
            return {
                "fillColor": getColour(feature.properties.TotalPoC), // Call function to get fill colour
                "weight": 2, //
                "opacity": 1, //
                "color": '#000', ///
                "fillOpacity": 0.7 //
            };
        }
 
 

        function getColour(d){
            return d > 12000 ? '#08306b' :
			       d > 10500  ? '#08519c' :
			       d > 9000  ? '#2171b5' :
			       d > 7500  ? '#4292c6' :
			       d > 6000   ? '#6baed6' :
			       d > 4500   ? '#9ecae1' :
			       d > 3000   ? '#c6dbef' :
                   d > 1500   ? '#deebf7' :    
			                  '#f7fbff';
		}
 
 
        // Define a basemap and min/max Zoom
        var map = L.map('map', {zoomControl:false, attributionControl: false } ).setView([39.364, 35.673], 6);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibG9tYmllIiwiYSI6IlAyVlJfU3MifQ.gMTKJU_NsIvulLTttw4-XA', {
			maxZoom: 12,
            attribution: 'Map: <a href="http://www.unhcr.org.tr">UNHCR Turkey</a> Data: ',
			id: 'lombie.nb901i12'
		}).addTo(map);
        TotalPoC.addTo(map);
		
		// Define the layer controls:
        var control = L.control.layers(
                {
                     "Persons of Concern in Turkey" : TotalPoC
					,"Persons of Concern in Satellite Cities" : SatelliteCities
					,"Persons of Concern in Non-Satellite Cities" : NonSatelliteCities
                }, null , {collapsed:false});
 
        // Add the map controls to the map
        control.addTo(map);
		
		$.getJSON("Lib/asam.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'Images/asam.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });
			
		$.getJSON("Lib/hrdf.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'Images/hrdf.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });	
        
        $.getJSON("Lib/legalaid.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'Images/ibc.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });	
        
        $.getJSON("Lib/tihv.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'Images/stl.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });	
        
        $.getJSON("Lib/kader.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'Images/TRC.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });	
        
        
        //Legend

        var legend = L.control({position: 'bottomleft'}); 
        
		legend.onAdd = function (map) {
            
			var div = L.DomUtil.create('div', 'info legend'),
				labels = ['<strong> LEGEND</strong>', "<img src='Images/legend/asam.png' height=20>ASAM", "<img src='Images/legend/hrdf.png' height=20>HRDF (IKGV)", "<img src='Images/legend/ibc.png' height=20>Legal Aid", "<img src='Images/legend/stl.png' height=20>TIHV", "<img src='Images/legend/TRC.png' height=20>Kader/ KDD"],
				from, to;

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);
        
    }
    