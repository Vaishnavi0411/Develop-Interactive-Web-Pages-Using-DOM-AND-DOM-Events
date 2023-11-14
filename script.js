let noteList = [];
let view = "grid"; //default view is grid-view

// Task 1: Define function `saveNote()` to add a new note
function saveNote() {
    const noteId = document.getElementById("note-id").value;
    const noteTitle = document.getElementById("note-title").value;
    const noteContent = document.getElementById("note-content").value;

    const note = {
        noteId: noteId,
        noteTitle: noteTitle,
        noteContent: noteContent,
    };

    noteList.push(note);
    displayNotes();
    document.getElementsByTagName("form")[0].reset();
}

function restNotes() {
    const noteContainer = document.getElementById("note-container");
    while (noteContainer.hasChildNodes()) {
        noteContainer.removeChild(noteContainer.lastChild);
    }
}
//task-2 : define function `displayNotes()` to display all notes
function displayNotes() {
    restNotes();
    const noteContainer = document.getElementById("note-container");

    noteList.forEach((x) => {
        const noteDiv = document.createElement("div");
        const btn = document.createElement("button");

        noteDiv.className = "card";
        noteDiv.style.backgroundColor = "#fff";
        noteDiv.style.padding = "20px";
        noteDiv.style.margin = "20px";

        const h5tag = document.createElement("h5");
        h5tag.className = "card-title";
        h5tag.textContent = x.noteTitle;

        const ptag = document.createElement("p");
        ptag.className = "card-text";
        ptag.textContent = x.noteContent;

        btn.innerText = "Delete";
        btn.className = ("btn", "btn-primary");
        btn.addEventListener("click", () => {
            deleteNote(x.noteId);
        });

        noteDiv.appendChild(h5tag);
        noteDiv.appendChild(ptag);
        noteDiv.appendChild(btn);

        if (view === "grid") {
            noteDiv.style.display = "flex";
            noteDiv.style.alignItems = "flex-start";
        } else {
            noteDiv.style.display = "block";
        }

        noteContainer.appendChild(noteDiv);
    });
}

//task-3 : delete note
function deleteNote(noteId) {
    for (let i = 0; i < noteList.length; i += 1) {
        if (noteList[i].noteId === noteId) {
            noteList.splice(i, 1);
            break;
        }
    }
    displayNotes();
}


//task-4 : toggle note view 
function toggleView() {
    if (view === "grid") {
        view = "block";
        document.getElementById("note-container").style.display = "block";
    } else {
        view = "grid";
        document.getElementById("note-container").style.display = "flex";
    }
    displayNotes();
}

// Export the functions for testing
module.exports = {
    saveNote,
    displayNotes,
    deleteNote,
    toggleView,
};