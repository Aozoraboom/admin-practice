import React, { Component } from 'react'
import {Card,Table,Icon,message,Button,Modal } from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api';
import AddForm from './addForm';
import UpdateForm from './updateForm';

class Category extends Component {
   constructor(props) {
       super(props);
       this.state = {
         categorys:[], //一级分类列表
         subCategorys:[], // 二级分类列表
         loading: false,
         parentId:'0', // 当前需要显示的分类列表的parentId
         parentName: '',// 当前需要显示的列表的name
         showSatus:0 , // 标识添加/更新的确认框是否显示 0-都不显示 1-添加 2-更新
       }
   }
   // 初始化列头
   initColumns = ()=>{
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width:300,
        render: (category)=>(
          <div>
          <LinkButton onClick={()=>{this.showUpdate(category)}}>修改分类</LinkButton>
          {this.state.parentId==='0'?
            (<LinkButton onClick={()=>{this.showSubCatrgorys(category)}}>查看子类</LinkButton>)
            : null 
          }
          </div>
        )
      },
    ];
    return columns;
   }
   /**
    * 异步获取一级/二级分类列表
    */
   getCategorys = async ()=>{
     this.setState({
       loading:true
     })
    try{
      const parentId = this.state.parentId;
      const result = await reqCategorys(parentId);
      this.setState({
        loading:false
      })
      if(result.status ===0 ){
        // 取出分类数组，可能是一级的，也可能是二级的
        const categorys = result.data;
        if(parentId ==='0') {
          this.setState({
            categorys
          });
        }else {
          this.setState({
            subCategorys:categorys
          });
        }
      }else{
        message.error('获取分类列表失败');
      }
    }catch(err){
      message.error('获取分类列表失败');
      this.setState({
        loading:false
      })
    }
   }
   /**
    * 显示对应的二级列表
    */
   showSubCatrgorys = (category)=>{
     this.setState({
       parentId: category._id,
       parentName:category.name
     },()=>{ // 回调函数会在状态更新且重新render后执行
      this.getCategorys();     
    })
   }
   /**
    * 显示一级列表
    */
   showCatrgorys = ()=>{
     this.setState({
       parentId:'0',
       parentName:'',
       subCategorys:[]
     })
   }
   /**
    * 显示确认框
    */
   showAdd=()=>{
     this.setState({
       showSatus:1
     })
   }

   showUpdate=(category)=>{
    this.setState({
      showSatus:2
    })
    // 保存分类对象
    this.category = category;
   }
   /**
    * 点击取消，隐藏对话框
    */
   handleCancel=()=>{
    this.form.resetFields();
     this.setState(
       {
         showSatus:0
       }
     )
   }
  
   /**
    * 添加分类
    */
   addCategory= async ()=>{
     // 隐藏确认框
     this.handleCancel();
     // 收集数据，提交请求
     console.log(this.form)
     const{parentId,categoryName} = this.form.getFieldsValue();
     console.log(categoryName)
     const result = await reqAddCategory(parentId,categoryName);
     if(result.status === 0 ){
        // 重新获取分类列表显示
       this.getCategorys()
     }
    //清除输入数据
    this.form.resetFields();
   }

   /**
    * 更新分类
    */
   updateCategory= async ()=>{
    //  1.隐藏确认框
     this.handleCancel();
    //  2.发送更新请求
    const categoryId = this.category._id;
    const {categoryName} = this.form.getFieldsValue();
    console.log(categoryName)
    //清除输入数据
    this.form.resetFields();
    const result = await reqUpdateCategory(categoryId,categoryName);
    if (result.status === 0){ 
        // 3.更新列表
      this.getCategorys()
    }
   }

   /**
    * 执行异步请求
    */
   componentDidMount(){
     this.getCategorys();
   }
   render() {
     const extra = (
       <Button type ='primary' onClick={()=>{this.showAdd()}}>
         <Icon type='plus'/>
         添加
         </Button>
     );
     // 读取状态数据
    const { categorys,loading,parentId,parentName,subCategorys,showSatus}= this.state;
    // 读取指定分类
    const category = this.category || {}; // 如果还没有就指定一个空对象，为了不报错
    // 因为没点击之前，category是null,但是updateform需要进行render，那么就读取不到category.name,会报错


    const title = parentId==='0' ? '一级分类列表':(
      <span>
        <LinkButton onClick={this.showCatrgorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right'style={{marginRight:5}}/>
        <span>{parentName}</span>
      </span>
    )
       return (
         <div>
          <Card title={title} extra={extra} > 
          <Table 
            bordered 
            // rowKey ='_id'
            dataSource={parentId==='0'? categorys : subCategorys} 
            columns={ this.initColumns()} 
            pagination={{
              defaultPageSize:5,
              showQuickJumper:true,
            }}
            loading ={loading}
            />
          </Card>
          <Modal
          title="添加分类"
          visible={showSatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
        <AddForm
          categorys = {categorys}
          parentId = {parentId}
          setForm={(form)=>{this.form = form;}}
        />
        </Modal>
        <Modal
          title="更新分类"
          visible={showSatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm 
          categoryName={category.name} 
          setForm={(form)=>{this.form = form}}
          />
        </Modal>
          </div>
       );
   }
}
export default Category;