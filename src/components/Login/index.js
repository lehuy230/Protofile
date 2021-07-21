import React from 'react';
import {Row,Col,Button} from 'antd';
import firebase,{auth} from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';


// const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();


export default function Login() {
    
    const handleGgLogin = async() =>{
        const {additionalUserInfo, user} = await auth.signInWithPopup(ggProvider);
        console.log(additionalUserInfo,user)
        if(additionalUserInfo?.isNewUser){
            addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid:user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }
   
    return (
        <div>
            <Row justify='center' style={{height:800,marginTop:40}}>
                <Col span={3}>
                    <Button style={{width:'100%',backgroundColor:'blue',color:'#fff'}} onClick={handleGgLogin}>
                        tiếp tục với google ... 
                    </Button>
                </Col>
            </Row>
        </div>
    );
}