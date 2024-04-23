import user from "./user";

export default async function auth(url,credentials = null){

  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(credentials),
    redirect: 'follow'
  };

  if(credentials == null){
    var token = user.token_type + ' ' + user.access_token;
    requestOptions = {
      method:'post',
      headers:{
        "Authorization": token
      },
      redirect:'follow'
    }
  }



return fetch(url, requestOptions)
  .then(response => response.json())
  .then(result => result)
  .catch(error => console.log('error', error));
}