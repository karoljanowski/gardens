import Courses from "@/components/Courses/Courses";
import Header from "@/components/Header/Header";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";

const Home = async () => {
  return (
    <>
      <Header isHome={true} />
      <main>
        <Hero />
        <About />
        <Courses />
      </main>
    </>
  );
}

export default Home;
