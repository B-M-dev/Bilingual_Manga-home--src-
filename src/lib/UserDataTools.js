import fs from "fs"
export let user_data_defaults = {"favourites":[]};

export const saveUserData = (db) => {
	fs.writeFile ("json/user_data.json", JSON.stringify(db['user_data']), function(err) {
		if (err) throw err;
		});
};

export const AugmentMetadataWithUserData = (db) => {
    let manga_titles = db['manga_metadata']['0'].manga_titles;
    let user_data = db['user_data'];
    console.log("Augment manga_metadata with " + user_data['favourites'].length + " favourites");

    manga_titles.forEach(element => {
        let id = element.enid;

        if (user_data['favourites'].includes(id)) {
            console.log(" - Favourite: " + element.entit);
            element["favourite"] = true;
        } else {
            element["favourite"] = false;
        }
    });
};
