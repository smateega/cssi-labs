let displayName, emailAddress;

window.onload = () => {
    // When page loads, check use logged in state
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // if user is logged in, get user's notes from db
            // display notes on page
            const googleUserId = user.uid;
            displayName = user.displayName;
            emailAddress = user.email;
            
            getNotes(googleUserId);
        } else {
            // if user is not logged in, redirect to login page
            window.location = 'index.html';
        }
    })
};

// Get the users notes from the db, display notes on page
const getNotes = (userId) => {
    console.log(userId);
    const userRef = firebase.database().ref(`users/${userId}`);

    userRef.on('value', snapshot => {
        console.log(snapshot.val());
        writeNotesToHtml(snapshot.val());
    })
}

const writeNotesToHtml = (data) => {
    const noteRenderArea = document.querySelector('#app');
    for (let noteKey in data) {
        // create html stirng for one note
        let noteHtml = createHtmlForNote(data[noteKey]);
        noteRenderArea.innerHTML += noteHtml;
    }
    //put all html into page at once
}

// Returns a string t
const createHtmlForNote = (note) => {
    // TODO: create the elemts and put in the note data
    return `<div class="column is-one-third">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${note.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                </div>
            </div>}`;
};