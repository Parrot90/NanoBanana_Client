import { redirect } from "next/navigation"

export default function Home() {
  redirect("/starter")
  return null
}
