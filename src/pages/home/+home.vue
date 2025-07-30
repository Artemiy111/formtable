<script setup lang="ts">
import { useHead } from '@unhead/vue'


useHead({
  title: 'Home | Formtable',
})


</script>

<template>
  <main>
    <div class="flex gap-x-4">
      <h1 class="text-3xl font-bold" >Учётные записи</h1>
      <UButton icon="lucide:plus" />
    </div>
    <div class="">
      <UTable/>
    </div>
  </main>
</template>
