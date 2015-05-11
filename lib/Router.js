/**
 * Created by ali on 4/13/15.
 */

Router.map(function () {

    this.route("/", {
        action: function () {
            this.render("urlForm");
        }
    });

    this.route("/:urlKey/results", {

        layoutTemplate: "results",

        waitOn: function () {
            return Meteor.subscribe("urls")
        },

        action: function () {
            if (Urls.findOne({ urlKey: this.params.urlKey })) {
                Session.set("urlKey", this.params.urlKey);

                this.render("dateChart", { to: "dateChart"});

                this.render("browserChart", { to: "browserChart"});

                this.render("osChart", { to: "osChart"});

                this.render("refererChart", { to: "refererChart"});
            }
            else {
                console.log(this);
                this.render("404", { to: "dateChart"});
            }
        }
    });

    this.route("/:urlKey", function () {
        var url = Urls.findOne({ urlKey: this.params.urlKey });
        if (url) {
            Meteor.call("updateUrl", url.urlKey , this.request.headers);
            this.response.writeHead(302, {
                "Location": url.urlRedirect
            });
            this.response.end();
        }
        else {
            this.response.writeHead(404);
            this.response.end( "<p>Error this smll does not exist :(</p>" );
        }
    }, { where: "server"});

});