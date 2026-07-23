import React from "react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white text-slate-800 pt-16">
            <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
                <div className="mb-10 border-b border-slate-200 pb-8">
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
                    This Kazi Agency
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    Privacy Policy
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                    This policy explains what we collect, how we use it, and the
                    choices you have when you interact with our website and services.
                    </p>
                    <p className="mt-6 inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                    Effective date: June 1, 2026
                    </p>
                </div>

                <div className="space-y-10 text-slate-700">
                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">1. Information We Collect</h2>
                        <h3 className="text-lg font-medium text-slate-800">1.1 Information You Provide</h3>
                        <p className="leading-7 text-slate-600">
                        We may collect information you provide directly when you contact
                        us, sign up for newsletters, apply for a job, submit forms, or
                        otherwise interact with our site. This may include your name,
                        email address, phone number, company name, job application
                        materials, and any other content you choose to provide.
                    </p>

                        <h3 className="text-lg font-medium text-slate-800">1.2 Automated Information</h3>
                        <p className="leading-7 text-slate-600">
                        We automatically collect certain information about your device
                        and usage of our site, including IP address, browser type,
                        operating system, referring URLs, pages visited, and the
                        dates/times of those visits. We may use cookies and similar
                        technologies to collect this information.
                        </p>
                </section>

                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">2. How We Use Your Information</h2>
                        <p className="leading-7 text-slate-600">We use the information we collect to:</p>
                        <ul className="space-y-3 pl-6 text-slate-600">
                        <li className="list-disc">Provide, maintain, and improve our services and website.</li>
                        <li className="list-disc">Communicate with you and respond to inquiries.</li>
                        <li className="list-disc">Process job applications and employment-related communications.</li>
                        <li className="list-disc">Send marketing communications when you have consented to receive them.</li>
                        <li className="list-disc">Comply with legal obligations and protect our rights.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">3. Cookies and Tracking</h2>
                        <p className="leading-7 text-slate-600">
                        We use cookies and similar tracking technologies to personalize
                        content, remember your preferences, and analyze site traffic.
                        Most browsers allow you to control cookies through their
                        settings. Disabling cookies may affect the functionality of the
                        site.
                    </p>
                </section>

                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">4. Third-Party Services</h2>
                        <p className="leading-7 text-slate-600">
                        We may share information with third-party service providers who
                        perform services on our behalf such as hosting, analytics, and
                        email delivery. These providers are contractually obligated to
                        protect your information and may only use it as directed by us.
                    </p>
                </section>

                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">5. Data Security</h2>
                        <p className="leading-7 text-slate-600">
                        We implement reasonable administrative, technical, and physical
                        safeguards designed to protect your personal information.
                        However, no method of transmission or storage is 100% secure,
                        and we cannot guarantee absolute security.
                    </p>
                </section>

                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">6. Data Retention</h2>
                        <p className="leading-7 text-slate-600">
                        We retain personal information for as long as necessary to
                        fulfill the purposes described in this Privacy Policy, unless a
                        longer retention period is required or permitted by law.
                    </p>
                </section>

                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">7. Your Rights</h2>
                        <p className="leading-7 text-slate-600">
                        Depending on your jurisdiction, you may have rights regarding
                        your personal information, including the right to access,
                        correct, delete, or restrict processing. To exercise these
                        rights or to object to processing, please contact us using the
                        details below.
                    </p>
                </section>

                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">8. Children's Privacy</h2>
                        <p className="leading-7 text-slate-600">
                        Our website is not directed to children under 16. We do not
                        knowingly collect personal information from children under this
                        age. If you believe we have collected such information, contact
                        us and we will take steps to delete it.
                    </p>
                </section>

                <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-900">9. Changes to This Policy</h2>
                        <p className="leading-7 text-slate-600">
                        We may update this Privacy Policy from time to time. We will
                        post the updated policy on this page with a revised effective
                        date.
                    </p>
                </section>

                <section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h2 className="text-2xl font-semibold text-slate-900">10. Contact Us</h2>
                    <p className="leading-7 text-slate-600">
                        For questions or requests regarding this Privacy Policy or your
                        data, contact:
                    </p>
                    <div className="space-y-1 text-slate-700">
                        <p className="font-medium text-slate-900">This Kazi Agency</p>
                        <p>Email: admin@kaziagency.com</p>
                    </div>
                </section>

                <p className="border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">
                    By using our website, you agree to the terms of this Privacy
                    Policy.
                </p>
                </div>
            </div>
        </main>
    );
}
