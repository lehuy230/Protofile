import React from 'react';
import { DatePicker, Layout, Select } from 'antd';
import { AuthContext } from '../../Context/AuthProviders';
import { Row, Col } from 'antd';
import { Image } from 'antd';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Typography } from 'antd';
import { Form, Input, Button, Upload,Space} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addDocument } from '../../firebase/services';
import useFirestore from '../../hook/useFireStore';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Text,Title } = Typography;

const {  Content } = Layout;


const { TextArea } = Input;

function Infor() {
  const {user:{
    displayName,
    photoURL,
    email,
    uid,
}} = React.useContext(AuthContext);
    const onFinish = (values) => {
      addDocument('protofile',{
        descript:values.descript,
        uid,
        photoURL,
        uploadImage:values.uploadImage.fileList[0].thumbUrl,
        displayName,
        email,
        Education:values.Education,
        adress:values.adress,
        // birtday:values.birtday,
        company:values.company,
        country:values.country,
        language:values.language,
        levelWorking:values.levelWorking,
        male:values.male,
        nameProtofile:values.nameProtofile,
        phone:values.phone,
        skill:values.skill
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
const fileList = [
];
const condition = React.useMemo(()=>({
  fieldName: 'uid',
  operator: '==',
  compareValue:uid
}),[uid]);

const myProtofile = useFirestore('protofile',condition);

    return (
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Trang ch???</Breadcrumb.Item>
          <Breadcrumb.Item>danh s??ch b???n</Breadcrumb.Item>
          <Breadcrumb.Item>Trang c?? nh??n</Breadcrumb.Item>
        </Breadcrumb> */}
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
                    label="H??? v?? t??n"
                    name="nameProtofile"
                    rules={[{ required: true, message: 'vui l??ng ??i???n h??? t??n!' }]}
                    style={{marginTop:30}}
                  >
                    <Input/>
                  </Form.Item>
                  <Form.Item
                    label="Kinh nghi???m"
                    name="levelWorking"
                    rules={[{ required: true, message: 'vui l??ng ??i???n kinh nghi???m!' }]}
                    style={{marginTop:30}}
                  >
                    <Input/>
                  </Form.Item>
                  <Form.Item
                    label="?????a ch???"
                    name="adress"
                    rules={[{ required: true, message: 'vui l??ng ??i???n ?????a ch???!' }]}
                    style={{marginTop:30}}
                  >
                    <Input/>
                  </Form.Item>
                  <Form.Item
                    label="s??? ??i???n tho???i "
                    name="phone"
                    rules={[{ required: true, message: 'vui l??ng ??i???n kinh nghi???m!' }]}
                    style={{marginTop:30}}
                  >
                    <Input/>
                  </Form.Item>
                  <Form.Item label="ng??y sinh" name="birtday">
                      <DatePicker />
                    </Form.Item>
                    <Form.Item label="qu???c t???ch" name="country">
                    <Select>
                      <Select.Option value="Vi???t Nam">Vi???t Nam</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Gi??i t??nh" name="male">
                    <Select>
                      <Select.Option value="Nam">Nam</Select.Option>
                      <Select.Option value="N???">N???</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.List name="language">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'languageName']}
                              fieldKey={[fieldKey, 'languageName']}
                              rules={[{ required: true, message: 'kh??ng ????? tr???ng Ng??n ng???' }]}
                            >
                              <Input placeholder="Ng??n ng???" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'languageLevel']}
                              fieldKey={[fieldKey, 'languageLevel']}
                              rules={[{ required: true, message: 'kh??ng ????? tr???ng level' }]}
                            >
                              <Input placeholder="level" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          th??m ng??n ng???
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                  <Form.List name="company">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'regency']}
                              fieldKey={[fieldKey, 'regency']}
                              rules={[{ required: true, message: 'kh??ng ????? tr???ng ch???c danh' }]}
                            >
                              <Input placeholder="ch???c danh" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'contentregency']}
                              fieldKey={[fieldKey, 'contentregency']}
                              rules={[{ required: true, message: 'kh??ng ????? tr???ng n???i dung c??ng vi???c' }]}
                            >
                              <Input placeholder="n???i dung c??ng vi???c" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          th??m kinh nghi???m
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.List name="Education">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'specialized']}
                              fieldKey={[fieldKey, 'specialized']}
                              rules={[{ required: true, message: 'kh??ng ????? tr???ng chuy??n ng??nh' }]}
                            >
                              <Input placeholder="chuy??n ng??nh" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'contentspecialized']}
                              fieldKey={[fieldKey, 'contentspecialized']}
                              rules={[{ required: true, message: 'kh??ng ????? tr???ng n???i dung vi???c h???c' }]}
                            >
                              <Input placeholder="n???i dung h???c" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          th??m tr?????ng h???c
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                  
                  <Form.Item
                   label="gi???i thi???u"
                    name="descript"
                    rules={[{ required: true, message: 'vui l??ng nh???p gi???i thi???u!' }]}
                    style={{marginTop:30}}
                  >
                    <TextArea rows={4}/>
                  </Form.Item>
                  <Form.Item
                   label="K??? n??ng"
                    name="skill"
                    rules={[{ required: true, message: 'vui l??ng nh???p k??? n??ng!' }]}
                    style={{marginTop:30}}
                  >
                    <TextArea rows={4}/>
                  </Form.Item>
                  <Form.Item
                  
                    name="uploadImage"
                    
                  >
                  
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                        defaultFileList={[...fileList]}
                        className="upload-list-inline"
                      >
                        <Button icon={<UploadOutlined />}>t???i ???nh l??n</Button>
                      </Upload>
                  </Form.Item>


                  <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      ????ng
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
            <Col className="gutter-row" span={18} style={{overflowY:'scroll',height:720}}>
              <Row gutter={16}>
              {myProtofile ? myProtofile.map((dt,i)=>{
              return(
                <>
                <Col span={14} key={i}>
                <Title>{dt.nameProtofile}</Title>
                <Text>{dt.levelWorking}</Text>
                
                <Title level={3}><Text type="warning">Kinh nghi???m l??m vi???c</Text></Title>
                {dt.company?dt.company.map((company,index)=>{
                  return(<div style={{marginLeft:10,borderLeft:"2px solid red", paddingLeft:15}} key={index}>
                  <Title level={5}><Text type="warning">{company.regency}</Text></Title>
                  <Text type="secondary">{company.contentregency}</Text>
                </div>)
                }):null}
                
      
                <Title level={3}><Text type="warning">H???c v???n</Text></Title>
                {dt.Education?dt.Education.map((ed,index)=>{
                  return(<div style={{marginLeft:10,borderLeft:"2px solid red", paddingLeft:15}} key={index}>
                  <Title level={5}><Text type="warning">{ed.specialized}</Text></Title>
                  <Text type="secondary">{ed.contentspecialized}</Text>
                </div>)
                }):null}
                </Col>
                <Col span={10}>
                  <div style={{display:'flex',flexDirection:'row-reverse'}}>
                    <Image src={dt.uploadImage} width={300} height={240} align="right"/>
                  </div>
                  <Title level={3}><Text type="warning">Gi???i thi???u</Text></Title>
                  <Text type="secondary">{dt.descript}</Text>
          

                  <Title level={3}><Text type="warning">Th??ng tin c?? nh??n</Text></Title>
                  <Text type="secondary">Ng??y sinh:23/08/1997</Text><br/>
                  <Text type="secondary">Qu???c t???ch: {dt.country}</Text><br/>
                  <Text type="secondary">T??nh tr???ng k???t h??n: ?????c th??n</Text><br/>
                  <Text type="secondary">gi???i t??nh : {dt.male}</Text><br/>
                  <Title level={3}><Text type="warning">Ngo???i ng???</Text></Title>
                  {dt.language?dt.language.map((lg,index)=>{
                  return(<div style={{marginLeft:10,borderLeft:"2px solid red", paddingLeft:15}} key={index}>
                  <Title level={5}><Text type="warning">{lg.languageName}</Text></Title>
                  <Text type="secondary">{lg.languageLevel}</Text>
                </div>)
                }):null}
                  <Title level={3}><Text type="warning">K??? n??ng</Text></Title>
                  <Text type="secondary">{dt.skill}</Text>

                  <Title level={3}><Text type="warning">Th??ng tin li??n h???</Text></Title>
                  <Text type="secondary">Email: {dt.email}</Text><br/>
                  <Text type="secondary">sdt: {dt.phone}</Text><br/>
                  <Text type="secondary">?????a ch???: {dt.adress}</Text>
                </Col>
                </>
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

export default Infor;