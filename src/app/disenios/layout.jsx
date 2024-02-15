import SidebarDisenios from "@/components/disenios/SidebarDisenios";

export default function layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start w-screen">
      <SidebarDisenios />
      <section className="px-5 md:px-10 flex-grow h-[85vh] overflow-y-auto antialiased">
        {children}
      </section>
    </div>
  );
}
