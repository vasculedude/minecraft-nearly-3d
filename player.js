import * as THREE from "three";

export class Player {

    constructor(camera, world) {

        this.camera = camera;
        this.world = world;

        this.position =
            new THREE.Vector3(
                0,
                12,
                0
            );

        this.velocity =
            new THREE.Vector3();

        this.speed = 8;
        this.jumpForce = 8;
        this.gravity = 20;

        this.pitch = 0;
        this.yaw = 0;

        this.onGround = false;

        this.keys = {};

        this.setupInput();

        this.camera.position.copy(
            this.position
        );
    }

    setupInput() {

        window.addEventListener(
            "keydown",
            e => {

                this.keys[
                    e.key.toLowerCase()
                ] = true;

                if (
                    e.code === "Space" &&
                    this.onGround
                ) {

                    this.velocity.y =
                        this.jumpForce;

                    this.onGround = false;
                }
            }
        );

        window.addEventListener(
            "keyup",
            e => {

                this.keys[
                    e.key.toLowerCase()
                ] = false;
            }
        );

        document.addEventListener(
            "mousemove",
            e => {

                if (
                    document.pointerLockElement
                ) {

                    const sensitivity =
                        0.002;

                    this.yaw -=
                        e.movementX *
                        sensitivity;

                    this.pitch -=
                        e.movementY *
                        sensitivity;

                    const limit =
                        Math.PI / 2;

                    this.pitch =
                        Math.max(
                            -limit,
                            Math.min(
                                limit,
                                this.pitch
                            )
                        );
                }
            }
        );
    }

    update(delta) {

        const move =
            new THREE.Vector3();

        if (this.keys["w"])
            move.z -= 1;

        if (this.keys["s"])
            move.z += 1;

        if (this.keys["a"])
            move.x -= 1;

        if (this.keys["d"])
            move.x += 1;

        if (move.length() > 0)
            move.normalize();

        const forward =
            new THREE.Vector3(
                Math.sin(this.yaw),
                0,
                Math.cos(this.yaw)
            );

        const right =
            new THREE.Vector3(
                forward.z,
                0,
                -forward.x
            );

        this.position.add(
            forward
                .clone()
                .multiplyScalar(
                    -move.z *
                    this.speed *
                    delta
                )
        );

        this.position.add(
            right
                .clone()
                .multiplyScalar(
                    move.x *
                    this.speed *
                    delta
                )
        );

        this.velocity.y -=
            this.gravity *
            delta;

        this.position.y +=
            this.velocity.y *
            delta;

        const groundHeight =
            this.world.getGroundHeight(
                Math.round(
                    this.position.x
                ),
                Math.round(
                    this.position.z
                )
            ) + 2;

        if (
            this.position.y <
            groundHeight
        ) {

            this.position.y =
                groundHeight;

            this.velocity.y = 0;

            this.onGround = true;
        }

        this.camera.position.copy(
            this.position
        );

        this.camera.rotation.order =
            "YXZ";

        this.camera.rotation.y =
            this.yaw;

        this.camera.rotation.x =
            this.pitch;
    }
}
