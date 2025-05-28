import Courses from "@/components/Courses/Courses";
import Hero from "@/components/Hero/Hero";
import { getSession, signIn, signOut, signUp } from "@/server/auth";

const Home = async () => {
  return (
    <div>
      <Hero />
      <Courses />
    </div>
  );
}

export default Home;
