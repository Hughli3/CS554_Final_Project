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

    async deleteProperty (pid, user) {
        const token = await user.getIdToken(true)
        return await axios.delete(baseUrl + "/api/property/" + pid, {headers: {'Authorization': token}})
    },

    async postUser (user) {
        const token = await user.getIdToken(true)
        return await axios.post(baseUrl + "/api/user/", null, {headers: {'Authorization': token}})
    },

    async getUser (user) {
        const token = await user.getIdToken(true)
        return await axios.get(baseUrl + "/api/user/", {headers: {'Authorization': token}})
    },

    async addWatchlist (propertyId, user) {
        const token = await user.getIdToken(true)
        const data = {
            propertyId: propertyId
        }
        return await axios.post(baseUrl + "/api/user/watchlist", data, {headers: {'Authorization': token}})
    },

    async removeWatchlist (propertyId, user) {
        const token = await user.getIdToken(true)
        return await axios.delete(baseUrl + "/api/user/watchlist/" + propertyId, {headers: {'Authorization': token}})
    },

    async getWatchlist (user) {
        const token = await user.getIdToken(true)
        return await axios.get(baseUrl + "/api/user/watchlist", {headers: {'Authorization': token}})
    },
    
};
  
export default serverController;