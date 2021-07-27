const signIn = () => {
    console.log("Calling sin in");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            //Do something
            console.log(`Result is: ${result}`);
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;

            console.log(user.uid);

            window.location = "writeNote.html";

        }).catch(error =>{
            console.log("error");

        })

}


