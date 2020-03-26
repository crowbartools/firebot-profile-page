function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function getStreamerData(callback){
    let binId = getUrlParameter('id').replace(/[^a-z0-9]/gi,'');
    $.getJSON( "https://bytebin.lucko.me/" + binId, function( data ) {
        callback(data);
        return;
    });
}