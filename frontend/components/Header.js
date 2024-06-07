'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_PATHS } from '@/utils/constant';

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center space-x-4 my-header">
      {NAV_PATHS.map((n) => (
        <Link
          href={n.href}
          className={`${
            pathname === n.href ? 'bg-blue-400' : ''
          } font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 uppercase`}
          key={n.id}
        >
          {n.name}
        </Link>
      ))}
    </nav>
  );
}
