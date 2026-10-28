import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Game from '@/components/Game';
export default function Page() {
  return (
    <>
      <Header subtitle="Simulador Educacional de Golpes" current="jogo" />
      <Game />
      <Footer />
    </>
  );
}
