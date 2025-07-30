<script setup lang="ts">
import { accountSchema, type Account } from '@/shared/types'

const account = defineModel<Account>('account',{required: true})

</script>

<template>
  <UForm class="grid grid-cols-4" :state="account" :schema="accountSchema" >
    <UFormField name="labels">
      <UInput/>
    </UFormField>

    <UFormField name="type">
      <USelect/>
    </UFormField>

    <UFormField name="login">
      <UInput/>
    </UFormField>

    <UFormField name="password">
      <UInput type="password" />
    </UFormField>
  </UForm>
</template>
