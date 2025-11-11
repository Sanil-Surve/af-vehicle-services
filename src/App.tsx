import { Navbar } from "./components/Navbar";
import Carousel from "./components/Carousel";
import VideoPlayer from "./components/Video";
import Accordion from "./components/Accourdian";
// import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";


function App() {

  const items = [
    { id: 1, title: 'What is Tailwind?', content: 'Tailwind CSS is a utility-first CSS framework...' },
    { id: 2, title: 'Why use TypeScript?', content: 'TypeScript adds types to JavaScript...' },
  ];

  return (
    <>
      {/* <BackgroundRippleEffect /> */}
      <Navbar />
      <Carousel />
      <VideoPlayer />
      <Accordion items={items} multiple={false} defaultOpen={0} />
    </>
  )
}


export default App



