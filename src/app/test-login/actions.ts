'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function testLogin(role: 'FOUNDER' | 'ADMIN', email?: string, name?: string) {
  // Set test auth cookie
  cookies().set('test-auth', 'true', {
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Set user role cookie
  cookies().set('test-user-role', role, {
    path: '/',
    maxAge: 60 * 60 * 24,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Set user info cookie
  const userInfo = {
    id: `test-${role.toLowerCase()}-123`,
    email: email || `test${role.toLowerCase()}@blackcardinal.com`,
    name: name || `Test ${role}`,
    role: role,
  };

  cookies().set('test-user', JSON.stringify(userInfo), {
    path: '/',
    maxAge: 60 * 60 * 24,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Redirect directly from server action - this ensures cookies are set before navigation
  redirect('/orientation');
}

export async function testLogout() {
  try {
    cookies().delete('test-auth');
    cookies().delete('test-user-role');
    cookies().delete('test-user');
    
    return { success: true };
  } catch (error) {
    console.error('Test logout error:', error);
    return { success: false, error: 'Logout failed' };
  }
}

