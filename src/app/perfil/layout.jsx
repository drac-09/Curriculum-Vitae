import Sidebar from "@/components/Sidebar";

export default function layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <section className="px-10">{children}</section>
    </div>
  );
}
