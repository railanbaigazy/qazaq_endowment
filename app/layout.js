import '../styles/globals.css';
import { LanguageProvider } from '../context/LanguageContext';

export const metadata = {
  title: 'Qazaq Endowment',
  description: 'Making a difference in Kazakhstan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
