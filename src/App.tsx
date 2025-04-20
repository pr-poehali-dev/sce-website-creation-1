import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

// Страницы
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Rules from "./pages/Rules";
import Terms from "./pages/Terms";
import ToS from "./pages/ToS";
import NotFound from "./pages/NotFound";

// Админ-страницы
import AdminDashboard from "./pages/admin/AdminDashboard";
import SCEObjectsAdmin from "./pages/admin/SCEObjectsAdmin";
import CreateSCEObject from "./pages/admin/CreateSCEObject";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Основные страницы */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/tos" element={<ToS />} />
              
              {/* Административные страницы */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/objects" element={<SCEObjectsAdmin />} />
              <Route path="/admin/objects/create" element={<CreateSCEObject />} />
              
              {/* Страница ошибки 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;