import axios from 'axios';

const baseUrl = "http://localhost:3001"

const serverController = {

    async getAllProperty (page, filter, sort) {
        if (!page) page = 1;

        try {
            if(filter !== "null" && sort !== "null"){
                return await axios.get(baseUrl + "/api/property/?page=" + page + "&filter=" + filter + "&sort=" + sort)
            }
            else if ((filter  !== "null" && sort === "null") || (filter !== "null" && !sort)){
                return await axios.get(baseUrl + "/api/property/?page=" + page + "&filter=" + filter)
            }
            else if((filter === "null" && sort !== "null") || (sort !== "null" && !filter) ){
                return await axios.get(baseUrl + "/api/property/?page=" + page + "&sort=" + sort)
            }else{
                return await axios.get(baseUrl + "/api/property/?page=" + page)
            }
            
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e

            
        }
    },

    async getProperty (pid) {
        try {
            return await axios.get(baseUrl + "/api/property/" + pid)
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async postProperty (user, property) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
            // throw "fail getting usertoken"
        }
        const {title, description, price, type, zipcode, bedroom, bath, date, album} = property
        const data = {
            title: title,
            description: description,
            price: parseInt(price),
            type:type,
            zipcode:zipcode,
            bedroom:parseInt(bedroom),
            bath:parseInt(bath),
            date:date,
            album: album
        }
        try {
            return await axios.post(baseUrl + "/api/property/", data, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async editProperty (pid, user, property) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
            // throw Error("fail getting usertoken")
        }
  
        const {title, description, price, type, zipcode, bedroom, bath, date, newImages, removedImages} = property
        const data = {
            title: title.value,
            description: description.value,
            price: parseInt(price.value),
            type:type.value,
            zipcode:zipcode.value,
            bedroom:parseInt(bedroom.value),
            bath:parseInt(bath.value),
            date:date,
            newImages: newImages,
            removedImages: removedImages
        }

        try {
            return await axios.put(baseUrl + "/api/property/" + pid, data, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },
    
    async deleteProperty (pid, user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
            // throw Error("fail getting usertoken")
        }
        try {
            return await axios.delete(baseUrl + "/api/property/" + pid, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async postUser (user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
            // throw Error("fail getting usertoken")
        }
        try {
            return await axios.post(baseUrl + "/api/user/", null, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async getUser (user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
        }

        try {
            return await axios.get(baseUrl + "/api/user/", {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async getUserId (userId) {
        try {
            return await axios.get(baseUrl + "/api/user/" + userId)
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async addWatchlist (propertyId, user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
            // throw Error("fail getting usertoken")
        }
        const data = {
            propertyId: propertyId
        }
        try {
            return await axios.post(baseUrl + "/api/user/watchlist", data, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async removeWatchlist (propertyId, user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
            // throw Error("fail getting usertoken")
        }
        try {
            return await axios.delete(baseUrl + "/api/user/watchlist/" + propertyId, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async getWatchlist (user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
            // throw Error("fail getting usertoken")
        }
        try {
            return await axios.get(baseUrl + "/api/user/watchlist", {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },

    async editUser (user, phone, avatar) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw e
        }
        const data = {
            phone: phone,
            avatar: avatar
        }
        try {
            return await axios.patch(baseUrl + "/api/user/", data, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },
	
	async getImage (imgid) {
        try {
            return await axios.get(baseUrl + "/api/image/" + imgid)
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw Object.assign(new Error(e.response.data.error), { code: e.response.status });
            throw e
        }
    },
};

export default serverController;
