import myaxios from '../utils/myaxios'

export default {
  getBookinfoList() {
    return myaxios({
      method: 'get',
      url: '/bookinfo/list'
    })

  },
  search(page, size, searchWhere) {
    return myaxios({
      method: 'post',
      //url: `/bookinfo/list/search/${page}${size}`,
      url: `bookinfo/list/search?${page}&${size}`,
      data: searchWhere

    })

  },
  add(bookfrom) {
    return myaxios({
      method: 'post',
      url: '/addbookinfo',
      data: bookfrom


    })

  },
  getBookById(id) {
    return myaxios({
      method: 'get',
      url: `bookinfo/id/search?${id}`


    })

  },
  updateBook(bookObj) {
    return myaxios({
      method: 'put',
      url: `bookinfo?${bookObj.id}`,
      data: bookObj

    })

  },
  deleteBookById(id) {
    return myaxios({
      method: 'delete',
      url: `/bookinfo/delete?${id}`

    })

  },
  batchRemoveUser(ids){

    return myaxios({
      method: 'delete',
      url: `/kucun/batchremove?${ids}`,


    })

  },
  getTypeSum(){

    return myaxios({
      method: 'get',
      url: '/book/getTypeSum',


    })

  }
}
