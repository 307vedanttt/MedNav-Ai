import AuthGuard from "@/components/AuthGuard";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="animate-fadeIn">
        {children}
      </div>
    </AuthGuard>
  );
}
