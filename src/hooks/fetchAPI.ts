
const  userLogin = localStorage.getItem("token")

export const fetchGETData = async (api:string) => {

    const response = await fetch("https://k9mgwp50x0.execute-api.eu-south-2.amazonaws.com/dev" + api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userLogin}`,
      }
    })
    if (response.ok) {
      return await response.json()
    }
}

export const fetchPOSTData =async (api:string, body:Object) => {
  const response = await fetch("https://k9mgwp50x0.execute-api.eu-south-2.amazonaws.com/dev" + api, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userLogin}`,
    },
    body: JSON.stringify(body)
  })
  if (response.ok) {
    return await response.json()
  }
}

export const fetchDELData  = async (api:string, id:number) => {
  const response = await fetch("https://k9mgwp50x0.execute-api.eu-south-2.amazonaws.com/dev" + api + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userLogin}`,
    },
  })
  if(response.ok) {
    return await response.json()
  }
}

export const fetchPATCHData =async (api:string, body:Object) => {
  const response = await fetch("https://k9mgwp50x0.execute-api.eu-south-2.amazonaws.com/dev" + api, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userLogin}`,
    },
    body: JSON.stringify(body)
  })
  if (response.ok) {
    return await response.json()
  }
}