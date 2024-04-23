import user from "./user";

export default async function sendRequest(url = null,data){
  var myHeaders = new Headers();
  var auth = user.token_type + ' ' + user.access_token;
  myHeaders.append("Authorization", auth);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };
  
  return fetch(url == null ?"http://127.0.0.1:8000/api/comodity":url, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
}