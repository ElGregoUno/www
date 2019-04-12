var root = "http://gregpoc.florian-mudespacher.ch/";

function getBands()
{
	if(parseInt(localStorage.isOnline) == 0)
	{
		$.ajax({ 
			type: "POST", 
			//headers: {"Authorization": "Token API_KEY"}, 
			url: root + "api/band/read.php",
			success: function (data) { 
				var bands = data;			
				
				fillLocalBandTable(bands);
			}, 
			error: function(request) { 
				console.log("Error " + request["status"] + ": " + request["statusText"]);
			} 
		}); 
	}
	
}


function getEventsBands()
{
    $.ajax({ 
        url : root + "api/event_has_band/read.php",
        type : 'POST',
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            if(data.length > 0)
            {
                var results = data;
				
				
				fillLocalEventForBand(results);
				fillLocalBandForEvent(results);
                //showConcertAndFestivalIncoming();
            }
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

function getUsers()
{
    $.ajax({ 
        url : root + "api/user/read.php",
        type : 'POST',
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            if(data.length > 0)
            {
                var results = data;
				
				console.log(results);
				fillLocalUserTable(results);
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
        url: root + "api/event/read.php",
        type : 'POST',
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            var today = new Date().toJSON(); 
            today = new Date().toJSON().substring(0,19).replace('T',' ');
            
            var events = data;
            
            fillLocalEventTable(events);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

function getMembersOfBand()
{
    $.ajax({ 
        url: root + "api/member/read.php",
        type : 'POST',
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            var members = data;
            fillLocalMemberTable(members);
            //showMembersOfBand(members);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

function getMembersInstrumentByBand()
{
	$.ajax({ 
        url: root + "api/member_has_instrument/read.php",
        type : 'POST',
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            var members = data;
            fillLocalMembersInstrument(members);
            //showMembersOfBand(members);
        }, 
        error: function(request) { 
            console.log("Error " + request["status"] + ": " + request["statusText"]);
        } 
    }); 
}

