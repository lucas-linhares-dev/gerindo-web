import { RecoilRoot } from "recoil";
import { AppRoutes } from "./routes/AppRoutes";
import { Suspense } from "react";

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
