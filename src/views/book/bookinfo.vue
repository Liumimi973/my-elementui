<template>
  <div>
    
      <el-table :data="bookinfolist" style="width: 100%; max-width:1300px;" max-height="680" >
        <el-table-column  fixed  type="index" label="学号" width="60">
        </el-table-column>
        <el-table-column prop="bookISBN" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="bookName" label="书名" width="200">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="100">
        </el-table-column>
        <el-table-column prop="press" label="出版社" width="150">
        </el-table-column>
        <el-table-column prop="publicationdate" label="出版日期" width="150">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
        </el-table-column>
         <el-table-column prop="quantity" label="库存数量" width="100">
        </el-table-column>
         <el-table-column prop="bookType" label="图书类型" width="100">
             <!--scope表示作用域或插槽:data绑定的数据-->
             <template slot-scope="scope"><span>{{scope.row.bookType|bookTypeFilter}}</span></template>
        </el-table-column>
       <el-table-column fixed="right" label="操作" width="150">
           
         <template slot-scope="scope">
        <el-button type="primary"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
        </el-table-column>
        
      </el-table>
     
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 
    
  </div>
</template>
<script>
import bookinfoApi from "@/api/bookinfo";
 const bookTypeOptions=[
    {type:'1',name:'编程类'},
    {type:'2',name:'前端类'},
    {type:'3',name:'设计类'},
    {type:'4',name:'移动开发类'}
]//全局定义，因为过滤器中不能引用当前实例this
export default {
  data() {
    return {
    bookinfolist:[],
    total:0,
    currentPage:1,
    pageSize:10,
    searchWhere:{}
   
    }
  },
  filters:{
      bookTypeFilter(type){
         const booktypeobj= bookTypeOptions.find(obj=>obj.type===type)
        return  booktypeobj? booktypeobj.name:null
      }
  },
  created() {
    this.fetchData();
  },
  methods: {
      handleSizeChange(size) {
          this.pageSize=size
          this.fetchData()
        console.log(`每页 ${size} 条`);
      },
      handleCurrentChange(currentPage) {
          this.currentPage=currentPage
          this.fetchData()
        console.log(`当前页: ${currentPage}`);
      },
    fetchData() {
      //bookinfoApi.getBookinfoList().then(response => {
           bookinfoApi.search(this.currentPage,this.pageSize,this.searchWhere).then(response => {
        const resp = response.data;
        console.log(resp.data.rows);
        this.bookinfolist = resp.data.rows;
        this.total=resp.data.total
      });
    },
     handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  }
};
</script>
