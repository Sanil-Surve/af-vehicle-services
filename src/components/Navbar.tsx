// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// const Navbar = () => {
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <AppBar position="static" color="primary">
//             <Toolbar>
//                 <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                     AF Vehicle Services
//                 </Typography>

//                 {/* Desktop Menu */}
//                 <Box sx={{ display: { xs: "none", sm: "block" } }}>
//                     <Button color="inherit">Home</Button>
//                     <Button color="inherit">About Us</Button>
//                     <Button color="inherit">Contact</Button>
//                 </Box>

//                 {/* Mobile Menu */}
//                 <Box sx={{ display: { xs: "block", sm: "none" } }}>
//                     <IconButton
//                         size="large"
//                         edge="end"
//                         color="inherit"
//                         aria-label="menu"
//                         onClick={handleMenu}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={handleClose}
//                         anchorOrigin={{
//                             vertical: "bottom",
//                             horizontal: "right",
//                         }}
//                         transformOrigin={{
//                             vertical: "top",
//                             horizontal: "right",
//                         }}
//                     >
//                         <MenuItem onClick={handleClose}>Home</MenuItem>
//                         <MenuItem onClick={handleClose}>About Us</MenuItem>
//                         <MenuItem onClick={handleClose}>Contact</MenuItem>
//                     </Menu>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Navbar;


// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { Menu } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//     Drawer,
//     DrawerTrigger,
//     DrawerContent,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerClose,
// } from "@/components/ui/drawer"

// export function Navbar() {
//     const [open, setOpen] = useState(false)

//     return (
//         <nav className="flex items-center justify-around w-full px-4 sm:px-8 py-5 border-b bg-background h-20">
//             {/* Logo */}
//             <div className="text-2xl font-bold">
//                 <Link to="/">AF Vehicle Services</Link>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden sm:flex items-center gap-8 px-10 py-3">
//                 <Link to="/" className="text-lg font-medium text-muted-foreground hover:text-foreground">
//                     Home
//                 </Link>
//                 <Link to="/about" className="text-lg font-medium text-muted-foreground hover:text-foreground">
//                     About Us
//                 </Link>
//                 <Link to="/contact" className="text-lg font-medium text-muted-foreground hover:text-foreground">
//                     Contact
//                 </Link>
//             </div>

//             {/* Mobile Drawer */}
//             <div className="sm:hidden">
//                 <Drawer open={open} onOpenChange={setOpen}>
//                     <DrawerTrigger asChild>
//                         <Button variant="outline" size="icon" className="z-50">
//                             <Menu className="h-5 w-5" />
//                         </Button>
//                     </DrawerTrigger>
//                     <DrawerContent className="w-64">
//                         <DrawerHeader>
//                             <DrawerTitle>AF Vehicle Services</DrawerTitle>
//                         </DrawerHeader>
//                         <div className="mt-6 flex flex-col gap-4 px-4">
//                             <Link to="/" onClick={() => setOpen(false)} className="text-lg font-medium">
//                                 Home
//                             </Link>
//                             <Link to="/about" onClick={() => setOpen(false)} className="text-lg font-medium">
//                                 About Us
//                             </Link>
//                             <Link to="/contact" onClick={() => setOpen(false)} className="text-lg font-medium">
//                                 Contact
//                             </Link>
//                         </div>
//                         <div className="p-4">
//                             <DrawerClose asChild>
//                                 <Button variant="outline" className="w-full mt-4">
//                                     Close
//                                 </Button>
//                             </DrawerClose>
//                         </div>
//                     </DrawerContent>
//                 </Drawer>
//             </div>
//         </nav>
//     )
// }


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

export function Navbar() {
    const [open, setOpen] = useState(false)

    // const handleLinkClick = () => {
    //     setOpen(false)
    // }

    return (
        <nav className="flex items-center justify-around w-full px-4 sm:px-8 py-5 border-b bg-background h-20">
            {/* Logo */}
            <div className="text-2xl font-bold">
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
