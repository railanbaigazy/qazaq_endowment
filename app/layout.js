import '../styles/globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '@/components/Navbar';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { AuthProvider } from "../context/AuthContext";

config.autoAddCss = false;

export const metadata = {
  title: 'Qazaq Endowment',
  description: 'Making a difference in Kazakhstan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
