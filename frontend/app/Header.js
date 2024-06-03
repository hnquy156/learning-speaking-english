'use client';
import Link from 'next/link';
import { NAV_PATHS } from './utils/constant';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center space-x-4">
      {NAV_PATHS.map((n) => (
        <Link
          href={n.href}
          className={`${
            pathname === n.href ? 'active' : ''
          } font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900`}
          key={n.id}
        >
          {n.name}
        </Link>
      ))}
    </nav>
  );
}
