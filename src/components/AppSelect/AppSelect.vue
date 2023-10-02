<template>
  <div class="app-select">
    <vSelect v-bind="$attrs" :components="{ OpenIndicator }">
      <template #spinner="{ loading }">
        <div v-if="loading" class="vs__loader" />
      </template>
    </vSelect>
  </div>
</template>

<script lang="ts" src="./AppSelect.ts"></script>
<style lang="scss" src="./AppSelect.scss"></style>
