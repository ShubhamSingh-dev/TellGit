import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="-mt-20 min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 bg-bottom font-sans font-light text-black">
      <div id="app">
        <main id="main">
          <article>
            {/* Page Header */}
            <section className="mx-auto max-w-5xl px-4 pt-28 text-center sm:px-6 lg:px-0">
              <h1 className="mb-6 font-serif text-4xl font-light md:text-5xl">
                Terms of Service
              </h1>
              <p className="relative mx-auto max-w-2xl items-center font-serif text-xl font-light tracking-tighter text-[#4E5154]">
                Please review these Terms carefully before using RepoGPT.
              </p>
            </section>

            {/* Terms of Service Content with simple gradient */}
            <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <div className="rounded-xl bg-white p-8 shadow-md md:p-12">
                  <h2 className="mb-8 text-center font-serif text-2xl font-normal">
                    RepoGPT Terms of Service
                  </h2>

                  <div className="space-y-8">
                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        1. Introduction
                      </h3>
                      <p className="text-[#4E5154]">
                        Welcome to RepoGPT, a service provided by Soham Gupta,
                        the developer of this site. By accessing or using our
                        services you agree to comply with and be bound by these
                        Terms of Service ("Terms"). Please review these Terms
                        carefully before using the service.
                      </p>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        2. Services Provided
                      </h3>
                      <p className="text-[#4E5154]">
                        RepoGPT is a subscription-based service that creates
                        vector embeddings of repositories. It enables users to
                        ask questions based on repository context and provides
                        summarized meeting insights. There is no free
                        tier—access requires an active subscription.
                      </p>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        3. User Accounts
                      </h3>
                      <ul className="list-disc space-y-2 pl-6 text-[#4E5154]">
                        <li>
                          <span className="font-medium">Eligibility:</span>{" "}
                          Users must be at least 13 years old or have permission
                          from a parent or legal guardian.
                        </li>
                        <li>
                          <span className="font-medium">
                            Account Responsibility:
                          </span>{" "}
                          You are responsible for maintaining the
                          confidentiality of your account credentials and all
                          activities that occur under your account.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        4. Subscription and Payment
                      </h3>
                      <ul className="list-disc space-y-2 pl-6 text-[#4E5154]">
                        <li>
                          <span className="font-medium">Plans:</span> RepoGPT
                          offers monthly and annual subscription plans. By
                          subscribing you agree to pay the applicable fees for
                          your chosen plan.
                        </li>
                        <li>
                          <span className="font-medium">
                            Payment Processing:
                          </span>{" "}
                          All payments are processed through a secure
                          third-party gateway. You must provide accurate and
                          complete payment information.
                        </li>
                        <li>
                          <span className="font-medium">No Free Tier:</span>{" "}
                          RepoGPT does not offer a free tier. An active
                          subscription is required to access the service.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        5. Refund Policy
                      </h3>
                      <p className="text-[#4E5154]">
                        Due to the nature of digital services, all subscription
                        fees are non-refundable. Please review your plan
                        carefully before subscribing.
                      </p>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        6. User Conduct
                      </h3>
                      <p className="mb-2 text-[#4E5154]">
                        You agree to use RepoGPT only for lawful purposes and in
                        accordance with these Terms. You must not:
                      </p>
                      <ul className="list-disc space-y-2 pl-6 text-[#4E5154]">
                        <li>Violate any applicable laws or regulations</li>
                        <li>
                          Infringe on the intellectual property rights of others
                        </li>
                        <li>Transmit harmful or malicious code</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        7. Data Privacy and Private Repositories
                      </h3>
                      <ul className="list-disc space-y-2 pl-6 text-[#4E5154]">
                        <li>
                          <span className="font-medium">
                            Private Repository Access:
                          </span>{" "}
                          Since users provide access to their private
                          repositories, RepoGPT is not liable for any issues
                          arising from the sharing of private data.
                        </li>
                        <li>
                          <div className="font-medium">
                            Your Interaction with Other Users:
                          </div>
                          <p className="mt-1 rounded bg-slate-50 p-3 text-sm">
                            YOUR INTERACTION WITH OTHER USERS: WE EXPRESSLY
                            DISCLAIM ALL LIABILITY ARISING FROM YOUR
                            INTERACTIONS WITH OTHER USERS, OR FOR ANY USER'S
                            ACTION OR INACTION, INCLUDING RELATING TO USE OF
                            YOUR CONTENT. WE ARE NOT RESPONSIBLE FOR YOUR
                            CONTENT OR DATA OR THE WAY YOU OR YOUR AUTHORIZED
                            REPRESENTATIVES CHOOSE TO USE THE SERVICES TO STORE
                            OR PROCESS ANY OF YOUR DATA. YOU ARE RESPONSIBLE FOR
                            ENSURING COMPLIANCE WITH ALL LAWS IN ALL
                            JURISDICTIONS THAT MAY APPLY TO YOUR DATA PROVIDED
                            HEREUNDER, INCLUDING BUT NOT LIMITED TO ALL
                            APPLICABLE INTERNATIONAL, FEDERAL, STATE, PROVINCIAL
                            AND LOCAL LAWS, RULES AND REGULATIONS RELATING TO
                            DATA PRIVACY AND SECURITY. WE TAKE NO RESPONSIBILITY
                            AND ASSUME NO LIABILITY FOR ANY CONTENT THAT YOU OR
                            ANY OTHER USER OR THIRD PARTY POSTS, SENDS, OR
                            OTHERWISE MAKES AVAILABLE OVER OUR SERVICE. YOU
                            SHALL BE SOLELY RESPONSIBLE FOR YOUR CONTENT AND THE
                            CONSEQUENCES OF POSTING, PUBLISHING, SHARING, OR
                            OTHERWISE MAKING IT AVAILABLE ON OUR SERVICE.
                          </p>
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        8. Copyright and Content Ownership
                      </h3>
                      <p className="text-[#4E5154]">
                        We claim no intellectual property rights over the
                        material you provide to the Service. Your profile and
                        any materials uploaded remain your property. While we do
                        not pre-screen content, we reserve the right (but are
                        not obligated) in our sole discretion to remove any
                        content available via the Service.
                      </p>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        9. Disclaimers and Limitation of Liability
                      </h3>
                      <ul className="list-disc space-y-2 pl-6 text-[#4E5154]">
                        <li>
                          <span className="font-medium">
                            Service Availability:
                          </span>{" "}
                          RepoGPT is provided "as is" and "as available." We do
                          not warrant that the service will be uninterrupted or
                          error-free.
                        </li>
                        <li>
                          <span className="font-medium">
                            Limitation of Liability:
                          </span>{" "}
                          To the fullest extent permitted by law, RepoGPT shall
                          not be liable for any indirect, incidental, or
                          consequential damages arising from your use or
                          inability to use the service.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        10. Modifications to the Terms
                      </h3>
                      <p className="text-[#4E5154]">
                        RepoGPT reserves the right to modify these Terms at any
                        time. Significant changes will be communicated and your
                        continued use of the service constitutes acceptance of
                        the updated Terms.
                      </p>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        11. Governing Law
                      </h3>
                      <p className="text-[#4E5154]">
                        These Terms shall be governed by and construed in
                        accordance with the laws of India. Any disputes arising
                        under these Terms shall be subject to the exclusive
                        jurisdiction of the courts located in India.
                      </p>
                    </section>

                    <section>
                      <h3 className="mb-2 font-serif text-xl font-normal">
                        12. Contact Information
                      </h3>
                      <p className="text-[#4E5154]">
                        For any questions or concerns regarding these Terms,
                        please contact us at:
                        <br />
                        <Link
                          href="mailto:contact@sohamgupta.me"
                          className="text-[#4E5154] underline transition-colors hover:text-black"
                        >
                          contact@sohamgupta.me
                        </Link>
                      </p>
                    </section>

                    <p className="mt-8 text-sm text-[#4E5154] italic">
                      Last updated: March 12th 2025
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
