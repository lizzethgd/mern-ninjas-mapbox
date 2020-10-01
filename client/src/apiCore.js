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
  

export const addNinja = ( nameF, rankF, lng, lat ) => {
  const ninja = {
          name: nameF,
          rank: rankF,
          geometry: {
            type: 'Point',
            coordinates: [lng,lat]
            }
  }
  console.log(ninja)

  return fetch('/api/ninjas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ninja) 
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
      return;
    })
}


export const getNinja = (ninjaId) => {
  return fetch(`/api/ninjas/${ninjaId}`, {
    method: "GET"
  }).then(response => {
    return response.json();
  })
    .catch(err => console.log(err))
} 


export const deleteNinja = (ninjaId) => {
  return fetch(`/api/ninjas/${ninjaId}`, {
    method: "DELETE"
  }).then(response => {
    return response.json();
  })
    .catch(err => console.log(err))
}


export const updateNinja = (ninjaId) => {
  return fetch(`/api/ninjas/${ninjaId}`, {
    method: "PUT"
  }).then(response => {
    return response.json();
  })
    .catch(err => console.log(err))
}
