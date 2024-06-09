<template>
  <div class="wrapper">
    <operate></operate>
    <router-view></router-view>

    <div :class="[flag ? 'active' : 'inactive']">
      <div ref="chartDom" class="box"></div>
      <el-icon @click="deleteTest" class="icon">
        <CloseBold />
      </el-icon>
      <!-- <button >x</button> -->
    </div>

    <div :class="[flag1 ? 'active' : 'inactive']">
      <div class="box1">


        <div class="mokuai">
          <div class="face"> <img src="@/assets/model.png" alt=""> </div>
          <div class="text">cba-m1-iris</div>
        </div>
        <div class="mokuai">
          <div class="face"> <img src="@/assets/model.png" alt=""> </div>
          <div class="text">cba-m2-iris</div>
        </div>
        <div class="mokuai" @click="aprIris">
          <div class="face"> <img src="@/assets/model.png" alt=""> </div>
          <div class="text">apr-iris</div>
        </div>
        <div class="mokuai">
          <div class="face"> <img src="@/assets/model.png" alt=""> </div>
          <div class="text">cmar-car</div>
        </div>
        <div class="mokuai">
          <div class="face"> <img src="@/assets/model.png" alt=""> </div>
          <div class="text">cba-m1-car</div>
        </div>
        <div class="mokuai">
          <div class="face"> <img src="@/assets/model.png" alt=""> </div>
          <div class="text">cmar-iris</div>
        </div>


      </div>
      <el-icon @click="deleteTest" class="icon">
        <CloseBold />
      </el-icon>
    </div>
  </div>

</template>

<script setup>
import operate from "@/components/operate/index.vue"
import * as echarts from "echarts";
import { useTestStore, useModelStore, useRetStore, useBtnStore, useFileStore } from "@/store/index.js"
import { watch, ref } from 'vue'
const testStore = useTestStore()
const modelStore = useModelStore()
const retStore = useRetStore()
const btnStore = useBtnStore()
const fileStore = useFileStore()
let flag = ref(false)
let flag1 = ref(false)
let data = ref([[], [], []])
import { httpReq } from "@/utils/httpReq.js"
import { useRouter } from 'vue-router';


const router = useRouter()

const chartDom = ref(null)
watch(() => testStore.ret, (newValue, oldValue) => {
  if (newValue.length != 0) {
    flag.value = true
    for (let i = 0; i < newValue.length; i++) {
      data.value[0].push(newValue[i].accuracy)
      data.value[1].push(newValue[i].num_rules)
      data.value[2].push(newValue[i].cost)
    }
    console.log(data, 'data')
    initChart();
  } else {
    flag.value = false
  }
})

watch(() => modelStore.model, (newValue, oldValue) => {
  if (newValue) {
    flag1.value = true
  }
  else {
    flag1.value = false
  }
})

let myChart = ref()

const deleteTest = () => {
  testStore.changeRet([])
  data.value = [[], [], []]
  console.log(data.value, 'ddd')
  modelStore.changeModel(false)
  // let myChart = echarts.init(chartDom.value);
  // if (myChart.value  != null && myChart.value != "" && myChart.value != undefined) {
  //   myChart.value.dispose();
  // }
}

