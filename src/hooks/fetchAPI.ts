
const  userLogin = localStorage.getItem("token")
export const fetchGETData = async (api:string) => {

    const response = await fetch(import.meta.env.VITE_API + api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userLogin}`,
      }
    })
      return await response
  }

export const fetchPOSTData =async (api:string, body:Object) => {
  const response = await fetch(import.meta.env.VITE_API + api, {
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
  const response = await fetch(import.meta.env.VITE_API+ api + id, {
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
  const response = await fetch(import.meta.env.VITE_API + api, {
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