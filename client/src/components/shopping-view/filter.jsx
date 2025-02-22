import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Filter, ChevronRight } from "lucide-react";

function ProductFilter({ filters = {}, handleFilter }) {
  const filterCount = Object.values(filters).flat().length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background rounded-lg shadow-sm border"
    >
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-bold">Filters</h2>
          </div>
          {filterCount > 0 && (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium"
            >
              {filterCount} active
            </motion.span>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        <AnimatePresence mode="wait">
          {Object.entries(filterOptions).map(([keyItem, options], index) => (
            <motion.div
              key={keyItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <h3 className="text-base font-semibold">{keyItem}</h3>
                </div>

                <motion.div 
                  className="grid gap-2 ml-6"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {options.map((option) => {
                    const isChecked = filters[keyItem]?.includes(option.id);
                    
                    return (
                      <motion.div
                        key={option.id}
                        variants={{
                          closed: { opacity: 0, x: -10 },
                          open: { opacity: 1, x: 0 }
                        }}
                      >
                        <Label 
                          htmlFor={`${keyItem}-${option.id}`}
                          className={`
                            flex items-center gap-3 p-2 rounded-md
                            transition-colors duration-200
                            ${isChecked ? 'bg-blue-50' : 'hover:bg-gray-50'}
                          `}
                        >
                          <Checkbox
                            id={`${keyItem}-${option.id}`}
                            checked={isChecked}
                            onCheckedChange={() => handleFilter(keyItem, option.id)}
                            className={`
                              ${isChecked ? 'border-blue-500' : 'border-gray-300'}
                            `}
                          />
                          <span className={`
                            font-medium
                            ${isChecked ? 'text-blue-700' : 'text-gray-700'}
                          `}>
                            {option.label}
                          </span>
                        </Label>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
              
              {index < Object.keys(filterOptions).length - 1 && (
                <Separator className="my-4" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default ProductFilter;