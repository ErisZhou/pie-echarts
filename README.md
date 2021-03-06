#ECharts饼图插件

### 一、安装

```vue
npm i pie-echarts -s
```

### 二、vue项目入口文件调用

在vue项目的入口文件main.js写入以下代码

```vue
import PieChart from 'pie-echarts'
Vue.use(PieChart)
```

### 三、组件中使用

``` vue
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
```

### 四、参数注释

- `dataObj`           数据源(格式可参看第五条说明)
- `isShowButtons`     组件是否有按钮选项
- `isShowLegend`      饼图是否显示图例
- `isShowTitle`       鼠标悬浮饼图时是否显示提示信息
- div中的内容为组件标题内容  slot="left"表示标题居左显示  slot="center"表示标题居中显示

### 五、数据源格式

- `btnTitles`  显示的按钮上的内容。不显示按钮时可为空数组;显示按钮时,该数组长度和list的数组长度相同,点击每个按钮后饼图展示的内容对应list的一个元素
- `legendData`  图例内容
- `seriesData`  饼图展示的内容
- `name`       和legend元素名称一致
- `value`      选项个数 
- `formatter`  饼图指示内容

``` js
    resData: {
        btnTitles: ['全部', '单选题'], 
        list: [
          {
            legendData: ['单选题', '多选题', '填空题', '简答题'],
            seriesData: [
              {
                name: '单选题', 
                value: 124, 
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
```

  