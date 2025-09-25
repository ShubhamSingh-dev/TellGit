import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
