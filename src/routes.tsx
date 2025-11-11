import { createBrowserRouter } from "react-router-dom"
import React from "react"
import { Navbar } from "./components/Navbar"
import Footer from "./components/Footer.tsx"

// Lazy load pages
const App = React.lazy(() => import('./App.tsx'))
const About = React.lazy(() => import("@/pages/About"))
const Contact = React.lazy(() => import("@/pages/Contact"))

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/about",
        element: <><Navbar /><About /><Footer /></>,
    },
    {
        path: "/contact",
        element: <><Navbar /><Contact /><Footer /></>,
    },
])


// src/router.tsx