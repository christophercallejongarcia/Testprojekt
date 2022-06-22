let titles = []; // Globale Variablen
let notes = [];
let titlesTrash = [];
let notesTrash = [];





/*###################### RENDER FUNCTION ##############################################*/

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < titles.length; i++) {                                // Wenn ich mehrere Werte eines Arrays darstellen möchte, dann immer mit einer Forschleife
        const title = titles[i];
        const note = notes[i];
        content.innerHTML += /*html*/`
        <div class="content__items">
        <div class="items__header">
            <div class="item__title" title="Title"><b>${title}</b></div>
            <div class="item__note" title="Note">${note}</div></div>
                <div class="items__btn">
                    <button class="btn__option" onclick="trashNote(${i})" title="Papierkorb"><img class="icon" src="icons/delete 2.png"></button>
                    <button class="btn__option" onclick="editNote(${i})" title="Bearbeiten"><img class="icon" src="icons/edit 2.png"></button>
                </div>
        </div>`;
        countNotes();
        countTrash();
    }
}

function addNote() {
    let title = document.getElementById('title');    //Ich möchte auf die id zugreifen und benenne es mit einer Variablen, um mit ihr weiterzuarbeiten
    let note = document.getElementById('note');

    if (title === '' || note === '') {              // Wenn nichts ausgefüllt ist, soll ein alert erscheinen
        alert('Bitte fülle beide Felder aus!');
    } else {
        titles.push(title.value);                   // Hier pushen wir den title in das Array title(s)
        notes.push(note.value);
    }
    title.value = '';
    note.value = '';
    render();
}

function trashNote(i) {
    titlesTrash.push(titles[i]);
    notesTrash.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    countNotes();
    countTrash();                                           // Wenn keine Notiz da ist wird auch nichts angezeigt da i = 0
}


function countNotes() {                                     
    let countNotes = document.getElementById('countNotes');
    countNotes.innerHTML = '';
    for (i = titles.length; i <= titles.length; i++) {
        countNotes.innerHTML += `${'Notizen ' + [i]}`;
    }
}

function countTrash() {
    let countTrash = document.getElementById('countTrash');
    countTrash.innerHTML = '';
    for (i = titlesTrash.length; i <= titlesTrash.length; i++) {
        countTrash.innerHTML += `${'Papierkorb ' + [i]}`;
    }
}

function editNote(i) {
    let editTitle = document.getElementById('title');
    let editNote = document.getElementById('note');
    for (let i = 0; i < titles.length; i++) {
        editTitle.value = `${titles[i]}`;
        editNote.value = `${notes[i]}`;
    }
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    countNotes();
    countTrash();
}



/*###################### RENDER TRASH FUNCTION ##############################################*/


function renderTrash(i) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < titlesTrash.length; i++) {                                // Wenn ich mehrere Werte eines Arrays darstellen möchte, dann immer mit einer Forschleife
        const titleTrash = titlesTrash[i];
        const noteTrash = notesTrash[i];
        content.innerHTML += /*html*/`
    <div class="content__items">
        <div class="items__header">
            <div class="item__title" title="Title"><b>${titlesTrash}</b></div>
            <div class="item__note" title="Note">${notesTrash}</div></div>
        <div class="items__btn">
            <button class="btn__option" onclick="deleteNote(${i})" title="Löschen"><img class="icon" src="icons/x-mark.png"></button>
            <button class="btn__option" onclick="restoreNote(${i})" title="Wiederherstellen"><img class="icon" src="icons/share.png"></button>
        </div>
    </div>`;
        countNotes();
        countTrash();
    }
}

function deleteNote(i) {
    titlesTrash.splice(i, 1);
    notesTrash.splice(i, 1);
    render();
    renderTrash();
    countNotes();
    countTrash();
}

function restoreNote(i) {
    titles.push(titlesTrash[i]);
    notes.push(notesTrash[i]);
    titlesTrash.splice(i, 1);
    notesTrash.splice(i, 1);
    render();
    renderTrash();
}


/*###################### LOCAL STORAGE FUNCTION ##############################################*/

function save() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);

    let titlesTrashAsText = JSON.stringify(titlesTrash);
    localStorage.setItem('titlesTrash', titlesTrashAsText);
    let notesTrashAsText = JSON.stringify(notesTrash);
    localStorage.setItem('notesTrash', notesTrashAsText);


}

function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');

    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }

    let titlesTrashAsText = localStorage.getItem('titlesTrash');
    let notesTrashAsText = localStorage.getItem('notesTrash');

    if (titlesTrashAsText && notesTrashAsText) {
        titlesTrash = JSON.parse(titlesTrashAsText);
        notesTrash = JSON.parse(notesTrashAsText);
    }
}


/*######################  ##############################################*/

/*function renderEditNote() {
    let editNote = document.getElementById('editNote');
    editNote.innerHTML = '';
    for (let i = 0; i < titles.length; i++)
        content.innerHTML += `
        <input class="inputfield" type="text" placeholder="Title..." id="title">${titles}
            <textarea class="textarea" name="text" placeholder="Schreibe hier deine Notiz..." id="note" cols="30" rows="10">${notes}</textarea>
            <button onclick="addNote()" class="icon__save__note"><img class="icon__save" src="icons/save 2.png" alt=""></button>
         </div>`
    render();
    countNotes();
    countTrash();
}

function editNote(i) {
    titles.push(titles[i]);
    notesTrash.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
}
*/

/*function showContent(i) {
    content.innerHTML += `
        <div class="content__items">
        <div class="items__header">
            <div class="item__title" title="Title"><b>${titles}</b></div>
            <div class="item__note" title="Note">${notes}</div></div>
                <div class="items__btn">
                    <button class="btn__option" onclick="trashNote(${i})" title="Papierkorb"><img class="icon" src="icons/delete 2.png"></button>
                    <button class="btn__option" onclick="renderEditNote(${i})" title="Bearbeiten"><img class="icon" src="icons/edit 2.png"></button>
                </div>
        </div>`;
}*/
/*######################  ##############################################*/
