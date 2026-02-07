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
  border: 1px solid #2f3345;
  border-radius: 4px;
  background: #181c2c;
  color: #d7dcf0;
  font-size: 12px;
  padding: 4px 6px;
}

.rete-select-control:focus {
  outline: none;
  border-color: #5d78ff;
}
</style>
