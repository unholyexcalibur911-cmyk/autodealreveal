"use client";

import { motion, AnimatePresence } from "framer-motion";
interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-60 px-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-[#2b2d42] w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-lg shadow-xl border-b-2 border-[#7777aa] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl sm:text-3xl text-gray-300">
                    Privacy Policy
                  </h1>
                  <button
                    onClick={onClose}
                    className="text-gray-300 hover:text-white text-xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-gray-300 text-sm sm:text-base leading-6 space-y-4">
                  <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      1. Introduction
                    </h2>
                    <p>
                      Welcome! Your privacy is important to us. This Privacy
                      Policy explains how we collect, use, disclose, and
                      safeguard your information when you visit our website.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      2. Information We Collect
                    </h2>
                    <p>
                      <strong>Personal Information:</strong> When you register,
                      make a purchase, or contact us, we may collect personal
                      information such as your name, email address, phone
                      number, and billing information.
                    </p>
                    <p>
                      <strong>Usage Data:</strong> We may collect information
                      about your device, browser, and how you interact with our
                      website (e.g., pages viewed, links clicked).
                    </p>
                  </section>
                  <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      3. How We Use Your Information
                    </h2>
                    <p>We use the collected data to:</p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Provide and manage our services</li>
                      <li>Improve your user experience</li>
                      <li>
                        Send you updates, promotional materials, or important
                        information
                      </li>
                      <li>
                        Monitor and analyze usage to improve site functionality
                        and security
                      </li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      4. Information Sharing
                    </h2>
                    <p>
                      We do not sell, rent, or share your personal information
                      with third-party companies for their marketing purposes.
                    </p>
                    <p>
                      However, we may share your information in the following
                      situations:
                    </p>
                    <ul className="list-disc list-inside ml-4">
                      <li>
                        <strong>Service Providers:</strong> We may share
                        non-personal or aggregated data with third-party vendors
                        who assist us in providing services, but they are bound
                        by confidentiality agreements and are only authorized to
                        use the information for the specified purposes.
                      </li>
                      <li>
                        <strong>Compliance:</strong> We may share information if
                        required by law or to comply with legal processes or
                        requests by government entities.
                      </li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      5. Security of Your Information
                    </h2>
                    <p>
                      We use administrative, technical, and physical security
                      measures to protect your personal information. However,
                      please remember that no data transmission over the
                      Internet is 100% secure.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      6. Your Privacy Rights
                    </h2>
                    <p>
                      Depending on your location, you may have certain rights
                      regarding your personal information, such as access,
                      correction, deletion, and portability. Contact us to make
                      a request.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      7. Policy Updates
                    </h2>
                    <p>
                      We may update this Privacy Policy occasionally. Updates
                      will be posted on this page with a revised date.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      Contact Us
                    </h2>
                    <p>
                      If you have questions or concerns about this Privacy
                      Policy, please contact us.
                    </p>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrivacyPolicyModal;
