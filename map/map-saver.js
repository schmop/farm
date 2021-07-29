import FileUtils from "../common/file-utils.js";

export default class MapSaver {
    static save(map) {
        let mapSnapshot = {layers: []};
        map.layers.forEach(layer => {
            mapSnapshot.layers.push({
                tileset: layer.tileset.asset,
                blocks: [...layer.blocks],
                zIndex: layer.zIndex,
            });
        });
        const serialized = JSON.stringify(mapSnapshot, null, 2);
        console.log(serialized);
        FileUtils.saveFile(serialized, "myMap.json");
    }
}