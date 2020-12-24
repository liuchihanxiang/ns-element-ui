<template>
  <vxe-table-colgroup v-bind="column">
    <template v-for="(item,index) in column.children">
      <vxe-column v-if="item.children&&item.children.length"
        :column="item"
        :key="`${item.field||'gItem'}_${index}`"></vxe-column>
      <vxe-table-column v-else
        :key="`${item.field||'cItem'}_${index}`"
        v-bind="item"></vxe-table-column>
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
