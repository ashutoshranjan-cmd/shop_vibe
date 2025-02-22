
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6"
    >
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button 
          onClick={handleUploadFeatureImage} 
          className="mt-5 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          Upload
        </Button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="overflow-hidden rounded-xl shadow-lg bg-white">
                <motion.img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export default AdminDashboard;