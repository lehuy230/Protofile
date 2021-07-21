import { Layout, Row,Col } from 'antd';
import React, { useState } from 'react';
import { db } from './../../firebase/config';
import { Image } from 'antd';
import { Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { formatRelative } from 'date-fns/esm';

const { Text,Title } = Typography;

const {  Content } = Layout;

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}
function Home(props) {
  const [myProtofile,setDocuments] = useState([]);
  console.log(myProtofile)
  React.useEffect(()=>{
    //   let collectionRef = db.collection(collection).orderBy('createdAt');
      let collectionRef = db.collection("protofile")
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
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>danh sách bạn</Breadcrumb.Item>
          <Breadcrumb.Item>Trang cá nhân</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          
          {myProtofile ? myProtofile.map((dt,i)=>{
              return(
               
                <Row justify="center" style={{ backgroundImage: 'radial-gradient(#f4f3d2 5.66%, #f7efef 94.35%)',marginTop:20}}>
                  <Col span={24} style={{padding:'15px',borderBottom:'1px solid white',display:'flex'}}>
                    {<Avatar src={dt.photoURL} size={{xs: 24,
                        sm: 32,
                        md: 60,
                        lg: 60,
                        xl: 60,
                        xxl: 60,}}/>} 
                        <div style={{paddingLeft:10}}>
                        <Title level={3} style={{marginBottom:2}}><Text >{dt.displayName}</Text></Title>
                        <Text >{formatDate(dt.createdAt.seconds)}</Text>
                        </div>
                        
                  </Col>
                <Col span={8} key={i} style={{padding:10}}>
                <Title>{dt.nameProtofile}</Title>
                <Text>{dt.levelWorking}</Text>
                
                <Title level={3}><Text type="warning">Kinh nghiệm làm việc</Text></Title>
                {dt.company?dt.company.map((company,index)=>{
                  return(<div style={{marginLeft:10,borderLeft:"2px solid red", paddingLeft:15}} key={index}>
                  <Title level={5}><Text type="warning">{company.regency}</Text></Title>
                  <Text type="secondary">{company.contentregency}</Text>
                </div>)
                }):null}
                
      
                <Title level={3}><Text type="warning">Học vấn</Text></Title>
                {dt.Education?dt.Education.map((ed,index)=>{
                  return(<div style={{marginLeft:10,borderLeft:"2px solid red", paddingLeft:15}} key={index}>
                  <Title level={5}><Text type="warning">{ed.specialized}</Text></Title>
                  <Text type="secondary">{ed.contentspecialized}</Text>
                </div>)
                }):null}
                </Col>
                <Col span={10} style={{padding:10}}>
                  <div style={{display:'flex',flexDirection:'row-reverse'}}>
                    <Image src={dt.uploadImage} width={300} height={240} align="right"/>
                  </div>
                  <Title level={3}><Text type="warning">Giới thiệu</Text></Title>
                  <Text type="secondary">{dt.descript}</Text>
          

                  <Title level={3}><Text type="warning">Thông tin cá nhân</Text></Title>
                  <Text type="secondary">Ngày sinh:23/08/1997</Text><br/>
                  <Text type="secondary">Quốc tịch: {dt.country}</Text><br/>
                  <Text type="secondary">Tình trạng kết hôn: đọc thân</Text><br/>
                  <Text type="secondary">giới tính : {dt.male}</Text><br/>
                  <Title level={3}><Text type="warning">Ngoại ngữ</Text></Title>
                  {dt.language?dt.language.map((lg,index)=>{
                  return(<div style={{marginLeft:10,borderLeft:"2px solid red", paddingLeft:15}} key={index}>
                  <Title level={5}><Text type="warning">{lg.languageName}</Text></Title>
                  <Text type="secondary">{lg.languageLevel}</Text>
                </div>)
                }):null}
                  <Title level={3}><Text type="warning">Kỹ năng</Text></Title>
                  <Text type="secondary">{dt.skill}</Text>

                  <Title level={3}><Text type="warning">Thông tin liên hệ</Text></Title>
                  <Text type="secondary">Email: {dt.email}</Text><br/>
                  <Text type="secondary">sdt: {dt.phone}</Text><br/>
                  <Text type="secondary">địa chỉ: {dt.adress}</Text>
                </Col>
                </Row>
               
               
              )
            }):null}
         
        </div>
      </Content>
    );
}

export default Home;