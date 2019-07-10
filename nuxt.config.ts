import NuxtConfiguration from '@nuxt/config'
process.env.DEBUG = 'nuxt:*'

const config: NuxtConfiguration = {
    dev: (process.env.NODE_ENV != 'production'),
    mode: 'spa',
    devtools: true,
    head: {
        titleTemplate: 'Markdown Stock',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        script: [
            { src: 'https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js', type: 'text/javascript' },
            { src: 'https://www.gstatic.com/firebasejs/5.10.1/firebase-auth.js', type: 'text/javascript' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p:300&display=swap' }
        ]
    }
}

export default config