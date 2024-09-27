import axios from 'axios';
export default {
    namespaced: true,
    state: {
        modelos: [],
        msg: ''        
    },

    getters: {
        getModelos: (state) => state.modelos,
    },

    
    mutations: {
        GET_MODELOS: (state, data) => {
            state.modelos = data
        },
    },

    actions: {
        async all({ commit }) {
            try {
                const response = await axios.get(`api/allModelos`);
                 if (response && response.status == 200) {
                    commit('GET_MODELOS',response.data);
                    return response.data;
                } else {
                    throw new Error("Response error");
                }
            } catch (error) {
                console.error("[ERROR] ", error.response ? error.response.data.message : error.message);
                throw error;
            }
        },

        async list({ commit },id) {
            try {
                const response = await axios.get(`api/listModelos/${id}`);
                 if (response && response.status == 200) {
                    return response.data;
                } else {
                    throw new Error("Response error");
                }
            } catch (error) {
                console.error("[ERROR] ", error.response ? error.response.data.message : error.message);
                throw error;
            }
        },

        async create({ commit }, data) {
            try{
                const response = await axios.post(`api/createModelo`, data, {
                    headers: {
                        'Content-Type':'multipart/form-data',
                    }
                });
    
                if(response && response.status == 200){
                    return response.data;
                }else{
                    throw new Error("Response error")
                }
            }catch(error){
                console.error("[ERROR] ", error.response ? error.response.data.message : error.message);
                throw error;
            }

        },
    },

}