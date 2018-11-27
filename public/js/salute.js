$(function() {
  $.get("/api/users").then(function(users) {
    console.log(users);
    for (let i = 0; i < users.length; i++) {
      $(".kudo-from").append(
        "<option value=" + users[i]._id + ">" + users[i].name + "</option>"
      );
      $(".kudo-to").append(
        "<option value=" + users[i]._id + ">" + users[i].name + "</option>"
      );
    }
  });

  $(function() {
    $.get("/api/kudos").then(function(kudos) {
      console.log(kudos);
      for (let i = 0; i < kudos.length; i++) {
          
        $(".kudos").append(
          "Title: <option value=" + kudos[i]._id + ">" + kudos[i].title + "</option>"
        );
        $(".kudos").append(
          "Message: <option value=" + kudos[i]._id + ">" + kudos[i].message + "</option>"
        );
      }
    });

    //Render the kudos on the index.html
    const renderKudos = function() {
      $.get("/api/kudos").then(function(kudosData) {
        kudosData.forEach(kudos => {
        });
      });
    };

    //Send Kudos to the server.
    const sendKudo = function() {
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

      console.log(_fromId, _toId, title, message);


      //New kudos to send to a server and then go on to the DB
      const newKudos = {
        title: title,
        message: message,
        from_user: _fromId,
        to_user: _toId
      };

      $.post("/api/kudos", newKudos).then(function(response) {
        console.log(response);
      });

      $("#kudoModal").removeClass("show");
      location.reload();
    };

    renderKudos();

    $("#send-kudo").click(sendKudo);
  });
});