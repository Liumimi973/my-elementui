import myaxios from '../utils/myaxios'

export default {
 //分页查询
  search(page, size, searchWhere) {
    return myaxios({
      method: 'post',
      url: `/press/list/search?${page}&${size}`,
      data: searchWhere

    })

  }
}