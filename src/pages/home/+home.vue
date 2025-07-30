<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { AccountForm } from './ui';
import { useAccounts, useCreateAccount, useDeleteAccount, useUpdateAccount } from '@/shared/model/account'

useHead({
  title: 'Home | Formtable',
})

const { accounts } = useAccounts()
const { createAccount } = useCreateAccount()
const { updateAccount } = useUpdateAccount()
const { deleteAccount } = useDeleteAccount()
</script>

<template>
  <main class="w-[1200px] mx-auto mt-8">
    <div class="flex gap-x-4">
      <h1 class="text-3xl font-bold" >Учётные записи</h1>
      <UButton icon="i-lucide-plus" @click="createAccount()" />
    </div>
    <div class="grid grid-cols-1 gap-y-4 w-full mt-8">
      <AccountForm
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update:account="account => updateAccount(account)"
        @delete="id => deleteAccount(id)"
        />
    </div>
  </main>
</template>
