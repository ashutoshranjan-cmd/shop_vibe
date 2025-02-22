import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Pencil, Trash2, Tag } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5 }
  };

  const imageVariants = {
    hover: { scale: 1.05 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-sm mx-auto overflow-hidden bg-white">
        <div className="group">
          <div className="relative overflow-hidden">
            <motion.div
              variants={imageVariants}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-[300px] object-cover"
              />
              {product?.salePrice > 0 && (
                <div className="absolute top-4 right-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                  >
                    <Tag className="w-4 h-4" />
                    <span className="font-medium">Sale</span>
                  </motion.div>
                </div>
              )}
            </motion.div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <CardContent className="pt-4">
            <h2 className="text-xl font-bold mb-3 truncate">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col">
                <span
                  className={`${
                    product?.salePrice > 0 ? "text-gray-400 line-through text-sm" : "text-primary text-lg"
                  } font-semibold`}
                >
                  ${product?.price.toLocaleString()}
                </span>
                {product?.salePrice > 0 && (
                  <span className="text-lg font-bold text-primary">
                    ${product?.salePrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center gap-2">
            <Button
              className="flex-1 bg-black hover:bg-green-500"
              onClick={() => {
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
              }}
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
            
              className="flex-1  bg-red-600 hover:bg-green-500"
              onClick={() => handleDelete(product?._id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

export default AdminProductTile;