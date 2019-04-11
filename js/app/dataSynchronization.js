var root = "http://gregpoc.florian-mudespacher.ch/";

function checkBands()
{
	var isSame = true;
	if(checkConnection())
	{
		$.ajax({ 
			type: "POST", 
			//headers: {"Authorization": "Token API_KEY"}, 
			url: root + "api/band/read.php",
			success: function (data) { 
				var bands = data;	

				db.transaction(function (tx) {
					tx.executeSql('SELECT * FROM band', [], 
						function (tx, results) {
							var localBands = results.rows;
							var length;
							
							if(localBands.length >  bands.length)
							{
								isSame = false;
							}
							else if (localBands.length <  bands.length)
							{
								isSame = false;
							}
							else if (localBands.length ==  bands.length)
							{
								for (var i = 0; i < localBands.length; i++)
								{
									if(localBands[i].idBand == bands[i].idBand &&
									   localBands[i].name == bands[i].name &&
									   localBands[i].logo == bands[i].logo)
									{
										isSame = true;
									}
									else
									{
										isSame = false;
										break;
									}
								}
							}
							
							if(isSame !== true)
							{
								document.getElementById("bands").innerHTML = "";
								dropBandTable();
								createBandTable();
								fillLocalBandTable(bands);
								
								showBands();
								
							}
						}
					);
				});
			}, 
			error: function(request) { 
				console.log("Error " + request["status"] + ": " + request["statusText"]);
			} 
		}); 
	}
}

function checkEvents()
{
	var isSame = true;
	if(checkConnection())
	{
		$.ajax({ 
			type: "POST", 
			//headers: {"Authorization": "Token API_KEY"}, 
			url: root + "api/event/read.php",
			success: function (data) { 
				var events = data;	

				db.transaction(function (tx) {
					tx.executeSql('SELECT * FROM band', [], 
						function (tx, results) {
							var localEvents = results.rows;
							var length;
							
							if(localEvents.length >  events.length)
							{
								isSame = false;
							}
							else if (localEvents.length <  events.length)
							{
								isSame = false;
							}
							else if (localEvents.length ==  events.length)
							{
								for (var i = 0; i < localEvents.length; i++)
								{
									if(localEvents[i].idEvent == events[i].idEvent &&
									   localEvents[i].eventName == events[i].eventName &&
									   localEvents[i].dateTime == events[i].dateTime &&
									   localEvents[i].imagePath == events[i].imagePath &&
									   localEvents[i].isPublic == events[i].isPublic)
									{
										isSame = true;
									}
									else
									{
										isSame = false;
										break;
									}
								}
							}
							
							if(isSame !== true)
							{
								document.getElementById("events").innerHTML = "";
								dropEventTable();
								createEventTable();
								fillLocalEventTable(events);
								
								showConcertAndFestival();
								
							}
						}
					);
				});
				
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

function getConcertAndFestival()
{
    $.ajax({ 
        url: root + "api/event/read.php",
        type : 'POST',
        //headers: {"Authorization": "Token API_KEY"}, 
        
        success: function (data) { 
            
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

