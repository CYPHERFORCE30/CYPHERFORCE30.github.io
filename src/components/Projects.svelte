<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    let sectionRef: HTMLElement;
    let trackRef: HTMLElement;

    const projects = [
        {
            title: "Crackathon",
            tech: "YOLOv8 + Python",
            desc: "Award winning AI Model",
        },
        {
            title: "AI Robo War",
            tech: "C++ + Robotics",
            desc: "Autonomous Combat System",
        },
        {
            title: "Antigravity",
            tech: "SvelteKit + Three.js",
            desc: "Physics Portfolio",
        },
        {
            title: "Neuromancer",
            tech: "Next.js + AI",
            desc: "Generative Text Interface",
        },
    ];

    onMount(() => {
        const panels = gsap.utils.toArray(".project-panel");
        const totalPanels = panels.length;

        ScrollTrigger.matchMedia({
            // Desktop: Horizontal Scroll
            "(min-width: 768px)": function () {
                // Horizontal Scroll with Overlap
                gsap.to(panels, {
                    xPercent: -85 * (totalPanels - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef,
                        pin: true,
                        scrub: 1,
                        snap: {
                            snapTo: 1 / (totalPanels - 1),
                            duration: 0.5,
                            ease: "power2.inOut",
                        },
                        end: () => "+=2000",
                    },
                });

                // Parallax / Scale / Tilt Effects (Desktop Only)
                panels.forEach((panel: any, i) => {
                    // Animation for Entering/Leaving Center
                    gsap.fromTo(
                        panel.querySelector(".tilt-card"),
                        { scale: 0.8, opacity: 0.5, rotationY: 15 },
                        {
                            scale: 1,
                            opacity: 1,
                            rotationY: 0,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: panel,
                                containerAnimation: gsap.getById("scrollTween"),
                                toggleActions: "play reverse play reverse",
                            },
                        },
                    );

                    // Mouse Tilt Interaction
                    const card = panel.querySelector(".tilt-card");
                    const onMove = (e: MouseEvent) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const cx = rect.width / 2;
                        const cy = rect.height / 2;
                        const dx = (x - cx) / cx;
                        const dy = (y - cy) / cy;

                        gsap.to(card, {
                            rotateY: dx * 15,
                            rotateX: -dy * 15,
                            scale: 1.05,
                            duration: 0.4,
                            ease: "power2.out",
                        });
                    };
                    const onLeave = () => {
                        gsap.to(card, {
                            rotateY: 0,
                            rotateX: 0,
                            scale: 1,
                            duration: 0.6,
                            ease: "power2.out",
                        });
                    };

                    panel.addEventListener("mousemove", onMove);
                    panel.addEventListener("mouseleave", onLeave);

                    // Cleanup listeners when breakpoint changes
                    return () => {
                        panel.removeEventListener("mousemove", onMove);
                        panel.removeEventListener("mouseleave", onLeave);
                    };
                });
            },

            // Mobile: Simple Fade In on Scroll
            "(max-width: 767px)": function () {
                panels.forEach((panel: any) => {
                    gsap.fromTo(
                        panel,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 80%",
                            },
                        },
                    );
                });
            },
        });
    });
</script>

<section
    bind:this={sectionRef}
    class="min-h-screen md:h-screen bg-gray-950 text-white overflow-hidden flex flex-col justify-center relative py-20 md:py-0"
>
    <div
        class="relative md:absolute top-0 md:top-10 left-0 md:left-10 z-20 px-4 md:px-0 mb-8 md:mb-0"
    >
        <h2
            class="text-xs font-mono text-cyan-500 tracking-[0.5em] uppercase mb-2"
        >
            Projects Database
        </h2>
        <h3
            class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
        >
            Selected Works
        </h3>
    </div>

    <div
        bind:this={trackRef}
        class="flex flex-col md:flex-row w-full md:w-[300%] h-auto md:h-[70vh] items-center pl-0 md:pl-[10vw]"
    >
        {#each projects as project, i}
            <div
                class="project-panel w-full md:w-[80vw] lg:w-[60vw] md:h-full flex items-center justify-center p-4 md:p-10 box-border shrink-0 my-10 md:my-0"
            >
                <div
                    class="tilt-card w-full h-full bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col justify-end transform-style-3d shadow-2xl relative overflow-hidden group transition-all duration-500"
                >
                    <!-- Background Gradient -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-duration-500"
                    ></div>

                    <!-- Image Placeholder -->
                    <div
                        class="absolute inset-0 z-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay"
                    ></div>

                    <div class="relative z-10 translate-z-20">
                        <span
                            class="text-cyan-400 font-mono text-sm mb-4 block tracking-wider bg-black/50 w-fit px-3 py-1 rounded-full border border-cyan-500/30"
                            >{project.tech}</span
                        >
                        <h4
                            class="text-5xl md:text-7xl font-bold mb-4 leading-none"
                        >
                            {project.title}
                        </h4>
                        <p
                            class="text-gray-300 max-w-lg text-lg leading-relaxed"
                        >
                            {project.desc}
                        </p>
                    </div>

                    <div
                        class="absolute top-8 right-8 text-8xl font-bold text-white/5 font-mono translate-z-10 group-hover:text-white/10 transition-colors"
                    >
                        0{i + 1}
                    </div>

                    <div
                        class="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity translate-z-20"
                    >
                        <div
                            class="w-12 h-12 rounded-full border border-white flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-arrow-up-right"
                                ><path d="M7 7h10v10" /><path
                                    d="M7 17 17 7"
                                /></svg
                            >
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .transform-style-3d {
        transform-style: preserve-3d;
        perspective: 1200px;
    }
    .translate-z-10 {
        transform: translateZ(30px);
    }
    .translate-z-20 {
        transform: translateZ(60px);
    }
</style>
