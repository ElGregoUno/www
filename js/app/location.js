
function goToIndex()
{
    window.open('index.html', '_self', 'location=yes');
}

function goToBandDetails(idBand)
{
    localStorage.setItem("idBand", idBand);
    window.open('bandDetails.html', '_self', 'location=yes');
}

function goToEvents()
{
	window.open('events.html', '_self', 'location=yes');
}

function goToEventDetails(idEvent)
{
    localStorage.setItem("idEvent", idEvent);
    window.open('eventDetails.html', '_self', 'location=yes');
}

function goToMemberDetails(idBand, idUser)
{
    localStorage.setItem("idBand", idBand);
    localStorage.setItem("idUser", idUser);
    window.open('memberDetails.html', '_self', 'location=yes');
}

function goToSign()
{
	window.open('signIn.html', '_self', 'location=yes');
}




