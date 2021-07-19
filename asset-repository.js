export class AssetRepository {
    constructor() {
        this.images = new Map();
        const sources = {
            'grass': './img/grass.png',
            'tree': './img/tree.png',
            'beaver0': './img/beaver0.png',
            'beaver1': './img/beaver1.png',
            'beaver2': './img/beaver2.png',
            'explosion': './img/explosion.png',
            'wolf': './img/wolfsheet.png',
            'boomerang0': './img/bullet0.png',
            'boomerang1': './img/bullet1.png',
            'boomerang2': './img/bullet2.png',
            'boomerang3': './img/bullet3.png',
            'boomerang4': './img/bullet4.png',
            'boomerang5': './img/bullet5.png',
            'boomerang6': './img/bullet6.png',
            'boomerang7': './img/bullet7.png',
            'chick': './img/chick.png',
            'chicken': './img/chicken.png',
            'cow': './img/cow.png',
            'goat': './img/goat.png',
            'sheep': './img/sheep.png',
            'pig': './img/pig.png',
        };
        Object.entries(sources).forEach(([name, path]) => this.addImage(name, path));
    }

    addImage(name, path) {
        const img = new Image();
        img.src = path;
        this.images.set(name, img);
    }

    get(name) {
        return this.images.get(name);
    }
}
