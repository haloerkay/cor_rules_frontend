<template>
  <div class="wrapper">
    <operate></operate>
    <router-view></router-view>

    <div :class="[flag ? 'active' : 'inactive']">
      <div ref="chartDom" class="box"></div>
      <el-icon @click="deleteTest" class="icon"><CloseBold /></el-icon>
      <!-- <button >x</button> -->
    </div>
  </div>

</template>

<script setup>
import operate from "@/components/operate/index.vue"
import * as echarts from "echarts";
import { useTestStore } from "@/store/index.js"
import { watch, ref } from 'vue'
const testStore = useTestStore()
let flag = ref(false)
let data = ref([[],[],[]])

const chartDom = ref(null)
watch(() => testStore.ret, (newValue, oldValue) => {
  if (newValue.length != 0) {
    flag.value = true
    for(let i = 0;i<newValue.length;i++){
      data.value[0].push(newValue[i].accuracy)
      data.value[1].push(newValue[i].num_rules)
      data.value[2].push(newValue[i].cost)
    }
    console.log(data,'data')
    initChart();
  } else {
    flag.value = false
  }
})


const deleteTest = () => {
  testStore.changeRet([])
  data.value = [[],[],[]]
  console.log(data.value,'ddd')
}

const initChart = () => {
  var myChart = echarts.init(chartDom.value);
  const colors = ['#5470C6', '#91CC75', '#EE6666'];
  let option = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  toolbox: {
    feature: {

      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['准确率', '规则数目', '时间开销']
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data: ['M1','M2','APR','CMAR']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '准确率',
      offset: 10,
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value} %'
      }
    },
    {
      type: 'value',
      name: '规则数目',
      position: 'right',
      alignTicks: true,
      offset: 80,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value} 个'
      }
    },
    {
      type: 'value',
      name: '时间开销',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: '{value} s'
      }
    }
  ],
  series: [
    {
      name: '准确率',
      type: 'bar',
      data: data.value[0]
    },
    {
      name: '规则数目',
      type: 'bar',
      yAxisIndex: 1,
      data: data.value[1]
    },
    {
      name: '时间开销',
      type: 'line',
      yAxisIndex: 2,
      data: data.value[2]
    }
  ]
};

  option && myChart.setOption(option);
};

</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  border: none;
  z-index: 1;
}

.inactive {
  display: none;
}
.icon{
  position: absolute;
  width: 28px;
  height: 28px;
  right: 150px;
  top: 50px;
  z-index:1500;
  background-color: #fff;
  cursor: pointer;
}
.box {
  width: 950px;
  height: 590px;
  background-color: #fff;
}

.active {
  position: fixed;
  /* 固定位置覆盖全屏 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明黑色背景 */
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  z-index: 1000;
  /* 确保在顶层 */
}
</style>
