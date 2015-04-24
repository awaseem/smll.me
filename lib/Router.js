/**
 * Created by ali on 4/13/15.
 */

Router.map(function () {

    this.route("/", {

        waitOn: function () {
            return Meteor.subscribe("urls")
        },

        action: function () {
            this.render("yearChart");
        }
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