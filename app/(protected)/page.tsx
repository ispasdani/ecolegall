// app/(protected)/page.tsx
import { redirect } from "next/navigation";

export default function ProtectedIndexPage() {
  redirect("/(protected)/en");
}
