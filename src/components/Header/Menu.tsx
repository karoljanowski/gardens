import { type TMenuItem } from "@/lib/types/menu";
import Link from "next/link";

const Menu = () => {
    const items: TMenuItem[] = [
        {
            href: "#courses",
            label: 'Courses'
        },
        {
            href: "#about",
            label: 'About'
        },
        {
            href: "#testimonials",
            label: 'Testimonials'
        },
        {
            href: "#contact",
            label: 'Contact'
        }
    ]
    return (
        <div className="items-center gap-16 hidden md:flex">
            {items.map((item) => (
                <Link href={item.href} key={item.label}>
                    {item.label}
                </Link>
            ))}
        </div>
    )
}

export default Menu;