<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchWhere"
      class="demo-form-inline"
      style="margin-top:-20px"
    >
     
      
      <el-form-item label="出版社" size="mini" prop="pressName">
        <el-input
          v-model="searchWhere.pressName"
          placeholder="出版社"
          class="w150"
        ></el-input>
      </el-form-item>

      

      <el-form-item size="mini">
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="presslist" style="width: 100%;" max-height="380" highlight-current-row @current-change="CurrentChange">
        <!-- highlight-current-row单击本行由current-change事件来管理选中触发事件 会传递2个参数，当前行currentRow，和原来行oldCurrentRow-->
      <el-table-column fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="pressName" label="出版社名称" width="150">
      </el-table-column>
      <el-table-column prop="pressAddress" label="出版社地址" width="200">
      </el-table-column>
      <el-table-column prop="code" label="邮编" width="100">
      </el-table-column>
      <el-table-column prop="chargePerson" label="负责人" width="100">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="150">
      </el-table-column>


    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    
  </div>
</template>
<script>
import pressApi from "@/api/press";

export default {
  data() {
    return {
     
      form: {
        id: null,
        pressName: "",
        pressAddress: "",
        code: "",
        chargePerson: "",
        phone: ""
      },
      presslist: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchWhere: {
        pressName: ""
      },
    }
  },

  created() {
    this.fetchData();
  },
  methods: {
   CurrentChange(currentRow,oldCurrentRow){
      console.log(currentRow)
      this.$emit('sendData',currentRow)

   },
    
    
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.fetchData();
      console.log(`当前页: ${currentPage}`);
    },
//查询数据
    fetchData() {
      pressApi
        .search(this.currentPage, this.pageSize, this.searchWhere)
        .then(response => {
          const resp = response.data;
          console.log(resp.data.rows);
          this.presslist = resp.data.rows;
          this.total = resp.data.total;
        });
    }
  }
};
</script>
<style scoped>
.w150 {
  width: 150px;
}
.w120 {
  width: 120px;
}
.dialog-footer {
  margin-top: -50px;
}
</style>
