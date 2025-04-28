import React from "react";
import logo from "../assets/footer/logo1.png";

const Footer = () => {
  const whatsappNumber = "0742388071";

  return (
      <footer className="bg-blue-950 text-white pt-12 pb-6 md:pl-64">
        {/* md:pl-64 offsets for dashboard sidebar if present */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            {/* About */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-4">
                <img src={logo} alt="Accomate Logo" className="w-20 h-20" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">About Accomate</h3>
                  <p className="text-sm leading-6">
                    Accomate makes it easy for students and workers to find nearby boarding accommodations with comfort and convenience.
                  </p>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "About Us", "Boardings", "Contact"].map((label) => (
                    <li key={label}>
                      <a href={`/${label.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-blue-300">
                        {label}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <p className="mb-2">
                Email:{" "}
                <a href="mailto:info@accomate.com" className="hover:underline">
                  info@accomate.com
                </a>
              </p>
              <p className="mb-2">
                Phone:{" "}
                <a
                    href={`https://wa.me/${whatsappNumber}`}
                    className="hover:underline"
                >
                  {whatsappNumber}
                </a>
              </p>
              <div className="flex space-x-6 mt-4">
                {[
                  { src: "https://img.icons8.com/ios-filled/30/ffffff/facebook.png", alt: "Facebook" },
                  { src: "https://img.icons8.com/ios-filled/30/ffffff/github.png", alt: "GitHub" },
                  { src: "https://img.icons8.com/ios-filled/30/ffffff/instagram-new.png", alt: "Instagram" },
                  { src: "https://img.icons8.com/ios-filled/30/ffffff/linkedin.png", alt: "LinkedIn" },
                ].map(({ src, alt }) => (
                    <a key={alt} href="#" target="_blank" rel="noreferrer">
                      <img src={src} alt={alt} />
                    </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-blue-700 pt-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Accomate. All Rights Reserved.</p>
            <p>Designed with ❤ by the Accomate Team</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
