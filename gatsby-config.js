module.exports = {
    pathPrefix: "/profile-technology-icons",
    siteMetadata: {
        title: "Profile Technology Icons",
    },
    plugins: [{
        resolve: `gatsby-plugin-styled-components`,
        options: {
            displayName: true
        }
    },

        {
            resolve: 'gatsby-plugin-material-ui',
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-smoothscroll`,
    ]
};
