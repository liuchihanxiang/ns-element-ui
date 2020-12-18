<template>
  <vxe-table-colgroup v-bind="column">
    <template v-for="(item,index) in column.children">
      <vxe-column v-if="item.children&&item.children.length"
        :column="item"
        :key="`${item.prop||'gItem'}_${index}`"></vxe-column>
      <vxe-table-column v-else
        :key="`${item.prop||'cItem'}_${index}`"
        v-bind="column"></vxe-table-column>
    </template>
  </vxe-table-colgroup>
</template>

<script>
export default {
  name: 'VxeColumn',
  props: {
    column: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style>
</style>
