import Logo from "@/components/Header/Logo";
import Menu from "@/components/Header/Menu";
import { Button } from "../ui/button";
import { ShoppingBagIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import HeaderCart from "../Checkout/Cart/HeaderCart";

const Header = () => {
    return (
        <div className="container mx-auto z-20 relative">
            <div className="flex px-4 py-8 gap-4 items-center justify-between w-full">
                {/* logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-6 h-6">
                        <Logo />
                    </div>
                    <span className="font-bold">Gardens</span>
                </Link>

                {/* menu */}
                <div className="flex items-center">
                    <Menu />
                </div>

                {/* button */}
                <div className="flex items-center gap-2">
                    <HeaderCart />
                    <Button asChild size="icon">
                        <Link href="/dashboard">
                            <UserIcon />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
};



export default Header;