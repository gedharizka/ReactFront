import axios from 'axios';
import {config} from '../configuration/config';
// import axios from 'axios';


export const CategoryServices={

    getAll:()=>{
        const result = axios.get(config.url+'/category')
        .then(response =>{
            return{
                success:true,
                result: response
            }
        })
        .catch(error=>{
            return {
                success:false,
                result:error
            }
        })
        return result;
    },
    
    getById:(id)=>{
        const result = axios.get(config.url+'/category/'+id)
        .then(response =>{
            return{
                success:true,
                result: response
            }
        })
        .catch(error=>{
            return {
                success:false,
                result:error
            }
        })
        return result;
    },

    post: (category)=>{
        const result = axios.post(config.url+'/category',category)
        .then(response =>{
            return{
                success:true,
                result: response
            }
        })
        .catch(error=>{
            return {
                success:false,
                result:error
            }
        })
        return result;

    },

    put: (id,category)=>{
        const result = axios.put(config.url+'/category/'+id,category)
        .then(response =>{
            return{
                success:true,
                result: response
            }
        })
        .catch(error=>{
            return {
                success:false,
                result:error
            }
        })
        return result;
    },
    
    delete:(id)=>{
        const result = axios.delete(config.url+'/category/'+id)
        .then(response =>{
            return{
                success:true,
                result: response
            }
        })
        .catch(error=>{
            return {
                success:false,
                result:error
            }
        })
        return result;
    }
}