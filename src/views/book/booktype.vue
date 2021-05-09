<template>
 <section class="content-container">
     <div class="toolbar">
    <el-form  
      ref="searchForm"
      :inline="true"
      :model="searchWhere"
      class="demo-form-inline "
      style="margin-top:20px"
    >
      <el-form-item label="书名" size="mini" prop="bookName">
        <el-input
          v-model="searchWhere.bookName"
          placeholder="书名"
          class="w150"
        ></el-input>
      </el-form-item>
      <el-form-item label="出版社" size="mini" prop="press" @click.right.prevent.native="dialogPressVisible=true">
        <!-- 点击弹出Press组件,要使用原生事件，要在click后加修饰符.native 如 @click.native-->
        <!-- 鼠标右击弹出Press组件，加修饰符.right,需要阻止其本身右击事件 加修饰符.prevent.-->
        <el-input 
          v-model="searchWhere.press"
          placeholder="出版社"
          class="w150"
        ></el-input>
        <!-- <el-input readonly v-model="searchWhere.press" placeholder="出版社" class="w150"></el-input> -->
        <!-- readonly表示只读，不能填写 -->
      </el-form-item>
      <!-- bookTypeOptions必须在data中才会有效 -->
      <el-form-item label="图书类型" size="mini" prop="bookType">
        <el-select v-model="searchWhere.bookType" placeholder="图书类型">
          <el-option
            :label="option.name"
            v-for="option in bookTypeOptions"
            :key="option.type"
            :value="option.type"
            class="w120"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版日期" size="mini" prop="publicationdate">
        <el-date-picker
          v-model="searchWhere.publicationdate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="fetchData">查询</el-button>

        <el-button type="primary" @click="addHandle()">新增</el-button>

        <el-button @click="resetForm('searchForm')">重置</el-button>
        <!-- <el-button @click="addDomain">新增域名</el-button> -->
      </el-form-item>
    </el-form>
</div>
		<!--列表-->

    <el-table :data="bookinfolist" style="width: 100%" max-height="680"  highlight-current-row  @selection-change="selsChange">
    <el-table-column type="selection" width="55">
			</el-table-column>

      <el-table-column  type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="bookISBN" label="书号" width="150"  sortable>
      </el-table-column>
      <el-table-column prop="bookName" label="书名" width="200"  sortable>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="100"  sortable>
      </el-table-column>
      <el-table-column prop="press" label="出版社" width="150"  sortable>
      </el-table-column>
      <el-table-column prop="publicationdate" label="出版日期" width="150"  sortable>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100"  sortable> </el-table-column>
      <el-table-column prop="quantity" label="库存数量" width="100"  sortable>
      </el-table-column>
      <el-table-column prop="bookType" label="图书类型" width="100"  sortable>
          
        <!--scope表示作用域或插槽:data绑定的数据-->
        <template slot-scope="scope"
          ><span>{{ scope.row.bookType | bookTypeFilter }}</span>
          
          </template>
      </el-table-column>

      <el-table-column  label="操作" width="150" style="float:right;">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
		<el-col  class="toolbar">

<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>

            <!-- 分页 -->

<el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"  style="float:right;"
    >
    </el-pagination>
<!-- 
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination> -->


		</el-col>

    

    <!-- 新增对话框 -->

    <el-dialog
      title="编辑图书信息"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :model="form"
        label-width="100px"
        label-position="right"
        ref="addFrom"
        style="width:400px; margin-top:-20px;"
        :rules="rules"
      >
        <el-form-item label="书号" prop="bookISBN">
          <el-input v-model="form.bookISBN" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="书名" prop="bookName">
          <el-input v-model="form.bookName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="press">
          <el-input v-model="form.press" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" prop="publicationdate">
          <el-date-picker
            size="mini"
            v-model="form.publicationdate"
            align="right"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="quantity">
          <el-input v-model.number="form.quantity" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="图书类型" prop="bookType">
          <el-select
            v-model="form.bookType"
            placeholder="请选择图书类型"
            size="mini"
          >
            <el-option
              :label="option.name"
              :value="option.type"
              v-for="option in bookTypeOptions"
              :key="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini"
          >取 消</el-button
        >
        <!-- <el-button type="primary" @click="addData('addFrom')" size="mini">确 定</el-button> -->
        <el-button
          type="primary"
          @click="form.id === null ? addData('addFrom') : updateData('addFrom')"
          size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 选择出版社对话框 -->
    <el-dialog title="选择出版社" :visible.sync="dialogPressVisible" width="800">
     <Press @sendData="getData"></Press>
    </el-dialog>
    <!-- 选择出版社对话框 end-->
  </section>
