import React from "react";
import Button from '@material-ui/core/Button';
import "./LoaderButton.css";
import RefreshIcon from '@material-ui/icons/Refresh';

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <RefreshIcon className="spinning" />}
      {props.children}
    </Button>
  );
}