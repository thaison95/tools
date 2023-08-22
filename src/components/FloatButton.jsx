import React from "react";
import { Button } from "./ui/button";

const SHAPE = {
  circle: "rounded-full",
  square: "",
};

const FloatButton = ({ icon, description, shape, onClick, size, variant, className, ...props }) => {
  const hasIcon = !!icon;
  const shapeClass = SHAPE[shape] ?? SHAPE.square;

  return (
    <Button
      onClick={onClick}
      className={`fixed ${shapeClass} ${className}`}
      size={hasIcon ? "icon" : size}
      variant={variant}
      {...props}
    >
      {icon}
      {description && <span className="ml-2">{description}</span>}
    </Button>
  );
};

export default FloatButton;
