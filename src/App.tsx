import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllNewsContents } from "./components";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AllNewsContents />
    </QueryClientProvider>
  );
}

export default App;
