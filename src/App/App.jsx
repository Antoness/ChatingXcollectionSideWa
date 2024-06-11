import { QueryClient, QueryClientProvider } from "react-query";
import ChatApp from "../components/ChatApp/ChatApp";
import ChatAppContext from "../providers/ChatAppProvider/ChatAppProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatAppContext>
        <ChatApp />
      </ChatAppContext>
    </QueryClientProvider>
  );
};

export default App;
