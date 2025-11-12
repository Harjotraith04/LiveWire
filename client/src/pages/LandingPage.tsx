import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "@/assets/logo.svg"

function LandingPage() {
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        setIsVisible(true)
        
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleGetStarted = () => {
        navigate("/join")
    }

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-4 top-0 h-72 w-72 animate-pulse rounded-full bg-primary/20 blur-3xl"></div>
                <div className="absolute -right-4 bottom-0 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl" style={{ animationDelay: "1s" }}></div>
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-purple-500/10 blur-3xl" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-900/95 backdrop-blur-lg shadow-lg" : "bg-transparent"}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
                            <img src={logo} alt="CodeFlow" className="h-10 w-auto" />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <button onClick={() => scrollToSection("features")} className="text-gray-300 hover:text-primary transition-colors">
                                Features
                            </button>
                            <button onClick={() => scrollToSection("how-it-works")} className="text-gray-300 hover:text-primary transition-colors">
                                How It Works
                            </button>
                            <button onClick={() => scrollToSection("tech-stack")} className="text-gray-300 hover:text-primary transition-colors">
                                Tech Stack
                            </button>
                            <button
                                onClick={handleGetStarted}
                                className="rounded-full bg-primary px-6 py-2.5 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button className="md:hidden text-white p-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
                <div
                    className={`flex max-w-5xl flex-col items-center text-center transition-all duration-1000 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    {/* Logo */}
                    <div className="mb-4 flex justify-center animate-float">
                        <img src={logo} alt="CodeFlow Logo" className="h-20 w-auto sm:h-28 md:h-32 drop-shadow-2xl" />
                    </div>

                    {/* Main heading */}
                    <h1 className="mb-4 bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
                        Welcome to CodeFlow
                    </h1>

                    {/* Subheading */}
                    <p className="mb-6 max-w-2xl text-xl text-gray-300 sm:text-2xl md:text-3xl font-medium">
                        Real-time Collaborative Code Editor
                    </p>

                    {/* Badge */}
                    <div className="mb-8 inline-block">
                        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                            <span className="text-sm font-medium text-primary">Live & Free Forever</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl">
                        Code together in real-time with your team. Share ideas, collaborate seamlessly, 
                        and build amazing projects together. Experience the power of <span className="font-semibold text-primary">instant collaboration</span> with AI-powered assistance.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={handleGetStarted}
                        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-emerald-500 px-12 py-5 text-lg font-bold text-black shadow-2xl shadow-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-primary/70 mb-8"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started Free
                            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </button>

                    {/* Additional info */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>No sign-up required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Start coding in seconds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Free forever</span>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 animate-bounce">
                    <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 px-4 py-24 bg-gray-900/50">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Powerful Features for Modern Teams
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Everything you need to collaborate effectively, all in one place
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="group rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-gray-800/80 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-4xl transition-transform group-hover:scale-110">⚡</div>
                            <h3 className="mb-3 text-xl font-bold text-white">Real-time Sync</h3>
                            <p className="text-sm leading-relaxed text-gray-400">
                                See changes instantly as your team codes together. Experience seamless synchronization with zero lag.
                            </p>
                        </div>
                        <div className="group rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-800/80 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-4xl transition-transform group-hover:scale-110">💬</div>
                            <h3 className="mb-3 text-xl font-bold text-white">Live Chat</h3>
                            <p className="text-sm leading-relaxed text-gray-400">
                                Communicate with your team without leaving the editor. Built-in chat keeps conversations contextual.
                            </p>
                        </div>
                        <div className="group rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-800/80 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-4xl transition-transform group-hover:scale-110">🎨</div>
                            <h3 className="mb-3 text-xl font-bold text-white">Drawing Board</h3>
                            <p className="text-sm leading-relaxed text-gray-400">
                                Sketch ideas, create diagrams, and visualize concepts with integrated drawing tools.
                            </p>
                        </div>
                        <div className="group rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/50 hover:bg-gray-800/80 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500/10 text-4xl transition-transform group-hover:scale-110">🤖</div>
                            <h3 className="mb-3 text-xl font-bold text-white">AI Assistant</h3>
                            <p className="text-sm leading-relaxed text-gray-400">
                                Get intelligent code suggestions and assistance powered by Google's Gemini AI.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="relative z-10 px-4 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Start Coding in 3 Simple Steps
                        </h2>
                        <p className="text-lg text-gray-400">
                            Get up and running in seconds, no setup required
                        </p>
                    </div>

                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-3xl font-bold text-primary border-4 border-primary/30">
                                1
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">Create a Room</h3>
                            <p className="text-gray-400">
                                Click "Get Started" and create a unique room ID. Share it with your team instantly.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-3xl font-bold text-emerald-400 border-4 border-emerald-500/30">
                                2
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">Invite Your Team</h3>
                            <p className="text-gray-400">
                                Team members join using the room ID. No accounts, no friction, just code.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/20 text-3xl font-bold text-teal-400 border-4 border-teal-500/30">
                                3
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">Code Together</h3>
                            <p className="text-gray-400">
                                Start collaborating in real-time with full IDE features and AI assistance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section id="tech-stack" className="relative z-10 px-4 py-24 bg-gray-900/50">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Built with Modern Technologies
                        </h2>
                        <p className="text-lg text-gray-400">
                            Powered by the best tools and frameworks
                        </p>
                    </div>

                    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        {[
                            { name: "React", icon: "⚛️", color: "from-blue-400 to-cyan-400" },
                            { name: "TypeScript", icon: "📘", color: "from-blue-500 to-blue-600" },
                            { name: "Socket.IO", icon: "🔌", color: "from-gray-700 to-gray-800" },
                            { name: "Monaco", icon: "📝", color: "from-blue-600 to-indigo-600" },
                            { name: "Tailwind", icon: "🎨", color: "from-cyan-400 to-teal-400" },
                            { name: "Gemini AI", icon: "🤖", color: "from-purple-500 to-pink-500" },
                        ].map((tech, i) => (
                            <div
                                key={i}
                                className="group flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:scale-105"
                            >
                                <div className="mb-3 text-4xl">{tech.icon}</div>
                                <div className={`bg-gradient-to-r ${tech.color} bg-clip-text text-transparent font-bold`}>
                                    {tech.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 px-4 py-24">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-emerald-500/10 p-12 text-center backdrop-blur-sm">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Workflow?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join developers worldwide who are already coding together in real-time
                        </p>
                        <button
                            onClick={handleGetStarted}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-emerald-500 px-12 py-5 text-lg font-bold text-black shadow-2xl shadow-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-primary/70"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Collaborating Now
                                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-800 bg-gray-900/80 px-4 py-12 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <img src={logo} alt="CodeFlow" className="h-12 mb-4" />
                            <p className="text-gray-400 max-w-md">
                                A powerful real-time collaborative code editor designed for modern development teams.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><button onClick={() => scrollToSection("features")} className="hover:text-primary transition-colors">Features</button></li>
                                <li><button onClick={() => scrollToSection("how-it-works")} className="hover:text-primary transition-colors">How It Works</button></li>
                                <li><button onClick={() => scrollToSection("tech-stack")} className="hover:text-primary transition-colors">Tech Stack</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Connect</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="https://github.com" className="hover:text-primary transition-colors">GitHub</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} CodeFlow. All rights reserved. Built with ❤️ for developers.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
