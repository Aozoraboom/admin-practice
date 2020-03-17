import React, { Component } from 'react';
import {Form,Select,Input} from 'antd';
import PropTypes from 'prop-types';
const {Option} = Select;
const {Item} = Form;
class AddForm extends Component {
    static propTypes = {
        categorys:PropTypes.array.isRequired, // 一级分类的数组
        parentId:PropTypes.string.isRequired, // 父分类的ID
        setForm:PropTypes.func.isRequired // 用来传递form对象
    }
    state = {}
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() { 
        const {getFieldDecorator} = this.props.form; 
        const {categorys,parentId} = this.props;
        return ( 
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:parentId,
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    categorys.map(item => <Option value={item._id}>{item.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:'',
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                    
                </Item>
            </Form>
        );
    }
}
 
export default Form.create()(AddForm);