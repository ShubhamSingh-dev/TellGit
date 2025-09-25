import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="text-black font-sans font-light overflow-hidden bg-bottom bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 -mt-20 min-h-screen">
      <div id="app">
        <main id="main">
          <article>
            {/* Page Header */}
            <section className="text-center max-w-5xl mx-auto pt-28 px-4 sm:px-6 lg:px-0">
              <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl font-serif font-light tracking-tighter text-[#4E5154] items-center max-w-2xl mx-auto relative">
                How we collect, use and protect your information at RepoGPT.
              </p>
            </section>

            {/* Privacy Policy Content */}
            <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-md p-8 md:p-12 rounded-xl">
                  <h2 className="text-2xl font-serif font-normal mb-8 text-center">
                    RepoGPT Privacy Policy
                  </h2>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        1. Introduction
                      </h3>
                      <p className="text-[#4E5154]">
                        At RepoGPT we respect your privacy and are committed to
                        protecting your personal information. This Privacy
                        Policy explains what information we collect, how we use
                        it and your rights regarding your data when you use our
                        subscription-based service. Your continued use of our
                        website will be regarded as acceptance of our practices
                        around privacy and personal information. If you have any
                        questions about how we handle user data and personal
                        information, feel free to contact us.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        2. Information We Collect
                      </h3>
                      <ul className="list-disc pl-6 text-[#4E5154] space-y-2">
                        <li>
                          <span className="font-medium">
                            Personal Information:
                          </span>{" "}
                          When you subscribe to RepoGPT, we collect information
                          such as your name, email address and billing details.
                          You can sign up with your Google or GitHub account,
                          allowing us to prefill your username, email and public
                          profile picture.
                        </li>
                        <li>
                          <span className="font-medium">Usage Data:</span> We
                          automatically collect data related to your
                          interactions with our service including log files, IP
                          address, browser type, device information and
                          operating system details.
                        </li>
                        <li>
                          <span className="font-medium">Repository Data:</span>{" "}
                          RepoGPT processes data from repositories you
                          authorize, including private repositories. You are
                          solely responsible for managing access and ensuring
                          the security of your repository data.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        3. How We Use Your Information
                      </h3>
                      <ul className="list-disc pl-6 text-[#4E5154] space-y-2">
                        <li>To provide and improve our service</li>
                        <li>
                          To manage your subscription and process payments
                          through secure third-party providers
                        </li>
                        <li>
                          To communicate with you regarding account updates and
                          service information
                        </li>
                        <li>
                          To monitor usage and ensure the security of our
                          platform
                        </li>
                        <li>To comply with legal obligations</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        4. Information Sharing and Disclosure
                      </h3>
                      <ul className="list-disc pl-6 text-[#4E5154] space-y-2">
                        <li>We do not sell or rent your personal data.</li>
                        <li>
                          We may share your information with trusted third-party
                          service providers to help operate our service and
                          process payments.
                        </li>
                        <li>
                          We may disclose your information if required by law or
                          to protect our rights and the safety of our users.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        5. Data Security
                      </h3>
                      <p className="text-[#4E5154]">
                        RepoGPT implements reasonable administrative, technical,
                        and physical safeguards to protect your information.
                        However, no transmission method or storage system is
                        completely secure and we cannot guarantee absolute
                        security.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        6. Data Retention
                      </h3>
                      <p className="text-[#4E5154]">
                        We retain your personal information only as long as
                        necessary to fulfill the purposes described in this
                        Privacy Policy or as required by applicable laws.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        7. Use of Cookies and Similar Technologies
                      </h3>
                      <p className="text-[#4E5154]">
                        RepoGPT uses cookies and similar tracking technologies
                        to enhance your user experience, analyze usage and
                        support marketing efforts. You may control cookie usage
                        through your browser settings.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        8. Links to External Sites
                      </h3>
                      <p className="text-[#4E5154]">
                        Our website may link to external sites that are not
                        operated by us. Please be aware that we have no control
                        over the content and practices of these sites and cannot
                        accept responsibility or liability for their respective
                        privacy policies.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        9. Repository Data and Private Repositories
                      </h3>
                      <p className="text-[#4E5154]">
                        Since you may provide access to private repositories,
                        RepoGPT is not liable for any issues arising from the
                        sharing of private data. You are solely responsible for
                        managing access and ensuring compliance with applicable
                        data privacy laws regarding your repository information.
                      </p>
                      <div className="mt-2">
                        <div className="font-medium text-[#4E5154]">
                          Private Repository Data Protection:
                        </div>
                        <p className="mt-1 text-sm bg-slate-50 p-3 rounded">
                          YOUR REPOSITORY DATA: WE IMPLEMENT REASONABLE SECURITY
                          MEASURES TO PROTECT YOUR REPOSITORY DATA, BUT WE
                          CANNOT GUARANTEE COMPLETE SECURITY. YOU ARE
                          RESPONSIBLE FOR ENSURING THAT THE REPOSITORIES YOU
                          PROVIDE ACCESS TO DO NOT CONTAIN SENSITIVE PERSONAL
                          INFORMATION OR DATA THAT WOULD VIOLATE ANY APPLICABLE
                          LAWS OR REGULATIONS. WE DO NOT MONITOR THE CONTENT OF
                          YOUR REPOSITORIES AND ASSUME NO LIABILITY FOR ANY
                          INFORMATION THAT MAY BE PROCESSED THROUGH OUR SERVICE.
                          YOU SHALL BE SOLELY RESPONSIBLE FOR YOUR REPOSITORY
                          DATA AND THE CONSEQUENCES OF PROVIDING US ACCESS TO
                          IT.
                        </p>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        10. International Data Transfers
                      </h3>
                      <p className="text-[#4E5154]">
                        Your information may be transferred to and maintained on
                        servers located outside your jurisdiction. We take
                        appropriate measures to ensure that your data is
                        protected in accordance with this Privacy Policy.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        11. Your Rights
                      </h3>
                      <p className="text-[#4E5154]">
                        Depending on your jurisdiction, you may have rights to
                        access, correct, or delete your personal information. To
                        exercise these rights, please contact us using the
                        details provided below.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        12. Changes to This Privacy Policy
                      </h3>
                      <p className="text-[#4E5154]">
                        RepoGPT reserves the right to update or modify this
                        Privacy Policy at any time. Significant changes will be
                        communicated by updating the "Last Updated" date at the
                        bottom of this page. Your continued use of the service
                        constitutes acceptance of the revised Privacy Policy.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif font-normal mb-2">
                        13. Contact Information
                      </h3>
                      <p className="text-[#4E5154]">
                        If you have any questions or concerns about this Privacy
                        Policy, please contact us at:
                        <br />
                        <Link
                          href="mailto:contact@sohamgupta.me"
                          className="text-[#4E5154] underline hover:text-black transition-colors"
                        >
                          contact@sohamgupta.me
                        </Link>
                      </p>
                    </section>

                    <p className="text-sm text-[#4E5154] italic mt-8">
                      Last updated: March 12th, 2025
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}
