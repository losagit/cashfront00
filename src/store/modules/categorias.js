import axios from 'axios';
export default {
    namespaced: true,
    state: {
        categorias: [],
        categoria:{},
        msg: ''
    },

    getters: {
        getCategorias: (state) => state.categorias,
        getCategoria: (state) => state.categoria,
    },

    mutations: {
        GET_CATEGORIAS: (state, data) => {
            state.categorias = data
        },

        GET_CATEGORIA: (state, data) => {
            state.categoria = data
        },
    },

    actions: {
        async list({ commit }) {
            try {
                const response = await axios.get(`api/listCategorias`);
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

        async findById({ commit },id) {
            try {
                const response = await axios.get(`api/findCategoria/${id}`);
                 if (response && response.status == 200) {
                    console.warn(response.data);
                    commit('GET_CATEGORIA',response.data);
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
                const response = await axios.post(`api/createCategoria`, data);
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