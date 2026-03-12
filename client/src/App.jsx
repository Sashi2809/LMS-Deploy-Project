import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import AiBoard from "./pages/ai/AiBoard";
import CodeReview from "./pages/ai/aifeatures/CodeReview";
import InterviewSetup from "./pages/ai/aifeatures/interview/InterviewSetup";
import InterviewSession from "./pages/ai/aifeatures/interview/InterviewSession";
import InterviewResults from "./pages/ai/aifeatures/interview/InterviewResults";
// Add new AI Interview components
import axios from "axios";
import RoadmapGenerator from "./pages/ai/aifeatures/RoadmapGenerator";
import CodeEditor from "./pages/ai/aifeatures/CodeEditor";
import ContactUs from "./pages/student/ContactUs";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <ContactUs />
          </ProtectedRoute>
        ),
      },
      {
        path: "ai-features",
        element: (
          <ProtectedRoute>
            <AiBoard />
          </ProtectedRoute>
        ),
      },
      // AI Features Routes
      {
        path: "ai-features/ai-code-reviewer",
        element: (
          <ProtectedRoute>
            <CodeReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "ai-features/code",
        element: (
          <ProtectedRoute>
            <CodeEditor />
          </ProtectedRoute>
        ),
      },
      {
        path: "ai-features/roadmap",
        element: (
          <ProtectedRoute>
            <RoadmapGenerator />
          </ProtectedRoute>
        ),
      },
      {
        path: "ai-features/ai-interview",
        element: (
          <ProtectedRoute>
            <InterviewSetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "ai-features/interview/:sessionId",
        element: (
          <ProtectedRoute>
            <InterviewSession />
          </ProtectedRoute>
        ),
      },
      {
        path: "ai-features/interview/results/:id",
        element: (
          <ProtectedRoute>
            <InterviewResults />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // Admin routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;