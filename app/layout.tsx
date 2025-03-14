import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'فرحة ولدكم صقر',
  description: "  لمرض نادر السبب (دوشين) وهو ضمور العضلات أصيب به صقر هذا الطفل الذي لم يتجاوز عمره 7 سنوات منذ أن كان في عمر السنتين وهو يعاني من هذا المرض الخطير", viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
