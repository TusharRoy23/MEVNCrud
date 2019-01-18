import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: "http://192.168.0.126:4040"
    })
}