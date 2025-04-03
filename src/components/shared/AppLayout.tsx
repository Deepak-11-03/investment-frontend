
import { AppLayoutProps } from '@/types/type'
import Header from './Header/Header';
import Footer from './Footer';
import { GlobalProvider } from '@/context/GlobalContext';
import { LoadingProvider } from '@/context/LoadingContext';
import LoadingWrapper from '@/wrapper/LoadingWrapper';

const AppLayout = ({ page }: AppLayoutProps) => {
  return (
    <div>
      {/* <AuthProvider> */}
        <LoadingProvider>
          <GlobalProvider>
            <LoadingWrapper>
              <Header />
              <div className='min-h-[calc(100vh-4rem)] pt-16'>
                {page}
              </div>
            </LoadingWrapper>
            <Footer />
          </GlobalProvider>
        </LoadingProvider>
      {/* </AuthProvider> */}
    </div>
  )
}

export default AppLayout