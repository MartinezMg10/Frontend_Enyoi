import { redirect } from "next/navigation";

export default function redirToLoginNoToken() {
  const accessToken = localStorage.getItem("jwt");

  if (!accessToken) {
    return redirect("/login");
  }
}
