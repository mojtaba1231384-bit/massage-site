// این فایل رو کنار app/admin/page.tsx بذار
// جلوگیری از prerender در build time رو میکنه

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}