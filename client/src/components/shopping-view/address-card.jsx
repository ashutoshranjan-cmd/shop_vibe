import React from 'react';
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        onClick={
          setCurrentSelectedAddress
            ? () => setCurrentSelectedAddress(addressInfo)
            : null
        }
        className={`
          group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl 
          transition-all duration-300 cursor-pointer
          ${
            selectedId?._id === addressInfo?._id
              ? "border-2 border-blue-500 bg-blue-50"
              : "border border-gray-200 bg-white"
          }
        `}
      >
        <motion.div
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-50 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <CardContent className="grid gap-3 p-6 relative">
          <div className="space-y-4">
            {[
              { label: "Address", value: addressInfo?.address },
              { label: "City", value: addressInfo?.city },
              { label: "Pincode", value: addressInfo?.pincode },
              { label: "Phone", value: addressInfo?.phone },
              { label: "Notes", value: addressInfo?.notes },
            ].map((item) => (
              <div key={item.label} className="group/item">
                <Label className="text-sm font-medium text-gray-500">
                  {item.label}
                </Label>
                <motion.p
                  className="mt-1 text-base font-medium text-gray-900"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.value}
                </motion.p>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-4 border-t bg-gray-50 p-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleEditAddress(addressInfo);
            }}
            className="flex-1 bg-black hover:bg-green-700"
          >
            Edit
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAddress(addressInfo);
            }}
            variant="destructive"
            className="flex-1 bg-red-700"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AddressCard;