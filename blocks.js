export const BLOCKS = {

    AIR: {
        id: 0,
        name: "Air",
        solid: false
    },

    GRASS: {
        id: 1,
        name: "Grass",
        solid: true,
        color: 0x55aa55
    },

    DIRT: {
        id: 2,
        name: "Dirt",
        solid: true,
        color: 0x8b5a2b
    },

    STONE: {
        id: 3,
        name: "Stone",
        solid: true,
        color: 0x777777
    },

    WOOD: {
        id: 4,
        name: "Wood",
        solid: true,
        color: 0x8b6a3d
    },

    LEAVES: {
        id: 5,
        name: "Leaves",
        solid: true,
        color: 0x228b22
    },

    SAND: {
        id: 6,
        name: "Sand",
        solid: true,
        color: 0xd9c27d
    }

};

export const HOTBAR = [

    BLOCKS.GRASS,
    BLOCKS.DIRT,
    BLOCKS.STONE,
    BLOCKS.WOOD,
    BLOCKS.LEAVES,
    BLOCKS.SAND

];

export function getBlockById(id) {

    return Object.values(BLOCKS).find(
        block => block.id === id
    );

}

export function getBlockByName(name) {

    return Object.values(BLOCKS).find(
        block =>
            block.name.toLowerCase() ===
            name.toLowerCase()
    );

}
