import { API_BASE_URL } from '@/config/api';

interface ApiRequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
```

**3. Создай `.env.local` в корне `my-app/`:**
```
NEXT_PUBLIC_API_URL=http://localhost:8080