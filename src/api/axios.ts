import axios from "axios";

const Api = axios.create({
    baseURL: 'https://leandroeffgen.com.br/projects/loja_virtual/json'
})

export default Api;