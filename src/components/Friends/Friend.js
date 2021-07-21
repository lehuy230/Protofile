import React, { useState } from 'react';
import { Layout } from 'antd';
import { AuthContext } from '../../Context/AuthProviders';
import { Row, Col } from 'antd';
import { Image } from 'antd';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Typography } from 'antd';
import { Form, Input, Button,} from 'antd';
import { addDocument } from '../../firebase/services';
import { db } from './../../firebase/config';
import { formatRelative } from 'date-fns/esm';

const { Text,Title } = Typography;

const {  Content } = Layout;


const { TextArea } = Input;

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

function Friend(props) {
  const [comments,setDocuments] = useState([]);
  console.log(comments)
  const {user:{
    displayName,
    photoURL,
    email,
    uid,
}} = React.useContext(AuthContext);
    const onFinish = (values) => {
      addDocument('comments',{
        descript:values.comments,
        displayName,
        photoURL,
        email,
        uid,
    })
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
const style = { background: '', padding: '18px 0',height:'100vh'};
const ImgStyled = styled(Image)`
  height:160px;
  preview:disabled;
`
const AvtStyled = styled(Avatar)`
 
    position: absolute;
    left: 35%;
    bottom: -50px;
    padding-left: -50%;
    border: 2px solid white;
  
`
React.useEffect(()=>{
  //   let collectionRef = db.collection(collection).orderBy('createdAt');
    let collectionRef = db.collection("comments")
    /**
     * {
     *    fieldName:abc
     *    operatior "=="
     *    compareValue: 'abc'
     * }
     */
   const unsubscribe =  collectionRef.onSnapshot((spapshot)=>{
        const documents = spapshot.docs.map(doc=>({
            ...doc.data(),
            id:doc.id
        }))
        setDocuments(documents)
    })
      // db.collection('users').onSnapshot((snapshot)=>{
      //     const data = snapshot.docs.map(doc=>({
      //         ...doc.data(),
      //         id:doc.id
      //     }))
      //     console.log(data,snapshot)
      // })
      return unsubscribe;
  },[])

    return (
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
         <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        {/* <Divider orientation="left">Horizontal</Divider> */}
          <Row gutter={16}>
            
            <Col className="gutter-row" span={6}>
              <div style={style}>
                <div style={{position: 'relative'}}>
                    <ImgStyled
                      width="100%"
                      src={ photoURL }
                    />
                    <AvtStyled
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }}
                      src={photoURL}
                    />
                </div>
                <Title level={2} style={{marginTop:50,textAlign:'center'}}>{displayName}</Title>
                <Text type="success">email: {email}</Text>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 24 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                 
                  
                  <Form.Item
                   label="Bình luận"
                    name="comments"
                    rules={[{ required: true, message: 'vui lòng nhập bình luận!' }]}
                    style={{marginTop:30}}
                  >
                    <TextArea rows={4}/>
                  </Form.Item>


                  <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Đăng
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
            <Col className="gutter-row" span={18}>
              <Row gutter={16}>
              {comments ? comments.map((dt,i)=>{
              return(
                <Row justify="center" key={i} style={{ backgroundImage: 'radial-gradient(#f4f3d2 5.66%, #f7efef 94.35%)',marginTop:20,width:'100%'}}>
                <Col span={24} style={{padding:'15px',borderBottom:'1px solid white',display:'flex'}}>
                  {<Avatar src={dt.photoURL} size={{xs: 24,
                      sm: 32,
                      md: 60,
                      lg: 60,
                      xl: 60,
                      xxl: 60,}}/>} 
                      <div style={{paddingLeft:10}}>
                      <Title level={3} style={{marginBottom:2}}><Text >{dt.displayName}</Text></Title>
                      <Text >{dt.createdAt?formatDate(dt.createdAt.seconds):null}</Text>
                      </div>
                      
                </Col>
              <Col span={24} style={{padding:10}}>
                {dt.descript}
              </Col>
              </Row>
              )
            }):null}
                
                {/* {myPost?myPost.map((dt,i)=>{
                return(
                  <Col span={24} style={{marginTop:25}}>
                  <Card
                    key={i}
                    style={{ width: 'auto' }}
                    cover={
                      <img
                        alt="example"
                        src={dt.uploadImage}
                        width="auto"
                        height={300}
                      />
                    }
                  >
                    <Meta
                      avatar={<Avatar src={dt.photoURL} />}
                      title={dt.displayName}
                      description={dt.descript}
                    />
                  </Card>
                  </Col>
                  
                  )
                }):null} */}
              </Row>
             
            
            </Col>
        </Row>
        </div>
      </Content>
    );
}

export default Friend;