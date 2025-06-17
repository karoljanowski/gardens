import Courses from "@/components/Courses/Courses";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";

const Home = async () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Courses />
      </main>
    </>
  );
}

export default Home;
