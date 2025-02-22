import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  isLoading,
}) {
  const [focusedField, setFocusedField] = useState(null);
  const [touched, setTouched] = useState({});

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName) => {
    setFocusedField(null);
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || "";
    const isFocused = focusedField === controlItem.name;
    const hasBeenTouched = touched[controlItem.name];
    const isEmpty = hasBeenTouched && (!value || value.length === 0);

    const commonProps = {
      name: controlItem.name,
      id: controlItem.name,
      onFocus: () => handleFocus(controlItem.name),
      onBlur: () => handleBlur(controlItem.name),
      className: `
        transition-all duration-200
        ${isFocused ? 'ring-2 ring-primary ring-offset-2' : ''}
        ${isEmpty ? 'border-red-500' : ''}
      `,
    };

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            {...commonProps}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className={`w-full ${commonProps.className}`}>
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              <AnimatePresence>
                {controlItem.options?.map((optionItem, index) => (
                  <motion.div
                    key={optionItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SelectItem value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            {...commonProps}
            placeholder={controlItem.placeholder}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            {...commonProps}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {formControls.map((controlItem, index) => (
            <motion.div
              key={controlItem.name}
              variants={formItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="grid w-full gap-1.5"
            >
              <Label
                htmlFor={controlItem.name}
                className={`mb-1 transition-colors duration-200 ${
                  focusedField === controlItem.name ? "text-primary" : ""
                }`}
              >
                {controlItem.label}
                {controlItem.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
              {renderInputsByComponentType(controlItem)}
              {touched[controlItem.name] && !formData[controlItem.name] && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {controlItem.label} is required
                </motion.p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          disabled={isBtnDisabled || isLoading}
          type="submit"
          className="w-full mt-4"
        >
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </motion.div>
          ) : (
            buttonText || "Submit"
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}

export default CommonForm;