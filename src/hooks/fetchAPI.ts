
export const fetchData = async (api:string, method:string, data:Object | null) => {
    const  userLogin = localStorage.getItem("token")
    console.log(userLogin)
    const response = await fetch(import.meta.env.VITE_API + api, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLogin}`,
      },
      body: data != null ? JSON.stringify(data) : null
    })
      return await response
}