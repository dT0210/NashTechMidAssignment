import CartOverlay from "../components/CartOverlay";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useAuthContext } from "../contexts/AuthContext";
import CartProvider from "../contexts/CartContext";
import SuperUserRoutes from "../routes/SuperUserRoutes";
import UserRoutes from "../routes/UserRoutes";

const Layout = () => {
  window.addEventListener("scroll", function () {
    var navBar = this.document.querySelector("nav");
    if (this.window.scrollY > 0) {
      navBar.classList.add("!bg-[#d6001c]");
      navBar.classList.add("text-white");
    } else {
      navBar.classList.remove("!bg-[#d6001c]");
      navBar.classList.remove("text-white");
    }
  });

  const { user } = useAuthContext();
  return (
    <div className="h-full">
      <CartProvider>
        <Nav />

        {user.role === "Super" ? (
          <SuperUserRoutes />
        ) : (
          <div className="min-h-full">
            <UserRoutes />
            <CartOverlay />
          </div>
        )}
      </CartProvider>
      <Footer />
    </div>
  );
};

export default Layout;
