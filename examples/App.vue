<template>
  <div id="app">
    <pie-chart
      :dataObj="resData"
      :isShowButtons="true"
      :isShowLegend="true"
      :isShowTitle="true"
    >
      <div slot="left">
        <p class="title">工具库资源类型占比</p>
        <p class="title-num">(所有类型资源共100个)</p>
      </div>
    </pie-chart>
  </div>
</template>

<script>
import PieChart from '../package/PieChart.vue'


export default {
  name: 'App',
  data() {
    return {
      resData: {
        btnTitles: ['全部', '单选题'], //按钮元素个数和list的元素个数相同,点击每个按钮后显示的内容对应list的一个元素
        list: [
          {
            legendData: ['单选题', '多选题', '填空题', '简答题'],
            seriesData: [
              {
                name: '单选题', //和legend元素名称一致
                value: 124, //选项个数
                label: {
                  formatter: '单选题：124个（10%）' //指示内容
                }
              },
              {
                name: '多选题',
                value: 356,
                label: {
                  formatter: '多选题：356个（30%）'
                }
              },
              {
                name: '填空题',
                value: 244,
                label: {
                  formatter: '填空题：244个（20%）'
                }
              },
              {
                name: '简答题',
                value: 484,
                label: {
                  formatter: '简答题：476个（40%）'
                }
              }]
          },
          {
            legendData: ['已做', '未做'],
            seriesData: [
              {
                value: 125,
                name: '已做', //和legend名称一致
                label: {
                  formatter: '已做:125次(90%)\n累计：512次'
                }
              },
              {
                value: 10,
                name: '未做',
                label: {
                  formatter: '未做:10%'
                }
              }]
          }
        ]
      }
    }
  },
  components: {
    PieChart

  }
}
</script>

<style>
.title {
  font-size: 18px;
  color: #333333;
  font-weight: bold;
}
.title-num {
  font-size: 12px;
  color: #6e7079;
  font-weight: normal;
}
</style>
