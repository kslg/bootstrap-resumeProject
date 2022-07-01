// "user" is the object that's been returned from the GitHub API.
// This object has many methods, such as the user's name, login name, and links to their
// profile. And we're going to return these in a formatted HTML string.
function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

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