<!-- <script setup>
import { ref } from "vue";
import * as XLSX from "xlsx";
// 把文件按照二进制进行读取
function readFile(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
}

const title = ref([]); //表头
const tableData = ref([]); //数据列表

// 选择文件的方法
const handle = async (ev) => {
  //每次选择文件都把之前文件清空
  title.value = [];
  tableData.value = [];
  let file = ev.raw; //这里面就是数据
  //打印的file如图所示:https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49f13a6210b44a6390ba0aca5e7a0f6a~tplv-k3u1fbpfcp-watermark.image?
  console.log("file", file);
  // 将file变成二进制读取到的
  let data = await readFile(file);
  // 将得到的二进制转化一下
  let workbook = XLSX.read(data, { type: "binary" });
  //打印的workbook如图所示:https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8587ef9092424bcfb02d75d5513333ef~tplv-k3u1fbpfcp-watermark.image?
  console.log("workbook", workbook); //这里就是可读取的文件了
  // 最后把数据转成json格式的
  let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //这里是表格的名字,这里取第一个表格,1就是第二个表格数据
  //打印的worksheet如图所示:https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3de2e1f5b6c490faadc76604193d0ab~tplv-k3u1fbpfcp-watermark.image?
  console.log("worksheet", worksheet);
  //将得到的worksheet转化为json格式
  data = XLSX.utils.sheet_to_json(worksheet);

  //打印的data如图所示:https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d90617a9e01b4aa99dd577a647b85407~tplv-k3u1fbpfcp-watermark.image?
  console.log("data", data);

  // 这个是表格所有的标题
  for (const key in data[0]) {
    title.value.push(key); //获取的是标题,即每个对象的键名
  }
  //打印的title如图:https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c06321ad03c42ae966f5e5b0ccfbce7~tplv-k3u1fbpfcp-watermark.image?
  console.log("title", title.value);

  //将得到的json数据转化一下(因为excel表格的数据都是汉字,但是我们需要绑定的属性是字母,因此需要转换下)
  // 这种写死了,直接看下面的动态将其进行转化
  // let obj = {
  //   subject: item["项目"],
  //   date: item["周期"],
  //   perple: item["负责人"],
  //   price: item["造价"],
  //   pors: item["人数"],
  // };

  //这种可以动态的根据内容生成表格的英文键
  //对其进行转化目的是为了绑定下面表格的的prop
  data.forEach((item, index) => {
    let obj = {};
    title.value.forEach((item2, index2) => {
      console.log("item", item[item2]);
      obj["in" + index2] = item[item2];
    });
    tableData.value.push(obj);
  });
  //打印的tableData.value如图:https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e919677abf044f4ab96c171a8ad53bc~tplv-k3u1fbpfcp-watermark.image?
  console.log("tableData.value", tableData.value);
};
</script>

<template>
  <div class="">
    <el-upload
      action
      accept=".xlsx,.xls"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handle"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button
        class="ml-3"
        type="success"
        @click="submitUpload"
      >
        提交到服务器(暂时无)
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          <el-table
            :data="tableData"
            style="width: 100%"
          >

            <el-table-column
              v-for="(item, index) in title"
              :key="index"
              :prop="'in' + index"
              :label="item"
              width="180"
            />
          </el-table>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<style scoped lang="scss"></style> -->