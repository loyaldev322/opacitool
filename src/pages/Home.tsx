import { Button } from '@/components/ui/button'
import { FormWithPDF } from '@/components/FormWithPDF'

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="text-center py-20">
                <h1 className="text-5xl font-bold mb-4">Skyline IT Consulting</h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Your trusted partner for digital transformation and IT solutions
                </p>
                <div className="flex gap-4 justify-center">
                    <Button size="lg">Get Started</Button>
                    <Button variant="outline" size="lg">Learn More</Button>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20">
                <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-3">Cloud Solutions</h3>
                        <p className="text-muted-foreground">
                            Scalable cloud infrastructure and migration services for modern businesses.
                        </p>
                    </div>
                    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-3">Digital Consulting</h3>
                        <p className="text-muted-foreground">
                            Strategic IT consulting to help your business achieve digital excellence.
                        </p>
                    </div>
                    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-3">Enterprise Solutions</h3>
                        <p className="text-muted-foreground">
                            Comprehensive enterprise IT solutions tailored to your needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-12 border-t">
                <FormWithPDF />
            </section>

            {/* About Section */}
            <section id="about" className="py-20 border-t">
                <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-muted-foreground">
                        Skyline IT Consulting is a leading digital transformation company dedicated to
                        helping businesses navigate the complex world of technology. With years of
                        experience and a team of expert consultants, we deliver innovative solutions
                        that drive growth and efficiency.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 border-t">
                <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
                <div className="max-w-md mx-auto">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border rounded-md bg-background"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-md bg-background"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-2 border rounded-md bg-background"
                            />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </div>
            </section>
        </div>
    )
}

