import { Modal } from "antd";
import { ReactNode } from "react";

interface ModalComponentProps {
  title?: string;
  isOpen?: boolean;
  onCancle?: () => void;
  children?: ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title = "Modal",
  isOpen = false,
  children,
  onCancle,
  ...rests
}) => {
  return (
    <Modal title={title} open={isOpen} {...rests} onCancel={onCancle}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
