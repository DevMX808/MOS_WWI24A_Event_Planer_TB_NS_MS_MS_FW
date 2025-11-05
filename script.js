var events = [];
var form = document.getElementById("eventForm");
var titleInput = document.getElementById("titleInput");
var dateInput = document.getElementById("dateInput");
var descInput = document.getElementById("descInput");
var eventList = document.getElementById("eventList");

function renderEvents() {
    eventList.innerHTML = "";
    events.forEach(function(evt) {
        var li = document.createElement("li");
        li.innerHTML = "<strong>" + evt.title + "</strong> - " + evt.date + "<br>" + evt.description;
        eventList.appendChild(li);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    var newEvent = {
        title: titleInput.value,
        date: dateInput.value,
        description: descInput.value
    };
    events.push(newEvent);
    renderEvents();
    form.reset();
});