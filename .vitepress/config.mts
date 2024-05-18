import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PESU-pedia",
  description: "Your one-stop source for all lore of PESU",
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/intro' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Introduction', link: '/intro' },
          { text: 'General Information', link: '/general-info' },
          { text: 'Useful Links', link: '/useful-links' },
          { text: 'Credits', link: '/credits' },
        ]
      },
      {
        text: 'Academics',
        items: [
          { text: 'Exam System', link: '/academics/exams' },
          { text: 'PRN and SRN', link: '/academics/prn-srn' },
          { text: 'AIML Branch', link: '/academics/aiml' },
          { text: 'The GPA System', link: '/academics/gpa' },
        ]
      },
      {
        text: 'The RR Campus',
        items: [
          { text: "About", link: "/rr-campus/" },
          { text: "The Gym", link: "/rr-campus/gym" }
        ]
      },
      {
        text: 'The EC Campus',
        items: [
          { text: "About", link: "/ec-campus/" },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/silicoflare/pesupedia' }
    ]
  }
})
