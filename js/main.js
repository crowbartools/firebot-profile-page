// Headers for ajax calls.
function setHeader(xhr) {
    xhr.setRequestHeader('Client-ID', '8682f64ae59cbcba5cd701c205b54b04a424b46ca064e563');
}

// Lookup channel and parse data into variables
function channelLookup(username){   
    $.ajax({
        url: "https://Mixer.com/api/v1/channels/" + username,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        success: function(data){
            // User Info
            let uUsername = data.user.username;
            let uSocial = data.user.social;
            let uAvatarURL = data.user.avatarUrl;

            // Avatar
            $('.profile-image img').attr('src',uAvatarURL);
            $('.profile-image a').attr('href', "https://mixer.com/" + uUsername);
            $('.cLink').attr('href', 'https://mixer.com/' + uUsername); 
            $('.profile-name').text(uUsername);
            
            // Social Media
            $.each(uSocial, function(k,v){
                if(k !== "verified"){
                    let template = `
                        <a href="${v}" class="${k}" target="_blank">
                            ${k}
                        </a>
                    `;

                    $('.profile-social').append(template);
                }
            })
        }
    })
}

function tabChooser(query){
    // Plugin is weird, have to select by number order.
    // Default to commands.
    let tab = 1;

    switch(query) {
        case "quotes":
            tab = 2;
            break;
        default:
            // code block
    }

    $('.tabs').tabslet({
        active: tab
    });
}

function formatStreamerData(callback){
    getStreamerData(function(streamData){
        let streamer = streamData.owner;
        if(streamer != null){
            $('.hero-title').text(streamer + '\'s Profile');
    
            // Pull profile info.
            channelLookup(streamer);
        } else {
            $('.hero-title').text('Profile');
        }

        callback(streamData);
    });
}

function initCommandsList(streamData){
    let values = streamData.commands.allowedCmds.map(function(cmd){
        if(cmd.trigger == null || cmd.trigger == undefined){
            cmd.trigger = "No trigger.";
        } else {
            cmd.trigger = decodeURIComponent(cmd.trigger);
        }
        if(cmd.description == null || cmd.description == undefined){
            cmd.description = "No description."
        }
        return cmd;
    });

    let template = "<li class='command'><div class='trigger' style='font-weight:bold;'></div><div class='description'></div></li>";

    let options = {
        valueNames: [ 'trigger', 'description' ],
        item: template,
        pagination: true,
        page: 25
    };

    let commandsList = new List('commandsList', options, values);
}

function initQuotesList(streamData){
    let values = streamData.quotes.quotes.map(function(quote){
        if(quote.text == null || quote.text == undefined){
            quote.text = "No text.";
        } else {
            quote.text = "\""+decodeURIComponent(quote.text)+"\"";
        }
        if(quote.originator == null || quote.originator == undefined){
            quote.originator = "N/A";
        }
        if(quote.game == null || quote.game == undefined){
            quote.game = "No game.";
        } else {
            quote.game = "["+decodeURIComponent(quote.game)+"]";
        }
        if(quote.createdAt == null || quote.createdAt == undefined){
            quote.createdAt = "N/A";
        } else {
            let date = new Date(quote.createdAt);
            quote.createdAt = date.toLocaleString();
        }
        if(quote.id == null || quote.id == undefined){
            quote.id = "N/A";
        } else {
            quote.id = "ID: " + quote.id;
        }
        return quote;
    });
    let template = "<li class='quotes'><div class='id'></div><div class='text' style='font-weight:bold;'></div><div class='originator'></div><div class='creator'></div><div class='game'></div><div class='createdAt'></div></li>";

    let options = {
        valueNames: [ 'text', 'originator', 'game', 'createdAt', 'id' ],
        item: template,
        pagination: true,
        page: 25
    };

    let quotesList = new List('quotesList', options, values);
}


$(document).ready(function(){
    formatStreamerData(function(streamData){
        // Set the correct tab.
        tabChooser(streamData.profilePage);

        // Init lists.
        initCommandsList(streamData);
        initQuotesList(streamData);
    });
})
