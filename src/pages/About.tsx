import React from "react";
import aflogo from "@/assets/images/aflogo.jpeg";

const About: React.FC = () => {
    return (
        <section className="bg-yellow-300 py-16 px-6 sm:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-6">
                        About <span className="text-black">AF Vehicle Services</span>
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                        We provide the best Rental Services in Navi Mumbai. Latest Established on 19th November 2022, with a dream to Centralise All the motor Vehicle services over one Seat. Started with only one scooter and a beautiful dream of getting rich today we have over 30 vehicles running scooters & bikes daily. Our presence is currently in all over Mumbai and Pune. Currently expanding as we speak.

                        We are really glad to announce that we will soon be opening in Nashik too.
                    </p>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        Started from Belapur Navi Mumbai we are slowly spreading all over the world.

                        My friend Akshay Jagadale & I myself Fardeen Khan working towards making it possible to get from providing rentals bikes to provide all the motor vehicle related services and convert our tini tiny unknown company name as huge famous and differentiated Brand.
                    </p>
                </div>

                {/* Right Image */}
                <div className="flex-1">
                    <img
                        src={aflogo}
                        alt="AF Vehicle Services Workshop"
                        className="w-full rounded-lg shadow-lg object-cover"
                    />
                </div>
            </div>

            {/* Mission & Values Section */}
            {/* <div className="max-w-5xl mx-auto mt-16 text-center">
                <h3 className="text-3xl font-bold text-black mb-4">Our Mission & Values</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    We believe in quality, honesty, and long-term relationships with our customers.
                    Our goal is to revolutionize the automotive service experience by combining modern technology
                    with expert craftsmanship.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex-1">
                        <h4 className="text-xl font-semibold text-black mb-2">Quality Service</h4>
                        <p className="text-gray-600 text-sm">
                            We use top-grade materials and follow best practices to ensure your vehicle gets the care it deserves.
                        </p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex-1">
                        <h4 className="text-xl font-semibold text-black mb-2">Customer Trust</h4>
                        <p className="text-gray-600 text-sm">
                            Your satisfaction is our priority. We believe in transparent pricing and honest communication.
                        </p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex-1">
                        <h4 className="text-xl font-semibold text-black mb-2">Innovation</h4>
                        <p className="text-gray-600 text-sm">
                            We adopt the latest technologies and techniques to make vehicle maintenance smarter and more efficient.
                        </p>
                    </div>
                </div>
            </div> */}
        </section>
    );
};

export default About;
