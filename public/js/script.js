console.log("heelo mailer")

const form =  document.getElementById('personform')
const name =  document.getElementById('personname')
const email =  document.getElementById('personemail')
const message =  document.getElementById('personmessage')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let formdata = {
        name: name.value,
        email: email.value,
        message: message.value
    }

    console.log(formdata)

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('email sent');
            name.value = "";
            email.value = "";
            message.value = "";
        }
        else{
            alert('something is going wrong')
        }
    }

    xhr.send(JSON.stringify(formdata));

});