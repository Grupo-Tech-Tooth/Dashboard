import Alert from '@mui/material/Alert';
import style from './AlertSuccess.module.css'

function SuccessAlert(props) {
  return (
    <Alert className={style['showAlert']} severity="success">{props.text}</Alert>
  );
}

export default SuccessAlert;