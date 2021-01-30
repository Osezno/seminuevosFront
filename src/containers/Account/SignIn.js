import React, { useState, useEffect } from 'react';

import { useStyles } from './Account.styles';
import catalogs from '../../constants/catalogs';


import { Card,  } from '@material-ui/core'
//componentes
import Info from './accountComponents/Info';
import View from './accountComponents/View';
import SignInForm from '../../components/Forms/SignInForm';

const SignIn = (props) => {
    
    const { pageInfo } = catalogs
    const classes = useStyles();
    const [image, setImage] = useState('');
     const returnImage = (img)=>{
       // console.log(img)
       
        setImage(img)
     }
    

    return (
        <>
            <Card className={classes.signInRoot}>
                <View className={classes.cover} cover={image != '' ? image : pageInfo.cover} />
                <div className={classes.content}>
                    <Info title={"BIENVENIDO A"} highlight={"SEMINUEVOS"} message={pageInfo.welcomeMessage} />
                    <SignInForm returnImage={(img)=> returnImage(img)}  />
                    
                </div>
            </Card>
        </>
    )
}



export default SignIn ;
