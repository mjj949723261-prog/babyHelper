export interface TodoCreateDraft {
  category?: 'daily' | 'important'
  title?: string
  note?: string
  dateRange?: string
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
}

const STORAGE_KEY = 'baby-helper-todo-create-draft'

function hasUniStorage() {
  return typeof globalThis !== 'undefined' && typeof (globalThis as { uni?: unknown }).uni !== 'undefined'
}

export function readTodoCreateDraft(): TodoCreateDraft {
  if (hasUniStorage()) {
    try {
      const result = (globalThis as unknown as { uni?: { getStorageSync?: (key: string) => string } }).uni?.getStorageSync?.(
        STORAGE_KEY
      )
      return result ? JSON.parse(result) : {}
    } catch {
      return {}
    }
  }

  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  return {}
}

export function writeTodoCreateDraft(patch: TodoCreateDraft) {
  const nextDraft = {
    ...readTodoCreateDraft(),
    ...patch
  }

  const serialized = JSON.stringify(nextDraft)

  if (hasUniStorage()) {
    ;(globalThis as unknown as { uni?: { setStorageSync?: (key: string, value: string) => void } }).uni?.setStorageSync?.(
      STORAGE_KEY,
      serialized
    )
    return
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, serialized)
  }
}
