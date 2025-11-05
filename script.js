var events = [
    { title: "Mosbacher Weihnachtsmarkt", date: "2025-12-05", description: "Weihnachtliche Budenstadt rund um das Fachwerk-Ensemble." },
    { title: "Silvesterfeier in Mosbach", date: "2025-12-31", description: "Feier zum Jahreswechsel mit Feuerwerk." },
    { title: "Neujahrswanderung", date: "2026-01-01", description: "Geführte Wanderung durch den winterlichen Odenwald." },
    { title: "Winterkonzert Heidelberg", date: "2025-12-20", description: "Festliches Konzert in der Heiliggeistkirche." }
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
    } else {
        sorted.sort(function(a, b) { return b.date.localeCompare(a.date); });
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

renderEvents();