import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const getCurrentProduct = () => {
    const index = productList.findIndex(
      (product) => product._id === cartItem?.productId
    );
    return index > -1 ? productList[index] : null;
  };

  const handleUpdateQuantity = async (typeOfAction) => {
    if (typeOfAction === "plus") {
      const currentProduct = getCurrentProduct();
      if (currentProduct && cartItem.quantity + 1 > currentProduct.totalStock) {
        toast({
          title: `Maximum available quantity: ${currentProduct.totalStock}`,
          description: "Cannot add more items than available stock",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const result = await dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: cartItem?.productId,
          quantity: typeOfAction === "plus" 
            ? cartItem?.quantity + 1 
            : cartItem?.quantity - 1,
        })
      );

      if (result?.payload?.success) {
        toast({
          title: "Cart updated",
          description: `Item quantity ${typeOfAction === "plus" ? "increased" : "decreased"}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error updating cart",
        variant: "destructive",
      });
    }
  };

  const handleCartItemDelete = async () => {
    try {
      const result = await dispatch(
        deleteCartItem({ 
          userId: user?.id, 
          productId: cartItem?.productId 
        })
      );

      if (result?.payload?.success) {
        toast({
          title: "Item removed",
          description: "Successfully removed from cart",
        });
      }
    } catch (error) {
      toast({
        title: "Error removing item",
        variant: "destructive",
      });
    }
  };

  const price = cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price;
  const totalPrice = (price * cartItem?.quantity).toFixed(2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100"
      >
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
        {cartItem?.salePrice > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl">
            SALE
          </div>
        )}
      </motion.div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg truncate">{cartItem?.title}</h3>
        <div className="mt-2 flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-200 hover:bg-gray-100"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity("minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>

          <motion.span
            key={cartItem?.quantity}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="font-semibold min-w-[2ch] text-center"
          >
            {cartItem?.quantity}
          </motion.span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-200 hover:bg-gray-100"
            onClick={() => handleUpdateQuantity("plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <motion.p 
          key={totalPrice}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="font-bold text-lg"
        >
          ${totalPrice}
        </motion.p>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"
          onClick={handleCartItemDelete}
        >
          <Trash className="w-4 h-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </motion.div>
  );
}

export default UserCartItemsContent;