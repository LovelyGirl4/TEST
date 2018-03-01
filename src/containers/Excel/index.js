/*
*将表格转换成excel下载下来
*上传excel转换成表格数据
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Upload, message, Button, Icon, Card, Row, Col, Table } from 'antd'
import { generateExcel, jsonProductsData } from '../../utils/create_excel'
import XLSX from 'xlsx'

class ExcelContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            fileList: [],
            parseStatus: '',
            parsing: false,
        }
        this.columns = [{
            title: '序号',
            dataIndex: 'sn',
            key: 'sn',
        }, {
            title: '商品名称',
            dataIndex: 'product_name',
            key: 'product_name',
            render: (text, record, index) => this.statefulCell(text, record)
        }, {
            title: '品类',
            dataIndex: 'category',
            key: 'category',
            render: (text, record, index) => {
                if (text.length > 1) {
                    return this.statefulCell(text[text.length - 1], record)
                }
                return this.statefulCell(text, record)
            }
        }, {
            title: '供应商',
            dataIndex: 'supplier',
            key: 'supplier',
            render: (text, record, index) => {
                return text.map((t, i) => <p key={i}>{this.statefulCell(this.trimStr(t), record)}</p>)
            }
        }, {
            title: '商品属性',
            dataIndex: 'refCode',
            key: 'refCode',
            render: (text, record, index) => {
                return text.map((t, i) => <p key={i}>{this.statefulCell(this.trimStr(t), record)}</p>)
            }
        }, {
            title: '商品编码',
            dataIndex: 'numbers',
            key: 'numbers',
            render: (text, record, index) => {
                return text.map((t, i) => <p key={i}>{this.statefulCell(this.trimStr(t), record)}</p>)
            }
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record, index) => {
                const deleted = record.deleted
                if (deleted) {
                    return <a href="#" onClick={() => this.toggleDeleteRestore(record)}>恢复</a>
                } else {
                    return <a href="#" onClick={() => this.toggleDeleteRestore(record)}>删除</a>
                }
            }
        }]
    }
    // beforeUpload——上传文件之前的钩子，参数为上传的文件
    beforeUpload = (file, fileList) => {
        const {name, type} = file
        // 判断是否是excel类型的文件
        if (name.indexOf('xls') >= 0 || name.indexOf('xlsx') >= 0) {
            if (type.indexOf('excel') >= 0 || type.indexOf('sheet') >= 0) {
                this.setState({
                    parsing: true
                })
                // FileReader是一种异步文件读取机制
                const reader = new FileReader()
                // readAsBinaryString——按字节读取文件内容，结果为文件的二进制串
                reader.readAsBinaryString(file)
                //读取完成后，数据保存在对象的result属性中
                reader.addEventListener('load', () => {
                    this._parseDataSource(reader.result)
                    // console.log('result', reader.result)
                })

                // const data = new FormData();
                // data.append('ver_file', file);
                // console.log(data.get('ver_file'));
                // console.log('fffff', file);
                // this.setState({
                //     fileList: this.state.fileList.concat(file)
                // })
                return true
            } else {
                message.warn('请上传正确格式的excel文件')
                return false
            }
        } else {
            message.warn('请上传正确格式的excel文件')
            return false
        }
    }
    // 解析excel,获得自己想要的数据格式
    _parseDataSource = (result) => {
        let workbook = XLSX.read(result, { type: 'binary' })
        // SheetNames——excel每张表的名称——["format", "category", "supplier"]
        // Sheets——excel每张表具体的内容——{format: {}, category: {}, supplier: {}}
        let sheetNames = workbook.SheetNames
        let sheets = workbook.Sheets

        // 将二进制文件转换成JSON,这里只取第一张表——format的内容
        let sheet2JSON = XLSX.utils.sheet_to_json(sheets[sheetNames[0]], { header: 1 })
        let sheet2JSONlength = sheet2JSON.length

        if (sheet2JSONlength > 1) {
            // data antd表格
            let data = []
            for (let i = 1; i < sheet2JSONlength; i++) {
                const arr = sheet2JSON[i]
                if (!this.isEmpty(arr[0], arr[9])) {
                    // 对应的字段在excel每一行的位置，将其变成自己想要的数据格式
                    data.push({
                        key: i,
                        sn: i,
                        product_name: this.trimStr(arr[0]),
                        category: this.concatToArr(arr, [9, 11, 13, 15, 17]),
                        category_id: this.concatToArr(arr, [10, 12, 14, 16, 18]),
                        supplier: this.concatToArr(arr, [1, 3, 5]),
                        supplierID: this.concatToArr(arr, [2, 4, 6]),
                        refCode: this.calcStrToArr(arr[7]),
                        numbers: this.calcStrToArr(arr[8]),
                        deleted: false
                    })
                }
            }
            this.setState({
                dataSource: data,
                parseStatus: 'success',
                parsing: false
            })
        } else {
            this.setState({
                parseStatus: 'error',
                parsing: false
            })
        }
    }
    // onChange——上传文件改变时的状态，上传中、完成、失败都会调用这个函数。
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({
                fileList: this.state.fileList.concat({ ...info.file, status: 'done' })
            })
            // console.log(info.file, info.fileList);
            // const reader = new FileReader();
            // reader.readAsDataURL(info.file.originFileObj);
            // reader.addEventListener('load', () => console.log(reader.result));
        }
        if (info.file.status === 'removed') {
            this.setState({
                fileList: this.state.fileList.filter((file) => {
                    return file.status !== 'removed'
                }),
                dataSource: [],
                parseStatus: ''
            })
        }
    }
    // customRequest覆盖upload默认的上传行为，自定义自己的上传实现
    customRequest = (file) => {
        console.log('customRequest', file)
    }
    isEmpty = (name, CategoryId) => {
        if (name && CategoryId) {
            if (name.trim() === '' && CategoryId.trim() === '') {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }
    trimStr = (str) => {
        if (str) {
            return str.trim()
        } else {
            return ''
        }
    }
    calcStrToArr = (str) => {
        if (str) {
            // 将'：'换成':'
            const str1 = this.trimStr(str).replace(/：/g, ':')
            // 去空
            const arr = str1.split('\n').filter(i => !!i)
            return arr
        }
    }
    concatToArr = (arr, indexArr) => {
        const dataArr = []
        indexArr.forEach(i => {
            if (arr[i]) {
                dataArr.push(arr[i])
            }
        })
        return dataArr
    }
    // 给删除的行加上格式
    statefulCell = (text, record) => {
        const deleted = record.deleted
        if (deleted) {
            return <span style={{ textDecoration: 'line-through', color: '#FF3030' }}>{text}</span>
        } else {
            return <span>{text}</span>
        }
    }
    // 删除or回复
    toggleDeleteRestore = (record) => {
        const key = record.key
        const newData = this.state.dataSource.map(d => {
            if (d.key === key) {
                return { ...d, deleted: !d.deleted }
            } else {
                return d
            }
        })
        let info
        record.deleted ?
            info = '恢复成功' :
            info = '删除成功'
        message.success(info, 4)
        this.setState({
            dataSource: newData
        })
    }

    render() {
        const {dataSource, fileList} = this.state
        const extra = < a href='http://gw-s3-dev.s3.amazonaws.com/registration_certification%2FTest+Company%2Fimages%2Fc2871812-6d65-24cc-3fe3-036975e526d0productFormat.xlsx'>
            <Icon type="download" /> 下载excel模板
        </a>
        return <Card title='EXCEL' extra={extra} style={{ width: 1000, marginTop: 100, marginLeft: 150 }}>
            <Row>
                <Col span={4}>
                    <Upload onChange={this.handleChange} beforeUpload={this.beforeUpload}
                        customRequest={this.customRequest} fileList={fileList}>
                        <Button disabled={fileList.length >= 1 ? true : false}>
                            <Icon type="upload" /> 解析excel文件
                        </Button>
                    </Upload> 
                </Col>
                {dataSource.length !== 0 ? <Col span={4} offset={2}>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        const hide = message.loading('Downloading', 0)
                        // 将data变成想要的格式
                        const data = jsonProductsData(dataSource)
                        // 生成excel
                        generateExcel(data, 'Product List.xlsx', 'product')
                        hide()
                    }}><Icon type="download" />点击下载excel</Button>
                </Col> : null}
            </Row>
            {dataSource.length !== 0 ? <Row style={{ minHeight: 420 }}>
                <Table columns={this.columns} dataSource={dataSource} size="small" />
            </Row> : null}
        </Card>
    }
}

export default connect()(ExcelContainer)
