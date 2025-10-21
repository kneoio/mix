export type FieldErrors = Record<string, string[]>

export interface ProblemDetails {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
  errors?: FieldErrors
}

export interface ParsedValidationProblem {
  message: string
  fieldErrors: FieldErrors
}

export function parseValidationProblem(err: unknown): ParsedValidationProblem | null {
  const maybeResp = (err as { response?: { data?: unknown } } | null | undefined)?.response
  const data = maybeResp?.data as ProblemDetails | undefined
  if (!data) return null
  const isValidation = typeof data.type === 'string' && data.type.includes('validation-error')
  if (!isValidation) return null
  const message = typeof data.detail === 'string' && data.detail.trim().length > 0
    ? data.detail
    : (data.title || 'Validation error')
  const fieldErrors: FieldErrors = {}
  const src: FieldErrors = data.errors || {}
  for (const [k, v] of Object.entries(src)) {
    if (Array.isArray(v)) fieldErrors[k] = v.map(x => String(x))
  }
  return { message, fieldErrors }
}