</template>
<script>
import bookinfoApi from "@/api/bookinfo";
import Press from "@/views/press/press.vue"
const bookTypeOptions = [
  { type: "1", name: "编程类" },
  { type: "2", name: "前端类" },
  { type: "3", name: "设计类" },
  { type: "4", name: "移动开发类" }
]; //全局定义，因为过滤器中不能引用当前实例this
export default {
  components:{
    Press//Press:Press
  },
  data() {
    return {
      dialogPressVisible: false,
      dialogFormVisible: false,
      form: {
        id: null,
        bookISBN: "",
        bookName: "",
        author: "",
        press: "",
        publicationdate: "",
        price: 0,
        quantity: 500,
        bookType: ""
      },
      sels: [],//列表选中列
      bookinfolist: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchWhere: {
         id: null,
        bookName: "",
        press: "",
        bookType: "",
        publicationdate: ""
      },
      rules: {
        bookISBN: [{ required: true, message: "请输入书号", trigger: "blur" }],
        bookName: [{ required: true, message: "请输入书名", trigger: "blur" }],
        publicationdate: [
          { required: true, message: "请选择日期", trigger: ["blur", "change"] }
        ],
        quantity: [
          { required: true, message: "请输入库存数量", trigger: "blur" },
          { type: "number", message: "数量必须为数字", trigger: "blur" }
        ]
      },
      bookTypeOptions,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  filters: {
    bookTypeFilter(type) {
      const booktypeobj = bookTypeOptions.find(obj => obj.type === type);
      return booktypeobj ? booktypeobj.name : null;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    getData(currentRow){
    console.log('父组件',currentRow)
    this.searchWhere.press = currentRow.pressName;
    this.searchWhere.id = currentRow.id;
    this.dialogPressVisible = false
    },
    addHandle() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["addFrom"].resetFields();
      });//打开弹窗时，将内容重置
    },
    updateData(formName) {
      console.log("update");
      this.$refs[formName].validate(valid => {
        if (valid) {
          bookinfoApi.updateBook(this.form).then(response => {
            console.log(response.data);
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.form.id = null;
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert('submit!');
          console.log("add");
          bookinfoApi.add(this.form).then(response => {
            console.log(response.data);
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(id) {
      console.log("编辑" + id);
      this.addHandle();
      bookinfoApi.getBookById(id).then(response => {
        const resp = response.data;
        //console.log(resp)
        if (resp.flag) {
          this.form = resp.data;
        } else {
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
      });
    },
    handleDelete(id) {
     
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('delect');
          bookinfoApi.deleteBookById(id).then(response => {
            const resp = response.data
            this.$message({
            type: resp.flag?'success':'error',
            message: resp.message
          });
          if (resp.flag) {
          this. fetchData()
        }

          })
          
        }).catch(() => {
           console.log('cancel');
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
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

    fetchData() {
      //bookinfoApi.getBookinfoList().then(response => {
      bookinfoApi
        .search(this.currentPage, this.pageSize, this.searchWhere)
        .then(response => {
          const resp = response.data;
          console.log(resp.data.rows);
          this.bookinfolist = resp.data.rows;
          this.total = resp.data.total;
        });
    }
    ,
    selsChange: function (sels) {
				this.sels = sels;
                //console.log(sels)
			},
			//批量删除
			batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                console.log(ids)

                 this.$confirm('确认删除选中记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('delectAll');
         

          bookinfoApi.batchRemoveUser(ids).then(response => {
            const resp = response.data
            console.log(resp);
            this.$message({
            type: resp.flag?'success':'error',
            message: resp.message
          });
          if (resp.flag) {
          this. fetchData()
        }

          })
          
        }).catch(() => {
           console.log('cancel');
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


			
			}
  }
};
</script>
<style scoped>
/deep/.el-table th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #eef1f6;
    text-align: left;
}

/deep/.el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #dfe6ec;
}
/deep/.el-table td, .el-table th {
    height: 40px;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
}
.w150 {
  width: 150px;
}
.w120 {
  width: 120px;
}
.dialog-footer {
  margin-top: -50px;
}
.toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
}
.content-container {
				
				flex:1;
				
				overflow-y: scroll;
				padding: 20px;}
</style>
