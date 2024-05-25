import SidebarDisenios from "@/components/disenios/SidebarDisenios";

export default function layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row items-center w-screen">
      <SidebarDisenios />
      <section className="md:px-10 md:flex-grow md:h-[85vh] overflow-y-auto antialiased">
        {children}
      </section>
    </div>
  );
}
