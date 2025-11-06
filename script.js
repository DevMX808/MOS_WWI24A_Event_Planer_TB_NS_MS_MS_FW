/**
 * Gruppenname: MOS_WWI24A_Event_Manager_TB_NS_MS_MS_FW
 * Projektname: Event Planer
 * Projektmitglieder: Timo Becker, Nils Scharnbacher, Mursel Semsedini, Maximilian Sturm, Fabian Wiedenmeyer
 * GitHub: https://github.com/DevMX808/MOS_WWI24A_Event_Planer_TB_NS_MS_MS_FW
 */

(() => {
    "use strict";

    const LIMITS = Object.freeze({
        titleMax: 120,
        descMax: 1000,
    });

    const DEFAULTS = Object.freeze({
        sortBy: "dateAsc",
        search: "",
    });

    const ERROR_MESSAGES = Object.freeze({
        titleEmpty: "Titel darf nicht leer sein.",
        titleTooLong: `Titel ist zu lang (max. ${LIMITS.titleMax} Zeichen).`,
        dateEmpty: "Datum darf nicht leer sein.",
        dateInvalid: "Datum ist ungültig.",
        descEmpty: "Beschreibung darf nicht leer sein.",
        descTooLong: `Beschreibung ist zu lang (max. ${LIMITS.descMax} Zeichen).`,
    });

    const $ = id => document.getElementById(id);

    const form = $("eventForm");
    const titleInput = $("titleInput");
    const dateInput = $("dateInput");
    const descInput = $("descInput");
    const sortSelect = $("sortSelect");
    const searchInput = $("searchInput");
    const eventList = $("eventList");
    const emptyState = $("emptyState");

    const FIELD_ERROR_MAP = new Map([
        [titleInput, $("titleError")],
        [dateInput, $("dateError")],
        [descInput, $("descError")],
    ]);

    const state = {
        events: [],
        sortBy: DEFAULTS.sortBy,
        search: DEFAULTS.search,
    };

    function setFieldError(field, message = "") {
        const errorElement = FIELD_ERROR_MAP.get(field);
        if (!errorElement) return;

        errorElement.textContent = message;
        field.setAttribute("aria-invalid", !!message);
        field.closest(".fieldRow")?.classList.toggle("hasError", !!message);
    }

    function clearAllFieldErrors() {
        FIELD_ERROR_MAP.forEach((_, field) => setFieldError(field));
    }

    function validateTitle(title) {
        const trimmed = title.trim();
        if (!trimmed) return ERROR_MESSAGES.titleEmpty;
        if (trimmed.length > LIMITS.titleMax) return ERROR_MESSAGES.titleTooLong;
        return "";
    }

    function validateDate(date) {
        if (!date) return ERROR_MESSAGES.dateEmpty;
        const dateObject = new Date(date);
        if (Number.isNaN(dateObject.getTime())) return ERROR_MESSAGES.dateInvalid;
        return "";
    }

    function validateDescription(description) {
        const trimmed = description.trim();
        if (!trimmed) return ERROR_MESSAGES.descEmpty;
        if (trimmed.length > LIMITS.descMax) return ERROR_MESSAGES.descTooLong;
        return "";
    }

    function validateForm({ title, date, description }) {
        const errors = [];

        const titleError = validateTitle(title);
        if (titleError) errors.push({ field: titleInput, msg: titleError });

        const dateError = validateDate(date);
        if (dateError) errors.push({ field: dateInput, msg: dateError });

        const descError = validateDescription(description);
        if (descError) errors.push({ field: descInput, msg: descError });

        return { ok: errors.length === 0, errors };
    }

    const COMPARATORS = Object.freeze({
        dateAsc: (a, b) => a.date.localeCompare(b.date),
        dateDesc: (a, b) => b.date.localeCompare(a.date),
        titleAsc: (a, b) => a.title.localeCompare(b.title, "de", { sensitivity: "base" }),
        titleDesc: (a, b) => b.title.localeCompare(a.title, "de", { sensitivity: "base" }),
    });

    function sortEvents(events, sortMode) {
        const comparator = COMPARATORS[sortMode] ?? COMPARATORS.dateAsc;
        return [...events].sort(comparator);
    }

    function filterEventsBySearch(events, searchQuery) {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return [...events];

        return events.filter(({ title, description }) =>
            title.toLowerCase().includes(query) ||
            description.toLowerCase().includes(query)
        );
    }

    function formatDate(dateString) {
        let [year, month, day] = dateString.split("-").map((part, i) => i === 0 ? part : parseInt(part, 10));
        return `${day}.${month}.${year}`;
    }

    function createEventElement(event) {
        const li = document.createElement("li");
        li.className = "eventItem";

        const title = document.createElement("div");
        title.className = "eventTitle";
        title.textContent = event.title;

        const date = document.createElement("p");
        date.className = "eventDate";
        date.innerHTML = `<strong>Datum:</strong> ${formatDate(event.date)}`;

        const description = document.createElement("p");
        description.className = "eventDesc";
        description.textContent = event.description;

        li.append(title, date, description);
        return li;
    }

    function renderEventList() {
        const filtered = filterEventsBySearch(state.events, state.search);
        const sorted = sortEvents(filtered, state.sortBy);

        eventList.innerHTML = "";
        emptyState.style.display = sorted.length ? "none" : "block";

        const fragment = document.createDocumentFragment();
        sorted.forEach(event => fragment.appendChild(createEventElement(event)));
        eventList.appendChild(fragment);
    }

    function addEvent(eventData) {
        state.events.push(eventData);
        state.events = sortEvents(state.events, "dateAsc");
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        clearAllFieldErrors();

        const formData = {
            title: titleInput.value,
            date: dateInput.value,
            description: descInput.value,
        };

        const { ok, errors } = validateForm(formData);

        if (!ok) {
            errors.forEach(({ field, msg }) => setFieldError(field, msg));
            errors[0]?.field?.focus();
            return;
        }

        addEvent({
            title: formData.title.trim(),
            description: formData.description.trim(),
            date: formData.date,
        });

        form.reset();
        titleInput.focus();
        renderEventList();
    }

    function handleSortChange() {
        state.sortBy = sortSelect.value;
        renderEventList();
    }

    function handleSearchInput() {
        state.search = searchInput.value;
        renderEventList();
    }

    function seedInitialEvents() {
        const seeds = [
            { title: "Mosbacher Weihnachtsmarkt", date: "2025-12-05", description: "Weihnachtliche Budenstadt rund um das Fachwerk-Ensemble, Glühwein & Kunsthandwerk." },
            { title: "Silvesterfeier in Mosbach", date: "2025-12-31", description: "Feier zum Jahreswechsel mit Feuerwerk und Live-Musik in der Altstadt." },
            { title: "Neujahrswanderung im Odenwald", date: "2026-01-01", description: "Geführte Wanderung durch die winterliche Natur in der Nähe von Mosbach." },
            { title: "Winterkonzert in Heidelberg", date: "2025-12-20", description: "Festliches Konzert in der Heiliggeistkirche, nur eine kurze Fahrt von Mosbach entfernt." },
            { title: "Karnevalsauftakt in Neckarsteinach", date: "2026-01-11", description: "Beginn der Faschingssaison mit Umzug und Feierlichkeiten in der Nähe." }
        ];
        state.events = sortEvents(seeds, "dateAsc");
    }

    function initializeApp() {
        seedInitialEvents();
        sortSelect.value = state.sortBy;
        searchInput.value = state.search;

        form.addEventListener("submit", handleFormSubmit);
        sortSelect.addEventListener("change", handleSortChange);
        searchInput.addEventListener("input", handleSearchInput);

        renderEventList();
    }

    initializeApp();
})();