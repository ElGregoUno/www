var isOnline;
var db = openDatabase('c33lj_gregpoc', '1.0', 'c33lj_gregpoc_db', 10 * 1024 * 1024);

function ChangeState(online) {
	isOnline = online;
    console.log(isOnline);
	if(online)
	{
		localStorage.setItem("isOnline", 0);
	}
	else
	{
		localStorage.setItem("isOnline", 1);
	}
}

function checkConnection()
{
	return navigator.onLine;
}

function dropQueries()
{	
	db.transaction(function (tx) {
			tx.executeSql('DROP TABLE event',[], 
				function(tx,results){console.log("Successfully events dropped")},
				function(tx,error){console.log("Could not drop events")}
			);
    });
	
	db.transaction(function (tx) {
		tx.executeSql("DROP TABLE bandHasEvent",[], 
			function(tx,results){console.log("Successfully bandHasEvent created")},
			function(tx,error){console.log("Could not create bandHasEvent")}
		);
    });
	
	db.transaction(function (tx) {
		tx.executeSql("DROP TABLE eventHasBand",[], 
			function(tx,results){console.log("Successfully eventHasBand created")},
			function(tx,error){console.log("Could not create eventHasBand")}
		);
    });
}

function createLocalDatabase()
{   
	dropQueries();
	
	
    db.transaction(function (tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS band (idBand integer primary key, name text not null, logo text null, description text not null, creationDate text null, password text not null)",[], 
			function(tx,results){console.log("Successfully bands created")},
			function(tx,error){console.log("Could not create bands")}
		);
    });
	
	db.transaction(function (tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS event (idEvent integer primary key, eventName text not null, address text null, dateTime text not null, eventDescription text null, mandatory integer not null, imagePath text not null, isPublic integer not null, idEventGenre integer not null)",[], 
			function(tx,results){console.log("Successfully event created")},
			function(tx,error){console.log("Could not create event")}
		);
    });
	
	db.transaction(function (tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS bandHasEvent (idBand integer not null, idEvent integer not null, schedule text not null, eventName text not null, address text not null, dateTime text not null, eventDescription text not null, mandatory integer not null, imagePath text not null, type text not null, PRIMARY KEY(idBand, idEvent))",[], 
			function(tx,results){console.log("Successfully bandHasEvent created")},
			function(tx,error){console.log("Could not create bandHasEvent")}
		);
    });
	
	db.transaction(function (tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS eventHasBand (idEvent integer not null, idBand integer not null, schedule text not null, name text not null, description text not null, logo text not null, PRIMARY KEY(idEvent, idBand))",[], 
			function(tx,results){console.log("Successfully eventHasBand created")},
			function(tx,error){console.log("Could not create eventHasBand")}
		);
    });
	
	getBands();
	getConcertAndFestival();
	getEventsBands();
}

function fillLocalBandTable(bands)
{
	db.transaction(function (tx) {
		for (var i = 0; i < bands.length; i++) {
			tx.executeSql('INSERT INTO band (idBand, name, logo, description, creationDate, password) VALUES (' + bands[i].idBand + ', "' + bands[i].name + '", "' + bands[i].logo + '", "' + bands[i].description + '", "' + bands[i].creationDate + '", "' + bands[i].password + '")',[], 
				function(tx,results){console.log("Successfully bands filled")},
				function(tx,error){console.log("Could not fill bands")}
			);
		}
    });
}

function fillLocalEventTable(events)
{
	
	db.transaction(function (tx) {
		for (var i = 0; i < events.length; i++) 
		{
			tx.executeSql('INSERT INTO event (idEvent, eventName, address, dateTime, eventDescription, mandatory, imagePath, isPublic, idEventGenre) VALUES (' + events[i].idEvent + ', "' + events[i].eventName + '", "' + events[i].adress + '", "' + events[i].dateTime + '", "' + events[i].eventDescription + '", ' + events[i].mandatory + ', "' + events[i].imagePath + '", 1, "' + events[i].type + '")',[], 
				function(tx,results){console.log("Successfully events filled")},
				function(tx,error){console.log("Could not fill events")}
			);
		}
    });
}

function fillLocalEventForBand(events)
{
	db.transaction(function (tx) {
		for (var i = 0; i < events.length; i++) {
			tx.executeSql('INSERT INTO bandHasEvent (idBand, idEvent, schedule, eventName, address, dateTime, eventDescription, mandatory, imagePath, type) VALUES (' + events[i].idBand + ',' + events[i].idEvent + ', "' + events[i].schedule + '","' + events[i].eventName + '", "' + events[i].address + '", "' + events[i].dateTime + '", "' + events[i].eventDescription + '", ' + events[i].mandatory + ', "' + events[i].imagePath + '", "' + events[i].type + '")',[], 
				function(tx,results){console.log("Successfully bandHasEvent filled")},
				function(tx,error){console.log("Could not fill bandHasEvent")}
			);
		}
    });
}



function fillLocalBandForEvent(bands)
{
	db.transaction(function (tx) {
		for (var i = 0; i < bands.length; i++) {
			var query = `INSERT INTO eventHasBand (idEvent, idBand, schedule, name, description, logo) VALUES ( ${bands[i].idEvent}, ${bands[i].idBand}, "${bands[i].schedule}", "${bands[i].name}", "${bands[i].description}", "${bands[i].logo}")`;
			tx.executeSql(query,[], 
				function(tx,results){console.log("Successfully eventHasBand filled")},
				function(tx,error){console.log(error)}
			);
		}
    });
}
