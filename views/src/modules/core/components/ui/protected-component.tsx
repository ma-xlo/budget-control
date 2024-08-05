import { ReactNode } from "react";

interface ProtectedComponentProps {
  allowed: boolean;
  children: ReactNode;
}

const ProtectedComponent = ({ allowed, children }: ProtectedComponentProps) => {
  if (allowed) {
    return children;
  }

  return null;
};

export default ProtectedComponent;
