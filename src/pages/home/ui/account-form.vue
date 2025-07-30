<script setup lang="ts">
import { accountSchema, accountTypeLabels, accountTypes, type Account } from '@/shared/types'
import { syncRefs } from '@vueuse/core'
import { ref, computed, useTemplateRef } from 'vue'

const {account} = defineProps<{
  account: Account
}>()

const state = ref(account)
syncRefs(() => account, state)

const emit = defineEmits<{
  'delete': [id: string],
  'update:account': [account: Account]
}>()

const form = useTemplateRef('form')

const selectItems = accountTypes.map(type => ({
  value: type,
  label: accountTypeLabels[type],
}))

const labelsString = computed({
  get: () => state.value.labels.map(label => label.text).join('; '),
  set: (value) => {
    const labels = value.split(';').map(label => label.trim()).map(text=> ({text}))
    state.value.labels = labels
  },
})

</script>

<template>
  <UForm
    class="grid gap-x-4 gap-y-8 w-full items-top" 
    :data-account-type="state.type"
    :class="[state.type === 'local' ? 'grid-cols-[1fr_1fr_1fr_1fr_auto]' : 'grid-cols-[1fr_1fr_2fr_auto]']"
    :state="state" 
    :schema="accountSchema"
    @submit="e => {
      console.log('submit', e.data)
      emit('update:account', e.data)
    }"
    ref="form"
  >
  <pre>{{ account }}</pre>
    <UFormField name="labels" label="Метки">
      <UInput class="w-full" v-model="labelsString"  />
    </UFormField>

    <UFormField name="type" label="Тип записи">
      <USelect
        class="w-full"
        :items="selectItems"
        :model-value="state.type"
        @update:model-value="(type) => {
          state.type = type
          state.password = type === 'local' ? state.password ?? '' : null
          form?.submit()
        }"
      />
    </UFormField>

    <UFormField name="login" label="Логин">
      <UInput
        class="w-full"        
        :model-value="state.login" 
        @update:model-value="(login) => {
          state.login = login
          form?.submit()
        }" />
    </UFormField>

    <UFormField v-if="state.type === 'local'" name="password" label="Пароль">
      <UInput
        class="w-full"
        type="password"
        :model-value="state.password"
        @update:model-value="(password) => {
          state.password = password
          form?.submit()
        }" />
    </UFormField>

    <UButton 
      class="h-fit mt-6" 
      variant="soft" 
      color="error" 
      icon="i-lucide-trash" 
      type="button" 
      @click="emit('delete', account.id)"
    />
  </UForm>
</template>
