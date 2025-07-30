import { z } from 'zod'

export const accountTypes = ['ldap', 'local'] as const

export const accountTypeSchema = z.enum(accountTypes)

export type AccountType = z.infer<typeof accountTypeSchema>

export const accountLabelSchema = z.object({
  text: z.string().max(50)
})

export type AccountLabel = z.infer<typeof accountLabelSchema>

const passwordSchema = z.string().min(1).max(100)

export const accountSchema = z.object({
  id: z.uuidv4(),
  labels: z.array(accountLabelSchema),
  type: accountTypeSchema,
  login: z.string().max(100),
  password: passwordSchema.nullable()
}).refine(data => {
  if (data.type === 'local' && !passwordSchema.safeParse(data.password).success) return false
  return true
}, { 'error': 'Введите пароль' })

export type Account = z.infer<typeof accountSchema>


