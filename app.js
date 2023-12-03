var messagesRef = firebase.database()
    .ref('Messages'); 


var messages = [];
messagesRef.on("value", snap => {
    messages = [];
    snap.forEach(val => {
        var message = val.val();
        message.id= val.key;
        messages.push(message);     
    });
    //const event = new Event('build');
    //document.getElementById("mess").dispatchEvent(event);
    messagesSort(messages, -1);
    createMessagesCards(messages);
});

var form = document.getElementById('messageForm');
form.addEventListener('submit', submitForm);


//Process when user clicks submit button
function submitForm(e) {

    e.preventDefault();
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
        
        e.stopPropagation();
        return;
      }


    // Get values
    var messageText = getInputVal('message');
    saveMessage(messageText);
    alert("Thank you, your message was posted");
    form.reset();
    form.classList.remove('was-validated');
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

function getCurrentTimeUTC()
{
    //RETURN:
    //      = number of milliseconds between current UTC time and midnight of January 1, 1970
    var tmLoc = new Date();
    //The offset is in minutes -- convert it to ms
    return tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000;
}

// Save recommendations to firebase
function saveMessage(messageText) {
    var message = {
        createdAt: getCurrentTimeUTC(), //Date.now(),
        messageText: messageText,
        createdBy: "Anonymous User",
        likes: 0,
        liked: false
    }
    var newMessageRef = messagesRef.push();
    newMessageRef.set(message);
}

function formatDateTimeFromTicks(nTicks)
{
    //'nTicks' = number of milliseconds since midnight of January 1, 1970
    //RETURN:
    //      = Formatted date/time
    return new Date(nTicks).toLocaleString();
}

function messagesSort(messages, sortOrder=1){

    if ((sortOrder !== 1 && sortOrder !== -1) || !messages)
        return messages;
    compare = ( a, b ) => {
        if ( a.createdAt < b.createdAt ){
          return -1*sortOrder;
        }
        if ( a.createdAt > b.createdAt ){
          return 1*sortOrder;
        }
        return 0;
      }
      
      messages.sort( compare );

}


function createMessagesCards(messages){
    const messDiv = document.querySelector("#messages") // Find the messages div in our html
    const removeOldCards = () => {
        while (messDiv.firstChild) messDiv.removeChild(messDiv.firstChild) // Remove all children from messages div (if any)
    }

    createCard = (message) =>{
        let card = document.createElement("div"); 
        card.className = "card bg-light text-dark";       
        let cardBody = document.createElement("div");        
        cardBody.className = "card-body";
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = message.messageText;
        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerText = formatDateTimeFromTicks(message.createdAt);
        let button = document.createElement('button');
        button.className="btn liked btn-sm";
        button.innerText="Like"; //change to thumbs up image
        button.id=message.id;
        cardBody.append(cardTitle, cardText, button);
        if (message.likes) {        
            let cardFooter = document.createElement("div");
            cardFooter.className = "card-footer liked";
            if (message.likes == 1)
                cardFooter.innerText = message.likes + " Like";
            else    
                cardFooter.innerText = message.likes + " Likes";
           // card.className = "card liked text-dark";
            card.append(cardBody,cardFooter);
        } else {
            card.append(cardBody);
        }     
        

        return card;
    }

    function like(id, likes){
        console.log(id);
        var messageRef = firebase.database().ref('Messages/' + id);
        messageRef.update({likes: likes})
        .then(() => {
            console.log("Update Successfull")
        })
        .catch(error => {
            console.log(error);
        });
        return false;
    }
    // The function below adds every message as a card
    const appendMessages = (messages) => {        
        const messDiv = document.querySelector("#messages");
        messages.forEach(message => {
            card = createCard(message);
            messDiv.append(card);
            var cardButton = document.getElementById(message.id);
            var likes = message.likes > 0 ? message.likes + 1: 1;
            cardButton.addEventListener('click', like.bind(null, message.id, likes),false);
        
        })
        
    }
    removeOldCards();
    appendMessages(messages);
    

}

