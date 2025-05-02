'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <Image src="/404_error.png" alt='404 page not Found' height={400} width={400}/>
       {/* <h1 className="text-6xl font-bold mb-4 dark:text-white">404</h1>
      <p className="text-xl mb-8 dark:text-white">Oops! The page you&apos;re looking for does not exist.</p> */}
      <Link href="/" className="bg-[#f2610d] text-white font-semibold py-2 px-4 rounded">
        Go back home
      </Link>
    </div>
  );
}
