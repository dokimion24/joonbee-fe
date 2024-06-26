import QueryProvider from '@/queries/queryProvider';
import RecoilRootProvider from '@/recoils/recoilRootProvider';

import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/header/header';
import { ThemeProvider } from '@/styles/themeProvider';
import Navbar from '@/components/navbar/navbar';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JOONBEE' || '준비',
  description: '개발자를 위한 AI 면접 서비스',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content="790Y2Fo5k5nIvvZRacBoSA3jqr-DIKThbxNFVMRHhuw"
        />
        <meta name="google-adsense-account" content="ca-pub-7301751207531014" />
      </head>
      <body suppressHydrationWarning={true} className={notoSansKr.className} id="portal">
        <RecoilRootProvider>
          <QueryProvider>
            <ThemeProvider>
              <Header />
              <main className="flex">
                <Navbar />
                {children}
              </main>
            </ThemeProvider>
          </QueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
