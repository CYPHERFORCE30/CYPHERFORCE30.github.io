<script lang="ts">
    import { onMount } from "svelte";
    import { T, useTask, useThrelte } from "@threlte/core";
    import * as THREE from "three";
    import Matter from "matter-js";
    import { Text } from "@threlte/extras";

    export let bubbleCount = 15;
    export let zeroG = false;

    const { size, pointer } = useThrelte() as any;

    // Physics Setup
    const engine = Matter.Engine.create();
    engine.gravity.y = 0.5;
    const world = engine.world;

    let bodies: { id: number; body: Matter.Body }[] = [];
    let wallBodies: Matter.Body[] = [];
    let mouseConstraint: Matter.MouseConstraint;

    $: if (engine) {
        engine.gravity.y = zeroG ? 0 : 0.5;
        engine.gravity.scale = zeroG ? 0 : 0.001;
    }

    function mapPosition(x: number, y: number) {
        const dist = 50;
        const vFOV = THREE.MathUtils.degToRad(50);
        const height = 2 * Math.tan(vFOV / 2) * dist;
        const width = height * ($size.width / $size.height);

        const tx = (x / $size.width) * width - width / 2;
        const ty = -((y / $size.height) * height - height / 2);
        return { x: tx, y: ty };
    }

    useTask((delta) => {
        Matter.Engine.update(engine, delta * 1000);
        bodies = [...bodies];

        // Manual Mouse Constraint Sync
        // Since Threlte is 3D and Matter is 2D overlay, we need to manually pass pointer coords to Matter.Mouse
        if (mouseConstraint) {
            // pointer is -1 to 1. Matter needs 0 to width/height
            const px = (($pointer.x + 1) / 2) * $size.width;
            const py = ((1 - $pointer.y) / 2) * $size.height;
            // @ts-ignore
            Matter.Mouse.setPosition(mouseConstraint.mouse, { x: px, y: py });
        }
    });

    onMount(() => {
        // Walls
        const t = 2000;
        wallBodies = [
            Matter.Bodies.rectangle(
                $size.width / 2,
                $size.height + t / 2,
                $size.width,
                t,
                { isStatic: true },
            ), // Floor
            Matter.Bodies.rectangle(
                -t / 2,
                $size.height / 2,
                t,
                $size.height * 2,
                { isStatic: true },
            ), // Left
            Matter.Bodies.rectangle(
                $size.width + t / 2,
                $size.height / 2,
                t,
                $size.height * 2,
                { isStatic: true },
            ), // Right
            Matter.Bodies.rectangle(
                $size.width / 2,
                -t / 2 - 1000,
                $size.width,
                t,
                { isStatic: true },
            ), // Ceiling
        ];
        Matter.World.add(world, wallBodies);

        // Skills
        // Skills (Only on Desktop)
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;

        if (isDesktop) {
            const skills = [
                "Python",
                "Svelte",
                "React",
                "TS",
                "Node",
                "AI/ML",
                "Three",
                "GLSL",
            ];
            for (let i = 0; i < bubbleCount; i++) {
                const r = 25 + Math.random() * 25;
                const b = Matter.Bodies.circle(
                    Math.random() * $size.width,
                    -Math.random() * 1000,
                    r,
                    { restitution: 0.8, friction: 0.005, frictionAir: 0.02 },
                );
                // @ts-ignore
                b.label = skills[i % skills.length];
                Matter.World.add(world, b);
                bodies.push({ id: b.id, body: b });
            }
        }

        // Interaction: Only on Desktop to prevent scroll blocking on mobile
        // We check window width or pointer accuracy
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;

        if (isDesktop) {
            const mouse = Matter.Mouse.create(document.body);
            mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false },
                },
            } as any);
            Matter.World.add(world, mouseConstraint);
        }

        return () => {
            Matter.Engine.clear(engine);
        };
    });
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 50]} fov={50}>
    <T.AmbientLight intensity={0.5} />
    <T.DirectionalLight position={[10, 10, 10]} intensity={1} />
</T.PerspectiveCamera>

{#each bodies as item (item.id)}
    {@const pos = mapPosition(item.body.position.x, item.body.position.y)}
    {@const radius =
        (item.body as any).circleRadius *
        ((50 * Math.tan(THREE.MathUtils.degToRad(25)) * 2) / $size.height) *
        2}

    <T.Group position={[pos.x, pos.y, 0]}>
        <T.Mesh>
            <T.SphereGeometry args={[radius, 32, 32]} />
            <T.MeshPhysicalMaterial
                color="#06b6d4"
                emissive="#004444"
                transmission={0.8}
                thickness={1}
                roughness={0}
                ior={1.5}
            />
        </T.Mesh>
        <!-- Text Label -->
        <Text
            text={(item.body as any).label}
            fontSize={radius * 0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 0, radius]}
        />
    </T.Group>
{/each}
