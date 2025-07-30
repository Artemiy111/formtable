<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { AccountForm } from './ui';
import { useAccounts, useCreateAccount, useUpdateAccount } from '@/shared/model/account'

useHead({
  title: 'Home | Formtable',
})

const { accounts } = useAccounts()
const { createAccount } = useCreateAccount()
const { updateAccount } = useUpdateAccount()
</script>

<template>
  <main class="w-[1200px] mx-auto mt-8">
    <div class="flex gap-x-4">
      <h1 class="text-3xl font-bold" >Учётные записи</h1>
      <UButton icon="lucide:plus" @click="createAccount()" />
    </div>
    <div class="flex gap-y-4 w-full">
      <AccountForm
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update:account="account => updateAccount(account)"  />
    </div>
  </main>
</template>
