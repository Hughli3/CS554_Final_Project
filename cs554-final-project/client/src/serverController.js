import axios from 'axios';

const baseUrl = "http://localhost:3000"

const serverController = {

    async getAllProperty () {
        return await axios.get(baseUrl + "/api/property/")
    },

    async getProperty (pid) {
        return await axios.get(baseUrl + "/api/property/" + pid)
    },

    async postUser (user) {
        const token = await user.getIdToken(true)
        await axios.post(baseUrl + "/api/user/", null, {headers: {'Authorization': token}})
    },


    
};
  
export default serverController;