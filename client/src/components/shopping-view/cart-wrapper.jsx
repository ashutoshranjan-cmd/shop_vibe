import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems = [], setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount = cartItems.reduce(
    (sum, currentItem) =>
      sum +
      (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) *
      currentItem?.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
    setOpenCartSheet(false);
  };

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full">
      <SheetHeader className="border-b pb-4">
        <SheetTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-6">
        <AnimatePresence mode="popLayout">
          {cartItems.length > 0 ? (
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {cartItems.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <UserCartItemsContent cartItem={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-4 text-gray-500"
            >
              <ShoppingCart className="w-16 h-16 text-gray-300" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <Button
                variant="outline"
                onClick={() => setOpenCartSheet(false)}
                className="mt-2"
              >
                Continue Shopping
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {cartItems.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-t pt-4 mt-auto"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${totalCartAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <motion.span
                  key={totalCartAmount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  ${totalCartAmount.toFixed(2)}
                </motion.span>
              </div>
            </div>
            
            <Button
              onClick={handleCheckout}
              className="w-full h-12 text-base font-medium"
            >
              Checkout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;