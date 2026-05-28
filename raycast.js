import * as THREE from "three";

export class BlockRaycaster {

    constructor(camera, world) {

        this.camera = camera;
        this.world = world;

        this.raycaster =
            new THREE.Raycaster();

        this.range = 6;

        this.selectedBlock = null;

        this.outline =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    1.02,
                    1.02,
                    1.02
                ),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    wireframe: true
                })
            );

        this.outline.visible = false;

        this.world.scene.add(
            this.outline
        );

        this.setupInput();
    }

    setupInput() {

        window.addEventListener(
            "mousedown",
            e => {

                if (
                    !document.pointerLockElement
                ) return;

                if (e.button === 0) {

                    this.breakBlock();
                }

                if (e.button === 2) {

                    this.placeBlock();
                }
            }
        );

        window.addEventListener(
            "contextmenu",
            e => e.preventDefault()
        );
    }

    update() {

        this.raycaster.setFromCamera(
            new THREE.Vector2(0, 0),
            this.camera
        );

        const hits =
            this.raycaster.intersectObjects(
                this.world.blocks
            );

        if (
            hits.length > 0 &&
            hits[0].distance <
                this.range
        ) {

            this.selectedBlock =
                hits[0];

            this.outline.visible =
                true;

            this.outline.position.copy(
                hits[0].object.position
            );

        } else {

            this.selectedBlock =
                null;

            this.outline.visible =
                false;
        }
    }

    breakBlock() {

        if (
            !this.selectedBlock
        ) return;

        const block =
            this.selectedBlock.object;

        this.world.removeBlock(
            block
        );
    }

    placeBlock() {

        if (
            !this.selectedBlock
        ) return;

        const hit =
            this.selectedBlock;

        const normal =
            hit.face.normal;

        const pos =
            hit.object.position
                .clone()
                .add(normal);

        this.world.addBlock(
            pos.x,
            pos.y,
            pos.z,
            "grass"
        );
    }
}
