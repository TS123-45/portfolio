const express = require("express");

const router = express.Router();

const { queryDatabase } = require("../db");


// GET Complete Portfolio Data
router.get("/portfolio", async (req, res) => {

    try {

        const personal = await queryDatabase(
            "SELECT * FROM personal_info LIMIT 1"
        );

        const education = await queryDatabase(
            "SELECT * FROM education"
        );

        const skills = await queryDatabase(
            "SELECT * FROM skills"
        );

        const projects = await queryDatabase(
            "SELECT * FROM projects"
        );

        const projectFeatures = await queryDatabase(
            "SELECT * FROM project_features"
        );

        const experience = await queryDatabase(
            "SELECT * FROM experience"
        );

        const certifications = await queryDatabase(
            "SELECT * FROM certifications"
        );

        const socialLinks = await queryDatabase(
            "SELECT * FROM social_links"
        );


        // Add features inside each project
        const formattedProjects = projects.map(project => {

            return {
                ...project,

                features: projectFeatures
                    .filter(
                        feature => feature.project_id === project.id
                    )
                    .map(
                        feature => feature.feature
                    )
            };

        });


        res.status(200).json({

            success: true,

            data: {

                personal: personal[0] || null,

                education,

                skills,

                projects: formattedProjects,

                experience,

                certifications,

                socialLinks

            }

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Error fetching portfolio data",

            error: error.message

        });

    }

});



module.exports = router;
