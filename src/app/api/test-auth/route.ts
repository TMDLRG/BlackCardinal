import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_TEST_EMAIL,
  DEFAULT_TEST_NAME,
  ensureTestBootcampEnrollment,
  ensureTestProfile,
  ensureTestUser,
} from '@/lib/test-mode';

export async function POST(request: NextRequest) {
  try {
    // Handle both JSON and form data
    const contentType = request.headers.get('content-type');
    let role = 'FOUNDER';
    let email = '';
    let name = '';

    if (contentType?.includes('application/json')) {
      const body = await request.json();
      role = body.role || 'FOUNDER';
      email = body.email || '';
      name = body.name || '';
    } else {
      // Handle form data
      const formData = await request.formData();
      role = (formData.get('role') as string) || 'FOUNDER';
      email = (formData.get('email') as string) || '';
      name = (formData.get('name') as string) || '';
    }

    const resolvedEmail = email || DEFAULT_TEST_EMAIL;
    const resolvedName = name || DEFAULT_TEST_NAME;

    await ensureTestUser({
      role,
      email: resolvedEmail,
      name: resolvedName,
    });

    await ensureTestProfile();
    await ensureTestBootcampEnrollment();

    // Create JSON response (client will handle redirect)
    const response = NextResponse.json({ success: true, role });

    // Set test-auth cookie (expires in 24 hours)
    response.cookies.set('test-auth', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    // Store user info in a separate cookie for display
    response.cookies.set('test-user', JSON.stringify({
      email: resolvedEmail,
      name: resolvedName,
      role: role,
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}

// Logout endpoint
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  
  // Clear test auth cookies
  response.cookies.delete('test-auth');
  response.cookies.delete('test-user');
  
  return response;
}

