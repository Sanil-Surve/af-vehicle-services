import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import aflogo from "@/assets/images/aflogo.jpeg";

export function Navbar() {
    const [open, setOpen] = useState(false)

    // const handleLinkClick = () => {
    //     setOpen(false)
    // }

    return (
        <nav className="flex items-center justify-around w-full px-4 sm:px-8 py-5 border-b bg-background h-20">
            {/* Logo */}
            <div className="text-2xl font-bold space-x-3">
                <img src={aflogo} className="flex-1 rounded-2xl inline" height={50} width={50} />
                <Link to="/">AF Vehicle Services</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to="/" className="text-base md:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Home
                </Link>
                <Link to="/about" className="text-base md:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                </Link>
                <Link to="/contact" className="text-base md:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                </Link>
            </div>

            {/* Mobile Drawer */}
            <div className="sm:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <SheetHeader>
                            <SheetTitle>AF Vehicle Services</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 flex flex-col gap-4">
                            <Link
                                to="/"
                                // onClick={handleLinkClick}
                                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                // onClick={handleLinkClick}
                                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contact"
                                // onClick={handleLinkClick}
                                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
