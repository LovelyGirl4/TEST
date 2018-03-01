import XLSX from 'xlsx'
var FileSaver = require('file-saver')

// 生成excel的headName
const productHeader = {
    header: ['Name', 'Category', 'SupplierName', 'RefCode', 'Numbers']
}

const newBook = () => XLSX.utils.book_new()

const generateProductWorkSheet = (data) => {
    /* make worksheet */
    let ws = XLSX.utils.json_to_sheet(data, productHeader)
    return ws
}

const bookOptions = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
}

const s2ab = (s) => {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
}

const writeWorkBook = (data, types) => {
    let wb = newBook()
    const keys = Object.keys(data)
    keys.forEach(k => {
        /* Add the sheet name to the list */
        wb.SheetNames.push(k)
        /* Load the worksheet object */
        if (types === 'product') {
            wb.Sheets[k] = generateProductWorkSheet(data[k])
        }
    })
    wb.CreatedDate = new Date()
    return wb
}
// 将Data变成想要的格式
const jsonProductsData = (data) => {
    const newData = data.map((d, index) => {
        return {
            Name: d.product_name,
            Category: d.category.join('>'),
            SupplierName: d.supplier.join('\n'),
            RefCode: d.refCode.join('\n'),
            Numbers: d.numbers.join('\n')
        }
    })
    return { product: newData }
}
// 生成excel
const generateExcel = (data, filename, types) => {
    let wb = writeWorkBook(data, types)
    let wopts = bookOptions
    let wbout = XLSX.write(wb, wopts)
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), filename)
}
export {
    jsonProductsData,
    generateExcel
}