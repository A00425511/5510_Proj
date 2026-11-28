export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export async function apiRequest(
  path,
  {
    method = 'GET',
    body,
    csrfToken,
    signal,
  } = {},
) {
  if (!path.startsWith('/api/')) {
    throw new Error('Invalid API endpoint')
  }

  const requestMethod = method.toUpperCase()

  const headers = {
    Accept: 'application/json',
  }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  const safeMethods = ['GET', 'HEAD', 'OPTIONS']

  if (!safeMethods.includes(requestMethod)) {
    if (!csrfToken) {
      throw new Error('CSRF token is required')
    }

    headers['X-CSRFToken'] = csrfToken
  }

  const response = await fetch(path, {
    method: requestMethod,
    headers,
    credentials: 'same-origin',
    body: body !== undefined
      ? JSON.stringify(body)
      : undefined,
    signal,
  })

  let data = null

  if (response.status !== 204) {
    const contentType =
      response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }
  }

  if (!response.ok) {
    throw new ApiError(
      data?.detail || `Request failed (${response.status})`,
      response.status,
      data,
    )
  }

  return data
}