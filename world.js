import * as THREE from "three";

export class World {

    constructor(scene) {

        this.scene = scene;

        this.blocks = [];

        this.blockSize = 1;

        this.chunkRadius = 25;

        this.createMaterials();

        this.generateTerrain();
    }

    createMaterials() {

        this.materials = {

            grass: new THREE.MeshLambertMaterial({
                color: 0x55aa55
            }),

            dirt: new THREE.MeshLambertMaterial({
                color: 0x8b5a2b
            }),

            stone: new THREE.MeshLambertMaterial({
                color: 0x777777
            })

        };

        this.blockGeometry =
            new THREE.BoxGeometry(1, 1, 1);
    }

    generateTerrain() {

        for (
            let x = -this.chunkRadius;
            x <= this.chunkRadius;
            x++
        ) {

            for (
                let z = -this.chunkRadius;
                z <= this.chunkRadius;
                z++
            ) {

                const height =
                    Math.floor(
                        Math.sin(x * 0.15) * 2 +
                        Math.cos(z * 0.15) * 2 +
                        6
                    );

                for (
                    let y = 0;
                    y < height;
                    y++
                ) {

                    let material;

                    if (y === height - 1) {

                        material =
                            this.materials.grass;

                    } else if (
                        y > height - 4
                    ) {

                        material =
                            this.materials.dirt;

                    } else {

                        material =
                            this.materials.stone;
                    }

                    const block =
                        new THREE.Mesh(
                            this.blockGeometry,
                            material
                        );

                    block.position.set(
                        x,
                        y,
                        z
                    );

                    block.castShadow = false;
                    block.receiveShadow = true;

                    this.scene.add(
                        block
                    );

                    this.blocks.push(
                        block
                    );
                }
            }
        }
    }

    getGroundHeight(x, z) {

        return Math.floor(
            Math.sin(x * 0.15) * 2 +
            Math.cos(z * 0.15) * 2 +
            6
        );
    }

    addBlock(x, y, z, type = "grass") {

        const material =
            this.materials[type] ??
            this.materials.grass;

        const block =
            new THREE.Mesh(
                this.blockGeometry,
                material
            );

        block.position.set(
            Math.round(x),
            Math.round(y),
            Math.round(z)
        );

        this.scene.add(
            block
        );

        this.blocks.push(
            block
        );

        return block;
    }

    removeBlock(block) {

        const index =
            this.blocks.indexOf(
                block
            );

        if (index >= 0) {

            this.blocks.splice(
                index,
                1
            );
        }

        this.scene.remove(
            block
        );
    }
}
