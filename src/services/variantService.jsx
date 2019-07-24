import axios from 'axios';
import { config } from '../configuration/config';

export const VariantService = {
    getAll: () => {
        const result = axios.get(config.url + '/variant')
            .then(respon => {
                return {
                    success: true,
                    result: respon
                }
            })
            .catch(error => {
                return {
                    success: false,
                    result: error
                }
            })
        return result;
    },
    getById: (id) => {
        const result = axios.get(config.url + '/variant/' + id)
            .then(respon => {
                return {
                    success: true,
                    result: respon
                }
            })
            .catch(error => {
                return {
                    success: false,
                    result: error
                }
            })
        return result;
    },
    post: (variant) => {
        const result = axios.post(config.url + '/variant', variant)
            .then(respon => {
                return {
                    success: true,
                    result: respon
                }
            })
            .catch(error => {
                return {
                    success: false,
                    result: error
                }
            })
        return result;
    },
    put: (id, variant) => {
        const result = axios.put(config.url + '/variant/' + id, variant)
            .then(respon => {
                return {
                    success: true,
                    result: respon
                }
            })
            .catch(error => {
                return {
                    success: false,
                    result: error
                }
            })
        return result;
    },
    delete: (id) => {
        const result = axios.delete(config.url + '/variant/' + id)
            .then(respon => {
                return {
                    success: true,
                    result: respon
                }
            })
            .catch(error => {
                return {
                    success: false,
                    result: error
                }
            })
        return result;
    }
}