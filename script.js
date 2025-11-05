var events = [
    { title: "Mosbacher Weihnachtsmarkt", date: "2025-12-05", description: "Weihnachtliche Budenstadt rund um das Fachwerk-Ensemble." },
    { title: "Silvesterfeier in Mosbach", date: "2025-12-31", description: "Feier zum Jahreswechsel mit Feuerwerk." },
    { title: "Neujahrswanderung", date: "2026-01-01", description: "Geführte Wanderung durch den winterlichen Odenwald." }
];

var form = document.getElementById("eventForm");
var titleInput = document.getElementById("titleInput");
var dateInput = document.getElementById("dateInput");
var descInput = document.getElementById("descInput");
var eventList = document.getElementById("eventList");
var sortSelect = document.getElementById("sortSelect");
var searchInput = document.getElementById("searchInput");
var emptyState = document.getElementById("emptyState");
var searchQuery = "";

function formatDate(dateStr) {
    return dateStr.split("-").reverse().join(".");
}

function sortEvents(mode) {
    var sorted = arr.slice();
    if (mode === "dateAsc") {
        sorted.sort(function(a, b) { return a.date.localeCompare(b.date); });
    } else {
        sorted.sort(function(a, b) { return b.date.localeCompare(a.date); });
    }
    return sorted;
}

function renderEvents() {
    var sorted = sortEvents(sortSelect.value);

    eventList.innerHTML = "";
    emptyState.style.display = sorted.length ? "none" : "block";

    sorted.forEach(function(evt) {
        var li = document.createElement("li");
        var title = document.createElement("div");
        title.style.fontWeight = "700";
        title.style.fontSize = "18px";
        title.textContent = evt.title;

        var date = document.createElement("p");
        date.innerHTML = "<strong>Datum:</strong> " + formatDate(evt.date);

        var desc = document.createElement("p");
        desc.textContent = evt.description;

        li.appendChild(title);
        li.appendChild(date);
        li.appendChild(desc);
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
    sortEvents("dateAsc");
    renderEvents();
    form.reset();
});

sortSelect.addEventListener("change", function() {
    sortEvents(sortSelect.value);
    renderEvents();
});

sortEvents("dateAsc");
renderEvents();