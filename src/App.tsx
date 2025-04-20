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

// Страницы объектов
import ObjectsList from "./pages/objects/ObjectsList";
import ObjectDetail from "./pages/objects/ObjectDetail";

// Страницы новостей
import NewsList from "./pages/news/NewsList";
import NewsDetail from "./pages/news/NewsDetail";

// Профиль пользователя
import UserProfile from "./pages/profile/UserProfile";
import EditProfile from "./pages/profile/EditProfile";

// Админ-страницы
import AdminDashboard from "./pages/admin/AdminDashboard";
import SCEObjectsAdmin from "./pages/admin/SCEObjectsAdmin";
import CreateSCEObject from "./pages/admin/CreateSCEObject";
import NewsAdmin from "./pages/admin/NewsAdmin";
import CreateNews from "./pages/admin/CreateNews";
import ReportsAdmin from "./pages/admin/ReportsAdmin";
import CreateReport from "./pages/admin/CreateReport";
import UsersAdmin from "./pages/admin/UsersAdmin";
import PositionsAdmin from "./pages/admin/PositionsAdmin";
import RegistrationsAdmin from "./pages/admin/RegistrationsAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <AuthProvider>
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
              
              {/* Страницы объектов */}
              <Route path="/objects" element={<ObjectsList />} />
              <Route path="/objects/:id" element={<ObjectDetail />} />
              
              {/* Страницы новостей */}
              <Route path="/news" element={<NewsList />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              
              {/* Профиль пользователя */}
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/profile/edit/:userId" element={<EditProfile />} />
              
              {/* Административные страницы */}
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Управление SCE объектами */}
              <Route path="/admin/objects" element={<SCEObjectsAdmin />} />
              <Route path="/admin/objects/create" element={<CreateSCEObject />} />
              <Route path="/admin/objects/edit/:id" element={<CreateSCEObject />} />
              
              {/* Управление новостями */}
              <Route path="/admin/news" element={<NewsAdmin />} />
              <Route path="/admin/news/create" element={<CreateNews />} />
              <Route path="/admin/news/edit/:id" element={<CreateNews />} />
              
              {/* Управление отчетами */}
              <Route path="/admin/reports" element={<ReportsAdmin />} />
              <Route path="/admin/reports/create" element={<CreateReport />} />
              <Route path="/admin/reports/edit/:id" element={<CreateReport />} />
              
              {/* Управление пользователями */}
              <Route path="/admin/users" element={<UsersAdmin />} />
              <Route path="/admin/registrations" element={<RegistrationsAdmin />} />
              
              {/* Управление должностями */}
              <Route path="/admin/positions" element={<PositionsAdmin />} />
              
              {/* Страница ошибки 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;