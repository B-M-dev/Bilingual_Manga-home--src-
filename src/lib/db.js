import fetch from 'node-fetch'
const response = await fetch('http://localhost:3300/json/admin.manga_metadata.json')
const a = await response.json()
const response1 = await fetch('http://localhost:3300/json/admin.manga_data.json')
const b = await response1.json()
const response2 = await fetch('http://localhost:3300/json/ratings.json')
const c = await response2.json()

let manga_titles = a['0'].manga_titles;
    
manga_titles.forEach(element => {
    let id = element.enid;

    if (id in c) {
        element["rating_data"] = c[id]
    } else {
        element["rating_data"] = { "url":"http://mangaupdates.com", "rating":"N/A", "votes": 0, "last_updated":"N/A"}
    }

 });

 const admin={"manga_metadata":a,"manga_data":b}
 export default admin
