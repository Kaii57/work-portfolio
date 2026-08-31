const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "public",
            "html",
            "index.html"
        )
    );
});

app.post("/api/contact", (req, res) => {
    const {
        name,
        email,
        message
    } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });
    }

    console.log("\nNew contact message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    return res.status(200).json({
        success: true,
        message: "Message sent successfully!"
    });
});

app.listen(PORT, () => {
    console.log(
        `Portfolio running at http://localhost:${PORT}`
    );
});