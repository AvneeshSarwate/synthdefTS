<script setup lang="ts">
interface SelectControlViewModel {
  value: string;
  options: string[];
  readonly: boolean;
  setValue: (value: string) => void;
}

const props = defineProps<{
  data: SelectControlViewModel;
}>();

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  props.data.setValue(target.value);
}
</script>

<template>
  <select
    class="rete-select-control"
    :value="data.value"
    :disabled="data.readonly"
    @change="onChange"
  >
    <option v-for="option in data.options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<style scoped>
.rete-select-control {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #2a2a3a;
  border-radius: 2px;
  background: #1a1a26;
  color: #c0c0d0;
  font-family: "JetBrains Mono", "SF Mono", monospace;
  font-size: 10px;
  padding: 2px 4px;
  cursor: pointer;
}

.rete-select-control:focus {
  outline: none;
  border-color: #6c8cff;
}

.rete-select-control option {
  background: #18181f;
  color: #c0c0d0;
}
</style>
