import { NextResponse } from 'next/server';
import { ensureTestBootcampEnrollment, ensureTestProfile, ensureTestUser, resetTestUserData } from '@/lib/test-mode';

export async function POST() {
  await resetTestUserData();
  await ensureTestUser();
  await ensureTestProfile();
  await ensureTestBootcampEnrollment();

  return NextResponse.json({ success: true });
}

