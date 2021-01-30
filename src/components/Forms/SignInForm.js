import React, { useState, useEffect } from 'react';
import { useStyles } from './Form.styles';
import { checkLength, checkNumber, resizeImage } from './validations';
import catalogs from '../../constants/catalogs';
import api from '../../constants/api';
import axios from 'axios';

import {
    Snackbar,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Typography,
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//import * as ACTIONS from '../../store/actions';
const { errors, vertical, horizontal, inputStr } = catalogs



const SignInForm = (props) => {
    const { returnImage } = props
    const classes = useStyles();
    const [error, setError] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    //snackbar
    const [open, setOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState({});
    const [loading, setLoading] = useState(false);



    const [formData, setFormData] = useState({
        precio: undefined,
        descripcion: undefined,
    });

    const { precio, descripcion } = formData;

    //GENERAL FUNCTIONS
    const arrayBufferToBase64 =(buffer)=> {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    const validate = (data) => {
        const { precio, descripcion } = data;
        if (!precio || !descripcion) {
            setError(true)
            setErrorMessage(errors.default)
            return false
        }
        if (checkNumber(precio, 1, 7)) {
            setError(true)
            setErrorMessage(errors.precio)
            return false
        }
        if (checkLength(descripcion, 10, 200)) {
            setError(true)
            setErrorMessage(errors.descripcion)
            return false
        }

        setError(false)
        setErrorMessage('')
    }

    const handleCloseToast = () => {
        setOpen(false);
    };



    //MAIN FUNCTIONS
    const handleChange = event => {

        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleUploadCar = (event) => {
        event.preventDefault();
        setLoading(true)

        axios.post(api.upload, {
            ...formData
        }).then((res) => {

            if (res.data && res.data.success) {
            
                returnImage(res.data.data)
                setToastMessage("Tu carro fue publicado")
                setToastType(classes.success)

            } else {
                console.log("error")
                setToastType(classes.error)
                setToastMessage(res.data)

            }
            setOpen(true)
            setLoading(false)
     
        }).catch(err => {
            console.log(err)
            setToastMessage(errors.serverError)
            setToastType(classes.error)
            setOpen(true)
            setLoading(false)
        })
    }


    useEffect(() => {
        validate(formData)
    }, [formData])


    return (

        <form onSubmit={handleUploadCar} className={classes.form}>
            <TextField
                className={classes.inputs}
                label={"Precio"}
                type="text"
                size="small"
                name="precio"
                value={precio || ''}
                onChange={handleChange}
                focus="true"
            />
            <TextField
                className={classes.inputs}
                type={'text'}
                label={"Descripción"}
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
            />
            {error && <Typography variant="subtitle2" color="error">{errorMessage}</Typography>}
            <Button
                // className={classes.inputs}
                variant="contained"
                color="primary"
                type="submit"
                disabled={error || loading}
                style={{ textTransform: 'none', marginTop: 10 }}
            >
                {loading ? "Publicando" : "Subir carro"}
            </Button>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={3000}
                onClose={handleCloseToast}
                message={
                    <div className={toastType}>
                        {toastMessage}
                    </div>
                }
                key={vertical + horizontal}
            />
        </form>

    )
}





export default SignInForm;
