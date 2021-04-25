import myaxios from '../utils/myaxios'

export default{
    getBookinfoList(){
        return myaxios({
            method:'get',
            url: '/bookinfo/list'
        })

    },
    search(page,size,searchWhere){
        return myaxios({
            method:'post',
            //url: `/bookinfo/list/search/${page}${size}`,
            url: `bookinfo/list/search?${page}&${size}`,
            data:searchWhere
            
        })

    }
}