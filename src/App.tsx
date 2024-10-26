import "./App.css";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Kiosk</h1>
    </ThemeProvider>
  );
}

export default App;
