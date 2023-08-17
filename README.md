# Token API Microservice


How to REQUEST a new Token from token API('http://localhost:8000/tokenapi'):
-	Token API can receive a request using HTTP Post requests to 'http://localhost:8000/tokenapi'.
-	The API takes 2 strings as arguments, the first being the object ID or Primary Key from database, and second being the time limit for the validity of token. 
    Example call: 
    axios.post('http://localhost:8000/tokenapi', { objectId: objectId, time: time }, { headers: { 'Content-Type': 'application/json', },});
 	
How to RECEIVE a new Token from token API:
-	Token API will respond to request for token in the data section of the response. Users can find the token in response.data
  
How to REQUEST a decrypted ID from token API('http://localhost:8000/tokenapi/verify') using token:
-	Token API can receive a request for the decrypted id using HTTP Post requests to 'http://localhost:8000/tokenapi/verify'.
-	The API takes a single token as an argument in string form.
  Example call: 
  axios.post('http://localhost:8000/tokenapi/verify', { token_Id }, { headers: { 'Content-Type': 'application/json',},});
 	
How to RECEIVE a decrypted id from token API:
-	Token API will respond to request for a decrypted ID in the data section of the response. Users can find the token in response.data.id

UML sequence diagram:
![UML assignment 9](https://github.com/nishanthdass/pantryapp/assets/19554568/074934bc-3071-49dc-8cb4-762a531ff890)

