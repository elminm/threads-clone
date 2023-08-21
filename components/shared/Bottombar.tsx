"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
export default function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            (pathname.includes(route) && route.length > 1) ||
            pathname === route;
          if (route === "/profile") route = `${route}/${userId}`;
          return (
            <Link
              href={route}
              key={label}
              className={`bottombar_link ${isActive ? "bg-primary-500" : ""}`}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
