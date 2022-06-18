import { Outlet } from "@remix-run/react";
import Navbar from "~/components/NavBar";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <Navbar />
      <Outlet />
    </div>
  );
}
