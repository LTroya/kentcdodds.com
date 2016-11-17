/* eslint max-len:0, max-lines:0 */
import marked from 'marked'
import stripIndent from 'strip-indent'
import moment from 'moment'

const tagEmojiMap = {
  'open source': '🌎',
  testing: '⚠️',
  react: '⚛',
  silly: '🙃',
}

// {
//   title: '',
//   description: '',
//   date: '',
//   tags: [],
// },
export default [
  {
    title: 'Podcasts',
    appearances: [
      {
        thing: '[Dads in Development](http://www.dadsindev.com/)',
        description: '[Episode 12: CSS Modules](http://www.dadsindev.com/12) (and CSS in JS)',
        date: '2016-08-11',
        tags: ['css', 'aphrodite', 'webpack', 'css modules'],
      },
      {
        thing: '[Career.js](http://careerjs.com/)',
        description: '[Ep. 3 - How to Level Up Your Career with Kent C. Dodds](http://careerjs.com/#/3)',
        date: '2016-07-11',
        tags: ['soft skills', 'about me'],
      },
      {
        thing: '[This Developing Story](http://developingstory.netlify.com/)',
        description: '[Ep. 56 - Kent C. Dodds](http://developingstory.netlify.com/tds-56-kent-c-dodds)',
        date: '2016-06-07',
        tags: ['about me'],
      },
      {
        thing: '[The Web Behind](https://webbehind.com)',
        description: '[Kent C. Dodds](https://webbehind.com/episode-2-kent-c-dodds/)',
        date: '1970-01-01',
        tags: ['about me'],
      },
      {
        thing: '[Modern Web Podcast](http://www.modern-web.org/)',
        description: '[S01E03 - ES6, Beard of Jeff Cross, Air Squats, and JavaScript Air with Kent C. Dodds and Ben Lesh](http://modernweb.podbean.com/e/s01e03-es6-beard-of-jeff-cross-air-squats-and-javascript-air-with-kent-c-dodds-and-ben-lesh/)',
        date: '1970-01-01',
        duration: '00:53:31',
        tags: ['about me', 'JavaScript Air', 'Angular Air', 'speaking', 'learning'],
      },
      {
        thing: '[The Web Platform Podcast](http://thewebplatformpodcast.com)',
        description: '[Teaching and Learning Angular](http://thewebplatformpodcast.com/72-teaching-and-learning-angular)',
        date: '1970-01-01',
        tags: ['angular', 'teaching', 'learning'],
      },
      {
        thing: '[Adventures in Angular](https://devchat.tv/adv-in-angular)',
        description: '[022 AiA Form Validation with Kent C. Dodds](https://devchat.tv/adv-in-angular/022-aia-form-validation-with-kent-c-dodds)',
        date: '1970-01-01',
        tags: ['angular', 'forms'],
      },
    ],
  },
  {
    title: 'Interviews & Chats',
    appearances: [
      {
        thing: '[Modern Web Podcast](http://www.modern-web.org/)',
        description: `[:) O'Reilly FluentConf 2016 - @getify love, best talks, conferences, wizard hats, and pajamas (Part 1 of 2)](https://www.youtube.com/watch?v=QRt9QBdpQQ0)`,
        date: '2016-03-10',
        duration: '00:19:16',
        tags: ['conferences', 'silly'],
      },
      {
        thing: '[Modern Web Podcast](http://www.modern-web.org/)',
        description: `[O'Reilly FluentConf 2016 - JavaScript 2016 and The "Good 'Ol Days" of the Internet (Part 2 of 2)](https://www.youtube.com/watch?v=rMbL1w-Bby4)`,
        date: '2016-03-10',
        duration: '00:29:14',
        tags: ['conferences', 'silly'],
      },
      {
        thing: `[O'Reilly Media](https://www.youtube.com/user/OreillyMedia)`,
        description: `[Interview with Kent C. Dodds (O'Reilly Fluent Conference 2016)](https://www.youtube.com/watch?v=7O2dpgNoY4M)`,
        date: '2016-03-10',
        duration: '00:09:00',
        tags: ['angular', 'react', 'tooling', 'open source', 'learning'],
      },
    ],
  },
  {
    title: 'Blogposts',
    appearances: [
      {
        thing: '[onalytica Influencer Library](http://www.onalytica.com/blog/)',
        description: `[Digital Inclusion and Accessibility: Top 100 Influencers and Brands](http://www.onalytica.com/blog/posts/digital-inclusion-accessibility-top-100-influencers-brands/) (I'm #29)`,
        date: '2016-10-13',
        tags: ['accessibility', 'a11y'],
      },
      {
        thing: '[opensource.com](https://opensource.com)',
        description: `[Tips from a software engineer for a balanced life](https://opensource.com/business/16/10/all-things-open-interview-kent-c-dodds)`,
        date: '2016-10-05',
        tags: ['balance', 'open source', 'time management', 'teaching', 'speaking', 'learning', 'automation'],
      },
      {
        thing: '[techbeacon.com](http://techbeacon.com/)',
        description: `[41 JavaScript experts to follow on Twitter](http://techbeacon.com/javascript-leaders-you-should-follow-twitter)`,
        date: '2016-10-05',
        tags: ['balance', 'open source', 'time management', 'teaching', 'speaking', 'learning', 'automation'],
      },
    ],
  },
].map(group => ({
  ...group,
  appearances: group.appearances.map(fixupData).sort(sortByMostRecent),
}))

function fixupData(appearance) {
  return ({
    // defaults
    ...appearance,

    // overrides
    thing: markdownToHTMLWithNoPTag(appearance.thing),
    date: moment(appearance.date),
    isFuture: moment().isBefore(appearance.date),
    tags: (appearance.tags || []).map(t => `${t}${tagEmojiMap[t] ? ` ${tagEmojiMap[t]}` : ''}`),
    description: markdownToHTMLWithNoPTag(appearance.description || ''),
    duration: appearance.duration ? moment.duration(appearance.duration).humanize() : null,
  })
}

function sortByMostRecent(a, b) {
  return a.date.isAfter(b.date) ? -1 : 1
}

function markdownToHTML(string) {
  return marked(stripIndent(string))
}

function markdownToHTMLWithNoPTag(string) {
  return markdownToHTML(string).slice(3, -5)
}