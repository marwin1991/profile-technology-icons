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
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
              icon: 'src/assets/images/icon.png',
            },
        },
        'gatsby-plugin-smoothscroll'
    ]
};
