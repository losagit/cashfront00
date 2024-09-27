import axios from 'axios';
export default {
    namespaced: true,
    state: {
        cliente: [],
        msg: ''
    },

    getters: {
        getClientes: (state) => state.clientes,
        getCliente: (state) => state.cliente,
    },

    mutations: {
        GET_CLIENTES: (state, data) => {
            state.clientes = data
        },

        GET_CLIENTE: (state, data) => {
            state.cliente = data
        },
    },

    actions: {
        async list({ commit }) {
            try {
                const response = await axios.get(`api/listClientes`);
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
                const response = await axios.get(`api/findCliente/${id}`);
                 if (response && response.status == 200) {
                    console.warn(response.data);
                    commit('GET_CLIENTE',response.data);
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
                const response = await axios.post(`api/createCliente`, data);
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