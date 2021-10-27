import type { WithChildren } from "./types";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

type NavLinkProps = WithChildren<{
  href: string;
  [name: string]: any;
}>;

export default function NavLink({ children, href, ...props }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <Button as="a" {...props}>
        {children}
      </Button>
    </Link>
  );
}
