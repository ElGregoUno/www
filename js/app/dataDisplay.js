var $imgFolder = "./img/";
const IMG_MAX_WIDTH = "200px";
function showBands(bands)
{
    if(bands !== null)
    {
        var div = document.createElement("div");
        div.setAttribute("class", "list media-list");
        document.getElementById("bands").appendChild(div);
        var ul = document.createElement("ul");
        div.append(ul);
        
        for (var i = 0; i < bands.length; i++) {
            var li = document.createElement("li");
            ul.appendChild(li);
            
            var a = document.createElement("a");
            a.setAttribute("class", "item-link item-content");
            a.setAttribute("onclick", "goToBandDetails(" + bands[i].idBand + ")");
            li.appendChild(a);
            
            var div1 = document.createElement("div");
            div1.setAttribute("class", "item-media");
            a.appendChild(div1);
            
            var img = document.createElement("img");
            img.setAttribute("src", $imgFolder + bands[i].logo);
            img.style.maxWidth = IMG_MAX_WIDTH;
            img.setAttribute("width", "80%");
            img.setAttribute("alt", "");
            div1.appendChild(img);
            
            var div2 = document.createElement("div");
            div2.setAttribute("class", "item-inner");
            a.appendChild(div2);
            
            var div3 = document.createElement("div");
            div3.setAttribute("class", "item-title-row");
            div2.appendChild(div3);
            
            var h2 = document.createElement("h2");
            div3.appendChild(h2);
            
            var textnode = document.createTextNode(bands[i].name); 
            h2.appendChild(textnode);
            
            var div4 = document.createElement("div");
            div4.setAttribute("class", "item-title");
            div3.appendChild(div4);
            
            var div5 = document.createElement("div");
            div5.setAttribute("class", "item-text");
            div2.appendChild(div5);
            
            var textnode2 = document.createTextNode(bands[i].description); 
            div5.appendChild(textnode2);
        }
    }
}

function showBand(band)
{
                
    if(band !== null)
    {
        var div = document.createElement("div");
        document.getElementById("bands").appendChild(div);

        var div1 = document.createElement("div");
        div.appendChild(div1);

        var img = document.createElement("img");
        img.setAttribute("src", $imgFolder + band.logo);
        img.setAttribute("width", "100%");
        img.setAttribute("alt", "");
        div1.appendChild(img);

        var  h1 = document.createElement("h1");
        h1.setAttribute("id", "bandName");
        h1.setAttribute("class", "text-align-center");
        div1.appendChild(h1);

        var textnode = document.createTextNode(band.name); 
        h1.appendChild(textnode);

        var div2 = document.createElement("div");
        div2.setAttribute("id", "details");
        div.appendChild(div2);

        var div3 = document.createElement("div");
        div3.setAttribute("class", "");
        div2.appendChild(div3);

        var p = document.createElement("p");
        p.setAttribute("id", "description");
        p.setAttribute("class", "");
        div3.appendChild(p);

        var textnode2 = document.createTextNode(band.description);
        p.appendChild(textnode2);

        var p2 = document.createElement("p");
        p2.setAttribute("id", "date");
        div2.appendChild(p2);

        var h3 = document.createElement("h3");
        p2.appendChild(h3);

        var textnode3 = document.createTextNode("Creation date : " + band.creationDate);
        h3.appendChild(textnode3);
		
		getIncomingEventsByIdBand(band.idBand);

        
        
        getPastEventsByIdBand(band.idBand);
		getMembersOfBand(band.idBand);

    }
    
}

function showConcertAndFestival(idDiv, events)
{
    if(events !== null)
    {
        var div = document.createElement("div");
        div.setAttribute("class", "list media-list");
        document.getElementById(idDiv).appendChild(div);
        
        var h2 = document.createElement("h2");
        h2.setAttribute("class", "titleEventForBand");
        div.appendChild(h2);        
        
        switch(idDiv)
        {
            case "eventsIncoming":
                var textnode = document.createTextNode("Events incoming");
                h2.appendChild(textnode);                
                break;
        
            case "pastEvents":
                var textnode = document.createTextNode("Past events");
                h2.appendChild(textnode);
                break;
        }
        
        var ul = document.createElement("ul");
        div.append(ul);
        
        for (var i = 0; i < events.length; i++) {
            var li = document.createElement("li");
            ul.appendChild(li);
            
            var a = document.createElement("a");
            a.setAttribute("class", "item-link item-content");
            a.setAttribute("onclick", "goToEventDetails(" + events[i].idEvent + ")");
            li.appendChild(a);
            
            var div1 = document.createElement("div");
            div1.setAttribute("class", "item-media");
            a.appendChild(div1);
            
            var img = document.createElement("img");
            img.style.maxWidth = IMG_MAX_WIDTH;
            img.setAttribute("src", $imgFolder + events[i].imagePath);
            img.setAttribute("width", "70%");
            img.setAttribute("alt", "");            
            
            div1.appendChild(img);
            
            var div2 = document.createElement("div");
            div2.setAttribute("class", "eventTitle");
            div2.setAttribute("class", "item-inner");
            a.appendChild(div2);
            
            var div3 = document.createElement("div");
            div3.setAttribute("class", "item-title-row");
            div2.appendChild(div3);
            
            var h2 = document.createElement("h3");
            div3.appendChild(h2);
            
            var textnode = document.createTextNode(events[i].dateTime + " " +  events[i].eventName); 
            h2.appendChild(textnode);
            
            var div4 = document.createElement("div");
            div4.setAttribute("class", "item-title");
            div3.appendChild(div4);
            
            var div5 = document.createElement("div");
            div5.setAttribute("class", "item-text");
            div2.appendChild(div5);
            
            var textnode2 = document.createTextNode(events[i].eventDescription); 
            div5.appendChild(textnode2);
        }
    }    
}

