<transition name="fade">
<ul v-if="result"></ul>
<div v-else class="skeleton">
  <xtx-skeleton class="item" v-for="i in 5" :key="i" animated="scroll" bg="#e4e4e4" width="240px" height="305px" />
</div>
</transition>

<style scoped lang="less">
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
