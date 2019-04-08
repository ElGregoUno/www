var root = "http://gregpoc.florian-mudespacher.ch/";

function getBands()
{
    $.ajax({ 
        type: "POST", 
        //headers: {"Authorization": "Token API_KEY"}, 
        url: root + "api/band/read.php",
        success: function (data) { 
            var bands = data;
            
            showBands(bands);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

function getBand(idBand)
{
    $.ajax({ 
        url: root + "api/band/read_one.php",
        type : 'POST',
        data : 'idBand=' + idBand,
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            var band = data;
            
            showBand(band);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

function getEventsIncoming()
{
	
	$.ajax({ 
        url: root + "api/event/read_concert_festival_incoming.php",
        type : 'POST',
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            var today = new Date().toJSON(); 
            today = new Date().toJSON().substring(0,19).replace('T',' ');
            
            var events = data;
            var eventsIncoming = []; 
            
            for (var i = 0; i < events.length; i++) {
                if (events[i].dateTime >= today)
                {
                    eventsIncoming.push(events[i]);
                }
            }
            
            showConcertAndFestival("events", eventsIncoming);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
	});
}	

function getConcertAndFestival()
{
    $.ajax({ 
        url: root + "api/event/read_concert_festival_incoming.php",
        type : 'POST',
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            var today = new Date().toJSON(); 
            today = new Date().toJSON().substring(0,19).replace('T',' ');
            
            var events = data;
            var eventsIncoming = []; 
            
            for (var i = 0; i < events.length; i++) {
                if (events[i].dateTime >= today)
                {
                    eventsIncoming.push(events[i]);
                }
            }
            
            showConcertAndFestival("events", eventsIncoming);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}