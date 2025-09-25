import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  const { searchParams } = new URL(req.url);
  const selectedPlan = searchParams.get('plan') || '';

  // Build the checkout URL with query parameters
  let checkoutUrl = `/checkout/pay?productId=${encodeURIComponent(selectedPlan)}`;
  if (session?.user.id) {
    checkoutUrl += `&customerName=${encodeURIComponent(session.user.name)}&customerEmail=${encodeURIComponent(session.user.email)}`;
  }

  return redirect(checkoutUrl);
}
