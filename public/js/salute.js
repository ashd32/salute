$(function() {
  const pageReady = function() {
    // console.log("ready!");
  };
  

  pageReady();

  const getUsers = function() {
    $.get("/api/users").then(function(users) {
      // console.log(users);
      // Appends users to dropdown menu in modal.
      for (let i = 0; i < users.length; i++) {
        $(".kudo-from").append(
          "<option value=" + users[i]._id + ">" + users[i].name + "</option>"
        );
        $(".kudo-to").append(
          "<option value=" + users[i]._id + ">" + users[i].name + "</option>"
        );
      }
    });
  };

  

  // Gets the kudos
  const getKudos = function() {
    $.get("/api/kudos").then(function(kudos) {
      // console.log(kudos);

      for (let i = 0; i < kudos.length; i++) {
        console.log(kudos[i]._fromId.name, kudos[i]._toId.name, kudos[i].title, kudos[i].message);
        $("#kudosList").prepend(
          '<div class="card-vody kudos" style="border: 3px solid black">' +
            "<p>From: " +
            kudos[i]._fromId.name +    
            "</p><p>To: " +
            kudos[i]._toId.name +           
            "<p>Title: " +
            kudos[i].title +
            "</p><p>Message: " +
            kudos[i].message +
            "</div>"
        );
      }
    });
  };

  //Send Kudos to the server.
  const sendKudo = function(event) {
    event.preventDefault();
    const _fromId = $(".kudo-from")
      .val()
      .trim();

    const _toId = $(".kudo-to")
      .val()
      .trim();

    const title = $("#kudo-title")
      .val()
      .trim();

    const message = $("#kudo-body")
      .val()
      .trim();

    const noData = $(
      `<div class="alert alert-danger">_fromId, _toId, title, or/and message is/are missing. Please check the input data.</div>`
    );

    const duplicateUser = $(
      `<div class="alert alert-danger">_fromId and _toId cannot be the same.</div>`
    );



    //New kudos to send to a server and then go on to the DB
    const newKudos = {
      title: title,
      message: message,
      _fromId: _fromId,
      _toId: _toId
    };

    $.post("/api/kudos", newKudos).then(function(response) {
      $("#kudoModal").removeClass("show");
      location.reload();
    });
  };

  // Submit button event listener
  $("#send-kudo").click(sendKudo);


  getUsers();
  getKudos();
});
