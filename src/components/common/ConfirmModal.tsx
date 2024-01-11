import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';

interface ConfirmModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  buttonName?: string;
  title: string;
  description?: string;
  onAgree?: () => void;
  onCancel?: () => void;
}

export const ConfirmModal = ({
  isOpen,
  handleOpen,
  buttonName,
  title,
  description,
  onAgree,
  onCancel,
  children,
}: ConfirmModalProps) => {
  const handleAgree = () => {
    handleOpen(false);
    if (onAgree) onAgree();
  };
  const handleCancel = () => {
    handleOpen(false);
    if (onCancel) onCancel();
  };

  return (
    <>
      <Button onClick={() => handleOpen(true)}>{buttonName}</Button>
      <StyledDialog
        open={isOpen}
        onClose={() => handleOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        {children}
        <StyledDialogActions>
          <Button onClick={handleAgree} autoFocus>
            확인
          </Button>
          <Button onClick={handleCancel}>취소</Button>
        </StyledDialogActions>
      </StyledDialog>
    </>
  );
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    padding: 16px;
  }

  #alert-dialog-title {
    font-family: Pretendard-Regular;
    font-size: 18px;
    font-weight: 900;
    padding: 0;
    margin: 0 auto;
  }

  #alert-dialog-description {
    font-family: Pretendard-Regular;
    font-size: 14px;
    margin-top: 12px;
  }
`;

const StyledDialogActions = styled(DialogActions)`
  & > button {
    font-family: Pretendard-Regular;
    color: ${(props) => props.theme.colors.black};
    font-size: 12px;
    margin: 0 auto;
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.darkGray}50;

    &:hover {
      background-color: ${(props) => props.theme.colors.sky}30;
    }
  }
`;
