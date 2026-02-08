<script setup lang="ts">
defineProps<{
  data: {
    side: "input" | "output";
  };
}>();
</script>

<template>
  <div
    class="rs"
    :class="data.side === 'output' ? 'rs-out' : 'rs-in'"
    :title="'signal'"
  />
</template>

<style scoped>
.rs {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.1s, background 0.1s;
  flex-shrink: 0;
}

/* Input sockets: hollow ring */
.rs-in {
  background: transparent;
  border: 1.5px solid #555568;
}

.rs-in:hover {
  border-color: #6c8cff;
  background: rgba(108, 140, 255, 0.12);
}

/* Output sockets: filled dot */
.rs-out {
  background: #6c8cff;
  border: 1.5px solid #6c8cff;
}

.rs-out:hover {
  background: #8aa4ff;
  border-color: #8aa4ff;
}
</style>
