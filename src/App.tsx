import Footer from './components/Footer';
import GetInvolved from './components/GetInvolved';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Pitch from './components/Pitch';
import Showcase from './components/Showcase';
import Spokes from './components/Spokes';
import UseCases from './components/UseCases';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pitch />
        <Spokes />
        <UseCases />
        <Showcase />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
