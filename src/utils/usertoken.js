const TOKEN_KEY="blyd-manager-token"
const USER_KEY="blyd-manager-user"
//获取
export function  getToken(){
    return localStorage.getItem(TOKEN_KEY)
}
//保存
export function setToken(token){
    return localStorage.setItem(TOKEN_KEY,token)

}
export function getUser(){
    return JSON.parse(localStorage.getItem(USER_KEY))//转为对象
}

export function setUser(user){
    return localStorage.setItem(USER_KEY,JSON.stringify(user))//转为字符串

}
//移除
export function removeToken(){
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)

}