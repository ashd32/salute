$(function () {
$.get("/api/users").then(function(users){
    console.log(users);
    for (let i=0; i<users.length; i++){
        $('.kudo-from').append('<option value='+users[i]._id+'>'+users[i].name+'</option>');
        $('.kudo-to').append('<option value='+users[i]._id+'>'+users[i].name+'</option>');
    }
});

$(function () {
    $.get("/api/kudos").then(function(kudos){
        console.log(kudos);
        for (let i=0; i<kudos.length; i++){
            $('.kudo-from').append('<option value='+kudos[i]._id+'>'+kudos[i].title+'</option>');
            $('.kudo-to').append('<option value='+kudos[i]._id+'>'+kudos[i].message+'</option>');
        }
    });
    
    

//Render all Kudos.
const render = function (kudos) {

        $.get(`/api/users/${kudos.from_user}`)
            //Get the from user information
            .then(function (fromUser) {
                //Get the to user information
                $.get(`/api/users/${kudos.to_user}`)
                    .then(function (toUser) {
                        const card = $("<div>").addClass("card kudos bg-light mb-5 shadow text-center");

                        //Creating the Kudo title tag
                        const cardHeader = $("<div>").addClass("card-header").text(kudos.title);

                        //Creating the Kudo message
                        const cardmessage = `<div class="card-message">
                        <h5 class="card-from">From: ${fromUser[0].name}</h5>
                        <h5 class="card-from">To: ${toUser[0].name}</h5>
                        <p class="card-text">${kudos.message}</p>
                         </div>`;

                        //Appending the Kudo title and message to the <card>
                        card.append(cardHeader).append(cardmessage);

                        //Prepending to the Jumbotron tag.
                        $(".jumbotron").prepend(card);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            });
            // .catch(function (error) {
            //     console.log(error);
            // });
};

//Render the kudos on the index.html
const renderKudos = function () {

    $.get("/api/kudos")
        .then(function (kudosData) {

            kudosData.forEach(kudo => {

                //Rendering the Kudos title and message
                render(kudo);

            });

        });
        // .catch(function (error) {
        //     console.log(error);
        // })
};

//Send Kudos to the server.
const sendKudo = function () {

    const _fromId = $(".kudo-from").val().trim();
    const _toId = $(".kudo-to").val().trim();
    const title = $("#kudo-title").val().trim();
    const message = $("#kudo-body").val().trim();
    const noData = $(`<div class="alert alert-danger">_fromId, _toId, title, or/and message is/are missing. Please check the input data.</div>`);
    const duplicateUser = $(`<div class="alert alert-danger">_fromId and _toId cannot be the same.</div>`);

    console.log(_fromId, _toId, title, message);
 

    if (!_fromId || !_toId || !title || !message) {
        $("#error-message").append(noData);
        //Make the error message disappeared after 3 seconds.
        setTimeout(function () {
            noData.remove();
        }, 3000);
    }
    else if (_fromId === _toId) {
        $("#error-message").append(duplicateUser);
        //Make the error message disappeared after 3 seconds.
        setTimeout(function () {
            duplicateUser.remove();
        }, 3000);
    }
    else {
        //New kudos to send to a server and then go on to the DB
        const newKudos = {
            title: title,
            message: message,
            from_user: _fromId,
            to_user: _toId
        };


        $.post("/api/kudos", newKudos)
            .then(function (response) {
                console.log(response);
            });
            // .catch(function (error) {
            //     console.log(error);
            // });

        $("#kudoModal").removeClass("show");
        location.reload();
    }

};

renderKudos();

$("#send-kudo").click(sendKudo);
});
});
