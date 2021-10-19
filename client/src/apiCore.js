export const getNinjas = (lgn,lat,rad) => {
    return fetch(
      `/api/ninjas/near?lng=${lgn}&lat=${lat}&rad=${rad}`,
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
  

export const addNinja = ( nameF, rankF, availableF, lng, lat ) => {
  const ninja = {
          name: nameF,
          rank: rankF,
          available : availableF,
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


export const updateNinja = (ninjaId, nameF, rankF, availableF, lng, lat) => {
  const ninja = {
    name: nameF,
    rank: rankF,
    available : availableF,
    geometry: {
      type: 'Point',
      coordinates: [lng,lat]
      }
  }
  return fetch(`/api/ninjas/${ninjaId}`, {
    method: "PUT",
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
  
