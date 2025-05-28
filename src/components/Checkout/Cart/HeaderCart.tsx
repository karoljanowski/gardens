import { ShoppingBagIcon } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import Counter from "./Counter";

const HeaderCart = () => {
    return (
        <Button asChild size="icon" className="relative">
            <Link href="/cart">
                <ShoppingBagIcon />
                <Counter />
            </Link>
        </Button>
    )
}

export default HeaderCart;