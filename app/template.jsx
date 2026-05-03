import AuthGuard from "@/components/AuthGuard";
export default function Template({
  children
}) {
  return <AuthGuard>
      <div className="animate-fadeIn">
        {children}
      </div>
    </AuthGuard>;
}
