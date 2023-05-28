import { RecoilRoot } from "recoil";
import { AppRoutes } from "./routes/AppRoutes";
import { Suspense } from "react";
import Navbar from "./components/NavBar/Navbar";

function App() {
  return (
    
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
