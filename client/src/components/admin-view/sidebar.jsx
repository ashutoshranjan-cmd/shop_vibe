
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  ChevronRight,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: BadgeCheck,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, staggerChildren: 0.1 }}
      className="mt-8 flex-col flex gap-2"
    >
      {adminSidebarMenuItems.map((menuItem, index) => {
        const Icon = menuItem.icon;
        const isActive = location.pathname === menuItem.path;

        return (
          <motion.div
            key={menuItem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => {
              navigate(menuItem.path);
              setOpen?.(false);
            }}
            className={`
              flex cursor-pointer items-center gap-2 rounded-md px-4 py-3
              transition-all duration-200 group
              ${isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
            <span className="text-base font-medium">{menuItem.label}</span>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-auto"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  const logoVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05 }
  };

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b p-6">
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <SheetTitle 
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex gap-3 items-center cursor-pointer"
                >
                  <ChartNoAxesCombined className="w-8 h-8 text-primary" />
                  <h1 className="text-2xl font-extrabold  ">
                    Admin Panel
                  </h1>
                </SheetTitle>
              </motion.div>
            </SheetHeader>
            <div className="px-4">
              <MenuItems setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-72 flex-col border-r bg-background lg:flex">
        <div className="p-6 border-b">
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-3"
          >
            <ChartNoAxesCombined className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-extrabold ">
              Admin Panel
            </h1>
          </motion.div>
        </div>
        <div className="px-4">
          <MenuItems />
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;