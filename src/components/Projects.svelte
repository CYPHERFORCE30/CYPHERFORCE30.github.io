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
            link: null,
        },
        {
            title: "AI Robo War",
            tech: "C++ + Robotics",
            desc: "Autonomous Combat System",
            link: null,
        },
        {
            title: "Antigravity",
            tech: "SvelteKit + Three.js",
            desc: "Physics Portfolio",
            link: null,
        },
        {
            title: "Neuromancer",
            tech: "Next.js + AI",
            desc: "Generative Text Interface",
        },
        {
            title: "More",
            tech: "GitHub",
            desc: "View 50+ other repositories and experiments on my profile.",
            link: "https://github.com/vishwajeetpawar123/",
        },
    ];

    onMount(() => {
        const panels = gsap.utils.toArray(".project-panel");
        const totalPanels = panels.length;

        const mediaCtx = ScrollTrigger.matchMedia({
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
                    // Removed scroll-based fading/scaling to keep consistent brightness and size
                    gsap.set(panel.querySelector(".tilt-card"), {
                        opacity: 1,
                        scale: 1,
                        rotationY: 0,
                    });

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

        return () => {
            (mediaCtx as any).revert();
        };
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
        class="flex flex-col md:flex-row w-full md:w-max h-auto md:h-[70vh] items-center pl-0 md:pl-[10vw]"
    >
        {#each projects as project, i}
            <div
                class="project-panel w-full md:w-[80vw] lg:w-[60vw] md:h-full flex items-center justify-center p-4 md:p-10 box-border shrink-0 my-10 md:my-0"
            >
                <svelte:element
                    this={project.link ? "a" : "div"}
                    href={project.link}
                    target={project.link ? "_blank" : null}
                    class="tilt-card w-full h-full bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col justify-end transform-style-3d shadow-2xl relative overflow-hidden group transition-all duration-500 cursor-pointer text-left block"
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

                    {#if project.link}
                        <div
                            class="absolute top-8 right-8 w-24 h-24 text-white/10 group-hover:text-white/20 transition-colors translate-z-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-full h-full"
                            >
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                />
                            </svg>
                        </div>
                    {:else}
                        <div
                            class="absolute top-8 right-8 text-8xl font-bold text-white/5 font-mono translate-z-10 group-hover:text-white/10 transition-colors"
                        >
                            0{i + 1}
                        </div>
                    {/if}

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
                </svelte:element>
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
