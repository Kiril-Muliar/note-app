const noteContainer = document.querySelector('.note-container');
const modalContainer = document.querySelector('.modal-container');
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');

//class
class Note {
    constructor(title, body){
        this.title = title;
        this.body = body;
        this.id = Math.random();
    }
}

//show notes in UI
function displayNotes(){
  const notes = getNotes();
  notes.forEach(note => {
    addNoteToList(note);
  })
}

//display notes
document.addEventListener('DOMContentLoaded', displayNotes);

//Create new notein UI
function addNoteToList(note) {
  const newUINote = document.createElement('div');
  newUINote.classList.add('note');
  newUINote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class="note_title">${note.title}</h2>
    <p class="note_body">${note.body}</p>
    <div class="note_btns">
      <button class="note_btn note_view">View Detail</button>
      <button class="note_btn note_delete">Delete Note</button>
    </div>
  `;
  noteContainer.appendChild(newUINote);
}

//Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const noteInput = document.querySelector('#note');

    if(titleInput.value.length > 0 && noteInput.value.length > 0){
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        addNotesToLocalStorage(newNote);
        titleInput.value = "";
        noteInput.value = "";
        showAlertMessage('Note successfully added!', 'success-message');
        titleInput.focus();
    }else {
      showAlertMessage('Please add both a title and a note.', 'alert-message');
    }
})

//view modal
function activateNoteModal(title, body) {
const modalTitle = document.querySelector('.modal_title');
const modalBody = document.querySelector('.modal_body');
modalTitle.textContent = title;
modalBody.textContent = body;
modalContainer.classList.add('active');
};

//close modal
const  modalBtn = document.querySelector('.modal_btn').addEventListener('click', () =>{
  modalContainer.classList.remove('active');
})

//note buttons
noteContainer.addEventListener('click', (e) => {
if(e.target.classList.contains('note_view')){
  const currentNote = e.target.closest('.note');
  const currentTitle = currentNote.querySelector('.note_title').textContent;
  const currentBody = currentNote.querySelector('.note_body').textContent;
  activateNoteModal(currentTitle, currentBody);
  }

  if(e.target.classList.contains('note_delete')){
    const currentNote = e.target.closest('.note');
    showAlertMessage('Your note have been deleted.', 'remove-message');
    currentNote.remove();
    const id = currentNote.querySelector('span').textContent;
    removeNote(Number(id));
  }
})

// show alert message
function showAlertMessage(message, alertClass){
  const AlertDiv = document.createElement('div');
  AlertDiv.className = `message ${alertClass}`;
  AlertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement("beforebegin", AlertDiv);
  titleInput.focus();
  setTimeout(() => AlertDiv.remove(), 2000);
} 

//local storage
// Function: Retreive notes from local storage
function getNotes(){
  let notes;
  if(localStorage.getItem('noteApp.notes') === null){
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('noteApp.notes'));
  }
  return notes;
}

function addNotesToLocalStorage(note){
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem('noteApp.notes', JSON.stringify(notes));
}

//remove from local storage
function removeNote(id){
  const notes = getNotes();
  notes.forEach((note, index) => {
    if (note.id === id){
      notes.splice(index, 1);
    }
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
  })
}

