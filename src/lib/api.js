const BASE_URL = 'https://dry-refuge-16495.herokuapp.com'

export default{
    async getAllUsers(){
        const response = await fetch(`${BASE_URL}/users`)
        return await response.json()
    },
    async deleteUserById( userId ){
        const response = await fetch(`${BASE_URL}/users/${userId}`,{
            method:"DELETE"
        })
        return await response.json()
    },
    async editUserById( userId,data ){
        const response = await fetch(`${BASE_URL}/users/${userId}`,{
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        })
        return await response.json()
    },
    async saveUser( data ){
        const response = await fetch(`${BASE_URL}/users`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        })
        return await response.json()
    }
}