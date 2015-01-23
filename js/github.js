function GithubClient(username, token) {
    this.username = username;
    this.token = token;
    this.drawToPage();
}

GithubClient.prototype.getUserInfo = function() {
    return $.get((this.token !== undefined) ? 'https://api.github.com/users/' + this.username + '?access_token=' + this.token : 'https://api.github.com/users/' + this.username);
};

GithubClient.prototype.getReposInfo = function() {
    return $.get((this.token !== undefined) ? "https://api.github.com/users/" + this.username + "/repos?access_token=" + this.token : "https://api.github.com/users/" + this.username + "/repos");
};

GithubClient.prototype.getTemplate1 = function() {
    return $.get('./templates/userinfo.html');
};

GithubClient.prototype.getTemplate2 = function() {
    return $.get('./templates/repos.html');
};

GithubClient.prototype.getAllData = function() {
    return $.when(this.getUserInfo(), this.getReposInfo(), this.getTemplate1(), this.getTemplate2());
};

GithubClient.prototype.drawUser = function() {
		console.log(temp);
		console.log(data);
}



GithubClient.prototype.drawToPage = function() {
    this.getAllData().then( function(dataUser, dataRepos, tempUser, tempRepos) {
        console.log(dataUser[0]);
        console.log(dataRepos);
        console.log(tempUser);
        console.log(tempRepos);

        var divUser = document.querySelector('.user');
        var divRepos = document.querySelector('.repoList');

        divUser.innerHTML = _.template(tempUser[0], dataUser[0]);
        divUser.innerHTML = _.template(tempUser[0], dataUser[0]);
        dataRepos[0].forEach(function(val, ind, arr) {
            divRepos.innerHTML += _.template(tempRepos[0], val);
        })
			}
    )
};
