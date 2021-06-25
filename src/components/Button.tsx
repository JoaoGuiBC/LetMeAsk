import { ButtonHTMLAttributes } from "react";

import '../styles/components/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ isOutlined = false, ...rest }) => {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...rest} />
  );
}
