<template>
  <vxe-table-colgroup :field="column.prop"
    :title="column.label">
    <template v-for="(item,index) in column.children">
      <vxe-column v-if="item.children&&item.children.length"
        :column="item"
        :key="`${item.prop||'gItem'}_${index}`"></vxe-column>
      <vxe-table-column v-else
        :type="column.type"
        :key="`${item.prop||'cItem'}_${index}`"
        :field="item.prop"
        :title="item.label"></vxe-table-column>
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