function showEvent(event)
{
    
    if(event !== null)
    {
        var div = document.createElement("div");
        document.getElementById("event").appendChild(div);

        var div1 = document.createElement("div");
        div.appendChild(div1);

        var img = document.createElement("img");
        img.setAttribute("src", $imgFolder + event.imagePath);
        img.setAttribute("width", "100%");
        img.setAttribute("alt", "");
        div1.appendChild(img);

        var  h1 = document.createElement("h1");
        h1.setAttribute("id", "eventName");
        h1.setAttribute("class", "text-align-center");
        div1.appendChild(h1);

        var textnode = document.createTextNode(event.eventName); 
        h1.appendChild(textnode);

        var div2 = document.createElement("div");
        div2.setAttribute("id", "details");
        div.appendChild(div2);

        var div3 = document.createElement("div");
        div3.setAttribute("class", "");
        div2.appendChild(div3);

        var p = document.createElement("p");
        p.setAttribute("id", "description");
        p.setAttribute("class", "");
        div3.appendChild(p);

        var textnode2 = document.createTextNode(event.eventDescription);
        p.appendChild(textnode2);

        var p2 = document.createElement("p");
        p2.setAttribute("id", "date");
        div2.appendChild(p2);

        var h3 = document.createElement("h3");
        p2.appendChild(h3);

        var textnode3 = document.createTextNode("Date of event : " + event.dateTime);
        h3.appendChild(textnode3);
        
        var p3 = document.createElement("p");
        p3.setAttribute("id", "date");
        div2.appendChild(p3);
        
        var h4 = document.createElement("h3");
        p3.appendChild(h4);
        var textnode4 = document.createTextNode("Address : ");
        h4.appendChild(textnode4);
        
        var textnode5 = document.createTextNode(event.address);
        p3.appendChild(textnode5);
		
		getBandsForOneEvent(event.idEvent);
        
    }
}

function showMembersOfBand(members)
{
    if(members !== null)
    {
        var div = document.createElement("div");
        div.setAttribute("class", "list links-list");
        document.getElementById("members").appendChild(div);
        
        var h2 = document.createElement("h2");
        div.appendChild(h2);
        
        var textnode = document.createTextNode("Members");
        h2.appendChild(textnode);
        
        var ul = document.createElement("ul");
        div.appendChild(ul);
        
        for (var i = 0; i < members.length; i++) {
            
            var li = document.createElement("li");
            ul.appendChild(li);
            
            var a = document.createElement("a");
            a.setAttribute("onclick", "goToMemberDetails(" + members[i].idBand + ", "+ members[i].idUser + ")");
            li.appendChild(a);
            
            var textnode2 = document.createTextNode(members[i].lastName + " " + members[i].firstName);
            a.appendChild(textnode2);
            
        }
    }
}

function showBandsForEvent(bands)
{
    
    if(bands !== null)
    {
		
        var div = document.createElement("div");
        div.setAttribute("class", "list media-list");
        document.getElementById("bands").appendChild(div);
        
        var h2 = document.createElement("h2");
        h2.setAttribute("class", "titleEventForBand");
        div.appendChild(h2);        
        
        
        var ul = document.createElement("ul");
        div.append(ul);
        
        for (var i = 0; i < bands.length; i++) {
            var li = document.createElement("li");
            ul.appendChild(li);
            
            var a = document.createElement("a");
            a.setAttribute("class", "item-link item-content");
            a.setAttribute("onclick", "goToBandDetails(" + bands[i].idBand + ")");
            li.appendChild(a);
            
            var div1 = document.createElement("div");
            div1.setAttribute("class", "item-media");
            a.appendChild(div1);
            
            var img = document.createElement("img");
            
            img.setAttribute("src", $imgFolder + bands[i].logo);
            img.style.maxWidth = IMG_MAX_WIDTH;
            img.setAttribute("width", "70%");
            
            img.setAttribute("alt", "");
            
            div1.appendChild(img);
            
            var div2 = document.createElement("div");
            div2.setAttribute("class", "eventTitle");
            div2.setAttribute("class", "item-inner");
            a.appendChild(div2);
            
            var div3 = document.createElement("div");
            div3.setAttribute("class", "item-title-row");
            div2.appendChild(div3);
            
            var h2 = document.createElement("h3");
            div3.appendChild(h2);
            
            var textnode = document.createTextNode(bands[i].name + " " + bands[i].schedule); 
            h2.appendChild(textnode);
            
            var div4 = document.createElement("div");
            div4.setAttribute("class", "item-title");
            div3.appendChild(div4);
            
            var div5 = document.createElement("div");
            div5.setAttribute("class", "item-text");
            div2.appendChild(div5);
            
            var textnode2 = document.createTextNode(bands[i].description); 
            div5.appendChild(textnode2);
        }
    }
}
