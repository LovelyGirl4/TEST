import jsdom from 'jsdom'
const { JSDOM } = jsdom
if (typeof document === 'undefined') {
    const {window, document} = new JSDOM('<!doctype html><html><body></body></html>')
    global.navigator = window.navigator
}
