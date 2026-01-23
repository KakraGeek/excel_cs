/**
 * Admin Layout Component
 * 
 * This layout is simplified to avoid Edge runtime issues.
 * Authentication is handled by proxy.ts (formerly middleware.ts).
 * Individual pages can add their own sidebar/nav if needed.
 * 
 * Story: 6.2 - Admin Dashboard
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Just render children - proxy.ts handles auth
  return <>{children}</>
}
