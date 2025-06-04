import Courses from "@/components/Courses/Courses";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import { getSession, signIn, signOut, signUp } from "@/server/auth";

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
