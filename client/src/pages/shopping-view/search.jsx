
import { motion, AnimatePresence } from "framer-motion";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Search, Loader2, Mic, MicOff, X } from "lucide-react";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showMicPopup, setShowMicPopup] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  useEffect(() => {
    if (keyword.trim().length > 3) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword)).then(() => setIsSearching(false));
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      dispatch(resetSearchResults());
      setIsSearching(false);
    }
  }, [keyword]);

  function startVoiceSearch() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    setShowMicPopup(true);

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setKeyword(voiceText);
      setIsListening(false);
      setShowMicPopup(false);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
      setShowMicPopup(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setShowMicPopup(false);
    };

    recognition.start();
  }

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast({
        title: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      await dispatch(addToCart({ productId, quantity: 1 }));
      await dispatch(fetchCartItems());
      toast({
        title: "Product added to cart successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  };

  const handleGetProductDetails = async (productId) => {
    try {
      await dispatch(fetchProductDetails(productId));
      setOpenDetailsDialog(true);
    } catch (error) {
      toast({
        title: "Failed to fetch product details",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-background to-gray-50 py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div className="flex justify-center mb-12">
          <div className="w-full max-w-2xl relative flex items-center">
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="py-6 pl-12 pr-12 text-lg rounded-2xl shadow-lg border-gray-200 focus:border-primary focus:ring-primary"
              placeholder="Search Products..."
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {isSearching ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Loader2 className="w-6 h-6 text-gray-400" />
                </motion.div>
              ) : (
                <Search className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
              onClick={startVoiceSearch}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>

        {/* Enhanced Mic pop-up modal */}
        <AnimatePresence>
          {showMicPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                
                {/* Pulsing circles behind mic */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-primary/20 rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute inset-0 bg-primary/20 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Mic className="w-12 h-12 text-primary" />
                  </div>
                </div>

                <motion.h2 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold text-center text-gray-800 mb-2"
                >
                  Listening...
                </motion.h2>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600 text-center mb-8"
                >
                  Speak your search query
                </motion.p>

                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => setShowMicPopup(false)}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!searchResults.length && keyword.length > 0 ? (
            <motion.div className="text-center py-12">
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                No results found
              </h1>
              <p className="mt-4 text-gray-600">Try different keywords or check the spelling</p>
            </motion.div>
          ) : (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((item) => (
                <ShoppingProductTile
                  key={item.id}
                  handleAddtoCart={() => handleAddToCart(item.id)}
                  product={item}
                  handleGetProductDetails={() => handleGetProductDetails(item.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <ProductDetailsDialog 
          open={openDetailsDialog} 
          setOpen={setOpenDetailsDialog} 
          productDetails={productDetails} 
        />
      </div>
    </motion.div>
  );
}

export default SearchProducts;