const initChart = () => {
  myChart.value = echarts.init(chartDom.value);
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
        // 
        dataView: {
          show: true, readOnly: true,
          //自定义样式
          optionToContent: (opt) => {
            let axisData = opt.xAxis[0].data; //坐标数据
            let series = opt.series; //折线图数据
            let tdHeads = '<td  style="padding: 2px 10px;background-color: rgb(64,158,255);font-weight: 600;color: #fff;line-height:20px;">算法</td>'; //表头
            let tdBodys = ''; //数据
            console.log(series)
            series.forEach(function (item) {
              //组装表头
              tdHeads += `<td style="padding: 2px 10px;background-color: rgb(64,158,255);font-weight: 600;color: #fff;line-height:20px;">${item.name}</td>`;
            });
            let table = `<table   border="1" style=" width: 96%;margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center" class="dataViewTable"><tbody><tr>${tdHeads} </tr>`;

            for (let i = 0, l = axisData.length; i < l; i++) {
              for (let j = 0; j < series.length; j++) {
                //组装表数据
                tdBodys += `<td><input class="${j}x" type="text" value="${series[j].data[i]}" style="border:none;text-align: center;color: #444444;"></td>`;
              }
              table += `<tr><td style="padding: 2px 10px;text-align: center"><input type="text" value="${axisData[i]}" style="border: none;;text-align: center;"> </td>${tdBodys}</tr>`;
              tdBodys = '';
            }
            table += '</tbody></table>';
            return table;
          },
          //编辑功能
          contentToOption: (HTMLDomElement, opt) => {
            if (document.getElementsByClassName('dataViewTable').length > 1) {
              this.$message.error('有其他未关闭的数据视图，请关闭后重试');
            } else {
              for (let i = 0; i < opt.series.length; i++) {
                var name = 'dataX' + i;
                window[name] = []
                for (let j of document.getElementsByClassName(`${i}x`)) {
                  window[name].push(j.value)
                }
                opt.series[i].data = window[name]
              }
              return opt;
            }
          },
        },
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
        data: ['M1', 'M2', 'APR', 'CMAR']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '准确率',
        offset: 10,
        max: 100,
        min: 0,
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
        data: data.value[0],
        itemStyle: {
          normal: {
            label: {
              show: true, //
              position: 'top',
              textStyle: { //数值样式
                color: '#5470C6',
              }
            }
          }
        }
      },
      {
        name: '规则数目',
        type: 'bar',
        yAxisIndex: 1,
        data: data.value[1],
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top',
              textStyle: { //数值样式
                color: '#91CC75',
              }
            }
          }
        }
      },
      {
        name: '时间开销',
        type: 'line',
        yAxisIndex: 2,
        data: data.value[2],
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top',
              textStyle: { //数值样式
                color: '#EE6666',
              }
            }
          }
        }
      }
    ]
  };

  option && myChart.value.setOption(option);
};

const aprIris = async () => {
  let ret1 = await httpReq('get', '/pre_process/' + 'iris', '', {})
  // console.log('preprocess', ret1)
  fileStore.changeFile(ret1)
  // fileStore.changeFile(ret1)
  let ret = await httpReq('post', '/cbaapr',
    JSON.stringify({ minsup: 0.01, minconf: 0.5, filename: 'iris' }),
    { "Content-Type": "application/json" })

  router.push('/result')
  retStore.changeRet(ret)
  console.log('cbam1apr', ret)
  btnStore.changeBtn('APR')
  flag1.value = false
  modelStore.changeModel(false)
}
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

.icon {
  position: absolute;
  width: 28px;
  height: 28px;
  right: 150px;
  top: 50px;
  z-index: 1500;
  background-color: #fff;
  cursor: pointer;
}

.box {
  width: 950px;
  height: 590px;
  background-color: #fff;
}

.box1 {
  width: 950px;
  height: 590px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
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

.mokuai {
  width: 120px;
  height: 150px;
  // background-color: aqua;
  border: 1px solid #dde;
  margin-left: 30px;
  margin-top: 30px;
  margin-right: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 5px #aaa;
  .face {
    height: 100px;
    padding: 30px;
    padding-left: 32px;
    cursor: pointer;

    // background-color: var(--el-color-primary);
    img {
      // width: 5vw;
      height: 50px;
    }
  }

  .text {
    height: 50px;
    background-color: var(--el-color-primary);
    color: #fff;
    // color: var(--el-color-primary);
    // padding-left: 25px;
    // padding-right: 25px;
    padding-top: 12px;
    text-align: center;
  }
}

.mokuai1 {
  width: 10vw;
  height: 10vh;
  background-color: rgb(140, 27, 169);

  .face {

    img {
      // width: 5vw;
      height: 5vh;
    }
  }
}
</style>
