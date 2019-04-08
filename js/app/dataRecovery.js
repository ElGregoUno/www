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

