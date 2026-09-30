"use client"
import { listPackages } from "@/backend/user";
import { Contact, Empowerment, FAQ, FinalCTA, Footer, Header, Hero, HowItWorks, MissionVision, Programs, Purpose } from "@/components/landing-page";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import toast from "react-hot-toast";



export default function HomePage() {
  const { setActivePackages, activePackages } = useAppStore()
  const fetchPackages = async () => {
    try {
      const res = await listPackages()
      setActivePackages(res)
    } catch (e: any) {
      toast.error(e.message)
    }
  }
  useEffect(() => {
    fetchPackages()
  }, [])
  return (
    <main className="w-full flex items-center justify-center p-0">
      <div className="flex flex-col w-full">
        <Header />
        <Hero />
        <Purpose />
        <MissionVision />
        <Programs activePackages={activePackages} />
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
