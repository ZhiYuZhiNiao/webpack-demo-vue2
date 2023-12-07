<template>
  <div>
    <el-button type="success">Bar</el-button>
    <img :src="meinv" alt="">
    <div>哈哈哈哈哈</div>
  </div>
</template>

<script>
import meinv from '@/assets/meinv.jpeg'
export default {
  data() {
    return {
      meinv
    }
  }
}
</script>