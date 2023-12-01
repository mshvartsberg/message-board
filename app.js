var messagesRef = firebase.database()
    .ref('Messages'); 


var messages = [];
messagesRef.on("value", snap => {
    messages = [];
    snap.forEach(val => {
        messages.push( val.val());     
    });
    //const event = new Event('build');
    //document.getElementById("mess").dispatchEvent(event);
    messagesSort(messages, -1);
    createMessagesTable(messages);
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
        createdBy: "Anonymous User"
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


function createMessagesTable(messages){
    const messDiv = document.querySelector("#messages") // Find the messages div in our html
    let tableHeaders = ["Created At(UTC)", "Created By", "Message"]
    const createTable = () => {
        while (messDiv.firstChild) messDiv.removeChild(messDiv.firstChild) // Remove all children from messages div (if any)
        let messagesTable = document.createElement('table') // Create the table itself
        messagesTable.className = "messTable table table-hover";// 'messTable';   table-sm table-responsive table table-hover
        let messagesTableHead = document.createElement('thead'); // Creates the table header group element
        messagesTableHead.className = 'messTableHead';
        let messagesTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
        messagesTableHeaderRow.className = 'messTableHeaderRow bg-secondary';
        // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
        tableHeaders.forEach(header => {
            let messageHeader = document.createElement('th') // Creates the current header cell during a specific iteration
            messageHeader.innerText = header
            messagesTableHeaderRow.append(messageHeader) // Appends the current header cell to the header row
        })
        messagesTableHead.append(messagesTableHeaderRow) // Appends the header row to the table header group element
        messagesTable.append(messagesTableHead)
        let messagesTableBody = document.createElement('tbody') // Creates the table body group element
        messagesTableBody.className = "messTable-Body"
        messagesTable.append(messagesTableBody) // Appends the table body group element to the table
        messDiv.append(messagesTable) // Appends the table to the messages div
        return messagesTable;
    }
  
    //The function below adds every message as a Table row
    const appendMessages = (messagesTable, messages) => {

        messages.forEach(message => {
            let messagesTableBodyRow = document.createElement('tr') // Create the current table row
            messagesTableBodyRow.className = 'messTableBodyRow'
            
            let createdAt= document.createElement('td')
            createdAt.innerText = formatDateTimeFromTicks(message.createdAt);
            let createdBy= document.createElement('td')
            createdBy.innerText = message.createdBy;
            let messageText= document.createElement('td')
            messageText.innerText = message.messageText;
            

            messagesTableBodyRow.append(createdAt, createdBy, messageText)

            
            
            messagesTable.append(messagesTableBodyRow) // Append the current row to the messages table body
        })
        
    }

     
    appendMessages(createTable(), messages);
    

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
    const messDiv = document.querySelector("#messages1") // Find the messages div in our html
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
        cardBody.append(cardTitle, cardText);
        card.append(cardBody);
        return card;
    }
    // The function below adds every message as a card
    const appendMessages = (messages) => {        
        const messDiv = document.querySelector("#messages1");
        messages.forEach(message => {
            card = createCard(message);
            messDiv.append(card);
        })
        
    }
    removeOldCards();
    appendMessages(messages);
    

}


