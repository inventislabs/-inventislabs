import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

const Section = ({ title, icon: Icon, children }) => (
  <div className="policy-section mb-12">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <Icon size={20} />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h2>
    </div>
    <div className="pl-0 md:pl-13 text-gray-600 dark:text-gray-400 leading-relaxed text-lg space-y-4">
      {children}
    </div>
  </div>
);

const LegalPolicy = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".policy-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".policy-section", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-black transition-colors duration-500 font-display pt-32 pb-24"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="policy-header text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wide mb-6">
            <ShieldCheck className="w-3 h-3" />
            <span>Legal & Compliance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We are committed to protecting your personal data and ensuring
            transparency in how we handle your information.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Last Updated: December 24, 2024
          </p>
        </div>

        <div className="policy-content">
          <Section title="Information We Collect" icon={Eye}>
            <p>
              We collect information that you voluntarily provide to us when you
              express an interest in obtaining information about us or our
              products and services, when you participate in activities on the
              Services, or otherwise when you contact us.
            </p>
            <p>
              The personal information that we collect depends on the context of
              your interactions with us and the Services, the choices you make,
              and the products and features you use.
            </p>
          </Section>

          <Section title="How We Use Your Information" icon={FileText}>
            <p>
              We process your information for purposes based on legitimate
              business interests, the fulfillment of our contract with you,
              compliance with our legal obligations, and/or your consent.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>To send administrative information to you.</li>
              <li>To protect our Services.</li>
              <li>To enforce our terms, conditions, and policies.</li>
              <li>To respond to legal requests and prevent harm.</li>
            </ul>
          </Section>

          <Section title="Data Security" icon={Lock}>
            <p>
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission
              over the Internet or information storage technology can be
              guaranteed to be 100% secure.
            </p>
          </Section>

          <Section title="Contact Us" icon={ShieldCheck}>
            <p>
              If you have questions or comments about this policy, you may email
              us at{" "}
              <a
                href="mailto:support@inventislabs.com"
                className="text-blue-600 hover:underline"
              >
                support@inventislabs.com
              </a>{" "}
              or by post to:
            </p>
            <address className="not-italic mt-4 text-gray-500 dark:text-gray-500">
              InventisLabs Pvt. Ltd.
              <br />
              A- 44 Vasundhara, Chinhat Lucknow- 226028
            </address>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default LegalPolicy;
