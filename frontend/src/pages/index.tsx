import Header from '@/components/Header';
import Button from '@/components/common/Button';
import { ROUTES } from '@/config/constant';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Header />
      <section className='w-full overflow-hidden'>
        <div
          className='w-full h-[92vh] flex justify-center items-center !bg-cover bg-center bg-no-repeat'
          style={{ background: 'url(/images/menReadNewspaper.jpg)' }}
        >
          <div className='mb-20 w-[85%] bg-white p-10 bg-opacity-90'>
            <h1 className='text-4xl font-medium w-full'>Description:</h1>
            <p className='my-8'>
              The Global News Feed App is a dynamic and user-centric platform
              that delivers personalized news experiences. Users can sign in,
              set their preferred region and language, and instantly access
              tailored news headlines. The app features intuitive dropdowns for
              easy customization, ensuring a seamless and user-friendly
              experience. With a secure authentication system, users can
              bookmark articles, manage their saved content, and stay informed
              in a way that aligns with their individual interests. Explore the
              world of news with the Global News Feed App – your personalized
              gateway to up-to-date and relevant information
            </p>
            <Link href={ROUTES.NEWS_FEED}>
              <Button
                padding='py-3 px-20'
                className='bg-red-500 text-white rounded-md text-2xl font-medium hover:bg-opacity-50 transition-all duration-500'
                text='Get Started'
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

Home.layout = { auth: false, ip: null };

export default Home;
