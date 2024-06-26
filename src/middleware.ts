import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/interview/:path*', '/my/:path*'],
};
/**
 *
 * 401 토큰 없음
 * 402 토큰 만료
 * 403 토큰 이상
 */
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('joonbee-token');
  const refreshToken = request.cookies.get('joonbee-token-refresh');
  const pathname = request.nextUrl.pathname;
  const userInfo = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/member/info`, {
    method: 'GET',
    headers: {
      Cookie: `joonbee-token=${accessToken?.value}; joonbee-token-refresh=${refreshToken?.value}`,
    },
  });
  const data = await userInfo.json();
  if (data.status !== 200) {
    if (pathname.startsWith('/interview') || pathname.startsWith('/my')) {
      if (pathname !== '/interview') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }
}
