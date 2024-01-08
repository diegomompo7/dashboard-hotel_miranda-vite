
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