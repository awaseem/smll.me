/**
 * Created by awaseem on 15-04-29.
 */

Template.results.onRendered(function () {
    Session.set("toggleYear", false);
    $(".yearChart").fadeTo(500, 0, function () {
        $(this).css("position", "absolute")
    });
});

Template.results.helpers({
    toggleYear: function () {
        return Session.get("toggleYear");
    },
    buttonAction: function () {
        if (Session.get("toggleYear")) {
            return "Month";
        }
        else {
            return "Year";
        }
    },
    chartTitle: function () {
        if (Session.get("toggleYear")) {
            return "Year: " + moment().year();
        }
        else {
            return "Month: " + moment().format("MMMM");
        }
    }

});

Template.results.events({
    "click .change-time": function (event) {
        var toggle = !Session.get("toggleYear");
        Session.set("toggleYear", toggle);
        if (Session.get("toggleYear")) {
            $(".weekChart").fadeTo(250, 0, function () {
                $(this).css("position", "absolute");
                $(".yearChart").css("position", "relative");
                window.dispatchEvent(new Event('resize'));
                $(".yearChart").fadeTo(500, 1);

            });
        }
        else {
            $(".yearChart").fadeTo(250, 0, function () {
                $(this).css("position", "absolute");
                $(".weekChart").css("position", "relative");
                window.dispatchEvent(new Event('resize'));
                $(".weekChart").fadeTo(500, 1);

            });
        }
    }
});