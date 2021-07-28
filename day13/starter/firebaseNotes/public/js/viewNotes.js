let googleUserId, editNoteId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data); //change to "sort(data)"
  });
};

const sort = (data) => {
  let cardArray = [];
  for(const noteItem in data) {
    const note = data[noteItem];
    // For each note create an HTML card
    console.log(note);

    cardArray.push(note);

    console.log(cardArray);
  };

  cardArray.sort(function(a, b) {
    let titleA = a.title;
    let titleB = b.title;

    if (titleA < titleB){
        return -1;
    }
    if (titleA > titleB){
        return 1;
    }
    return 0;
  });

  console.log(cardArray);
  renderDataAsHtml(cardArray)
};

const renderDataAsHtml = (data) => { //change to "renderDataAsHtml = (cardArray)""
  let cards = ``;
  for(const noteItem in data) {
    const note = data[noteItem];
    // For each note create an HTML card
    cards += createCard(note, noteItem);
  };

  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};


const createCard = (note, noteId) => {
    return `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
                <footer class="card-footer">
                    <a id="${noteId}" href="#" class="card-footer-item"
                        onclick="deleteNote('${noteId}')">
                        Delete
                    </a>
                    <a href="#" class="card-footer-item"
                        onclick="editNote('${noteId}')">
                        Edit
                    </a>
                </footer>
            </div>
        </div>
    `;
};

const deleteNote = (noteId) => {
    console.log(`Deleting note: ${noteId}`)

    if (confirm("Are you sure you want to delete this note?")) {
        firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
    } else {

    }
};

const editNote = (noteId) => {
    console.log(`Editing note" ${noteId}`);
    
    editNoteId = noteId;

    // show the modal dialog
    const editNoteModal = document.querySelector('#editNoteModal');

    // get the text from the note in the database
    const notesRef = firebase.database().ref(`users/${googleUserId}/${noteId}`);
    notesRef.on('value', snapshot => {
        const data = snapshot.val();

        console.log(data);

        // show the text from the databse in the modal
        // set the text into an editable form
        document.querySelector('#editTitleInput').value = data.title;
        document.querySelector('#editTextInput').value = data.text;
    });

    editNoteModal.classList.toggle('is-active');

};

const closeEditModal = () => {
    const editNoteModal = document.querySelector('#editNoteModal');
    editNoteModal.classList.toggle('is-active');
}

const saveEditedNote = () => {
    const newTitle = document.querySelector('#editTitleInput').value;
    const newNote = document.querySelector('#editTextInput').value;
    firebase.database().ref(`users/${googleUserId}/${editNoteId}`)
        .set({
            title: newTitle,
            text: newNote
        })
    closeEditModal;
}

    

    

    // hide the modal box.. once the user has made their changes

    // Save the updated text to the database

    // 