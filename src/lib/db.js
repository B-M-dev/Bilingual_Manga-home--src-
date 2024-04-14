import fetch from 'node-fetch'
const response = await fetch('http://localhost:3300/json/BM_data.manga_metadata.json')
const a = await response.json()
const response1 = await fetch('http://localhost:3300/json/BM_data.manga_data.json')
const b = await response1.json()
const admin={"manga_metadata":a,"manga_data":b}
export default admin
