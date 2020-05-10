import axios from 'axios';

const baseUrl = "http://localhost:3000"

const serverController = {

    async getAllProperty () {
        return await axios.get(baseUrl + "/api/property/")
    },

    async getProperty (pid) {
        return await axios.get(baseUrl + "/api/property/" + pid)
    },

    async postProperty (user, property) {
        const token = await user.getIdToken(true)
        const {title, description, price} = property
        const data = {
            title: title.value,
            description: description.value,
            price: price.value
        }
        return await axios.post(baseUrl + "/api/property/", data, {headers: {'Authorization': token}})
    },

    async postUser (user) {
        const token = await user.getIdToken(true)
        await axios.post(baseUrl + "/api/user/", null, {headers: {'Authorization': token}})
    },


    
};
  
export default serverController;