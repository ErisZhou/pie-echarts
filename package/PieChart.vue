<!--  -->
<template>
  <div>
    <el-row
      type="flex"
      class="row-bg"
      justify="space-between"
    >
      <el-col :span="8">
        <slot name="left"></slot>
      </el-col>
      <el-col :span="8">
        <div
          class="title"
          style="text-align:center"
        >
          <slot name="center"></slot>
        </div>
      </el-col>
      <el-col :span="8">
        <div
          v-if="isShowButtons"
          style="text-align:right"
        >
          <el-button-group
            v-if="btnTitles.length<6"
            class="button-group"
          >
            <el-button
              type="primary"
              v-for="(item,index) in btnTitles"
              :key="item"
              @click="resTypeBtnClick(index)"
            >{{item}}</el-button>
          </el-button-group>
          <el-dropdown
            v-else
            @command="resTypeBtnClick"
          >
            <el-button type="primary">
              更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in btnTitles"
                :key="item"
                :command="index"
              >{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <div
      ref="piechart"
      style="height: 600px; "
      :style="{ width: echartsWidth }"
    ></div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
const ECharts = require("echarts");
Vue.prototype.$echarts = ECharts;
Vue.use(ElementUI);

// import "../../static/js/resize"

export default {
  props: {
    dataObj: {
      type: Object,
      required: true
    },
    isShowButtons: {
      type: Boolean,
      required: true
    },
    isShowLegend: {
      type: Boolean,
      required: true
    },
    isShowTitle: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: "PieChart",
      echartsWidth: '',
      mypiechart: {},
      btnTitles: [], //按钮列表
      resIndex: 0, //全部0|视频1|文本2|图片3
      option: {
        tooltip: {
          trigger: 'item',
          show: this.isShowTitle,
          formatter: function (params) {   //格式化函数
            return params.data.label.formatter;
          },
        },
        // animation: false,
        silent: false,
        legend: {
          data: [],
          orient: 'vertical',
          right: '0%',
          y: 'center',
          align: 'left',
          itemGap: 20,
          icon: 'rect',
          itemWidth: 20, // 图标宽
          itemHeight: 20, // 图标高
          selectedMode: false
        },
        series: [
          {
            type: 'pie',
            emphasis: { scale: false }, //去除划过放大效果
            radius: '90%',
            top: 100,
            data: []
          }
        ]
      }
    }
  },
  watch: {
    echartsWidth(newV, oldV) {
      this.$nextTick(() => {
        this.mypiechart.resize();
      })
    },
    dataObj: {
      handler(newval, oldVal) {
        if (newval.list.length > 0) {
          if (newval.hasOwnProperty("btnTitles")) {
            this.btnTitles = newval.btnTitles;
          }
          if (this.isShowLegend) { //显示图例,获取图例数据
            this.option.legend.data = newval.list[this.resIndex].legendData;
          }

          this.option.series[0].data = newval.list[this.resIndex].seriesData;

          if (Object.keys(this.mypiechart).length > 0) {
            this.mypiechart.clear();
            this.mypiechart.setOption(this.option);
            this.$nextTick(() => {
              this.mypiechart.resize();
            });
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.drawPie();
  },
  methods: {
    vResize() {
      let widStr = this.$store.state.app.sidebar.opened ? 330 : 168
      this.echartsWidth = document.body.offsetWidth - widStr + "px";
    },
    //点击资源类型按钮
    resTypeBtnClick(index) {
      if (index == this.resIndex) { return }
      this.resIndex = index;
      this.option.legend.data = this.dataObj.list[this.resIndex].legendData;
      this.option.series[0].data = this.dataObj.list[this.resIndex].seriesData;
      this.mypiechart.clear();
      this.mypiechart.setOption(this.option);
    },
    //绘制饼图
    drawPie() {
      this.$nextTick(() => {
        this.mypiechart = this.$echarts.init(this.$refs.piechart);
        this.mypiechart.clear();
        this.mypiechart.setOption(this.option);
        window.addEventListener("resize", () => {
          this.mypiechart.resize();
        });
      });
    }
  },
  // directives: {  // 使用局部注册指令的方式
  //   resize: { // 指令的名称
  //     bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
  //       let width = '',
  //         height = '';

  //       function isReize() {
  //         const style = document.defaultView.getComputedStyle(el);
  //         if (width !== style.width || height !== style.height) {
  //           binding.value();
  //         }
  //         width = style.width;
  //         height = style.height;
  //       }
  //       el.__vueSetInterval__ = setInterval(isReize, 300);
  //     },
  //     unbind(el) {
  //       clearInterval(el.__vueSetInterval__);
  //     }
  //   }
  // },
}
</script>

<style  scoped>
</style>
