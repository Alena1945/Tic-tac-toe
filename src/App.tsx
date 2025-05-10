import { TicTacToe } from "./components/TicTacToe.tsx";
import styles from './App.module.css'
function App() {
  return (
    <section className={styles.container}>
      <TicTacToe />
    </section>
  );
}

export default App;
