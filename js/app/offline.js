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

function createBandTable()
{
	db.transaction(function (tx) {
		const query = "CREATE TABLE IF NOT EXISTS band (idBand integer primary key, name text not null, logo text null, description text not null, creationDate text null, password text not null)";
		tx.executeSql(query,[],
			//function(tx,results){console.log("Successfully bands created")},
			//function(tx,error){console.log(error)}
		);
    });
}

function dropBandTable()
{
	db.transaction(function (tx) {
			tx.executeSql('DROP TABLE band',[], 
				//function(tx,results){console.log("Successfully events dropped")},
				//function(tx,error){console.log("Could not drop events")}
			);
    });
}

function createEventTable()
{
	db.transaction(function (tx) {
		const query = "CREATE TABLE IF NOT EXISTS event (idEvent integer primary key, eventName text not null, address text not null, dateTime text not null, eventDescription text null, mandatory integer not null, imagePath text not null, isPublic integer not null, type text not null)";
		tx.executeSql(query,[],
			//function(tx,results){console.log("Successfully event created")},
			//function(tx,error){console.log(error)}
		);
    });
}

function dropEventTable()
{
	db.transaction(function (tx) {
			tx.executeSql('DROP TABLE event',[], 
				//function(tx,results){console.log("Successfully events dropped")},
				//function(tx,error){console.log("Could not drop events")}
			);
    });
}

function dropQueries()
{	
	
	dropBandTable();
	
	dropEventTable();
	
	db.transaction(function (tx) {
			tx.executeSql('DROP TABLE member',[], 
				//function(tx,results){console.log("Successfully members dropped")},
				//function(tx,error){console.log("Could not drop members")}
			);
    });
	
	db.transaction(function (tx) {
		tx.executeSql("DROP TABLE bandHasEvent",[], 
			//function(tx,results){console.log("Successfully bandHasEvent created")},
			//function(tx,error){console.log("Could not create bandHasEvent")}
		);
    });
	
	db.transaction(function (tx) {
		tx.executeSql("DROP TABLE eventHasBand",[], 
			//function(tx,results){console.log("Successfully eventHasBand created")},
			//function(tx,error){console.log("Could not create eventHasBand")}
		);
    });
}

function createLocalDatabase()
{   
	dropQueries();
	
	createBandTable();
    
	
	createEventTable();
	
	db.transaction(function (tx) {
		const query = "CREATE TABLE IF NOT EXISTS bandHasEvent (idBand integer not null, idEvent integer not null, schedule text not null, eventName text not null, address text not null, dateTime text not null, eventDescription text not null, mandatory integer not null, imagePath text not null, isPublic integer not null, type text not null, PRIMARY KEY(idBand, idEvent))";
		tx.executeSql(query,[],
			//function(tx,results){console.log("Successfully bandHasEvent created")},
			//function(tx,error){console.log(error)}
		);
    });
	
	db.transaction(function (tx) {
		const query = "CREATE TABLE IF NOT EXISTS eventHasBand (idEvent integer not null, idBand integer not null, schedule text not null, name text not null, description text not null, logo text not null, PRIMARY KEY(idEvent, idBand))";
		tx.executeSql(query,[], 
			//function(tx,results){console.log("Successfully eventHasBand created")},
			//function(tx,error){console.log(error)}
		);
    });
	
	db.transaction(function (tx) {
		const query = "CREATE TABLE IF NOT EXISTS member (idUser integer not null, idBand integer not null, firstName text not null, lastName text not null, imagePath text null, membershipDate text not null, name text not null, description text not null, isAdmin integer not null, PRIMARY KEY(idUser, idBand))";
		tx.executeSql(query,[], 
			//function(tx,results){console.log("Successfully member created")},
			///function(tx,error){console.log(error)}
		);
    });
	
	db.transaction(function (tx) {
		const query = "CREATE TABLE IF NOT EXISTS memberHasInstrument (idBand integer not null, idUser integer not null, idInstrument integer not null, firstName text not null, lastName text not null, description text not null, imagePath text null, membershipDate text not null, name text not null,  model text null, PRIMARY KEY(idBand, idUser, idInstrument))";
		tx.executeSql(query,[], 
			//function(tx,results){console.log("Successfully memberHasInstrument created")},
			//function(tx,error){console.log(error)}
		);
    });
	
	getBands();
	getConcertAndFestival();
	getEventsBands();
	getMembersOfBand();
	getMembersInstrumentByBand();
}

