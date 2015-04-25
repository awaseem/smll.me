/**
 * Created by ali on 4/13/15.
 */

Router.map(function () {

    this.route("/:urlKey/results", {

        waitOn: function () {
            return Meteor.subscribe("urls")
        },

        action: function () {
            if (Urls.findOne({ urlKey: this.params.urlKey })) {
                Session.set("urlKey", this.params.urlKey);
                this.render("weekChart");
            }
            else {
                this.render("404");
            }
        }
    });

    this.route("/:urlKey", function () {
        var url = Urls.findOne({ urlKey: this.params.urlKey });
        if (url) {
            Meteor.call("updateUrl", url.urlKey , this.request.headers);
            //console.log(platform.parse(this.request.headers["user-agent"]));
            this.response.writeHead(302, {
                "Location": url.urlRedirect
            });
            this.response.end();
        }
        else {
            this.response.writeHead(404);
            this.response.end( "<p>Error</p>" );
        }
    }, { where: "server"});

});