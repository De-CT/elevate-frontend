import { Contact, Empowerment, FAQ, FinalCTA, Footer, Header, Hero, HowItWorks, MissionVision, Programs, Purpose } from "@/components/landing-page";



export default function HomePage() {
  return (
    <main className="w-full flex items-center justify-center p-0">
      <div className="flex flex-col w-full">
        <Header />
        <Hero />
        <Purpose />
        <MissionVision />
        <Programs />
        <HowItWorks />
        <Empowerment />
        <FAQ />
        <Contact />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
