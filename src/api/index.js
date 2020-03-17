/*
    包含应用中所有接口请求函数的模块
    每个函数的返回值都是promise
*/ 
import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';
// 登录
// export function reqLogin(username, password){
//     return ajax('/login',{username,password},'POST');
// }

export const reqLogin = (username,password) => ajax('/login',{username,password},'POST');

export const reqAddUsr = (user) => ajax('/manage/user/add',user,'POST');

export const reqWeather = (city) => {
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    
        jsonp(url,{},(err,data)=>{
            if(!err && data.status === "success"){
                const { dayPictureUrl,weather } = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather});
            }else {
                message.error('获取天气信息失败');
            }
        })

    })
}

// 获取分类的列表
export const reqCategorys = (parentId)=> ajax('/manage/category/list',{parentId});
// 添加分类
export const reqAddCategory = (parentId,categoryName='aaa') => ajax('/manage/category/add',{parentId,categoryName},'POST');
// 更新分类 
export const reqUpdateCategory = (categoryId,categoryName) =>ajax('/manage/category/update',{categoryId,categoryName},'POST');


