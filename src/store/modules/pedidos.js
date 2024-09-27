import axios from 'axios';
export default {
    namespaced: true,
    state: {
        cart: [],
        msg: ''        
    },

    getters: {
        getCart: (state) => state.cart,
    },
    
    mutations: {
        add_cart: (state, data) => {
            state.cart.push(data);
        },
    },

    actions: {
        async list({ commit }) {
            try {
                const response = await axios.get(`api/listPedidos`);
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
                const response = await axios.post(`api/createPedido`, data);
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