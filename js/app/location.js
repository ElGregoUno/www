
function goToIndex()
{
    window.open('index.html', '_self', 'location=yes');
}

function goToBandDetails(idBand)
{
    localStorage.setItem("idBand", idBand);
    window.open('bandDetails.html', '_self', 'location=yes');
}


