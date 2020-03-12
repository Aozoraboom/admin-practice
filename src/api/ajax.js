/*
    能发送异步请求的函数模块
    包装axios
    函数返回值是promise对象
    优化1：统一处理请求异常 ——在外层包一个自己创建的promise对象，在出错时，不return，而是进行提示
    优化2：异步得到的不是response,而是response.data，在请求成功resolve的时候，resolve(response.data)
*/
import axios from 'axios';
import{message} from 'antd';
export default function ajax(url, data={}, method ='GET'){

    return new Promise((resolve,reject)=>{
        let promise;
        // 1.执行异步的ajax请求
        if (method === 'GET'){  // 发GET请求
            promise = axios.get(url, {params: data});
        }else {  // 发post请求
            promise = axios.post(url, data);
        }
        // 2.如果成功，调用resolve(value)
        promise.then (response => {
            resolve(response.data);
        // 3.如果失败了，不调用reject(reason)而是提示异常信息
        }).catch(error =>{
            message.error(error);
        });
    })

}
