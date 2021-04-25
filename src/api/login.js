import myaxios from '../utils/myaxios'



export function login(username, password) {

  return myaxios({
    method: 'post',
    url: '/user/login',
    data: {
      username,
      password
    }

  })


}

export function getUserInfo(token) {
  return myaxios({
    method: 'get',
    //url: 'user/info?token=admin'
    url: `user/info?${token}`

  })
}

export function logout(token) {
  return myaxios({
    method: 'post',
    url: `user/logout?${token}`,
    //url: `user/logout/${token}`,
    //url: 'user/logout?token=admin'
    
  })
}
