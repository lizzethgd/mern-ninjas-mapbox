export const getNinjas = (lgn,lat) => {
    return fetch(
      `/api/ninjas/near?lng=${lgn}&lat=${lat}`,
      {
        method: 'GET'
      }
    )
      .then(response =>{ 
        console.log(response)
        return response.json()
      })
      .catch(err => console.log(err))
  }
  

  export const createNinja = ( ninja) => {
    return fetch(`/api/ninjas`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ninja)
    })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err)
      })
  }