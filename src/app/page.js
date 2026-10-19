import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WeddingExperiences from "@/components/WeddingExperiences";
import PitchComparison from "@/components/PitchComparison";
import PitchPackages from "@/components/PitchPackages";
import ScheduleForm from "@/components/ScheduleForm";
import InspirationGallery from "@/components/InspirationGallery";
import Testimonials from "@/components/Testimonials";
import EnquiryForm from "@/components/EnquiryForm";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ExitIntentModal from "@/components/ExitIntentModal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <WeddingExperiences />
        <PitchComparison />
        <PitchPackages />
        <ScheduleForm />
        <InspirationGallery />
        <Testimonials />
        <EnquiryForm />
        <NewsletterSection />
      </main>
      <Footer />
      <ExitIntentModal />
    </>
  );
}
