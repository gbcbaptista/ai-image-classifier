import { FileUpload } from "./components/FileUpload";
import { Results } from "./components/Results";
import { History } from "./components/History";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              🖼️ AI Image Classifier
            </h1>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <FileUpload />
            <div className="lg:hidden">
              <Results />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="hidden lg:block">
              <Results />
            </div>
            <History />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
