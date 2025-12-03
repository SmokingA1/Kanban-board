export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  users: '/api/users',
  posts: '/api/posts',
  // добавь свои эндпоинты здесь
} as const;