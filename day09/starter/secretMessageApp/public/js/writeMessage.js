const submitMessage = () => {
    console.log("working");
    const passcodeInput = document.querySelector('#passcode');
    const messageInput = document.querySelector('#message');
    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;
    
    // Send to firebase
    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue
    });

    // Clear values from inputs
    passcodeInput.value = ''
    messageInput.value = ''
};

// OTHER WAY TO MAkE EVENT HAPPEN WITHOUT USING ONCLIN IN HTML
//const sendMessageButton = document.querySelector('button');
//sendMessageButton.addEventListener('click', submitMessage);

