import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col">
      <Header />
      <div className="flex-1 overflow-hidden flex flex-col">
        <Hero />
        <Features />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
