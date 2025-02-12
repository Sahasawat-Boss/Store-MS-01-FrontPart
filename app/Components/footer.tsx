import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-md py-10">
            <div className="container mx-auto px-6 flex justify-center space-x-6 text-lg">
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className="text-xl hover:text-blue-500 transition-transform hover:scale-110" />
                </a>

                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-xl hover:text-pink-400 transition-transform hover:scale-110" />
                </a>

                {/* YouTube */}
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="text-xl hover:text-red-500 transition-transform hover:scale-110" />
                </a>

                {/* TikTok */}
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="text-xl hover:text-white transition-transform hover:scale-110" />
                </a>

                {/* GitHub */}
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-xl hover:text-gray-400 transition-transform hover:scale-110" />
                </a>
            </div>

            <p className="text-center text-gray-400 text-sm mt-4">
                © {new Date().getFullYear()} boss_emeraldd. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
