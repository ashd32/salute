$.get("/api/users").then(function(users){
    console.log("test");
    console.log(users);
    for (let i=0; i<users.length; i++){
        $('.kudo-from').append('<option value='+users[i]._id+'>'+users[i].name+'</option>');
        $('.kudo-to').append('<option value='+users[i]._id+'>'+users[i].name+'</option>');
    }
});