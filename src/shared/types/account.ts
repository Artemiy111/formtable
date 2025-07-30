import { z } from 'zod'

export const accountTypes = ['ldap', 'local'] as const

export const accountTypeLabels: Record<AccountType, string> = {
  ldap: 'LDAP',
  local: 'Локальный',
}

export const accountTypeSchema = z.enum(accountTypes)

export type AccountType = z.infer<typeof accountTypeSchema>

export const accountLabelSchema = z.object({
  text: z.string().trim().max(50)
})

export type AccountLabel = z.infer<typeof accountLabelSchema>

const passwordSchema = z.string().max(100)

export const accountSchema = z.object({
  id: z.uuidv4(),
  labels: z.array(accountLabelSchema).transform(labels => labels.filter(label => label.text !== '')),
  type: accountTypeSchema,
  login: z.string().max(100),
  password: passwordSchema.nullable()
}).superRefine((data, ctx) => {
  if (data.type === 'local' && !passwordSchema.safeParse(data.password).success) {
    ctx.addIssue({
      'code': 'custom',
      message: 'Пароль должен быть указан для локального аккаунта',
    })
  }
}).transform(data => ({ ...data, password: data.type === 'local' ? data.password : null }))

export type Account = z.infer<typeof accountSchema>


