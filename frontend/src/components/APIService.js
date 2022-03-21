export default class APIService {
    static UpdateName(id, name) {
        return fetch(`http://127.0.0.1:5000/update/${id}/`, {
           'method':'PUT',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify(name)
            
          })
          .then(resp => resp.json())
    }
}