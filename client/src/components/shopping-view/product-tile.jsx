import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingCart, Eye } from 'lucide-react';

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-sm mx-auto overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
            onClick={() => handleGetProductDetails(product?._id)}
          >
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
              >
                <Eye className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-3 left-3 bg-red-500/90 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-lg">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-3 left-3 bg-amber-500/90 hover:bg-amber-600 text-white px-3 py-1 rounded-full shadow-lg">
              Only {product?.totalStock} left
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-3 left-3 bg-green-500/90 hover:bg-green-600 text-white px-3 py-1 rounded-full shadow-lg">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 line-clamp-1">
              {product?.title}
            </h2>
            
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {categoryOptionsMap[product?.category]}
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {brandOptionsMap[product?.brand]}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`${
                  product?.salePrice > 0 
                    ? "text-gray-400 line-through text-base" 
                    : "text-xl font-bold text-primary"
                }`}>
                  ${product?.price}
                </span>
                {product?.salePrice > 0 && (
                  <span className="text-xl font-bold text-primary">
                    ${product?.salePrice}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <motion.div className="w-full" whileTap={{ scale: 0.98 }}>
            {product?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed bg-gray-200 dark:bg-gray-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                 Add to Cart
              </Button>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ShoppingProductTile;