var GraphService = require("../GraphService")
var moment = require("moment");

GraphService.prototype.getCalendarView = function (userid, startDateTime, endDateTime) {
    var startDateString = moment(startDateTime).format();
    var endDateString = moment(endDateTime).format();
    var url = `/beta/users/${userid}/calendarView?StartDateTime=${startDateString}&EndDateTime=${endDateString}&$top=100`

    return this.get(url)
        .then(eventPayload => {
            return eventPayload.value
                .map(mapEvent)
                .sort((a, b) => new Date(a.start) < new Date(b.start) ? -1 : 1)
                .reduce((days, event) => {
                    var day = moment(event.start).format('L');
                    if (!days[day]) days[day] = [];
                    days[day].push(event);
                    return days;
                }, {});
        })
        .then(days => Object.keys(days).map(key => {
            return {
                title: key,
                events: days[key]
            };
        }));
};

var mapEvent = function(rawEvent) {
    var event = {
        subject: rawEvent.subject,
        // attendees: rawEvent.attendees.map(a => a.emailAddress.name),
        organizer: rawEvent.organizer.emailAddress.name,
        start: moment.parseZone(rawEvent.start.dateTime).local().format(),
        end: moment.parseZone(rawEvent.end.dateTime).local().format()
    };
    return event;
};