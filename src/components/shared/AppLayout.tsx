"use client";
import { AppLayoutProps } from '@/types/type'
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ page }: AppLayoutProps) => {
  return (
    <div>
        <Header/>
          <div className='pt-16'>
          {page}
          </div>
          <Footer/>
    </div>
  )
}

export default AppLayout