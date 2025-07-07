import { CircularProgress, Button as MuiButton, useTheme, type ButtonOwnProps } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<ButtonOwnProps & {
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  sx?: object;
}>;

export const Button: FC<ButtonProps> = ({
  children,
  loading,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <MuiButton
      {...rest}
      disabled={loading || rest.disabled}
      sx={{
        borderRadius: theme.shape.borderRadius,
        fontWeight: 600,
        minHeight: 44,
        ...rest.sx,
      }}
    >
      {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
      {children}
    </MuiButton>
  );
};
