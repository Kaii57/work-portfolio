const mobileMenuButton = document.querySelector(".mobile-menu-button");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuButton && navLinks) {
    mobileMenuButton.setAttribute("aria-expanded", "false");

    const closeMobileMenu = () => {
        navLinks.classList.remove("mobile-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    };

    mobileMenuButton.addEventListener("click", () => {
        const isOpen =
            mobileMenuButton.getAttribute("aria-expanded") === "true";

        navLinks.classList.toggle(
            "mobile-open",
            !isOpen
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeMobileMenu();
        }
    });

    document.addEventListener("click", (event) => {
        const clickedInsideNav =
            navLinks.contains(event.target);

        const clickedMenuButton =
            mobileMenuButton.contains(event.target);

        if (
            !clickedInsideNav &&
            !clickedMenuButton
        ) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            closeMobileMenu();
        }
    });
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener(
        "submit",
        async (event) => {
            event.preventDefault();

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            const formData =
                new FormData(contactForm);

            const data = {
                name: formData.get("name").trim(),
                email: formData.get("email").trim(),
                message: formData.get("message").trim()
            };

            if (
                !data.name ||
                !data.email ||
                !data.message
            ) {
                formStatus.textContent =
                    "Please fill in all fields.";

                return;
            }

            const originalButtonText =
                submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.textContent =
                "Sending...";

            formStatus.textContent = "";

            try {
                const response = await fetch(
                    "/api/contact",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Something went wrong."
                    );
                }

                formStatus.textContent =
                    result.message;

                contactForm.reset();
            } catch (error) {
                formStatus.textContent =
                    error.message ||
                    "Unable to send your message.";
            } finally {
                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButtonText;
            }
        }
    );
}

const welcomeIntro =
    document.querySelector(
        "#welcome-intro"
    );

const welcomeK =
    document.querySelector(
        "#welcome-k"
    );

const welcomeParticles =
    document.querySelector(
        "#welcome-particles"
    );

const meteorField =
    document.querySelector(
        "#meteor-field"
    );

const welcomeMessage =
    document.querySelector(
        "#welcome-message"
    );

const crtFlash =
    document.querySelector(
        "#crt-flash"
    );

if (
    welcomeIntro &&
    welcomeK &&
    welcomeParticles &&
    meteorField &&
    welcomeMessage &&
    crtFlash
) {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        welcomeIntro.remove();

        document.body.classList.add(
            "home-revealed"
        );

    } else {

        document.body.classList.add(
            "intro-active"
        );

        const createExplosion = () => {

            const particleCount = 55;

            for (
                let index = 0;
                index < particleCount;
                index++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );

                particle.className =
                    "intro-particle";

                const angle =
                    Math.random() *
                    Math.PI *
                    2;

                const distance =
                    80 +
                    Math.random() *
                    420;

                const x =
                    Math.cos(angle) *
                    distance;

                const y =
                    Math.sin(angle) *
                    distance;

                const duration =
                    500 +
                    Math.random() *
                    700;

                particle.style.setProperty(
                    "--x",
                    `${x}px`
                );

                particle.style.setProperty(
                    "--y",
                    `${y}px`
                );

                particle.style.setProperty(
                    "--duration",
                    `${duration}ms`
                );

                welcomeParticles.appendChild(
                    particle
                );

                setTimeout(
                    () => {
                        particle.remove();
                    },
                    duration + 100
                );
            }
        };

        const createMeteorShower = () => {

            const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            const meteorCount = 45;

            for (
                let index = 0;
                index < meteorCount;
                index++
            ) {

                const meteor =
                    document.createElement(
                        "span"
                    );

                meteor.className =
                    "meteor-letter";

                meteor.textContent =
                    characters[
                        Math.floor(
                            Math.random() *
                            characters.length
                        )
                    ];

                const startX =
                    Math.random() *
                    100;

                const endX =
                    startX +
                    (
                        Math.random() *
                        40 -
                        20
                    );

                const size =
                    10 +
                    Math.random() *
                    22;

                const duration =
                    1000 +
                    Math.random() *
                    1400;

                const delay =
                    Math.random() *
                    1200;

                const rotation =
                    -20 +
                    Math.random() *
                    40;

                meteor.style.setProperty(
                    "--start-x",
                    `${startX}vw`
                );

                meteor.style.setProperty(
                    "--end-x",
                    `${endX}vw`
                );

                meteor.style.setProperty(
                    "--size",
                    `${size}px`
                );

                meteor.style.setProperty(
                    "--duration",
                    `${duration}ms`
                );

                meteor.style.setProperty(
                    "--rotation",
                    `${rotation}deg`
                );

                meteor.style.animationDelay =
                    `${delay}ms`;

                meteorField.appendChild(
                    meteor
                );

                setTimeout(
                    () => {
                        meteor.remove();
                    },
                    duration +
                    delay +
                    200
                );
            }
        };

        setTimeout(
            () => {

                welcomeK.classList.add(
                    "enter"
                );

            },
            250
        );

        setTimeout(
            () => {

                welcomeK.classList.remove(
                    "enter"
                );

                welcomeK.classList.add(
                    "charge"
                );

            },
            1450
        );

        setTimeout(
            () => {

                createExplosion();

                welcomeK.style.opacity = "0";

                createMeteorShower();

            },
            1900
        );

        setTimeout(
            () => {

                welcomeMessage.classList.add(
                    "show"
                );

            },
            3300
        );

        setTimeout(
            () => {

                crtFlash.classList.add(
                    "active"
                );

                welcomeIntro.classList.add(
                    "crt-close"
                );

            },
            5000
        );

        setTimeout(
            () => {

                welcomeIntro.remove();

                document.body.classList.remove(
                    "intro-active"
                );

                document.body.classList.add(
                    "home-revealed"
                );

            },
            5750
        );

    }

}