function fillLocalBandTable(bands)
{
	

	
	db.transaction(function (tx) {
		for (var i = 0; i < bands.length; i++) {
			
			var description = '';
			
			for (var j = 0; j < bands[i].description.length; j++)
			{
				if(bands[i].description[j] == '"')
				{
					description += '';
					
				}
				else
				{
					description += bands[i].description[j];
				}
			
			}
			
			const query = `INSERT INTO band (idBand, name, logo, description, creationDate, password) VALUES (${bands[i].idBand}, "${bands[i].name}", "${bands[i].logo}", "${description}", "${bands[i].creationDate}", "${bands[i].password}")`;
			tx.executeSql(query,[], 
				//function(tx,results){console.log("Successfully bands filled")},
				//function(tx,error){console.log(error)}
			);
		}
    });
}

function fillLocalEventTable(events)
{
	
	db.transaction(function (tx) {
		for (var i = 0; i < events.length; i++) 
		{
			
			var description = '';
			
			for (var j = 0; j < events[i].eventDescription.length; j++)
			{
				if(events[i].eventDescription[j] == '"')
				{
					description += '';
					
				}
				else
				{
					description += events[i].eventDescription[j];
				}
			
			}
			
			const query = `INSERT INTO event (idEvent, eventName, address, dateTime, eventDescription, mandatory, imagePath, isPublic, type) VALUES (${events[i].idEvent}, "${events[i].eventName}", "${events[i].address}", "${events[i].dateTime}", "${description}", ${events[i].mandatory}, "${events[i].imagePath}", ${events[i].isPublic}, "${events[i].type}")`;
			tx.executeSql(query,[], 
				//function(tx,results){console.log("Successfully events filled")},
				function(tx,error){console.log(error)}
			);
		}
    });
}

function fillLocalEventForBand(events)
{
	db.transaction(function (tx) {
		for (var i = 0; i < events.length; i++) {
			var description = '';
			
			for (var j = 0; j < events[i].eventDescription.length; j++)
			{
				if(events[i].eventDescription[j] == '"')
				{
					description += '';
					
				}
				else
				{
					description += events[i].eventDescription[j];
				}
			
			}
			const query = `INSERT INTO bandHasEvent (idBand, idEvent, schedule, eventName, address, dateTime, eventDescription, mandatory, imagePath, isPublic, type) VALUES (${events[i].idBand}, ${events[i].idEvent}, "${events[i].schedule}", "${events[i].eventName}", "${events[i].address}", "${events[i].dateTime}", "${description}", ${events[i].mandatory}, "${events[i].imagePath}", ${events[i].isPublic}, "${events[i].type}") `;
			tx.executeSql(query,[], 
				//function(tx,results){console.log("Successfully bandHasEvent filled")},
				//function(tx,error){console.log(error)}
			);
		}
    });
}



function fillLocalBandForEvent(bands)
{
	db.transaction(function (tx) {
		for (var i = 0; i < bands.length; i++) {
			const query = `INSERT INTO eventHasBand (idEvent, idBand, schedule, name, description, logo) VALUES ( ${bands[i].idEvent}, ${bands[i].idBand}, "${bands[i].schedule}", "${bands[i].name}", "${bands[i].description}", "${bands[i].logo}")`;
			tx.executeSql(query,[], 
				//function(tx,results){console.log("Successfully eventHasBand filled")},
				//function(tx,error){console.log(error)}
			);
		}
    });
}

function fillLocalMemberTable(members)
{
	
	db.transaction(function (tx) {
		for (var i = 0; i < members.length; i++) {
			var query = `INSERT INTO member (idUser, idBand, firstName, lastName, imagePath, membershipDate, name, description, isAdmin) VALUES ( ${members[i].idUser}, ${members[i].idBand}, "${members[i].firstName}", "${members[i].lastName}", "${members[i].imagePath}", "${members[i].membershipDate}", "${members[i].name}", "${members[i].description}", ${members[i].isAdmin})`;
			tx.executeSql(query,[], 
				//function(tx,results){console.log("Successfully member filled")},
				//function(tx,error){console.log(error)}
			);
		}
    });
}

function fillLocalMembersInstrument(members)
{
	db.transaction(function (tx) {
		for (var i = 0; i < members.length; i++) {
			var query = `INSERT INTO memberHasInstrument (idBand, idUser, idInstrument, firstName, lastName, description, imagePath, membershipDate, name, model) VALUES ( ${members[i].idBand}, ${members[i].idUser}, ${members[i].idInstrument}, "${members[i].firstName}", "${members[i].lastName}", "${members[i].description}", "${members[i].imagePath}", "${members[i].membershipDate}", "${members[i].name}", "${members[i].model}")`;
			tx.executeSql(query,[], 
				//function(tx,results){console.log("Successfully memberHasInstrument filled")},
				//function(tx,error){console.log(error)}
			);
		}
    });
}