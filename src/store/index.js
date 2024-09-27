import Vue from 'vue'
import Vuex from 'vuex'
import categorias from './modules/categorias';
import productos from './modules/productos';
import modelos from './modules/modelos';
import pedidos from './modules/pedidos';
import clientes from './modules/clientes';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categorias,
    productos,
    modelos,
    pedidos,
    clientes
  }
})
