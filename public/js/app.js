console.log('Client side javascript loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const imgOne = document.querySelector('#img-1');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    imgOne.src = '';

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data => {
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
            imgOne.src = '';
        }else{
            console.log(data);
            imgOne.src = data.icon;
            messageOne.textContent = "Location: " + data.location;
            messageTwo.textContent = data.forecast;
        }        
    }))
});
})

