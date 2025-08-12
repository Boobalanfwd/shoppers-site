import { AdminSidebar } from "@/components/admin/admin-sidebar";
import QueryProvider from "@/lib/providers/QueryProvider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Admin Dashboard - E-commerce",
  description: "Admin dashboard for e-commerce management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
          <Toaster 
            position="top-right"
            richColors
            closeButton
            duration={4000}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
