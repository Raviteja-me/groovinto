import AdminDashboard from '../../components/AdminDashboard';

export const metadata = {
  title: 'Admin - Registrations'
};

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminDashboard />
    </main>
  );
}
