import myaxios from '../utils/myaxios'

export default {
 //效验是否与旧密码相同
  checkPwd(userId, oldPassword) {
    return myaxios({
      method: 'post',
      url: '/user/pwd',
      data: {
        userId,
        oldPassword
      }

    })

  },
  //修改旧密码
  updatePwd(userId, newPassword){

    return myaxios({
      method: 'put',
      url: '/user/pwd/updete',
      data: {
        userId,
        newPassword
      }

    })

  }
}