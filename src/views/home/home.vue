<template>
  <div>
    <h1 class="home-title">欢迎来到白领阅读图书管理系统</h1>
    <!-- 放置echarts图表 ref相当于jquery的id-->
    <div class="chartDemo" ref="chartDemo" ></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
//或者这样导入const echarts = require('echarts');
import bookinfoApi from "@/api/bookinfo.js";
export default {
  data() {
    return {
      chartDemo: null,
      bookTypeData: {
        bookType: [],
        quantitySum: []
      }
    };
  },
   computed: {
    options() {
      
      const option= {
        // 指定图表的配置项和数据
        color: ["red"],
        title: {
          text: "各种类型图书库存数量对比图", //图标标题
          left: "center",
          textStyle: {
            color: "red"
          }
        },
        tooltip: {
          //配置提示信息
          trigger: "axis", //axis参数，鼠标移动到该范围区域显示数据；item参数,鼠标移动到对应数据点显示数据
          axisPointer: {
            type: "shadow" //指示器类型：line:直线型;shadow:阴影型;none:无;cross:十字准星型
          }
        },
        legend: {
          //配置图例
          top: 60, //设置图例上边距，不能加单位PX
          //data: ["库存数量"], //name必须与下面series的name一致
          data: [
            {
              name: "库存数量",
              // 强制设置图形为圆。
              icon: "circle",
              // 设置文本为红色
              textStyle: {
                //文字样式
                color: "red",
                fontSize: "16"
              }
            }
          ]
        },
        xAxis: {
          type: "category", //坐标轴类型有，category维度轴，value度量轴
          //data: ["编程类", "设计类", "前端类", "移动开发类"] //data维度数据，只有在维度轴有效
          data: this.bookTypeData.bookType
        },
        yAxis: {
          type: "value",
          min: 500, //刻度最小值
          interval: 50 //设置刻度间隔
        },
        series: [
          {
            name: "库存数量",
            type: "line", //图标类型
            //data: [620, 932, 901, 934]
           data: this.bookTypeData.quantitySum,
          }
        ]
      };
      return  option
    }
  },
  created() {
    this.getBookTypeSum();
  },
  mounted() {
      this.$nextTick(() => {
         this.drawLine();
      })
  },
  methods: {
    getBookTypeSum() {
      bookinfoApi.getTypeSum().then(resposn => {
        const resp = resposn.data;
        if (resp.flag) {
          this.bookTypeData.bookType = resp.data.bookType
          this.bookTypeData.quantitySum= resp.data.quantitySum
          console.log(resp.data.bookType)
         // console.log(resp.data.quantitySum)
        } else {
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
      });
    },
    drawLine() {
      //this.chartDemo = echarts.init(document.getElementById('chartDemo'))
      this.chartDemo = echarts.init(this.$refs.chartDemo)

      //this.chartDemo = echarts.init(this.$refs["chartDemo"]);

      this.chartDemo.setOption(this.options,true); //为true可以删除echarts历史画布数据重新渲染
      window.addEventListener("resize",this.chartDemo.resize); //图标随着浏览器自动缩放
    }
     
    },
    watch : {
        options(newVal,oldVal){
            console.log(newVal)
            console.log(oldVal)
            if(newVal!== oldVal){
                this.chartDemo.setOption(this.options,true)
                //this.drawLine()

            }

        }
  }
};
</script>
<style scoped>
.home-title {
  margin: 0 auto;
  text-align: center;
}
.chartDemo {
  width: 100%;
  height: 600px;
  margin: 50px auto;
}
</style>
