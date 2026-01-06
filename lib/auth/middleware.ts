import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  // If no token in cookie, check localStorage (client-side)
  // This is a simplified check - in production, verify token validity
  if (!token) {
    redirect('/login');
  }
}

export async function requireGuest() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  if (token) {
    redirect('/app/overview');
  }
}
