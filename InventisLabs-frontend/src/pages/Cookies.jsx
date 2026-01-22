import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldCheck, Lock, Eye, FileText, Globe } from "lucide-react";

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

const Cookies = () => {
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
        <div className="policy-header text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wide mb-6">
            <Globe className="w-3 h-3" />
            <span>Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            This Cookie Policy explains how Inventis Labs uses cookies and
            similar technologies to recognize you when you visit our website.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Last Updated: December 24, 2024
          </p>
        </div>

        <div className="policy-content">
          <Section title="What are cookies?" icon={Eye}>
            <p>
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners in order to make their websites work, or to work
              more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, Inventis Labs) are
              called "first-party cookies." Cookies set by parties other than
              the website owner are called "third-party cookies." Third-party
              cookies enable third-party features or functionality to be
              provided on or through the website (e.g., advertising, interactive
              content, and analytics).
            </p>
          </Section>

          <Section title="Why do we use cookies?" icon={FileText}>
            <p>
              We use first- and third-party cookies for several reasons. Some
              cookies are required for technical reasons in order for our
              Website to operate, and we refer to these as "essential" or
              "strictly necessary" cookies. Other cookies also enable us to
              track and target the interests of our users to enhance the
              experience on our Online Properties. Third parties serve cookies
              through our Website for advertising, analytics, and other
              purposes.
            </p>
          </Section>

          <Section title="How can I control cookies?" icon={Lock}>
            <p>
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie rights by setting your preferences in
              the Cookie Consent Manager. The Cookie Consent Manager allows you
              to select which categories of cookies you accept or reject.
              Essential cookies cannot be rejected as they are strictly
              necessary to provide you with services.
            </p>
            <p>
              The Cookie Consent Manager can be found in the notification banner
              and on our website. If you choose to reject cookies, you may still
              use our website though your access to some functionality and areas
              of our website may be restricted.
            </p>
          </Section>

          <Section title="Updates to this policy" icon={ShieldCheck}>
            <p>
              We may update this Cookie Policy from time to time in order to
              reflect, for example, changes to the cookies we use or for other
              operational, legal, or regulatory reasons. Please therefore
              re-visit this Cookie Policy regularly to stay informed about our
              use of cookies and related technologies.
            </p>
          </Section>

          <Section title="Contact Us" icon={ShieldCheck}>
            <p>
              If you have any questions about our use of cookies or other
              technologies, please email us at{" "}
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

export default Cookies;
