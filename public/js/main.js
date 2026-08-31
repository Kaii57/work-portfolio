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