import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel";

export default function AdminPage() {
  const cookieStore = cookies();
  const auth = cookieStore.get("admin_auth");

  if (auth?.value !== "ok") {
    return <LoginScreen />;
  }

  return <AdminPanel />;
}

function LoginScreen() {
  async function login(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    if (password === process.env.ADMIN_PASSWORD) {
      const cookieStore = cookies();
      cookieStore.set("admin_auth", "ok", {
        httpOnly: true,
        path: "/admin",
        maxAge: 60 * 60 * 8, // 8 horas
      });
      redirect("/admin");
    } else {
      redirect("/admin?error=1");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <p className="font-script text-5xl text-olive mb-8">Panel de novios</p>
        <form action={login} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="w-full rounded-lg border border-olive/30 bg-transparent px-4 py-3 text-ink placeholder:text-olive-light focus:outline-none focus:border-olive text-center"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-olive px-8 py-3 text-cream transition hover:bg-olive-light"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}
