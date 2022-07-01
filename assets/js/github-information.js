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

// A function so that we can display repo data on screen.
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
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
        $.getJSON(`https://api.github.com/users/${username}`),
        // This will list the repositories for that individual user.
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        // We have another function, with two arguments. Responses that come back from our getJSON() method.
        // Now that we're doing two getJSON calls, we actually need to have two responses come back in our first function.
        // So we're going to call those firstResponse and secondResponse.
        function(fristResponse, secondResponse) {
            // when we do two calls like this, the when() method packs a response up into arrays.
            // And each one is the first element of the array.
            // So we just need to put the indexes in there for these responses.
            var userData = fristResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
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