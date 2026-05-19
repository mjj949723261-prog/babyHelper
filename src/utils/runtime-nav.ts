export interface RuntimeLocation {
  path: string
  query: Record<string, string>
}

type UniLike = {
  navigateTo: (options: { url: string; fail?: () => void }) => void
  reLaunch: (options: { url: string }) => void
  navigateBack: () => void
  showToast: (options: { title: string; icon: 'none' }) => void
}

function hasUniRuntime() {
  return typeof globalThis !== 'undefined' && typeof (globalThis as { uni?: unknown }).uni !== 'undefined'
}

function getUniApi() {
  return (globalThis as unknown as { uni?: UniLike }).uni
}

function buildHashUrl(url: string) {
  return `#${url.startsWith('/') ? url : `/${url}`}`
}

function parseQueryString(queryString: string) {
  const params = new URLSearchParams(queryString)
  const query: Record<string, string> = {}

  params.forEach((value, key) => {
    query[key] = value
  })

  return query
}

export function getRuntimeLocation(): RuntimeLocation {
  if (typeof window === 'undefined') {
    return { path: '/pages/home/index', query: {} }
  }

  const rawHash = window.location.hash.replace(/^#/, '')
  if (!rawHash) {
    return { path: '/pages/home/index', query: {} }
  }

  const [pathPart, queryString = ''] = rawHash.split('?')
  return {
    path: pathPart || '/pages/home/index',
    query: parseQueryString(queryString)
  }
}

export function getRouteQuery() {
  if (typeof window !== 'undefined') {
    return getRuntimeLocation().query
  }

  const pageGetter = (globalThis as { getCurrentPages?: (() => Array<{ options?: Record<string, string> }>) | undefined })
    .getCurrentPages

  if (!pageGetter) {
    return {}
  }

  const pages = pageGetter()
  const currentPage = pages[pages.length - 1]
  return currentPage?.options || {}
}

export function navigateTo(url: string, failMessage = '打开页面失败') {
  if (hasUniRuntime()) {
    const uniApi = getUniApi()
    uniApi?.navigateTo({
      url,
      fail() {
        uniApi?.showToast({ title: failMessage, icon: 'none' })
      }
    })
    return
  }

  if (typeof window !== 'undefined') {
    window.location.hash = buildHashUrl(url)
  }
}

export function reLaunch(url: string) {
  if (hasUniRuntime()) {
    getUniApi()?.reLaunch({ url })
    return
  }

  if (typeof window !== 'undefined') {
    window.location.hash = buildHashUrl(url)
  }
}

export function navigateBack(fallbackUrl = '/pages/home/index') {
  if (hasUniRuntime()) {
    getUniApi()?.navigateBack()
    return
  }

  if (typeof window === 'undefined') return

  if (window.history.length > 1) {
    window.history.back()
    return
  }

  window.location.hash = buildHashUrl(fallbackUrl)
}

export function showToast(title: string) {
  if (hasUniRuntime()) {
    getUniApi()?.showToast({ title, icon: 'none' })
    return
  }

  if (typeof window !== 'undefined') {
    window.alert(title)
  }
}
