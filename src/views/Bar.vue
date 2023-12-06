<template>
  <div>
    <el-button type="success">Bar</el-button>
    <img :src="meinv" alt="">
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