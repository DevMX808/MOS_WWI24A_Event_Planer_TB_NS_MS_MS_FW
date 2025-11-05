var events = [
    { title: "Mosbacher Weihnachtsmarkt", date: "2025-12-05", description: "Weihnachtliche Budenstadt rund um das Fachwerk-Ensemble, Glühwein & Kunsthandwerk." },
    { title: "Silvesterfeier in Mosbach", date: "2025-12-31", description: "Feier zum Jahreswechsel mit Feuerwerk und Live-Musik in der Altstadt." },
    { title: "Neujahrswanderung im Odenwald", date: "2026-01-01", description: "Geführte Wanderung durch die winterliche Natur in der Nähe von Mosbach." },
    { title: "Winterkonzert in Heidelberg", date: "2025-12-20", description: "Festliches Konzert in der Heiliggeistkirche, nur eine kurze Fahrt von Mosbach entfernt." },
    { title: "Karnevalsauftakt in Neckarsteinach", date: "2026-01-11", description: "Beginn der Faschingssaison mit Umzug und Feierlichkeiten in der Nähe." }
];

var form = document.getElementById("eventForm");
var titleInput = document.getElementById("titleInput");
var dateInput = document.getElementById("dateInput");
var descInput = document.getElementById("descInput");
var titleError = document.getElementById("titleError");
var dateError = document.getElementById("dateError");
var descError = document.getElementById("descError");
var eventList = document.getElementById("eventList");
var sortSelect = document.getElementById("sortSelect");
var searchInput = document.getElementById("searchInput");
var emptyState = document.getElementById("emptyState");
var searchQuery = "";

function clearErrors() {
    [titleInput, dateInput, descInput].forEach(function(input) {
        input.removeAttribute("aria-invalid");
        input.closest(".fieldRow").classList.remove("hasError");
    });
    titleError.textContent = "";
    dateError.textContent = "";
    descError.textContent = "";
}

function showError(input, errorEl, message) {
    input.setAttribute("aria-invalid", "true");
    input.closest(".fieldRow").classList.add("hasError");
    errorEl.textContent = message;
}

function validateForm() {
    clearErrors();
    var isValid = true;

    if (!titleInput.value.trim()) {
        showError(titleInput, titleError, "Titel darf nicht leer sein.");
        isValid = false;
    }

    if (!dateInput.value) {
        showError(dateInput, dateError, "Datum darf nicht leer sein.");
        isValid = false;
    }

    if (!descInput.value.trim()) {
        showError(descInput, descError, "Beschreibung darf nicht leer sein.");
        isValid = false;
    }

    return isValid;
}

function formatDate(dateStr) {
    return dateStr.split("-").reverse().join(".");
}

function sortEvents(arr, mode) {
    var sorted = arr.slice();
    if (mode === "dateAsc") {
        sorted.sort(function(a, b) { return a.date.localeCompare(b.date); });
    } else if (mode === "dateDesc") {
        sorted.sort(function(a, b) { return b.date.localeCompare(a.date); });
    } else if (mode === "titleAsc") {
        sorted.sort(function(a, b) { return a.title.localeCompare(b.title, "de"); });
    } else if (mode === "titleDesc") {
        sorted.sort(function(a, b) { return b.title.localeCompare(a.title, "de"); });
    }
    return sorted;
}

function filterEvents(arr, query) {
    if (!query) return arr;
    var q = query.toLowerCase();
    return arr.filter(function(evt) {
        return evt.title.toLowerCase().includes(q) || evt.description.toLowerCase().includes(q);
    });
}

function renderEvents() {
    var filtered = filterEvents(events, searchQuery);
    var sorted = sortEvents(filtered, sortSelect.value);

    eventList.innerHTML = "";

    if (sorted.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
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
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    var newEvent = {
        title: titleInput.value.trim(),
        date: dateInput.value,
        description: descInput.value.trim()
    };
    events.push(newEvent);
    events = sortEvents(events, "dateAsc");
    renderEvents();
    form.reset();
    titleInput.focus();
});

sortSelect.addEventListener("change", renderEvents);

searchInput.addEventListener("input", function() {
    searchQuery = searchInput.value;
    renderEvents();
});

events = sortEvents(events, "dateAsc");
renderEvents();