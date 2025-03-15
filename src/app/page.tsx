import WhyUsSection from "@/components/home/WhyUsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
            {/* Hero Section */}
            <section className="home text-white py-20 text-center">
                <div className="max-w-4xl p-6 pt-1 md:pt-12">
                    <h1 className="text-5xl font-bold">Grow Your Wealth with Smart Investments</h1>
                    <p className="mt-4 text-lg ">
                        Secure your financial future with expert-guided investment opportunities.
                    </p>
                    {/* <Link href="/contact">
                        <button className="mt-6 text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer">
                            Get Started
                        </button>
                    </Link> */}
                </div>
            </section>

            {/* Why Choose Us */}
     
            <WhyUsSection/>

            {/* Investment Opportunities */}
            <section className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Investment Opportunities</h2>
                    <p className="mt-4 text-gray-600">Explore our diverse range of investment plans tailored to your needs.</p>
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="p-6  rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-700">Stocks & Shares</h3>
                            <p className="mt-2 text-gray-600">Invest in the stock market for long-term financial growth.</p>
                        </div>
                        <div className="p-6  rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-700">Real Estate</h3>
                            <p className="mt-2 text-gray-600">Secure high-value real estate investments for stability.</p>
                        </div>
                        <div className="p-6  rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-700">Mutual Funds</h3>
                            <p className="mt-2 text-gray-600">Diversify your portfolio with expertly managed mutual funds.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="shadow-md bg-blue-700 text-white py-12 text-center">
                <h2 className="text-3xl font-bold">Start Investing Today</h2>
                <p className="mt-4 text-lg text-blue-200">Join thousands of investors who trust our platform.</p>
                {/* <Link href="/portfolio">
                    <button className="mt-6 text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer">
                        View Your Portfolio
                    </button>
                </Link> */}
            </section>
        </div>
  );
}
