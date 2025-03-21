"use client";
import { AppLayoutProps } from '@/types/type'
import Header from './Header';
import Footer from './Footer';
import { GlobalProvider } from '@/context/GlobalContext';
import { LoadingProvider } from '@/context/LoadingContext';

const AppLayout = ({ page }: AppLayoutProps) => {
  return (
    <div>
      <LoadingProvider>

        <GlobalProvider>
          <Header />
          <div className='pt-16  min-h-[calc(100vh-4rem)]'>
            {page}
          </div>
          <Footer />
        </GlobalProvider>
      </LoadingProvider>
    </div>
  )
}

export default AppLayout