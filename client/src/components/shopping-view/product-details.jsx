import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
          className: "bg-green-50 border-green-200",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
          className: "bg-green-50 border-green-200",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-0 sm:p-6 max-w-[95vw] sm:max-w-[85vw] lg:max-w-[75vw] bg-white dark:bg-gray-900 rounded-xl">
        <motion.div 
          className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition-transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>

        <motion.div 
          className="p-6"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeIn}>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {productDetails?.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-5 mt-4">
              {productDetails?.description}
            </p>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
          >
            <p className={`text-3xl font-bold ${productDetails?.salePrice > 0 ? "line-through text-gray-400" : "text-primary"}`}>
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-green-600">
                ${productDetails?.salePrice}
              </p>
            )}
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="flex items-center gap-2 mt-4"
          >
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="mt-6"
          >
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed bg-gray-200">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-primary hover:bg-primary/90 transition-all"
                onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
              >
                Add to Cart
              </Button>
            )}
          </motion.div>

          <Separator className="my-6" />

          <motion.div 
            variants={fadeIn}
            className="max-h-[400px] overflow-auto custom-scrollbar"
          >
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <motion.div 
              className="grid gap-6"
              variants={stagger}
            >
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.h1 
                  variants={fadeIn}
                  className="text-center text-muted-foreground"
                >
                  No Reviews Yet
                </motion.h1>
              )}
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="mt-10 flex-col flex gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <Label className="text-lg font-semibold">Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Share your thoughts..."
                className="bg-white dark:bg-gray-900"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="bg-primary hover:bg-primary/90 transition-all"
              >
                Submit Review
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;