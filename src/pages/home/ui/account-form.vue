<script setup lang="ts">
import { accountSchema, accountTypeLabels, accountTypes, type Account } from '@/shared/types'
import { computed } from 'vue'

const account = defineModel<Account>('account', {required: true})

const emit = defineEmits<{
  'delete': [id: string]
}>()


const selectItems = accountTypes.map(type => ({
  value: type,
  label: accountTypeLabels[type],
}))

const labelsString = computed({
  get: () => account.value.labels.map(label => label.text).join('; '),
  set: (value) => {
    const labels = value.split(';').map(label => label.trim()).map(text=> ({text}))
    account.value = { ...account.value, labels }
  },
})

</script>

<template>
  <UForm
    class="grid gap-x-4 gap-y-8 w-full items-top" 
    :data-account-type="account.type"
    :class="[account.type === 'local' ? 'grid-cols-[1fr_1fr_1fr_1fr_auto]' : 'grid-cols-[1fr_1fr_2fr_auto]']"
    :state="account" 
    :schema="accountSchema"
    ref="form"
  >
    <UFormField name="labels" label="Метки">
      <UInput class="w-full" v-model="labelsString"  />
    </UFormField>

    <UFormField name="type" label="Тип записи">
      <USelect
        class="w-full"
        :items="selectItems"
        :model-value="account.type"
        @update:model-value="(type) => account = {...account, type, password: type === 'local' ? account.password ?? '' : null}"
      />
    </UFormField>

    <UFormField name="login" label="Логин">
      <UInput class="w-full" :model-value="account.login" @update:model-value="(login) => account = {...account, login}" />
    </UFormField>

    <UFormField v-if="account.type === 'local'" name="password" label="Пароль">
      <UInput class="w-full" type="password" :model-value="account.password" @update:model-value="(password) => account = {...account, password}" />
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
