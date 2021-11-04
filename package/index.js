import PieChart from './PieChart';
const install = Vue => Vue.component(PieChart.name, PieChart); //注册组件

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);

}
export default install;