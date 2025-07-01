import Logo from "@/components/Header/Logo";
import Menu from "@/components/Header/Menu";
import { Button } from "../ui/button";
import { LogOut, UserIcon } from "lucide-react";
import Link from "next/link";
import HeaderCart from "../Checkout/HeaderCart";
import { signOut } from "@/server/auth";

type HeaderProps = {
    isDashboard?: boolean
}

const Header = ({ isDashboard = false }: HeaderProps) => {
    return (
        <div className="container mx-auto z-20 relative h-24">
            <div className="flex px-4 py-8 gap-4 items-center justify-between w-full">
                {/* logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-6 h-6">
                        <Logo />
                    </div>
                    <span className="font-bold">Gardens</span>
                </Link>

                {/* menu */}
                {!isDashboard && (
                    <div className="flex items-center">
                        <Menu />
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {!isDashboard && <HeaderCart />}
                    {isDashboard ? (
                        <Button variant="tertiary" onClick={signOut}>
                            Logout <LogOut />
                        </Button>
                    ) : (
                        <Link href="/dashboard">
                            <UserIcon />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
};



export default Header;