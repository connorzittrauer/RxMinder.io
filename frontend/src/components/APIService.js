export default class APIService {
  //call fetch can be used for any endpoint its parameters define how it is called
    static CallFetch(route, method, body={}) {
      let bodyContent = null;
      if (method === "POST" || method === "PUT") {
        bodyContent=JSON.stringify(body)
      }

        return fetch(`http://127.0.0.1:5000/${route}`, {
          "method": method,
          headers: {
            'Content-Type':'application/json'
          },
          body: bodyContent
        })
          .then(resp => resp.json())
    }
}