import './legacy.css';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
  title: 'AntiFraud - Identificação e prevenção de golpes',
  description:
    'Plataforma de identificação, prevenção e conscientização contra golpes e fraudes digitais.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
