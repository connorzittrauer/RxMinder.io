export default class APIService {
    static UpdateName(id, name) {
        return fetch(`http://127.0.0.1:5000/update/${id}`, {
           'method':'PUT',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify(name)
            
          })
          .then(resp => resp.json())
    }

    static AddPrescription(id, name, dosage) {
      return fetch(`http://127.0.0.1:5000/add`, {
         'method':'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(name, dosage)
          
        })
        .then(resp => resp.json())
  }


}