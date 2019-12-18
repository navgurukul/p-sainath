var exotelCallURL = 'http://localhost:3000/helpline/register_exotel_call';

$('#getLink').click( function() {
    var mobileNumber = '0'+ $("#mobile").val();
    $.get(exotelCallURL, {
        ngCallType: "getEnrolmentKey",
        From: mobileNumber,
    },
    (data, resp) => {
        $("#testLink").val(`http://join.navgurukul.org/k/${data.key}`);
        $('#testLink').select();
        document.execCommand("copy");
        
        $(document).ready(function() {
            setTimeout(function(){ 
                var x = document.getElementById("snackbar");
                x.className = "show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
            }, 1000)
        });
    });
});


$('#giveTest').click( function() {
    var mobileNumber = '0'+ $("#mobile").val();
    $.get(exotelCallURL, {
        ngCallType: "getEnrolmentKey",
        From: mobileNumber,
    },

    (data, resp) => {
        var win = window.open(`http://join.navgurukul.org/k/${data.key}`, '_blank');
        if (win) {
            win.focus(); //Browser has allowed it to be opened
        } else {
            alert('Please allow popups for this website'); //Browser has blocked it
        }
    });
});

