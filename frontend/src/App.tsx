import FileUploader from "./components/FileUploader";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <FileUploader />
      </div>
    </QueryClientProvider>
  );
}

export default App;
