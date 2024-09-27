import axios from 'axios';
export default {
    namespaced: true,
    state: {
        productos: [],
        producto: {},
        msg: ''
    },

    getters: {
        getProductos: (state) => state.productos,
        getProducto: (state) => state.producto,
    },

    mutations: {
        GET_PRODUCTOS: (state, data) => {
            state.productos = data
        },

        GET_PRODUCTO: (state, data) => {
            state.producto = data
        },
    },

    actions: {
        async all({ commit }) {
            try {
                const response = await axios.get(`api/allProductos`);
                if (response && response.status == 200) {
                    commit('GET_PRODUCTOS', response.data);
                    return response.data;
                } else {
                    throw new Error("Response error");
                }
            } catch (error) {
                console.error("[ERROR] ", error.response ? error.response.data.message : error.message);
                throw error;
            }
        },

        async list({ commit }, categoria_id) {
            try {
                const response = await axios.get(`api/listProductos/${categoria_id}`);
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

        async listParams({ commit }, params) {
            try {

                const queryString = new URLSearchParams(params).toString();
                const response = await axios.get(`api/listParamProductos?${queryString}`);
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
        
        async findById({ commit }, id) {
            try {
                const response = await axios.get(`api/findProducto/${id}`);
                if (response && response.status == 200) {
                    commit('GET_PRODUCTO', response.data);
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
            try {
                const response = await axios.post(`api/createProducto`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                if (response && response.status == 200) {
                    return response.data;
                } else {
                    throw new Error("Response error")
                }
            } catch (error) {
                console.error("[ERROR] ", error.response ? error.response.data.message : error.message);
                throw error;
            }

        },

        async update({ commit }, data) {
            try {
                let { formData,id } = data;
                const response = await axios.patch(`api/updateProducto/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                if (response && response.status == 200) {
                    return response.data;
                } else {
                    throw new Error("Response error")
                }
            } catch (error) {
                console.error("[ERROR] ", error.response ? error.response.data.message : error.message);
                throw error;
            }

        },
    },

}