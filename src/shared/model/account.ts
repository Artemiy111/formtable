import { defineQuery, defineMutation, useQuery, useMutation, useQueryCache } from '@pinia/colada'
import { accountSchema, type Account } from '../types'
import { z } from 'zod'
import { qk } from './query-keys'

export const useAccounts = defineQuery(() => {
  const { data: accounts, ...rest } = useQuery({
    key: qk.accounts,
    query: async () => {
      const data = z.array(accountSchema).parse(JSON.parse(localStorage.getItem('accounts') ?? "{}"))
      return data
    },
    placeholderData: []
  })

  return {
    accounts,
    ...rest
  }
})


export const useCreateAccount = defineMutation(() => {
  const qc = useQueryCache()

  const { mutate: createAccount, ...rest } = useMutation({
    mutation: async () => {
      const accounts = qc.getQueryData<Account[]>(qk.accounts) ?? []

      const newAccount = structuredClone(accounts)
      newAccount.push({
        id: crypto.randomUUID(),
        labels: [],
        type: 'local',
        login: '',
        password: "",
      })

      qc.setQueryData(qk.accounts, newAccount)
    }
  })

  return {
    createAccount,
    ...rest,
  }
})

export const useUpdateAccount = defineMutation(() => {
  const qc = useQueryCache()

  const { mutate: updateAccount, ...rest } = useMutation({
    mutation: async (updatedAccount: Account) => {
      const accounts = qc.getQueryData<Account[]>(qk.accounts) ?? []

      const newAccounts = accounts.map(account =>
        account.id === updatedAccount.id ? { ...account, ...updatedAccount } : account
      )

      qc.setQueryData(qk.accounts, newAccounts)
    }
  })

  return {
    updateAccount,
    ...rest,
  }
})

export const useDeleteAccount = defineMutation(() => {
  const qc = useQueryCache()

  const { mutate: deleteAccount, ...rest } = useMutation({
    mutation: async (id: string) => {
      const accounts = qc.getQueryData<Account[]>(qk.accounts) ?? []

      const updatedAccounts = accounts.filter(account => account.id !== id)

      qc.setQueryData(qk.accounts, updatedAccounts)
    }
  })

  return {
    deleteAccount,
    ...rest,
  }
})
