const btn = document.querySelector(".chat-input span");
let inputbox = document.getElementById("textbox");
const chatbox = document.querySelector(".Chatbox");
let usermessage;
let thinking="Thinking...";

function createchatli(message) {
    let createli = document.createElement("li");
    createli.classList.add("chat-outgoing");
    createli.innerHTML = `<p>${message}</p>`;
    return createli;
}

function outcome(message) {
    let createli = document.createElement("li");
    createli.classList.add("chat");
    createli.innerHTML = `
        <span><i class="fa-solid fa-robot"></i></span>
        <p>${message}</p>
    `;
    return createli;
}

const api_url = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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" ;

const response = (userMessage) => {
    const request_options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "user", "content": userMessage }
            ]
        })
    };

    fetch(api_url,request_options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const thinking = data.choices[0].message.content;

            const list = document.createElement("li");
            list.classList.add("chat");
            list.innerHTML = `
                <span><i class="fa-solid fa-robot"></i></span>
                <p>${thinking}</p>
            `;
            chatbox.appendChild(list);

        })
        .catch(err => {
            console.log('There was a problem with the fetch operation:', err);
        });
};


btn.addEventListener("click", () => {
    usermessage = inputbox.value.trim();

    if (!usermessage) return;

    chatbox.appendChild(createchatli(usermessage));

    setTimeout(() => {
      
        chatbox.appendChild(outcome(thinking));
     response(usermessage);
       inputbox.value="";
    }, 600);

});