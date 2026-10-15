import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import WeddingExperiences from "@/components/WeddingExperiences";
import PlanningServices from "@/components/PlanningServices";
import PlanningProcess from "@/components/PlanningProcess";
import InspirationGallery from "@/components/InspirationGallery";
import ConsultationCTA from "@/components/ConsultationCTA";
import EnquiryForm from "@/components/EnquiryForm";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Introduction />
        <WeddingExperiences />
        <PlanningServices />
        <PlanningProcess />
        <InspirationGallery />
        <ConsultationCTA />
        <EnquiryForm />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
