// This is the same function that we're calling in the oninput event in our text field.
// We're going to pass in the event argument into this function.
function fetchGitHubInformation(event) {

    var username = $("#gh-username").val();
    // So if the username field is empty, there's no value, then we're going to return a little piece of HTML that says 
    // "Please enter a GitHub username".
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    // If text has been inputted into the field, then we're going to set our HTML to display a gif loader.
    $("#gh-user-data").html(
        // Using template literals here.
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
        // An animated gif file that will just keep repeating itself while data has been accessed.

    $.when(
        // So what we're going to do here is pass in a function. And that function is going to be the getJSON() function.
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        // We have another function, response(), which the first argument is the response that came back from our getJSON() method.
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        },
        // Error function for when a github user is not found.
        function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
            //error that comes back may not be a 404 error.
            // So if that happens, then what we'll do we'll console.log out the Error, just the entire error response.
        });
}