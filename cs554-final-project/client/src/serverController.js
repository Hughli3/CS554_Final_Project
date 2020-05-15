import axios from 'axios';

const baseUrl = "http://localhost:3001"

const serverController = {

    async getAllProperty (page) {
        if (!page) page = 1;
        try {
            return await axios.get(baseUrl + "/api/property/?page=" + page)
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async getProperty (pid) {
        return await axios.get(baseUrl + "/api/property/" + pid)
    },

    async postProperty (user, property) {
        const token = await user.getIdToken(true)
        const {title, description, price, type, zipcode, bedroom, bath, date} = property
        const data = {
            title: title.value,
            description: description.value,
            price: price.value,
            type:type.value,
            zipcode:zipcode.value,
            bedroom:bedroom.value,
            bath:bath.value,
            date:date
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

    async getUserId (userId) {
        try {
            return await axios.get(baseUrl + "/api/user/" + userId)
        } catch (e) {
            throw (e.response.data.error)
        }
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
	
	async addImage (imgs) {
        const data = {
            data: imgs
        }
        return await axios.post(baseUrl + "/api/image", data)
    },
};
  
export default serverController;
