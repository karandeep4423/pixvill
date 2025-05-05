import dynamic from "next/dynamic";
import { Metadata } from "next";

// Dynamically import client component with SSR disabled
const Contact = dynamic(() => import("@/components/contact-us/page"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Connect With Us for any query",
  description:
    "We value your thoughts and inquiries. Reach out to Photo Grid's dedicated team through our Contact Us page. ",
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;
