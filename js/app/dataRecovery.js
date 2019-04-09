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

function getIncomingEventsByIdBand(idBand)
{
    $.ajax({ 
        url : root + "api/event_has_band/read_events_band.php",
        type : 'POST',
        data : 'idBand=' + idBand, 
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            if(data.length > 0)
            {
                var events = data;
            
                showConcertAndFestival("eventsIncoming", events);
            }
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

function getPastEventsByIdBand(idBand)
{
    $.ajax({ 
        url : root + "api/event_has_band/read_past_events_band.php",
        type : 'POST',
        data : 'idBand=' + idBand, 
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            
            if(data.length > 0)
            {
                var events = data;
            
                showConcertAndFestival("pastEvents", events);
            }
            
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

function getMembersOfBand()
{
    $.ajax({ 
        url: root + "api/member/read_bands_members.php",
        type : 'POST',
        data : 'idBand=' + localStorage.idBand,
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            var members = data;
            
            showMembersOfBand(members);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

function getEvent(idEvent)
{
    $.ajax({ 
        url : root + "api/event/read_one.php",
        type : 'POST',
        data : 'idEvent=' + idEvent,
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            var event = data;
            
            showEvent(event);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

function getBandsForOneEvent(idEvent)
{
    $.ajax({ 
        url : root + "api/event_has_band/read_bands_event.php",
        type : 'POST',
        data : 'idEvent=' + idEvent, 
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            
            if(data.length > 0)
            {
                var bands = data;
            
                showBandsForEvent(bands);
            }
            
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}