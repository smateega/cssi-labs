let googleUser, userId;

window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if (user) {
                console.log(`Logged in as : ${user.displayName}`);
                googleUser = user;

                userId = googleUser.uid;

            } else {
                windom.location = 'index.html';
            }
        });
}

const submitNote = () => {
    const note = document.querySelector('#noteText').value;
    const title = document.querySelector('#noteTitle').value;

    var d = new Date();
    var month = d.getMonth();
    var date = d.getDate();
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    const timeStamp = month + "/" + date + "/" + year + " " + hour + ":" + min + ":" + sec;
    //console.log(month, date, year, hour, min, sec);
    //console.log(timeStamp);


    const label = document.querySelector('#dropdown').value;
    //console.log(label);

    firebase.database().ref().push(
        {
            title: title,
            note: note,
            created: timeStamp,
            label: label
        })
        .then(() =>{
            //tell the user the note was usccessfully stored
            document.querySelector("#noteText").value = "";
            document.querySelector("#noteTitle").value = "";
            document.querySelector("#dropdown").value = "start";
        })
      

};

