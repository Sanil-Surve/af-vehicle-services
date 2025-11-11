import { Navbar } from "./components/Navbar";
import Carousel from "./components/Carousel";
import VideoPlayer from "./components/Video";
import { FaqAccordion } from "./components/Accourdian";
import Footer from "./components/Footer";
// import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";


const faqItems = [
  {
    id: "1",
    question: "What models are currently available in Af Vehicle Services?",
    answer:
      "AF Vehicle Services offers a range of bikes and Scooters on rents different commuting needs.",
  },
  {
    id: "2",
    question: "What models are currently available in Af Vehicle Services?",
    answer:
      "AF Vehicle Services offers a range of bikes and Scooters on rents different commuting needs.",
  },
  {
    id: "3",
    question:
      "What models are currently available in Af Vehicle Services?",
    answer:
      "AF Vehicle Services offers a range of bikes and Scooters on rents different commuting needs.",
  },
];



function App() {

  return (
    <>
      {/* <BackgroundRippleEffect /> */}
      <Navbar />
      <Carousel />
      <VideoPlayer />
      <FaqAccordion items={faqItems} />
      <Footer />
    </>
  )
}


export default App



