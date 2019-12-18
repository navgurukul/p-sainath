
var DEBUG = false;
var testBaseUrl = 'http://join.navgurukul.org/k/'

if (!DEBUG) {
    var base_url= 'http://join.navgurukul.org/api/helpline/register_exotel_call';
} else {
    var base_url= 'http://localhost:3000/helpline/register_exotel_call';
}

$('#getLink').click( function() {
    $.get(base_url, querydata(),
    
    (data, resp) => {
        $("#testLink").val(`${testBaseUrl}${data.key}`);
        $('#testLink').select();
        document.execCommand("copy");
        
        $(document).ready(function() {
            setTimeout(function(){ 
                var x = document.getElementById("snackbar");
                x.className = "show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }, 1000)
        });
    });
});


$('#giveTest').click( function() {
    $.get(base_url, querydata(),
    
    (data, resp) => {
        var win = window.open(`${testBaseUrl}${data.key}`, '_blank');
        if (win) {
            win.focus(); //Browser has allowed it to be opened
        } else {
            alert('Please allow popups for this website'); //Browser has blocked it
        }
    });
});

function querydata() {
    var mobileNumber = '0'+ $("#mobile").val();
    return {
        ngCallType: "getEnrolmentKey",
        From: mobileNumber,
    }
}