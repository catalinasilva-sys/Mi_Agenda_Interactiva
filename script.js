// Esperar a que el DOM se haya cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el formulario y la lista de eventos
    const agendaForm = document.getElementById("agendaForm");
    const eventInput = document.getElementById("eventInput");
    const dateInput = document.getElementById("dateInput");
    const eventList = document.getElementById("eventList");

    // Función para actualizar el almacenamiento local
    function saveEventsToLocalStorage() {
        const events = [];
        // Recorrer elementos de la lista y guardar los datos en un array
        document.querySelectorAll("#eventList li").forEach(function(listItem) {
            const text = listItem.textContent.replace("Eliminar", "").trim();
            events.push(text);
        });
        localStorage.setItem("events", JSON.stringify(events));
    }

    // Función para cargar los eventos desde localStorage
    function loadEventsFromLocalStorage() {
        const storedEvents = JSON.parse(localStorage.getItem("events"));
        if (storedEvents) {
            storedEvents.forEach(function(event) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `${event} <button class="deleteBtn">Eliminar</button>`;
                eventList.appendChild(listItem);

                // Agregar la funcionalidad de eliminar
                const deleteBtn = listItem.querySelector(".deleteBtn");
                deleteBtn.addEventListener("click", function() {
                    eventList.removeChild(listItem); // Eliminar el evento de la lista
                    saveEventsToLocalStorage(); // Actualizar localStorage después de eliminar
                });
            });
        }
    }

    // Cargar eventos desde localStorage al cargar la página
    loadEventsFromLocalStorage();

    // Agregar un tin de evento cuando el formulario se envíe
    agendaForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recargar la página)

        // Obtener los valores de los inputs
        const eventName = eventInput.value;
        const eventDate = dateInput.value;

        // Crear un nuevo elemento li para el evento
        const listItem = document.createElement("li");
        listItem.innerHTML = `${eventName} - ${eventDate} <button class="deleteBtn">Eliminar</button>`;

        // Agregar el nuevo evento 
        eventList.appendChild(listItem);

        // Guardar eventos en localStorage
        saveEventsToLocalStorage();

        // Limpiar los campos del formulario después de agregar el evento
        eventInput.value = "";
        dateInput.value = "";

        // Agregar funcionalidad para eliminar 
        const deleteBtn = listItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", function() {
            eventList.removeChild(listItem); // Eliminar el evento de la lista
            saveEventsToLocalStorage(); // Actualizar localStorage después de eliminar
        });
    });
});