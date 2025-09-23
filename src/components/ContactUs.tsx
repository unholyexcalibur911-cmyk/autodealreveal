export default function ContactUs() {
    return (
        <main className="min-h-screen bg-[#2b2d42] flex items-center justify-center">
            <div className="w-full max-w-4xl px-6 py-12 text-center">
            {/* Heading */}
            <h1 className="text-4xl font-serif text-gray-300 mb-2">Contact Us</h1>
            <div className="w-12 h-0.5 bg-gray-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 mb-8">Drop us a line!</p>

            {/* Form */}
            <form className="space-y-6">
            {/* Name */}
            <input
                type="text"
                placeholder="Name"
                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            {/* Email */}
            <input
                type="email"
                placeholder="Email*"
                required
                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            {/* Message */}
            <textarea
                rows={5}
                placeholder="Message"
                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            ></textarea>

            {/* Checkbox */}
            <div className="flex items-center space-x-2 text-gray-300">
                <input
                id="subscribe"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-500 bg-black focus:ring-gray-400"
            />
            <label htmlFor="subscribe" className="text-sm">
                Sign up for our email list for updates, promotions, and more.
            </label>
            </div>

            {/* Button */}
            <button
                type="submit"
                className="w-32 rounded bg-white py-3 font-semibold text-black hover:bg-gray-200"
            >
            SEND
            </button>
        </form>
        </div>
    </main>
    );
}
