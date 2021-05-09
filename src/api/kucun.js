import myaxios from '../utils/myaxios'





export default {
    getUserListPage() {
    return myaxios({
      method: 'get',
      url: '/kucun/listpage'
      
    })

  },
  removeUser(id) {
    return myaxios({
      method: 'delete',
      url: `/kucun/remove?${id}`
      

    })

  },
  addUser(userfrom) {
    return myaxios({
      method: 'post',
      url: '/kucun/add',
      data: userfrom

      


    })

  },
  
  editUser(userObj) {
    return myaxios({
      method: 'put',
      url: `/kucun/edit?${userObj.id}`,
      data: userObj

    })

  },
  batchRemoveUser(id){

    return myaxios({
      method: 'delete',
      url: `/kucun/batchremove?${id}`


    })

  }
}
