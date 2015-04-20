/**
 * Created by ali on 4/13/15.
 */

Router.map(function () {

    this.route("/", function () {
        this.render("home");

    });



    this.route("/test", function () {
        Meteor.call("updateUrl", "Eym2M8p-", this.request.headers);
        //console.log(platform.parse(this.request.headers["user-agent"]));
        this.response.writeHead(302, {
            "Location": "https://www.facebook.com"
        });
        this.response.end();
    }, { where: "server"});

});