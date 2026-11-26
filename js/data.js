// ============================================================
// ChatWave — Static Data
// ============================================================

const AVATARS = [
  { seed: 'Priya',   bg: '#6c5ce7', emoji: '👩‍💻' },
  { seed: 'Fire',    bg: '#e17055', emoji: '🦊' },
  { seed: 'Ocean',   bg: '#0984e3', emoji: '🐬' },
  { seed: 'Forest',  bg: '#00b894', emoji: '🌿' },
  { seed: 'Sunny',   bg: '#fdcb6e', emoji: '☀️' },
  { seed: 'Galaxy',  bg: '#a29bfe', emoji: '🚀' },
];

const CONTACTS = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: { emoji: '👩‍🎨', bg: '#fd79a8' },
    status: 'online',
    lastSeen: 'Online',
    about: 'UI/UX Designer at Google | Coffee lover ☕',
    unread: 2,
    messages: [
      { from: 'them', text: 'Hey! Did you finish the project?', time: '9:10 AM', date: 'Today', reactions: [] },
      { from: 'me',   text: 'Almost! Just polishing the UI 🎨', time: '9:12 AM', date: 'Today', reactions: [] },
      { from: 'them', text: 'Looks great! The colors are 🔥', time: '9:14 AM', date: 'Today', reactions: ['❤️'] },
      { from: 'me',   text: 'Thanks! Bootstrap made it so much easier', time: '9:15 AM', date: 'Today', reactions: [] },
      { from: 'them', text: 'Are you using jQuery for the interactions?', time: '9:20 AM', date: 'Today', reactions: [] },
      { from: 'me',   text: 'Yes! jQuery + vanilla JS combo works perfectly 🚀', time: '9:21 AM', date: 'Today', reactions: [] },
      { from: 'them', text: 'Send me the GitHub link when it\'s done!', time: '9:22 AM', date: 'Today', reactions: [] },
      { from: 'them', text: 'Super excited to see the final version 😍', time: '9:23 AM', date: 'Today', reactions: [] },
    ]
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    avatar: { emoji: '👨‍💻', bg: '#74b9ff' },
    status: 'online',
    lastSeen: 'Online',
    about: 'Full Stack Dev | Node.js | React | Coffee > Sleep',
    unread: 1,
    messages: [
      { from: 'them', text: 'Bhai, interview kaise gaya?', time: '8:00 AM', date: 'Today', reactions: [] },
      { from: 'me',   text: 'Ek dum mast! They asked about event loop 😅', time: '8:05 AM', date: 'Today', reactions: [] },
      { from: 'them', text: 'Classic! And you nailed it right?', time: '8:06 AM', date: 'Today', reactions: [] },
      { from: 'me',   text: 'Obviously 💪 Also built this chat app as portfolio', time: '8:10 AM', date: 'Today', reactions: [] },
      { from: 'them', text: 'Dude, your portfolio is insane!', time: '8:11 AM', date: 'Today', reactions: ['🔥'] },
      { from: 'them', text: 'Let me know when the offer letter comes 🎉', time: '8:12 AM', date: 'Today', reactions: [] },
    ]
  },
  {
    id: 3,
    name: 'Sneha Patel',
    avatar: { emoji: '👩‍🔬', bg: '#55efc4' },
    status: 'away',
    lastSeen: 'Last seen 30 min ago',
    about: 'Data Scientist | ML enthusiast | Python 🐍',
    unread: 0,
    messages: [
      { from: 'them', text: 'Hey Priya! Joining the hackathon?', time: 'Yesterday', date: 'Yesterday', reactions: [] },
      { from: 'me',   text: 'YES! Team of 3 okay?', time: 'Yesterday', date: 'Yesterday', reactions: [] },
      { from: 'them', text: 'Perfect. What are we building?', time: 'Yesterday', date: 'Yesterday', reactions: [] },
      { from: 'me',   text: 'Real-time chat app with AI summarization!', time: 'Yesterday', date: 'Yesterday', reactions: ['😍', '🔥'] },
      { from: 'them', text: 'That is so cool. I am in 🙌', time: 'Yesterday', date: 'Yesterday', reactions: [] },
    ]
  },
  {
    id: 4,
    name: 'Dev Team 🚀',
    avatar: { emoji: '🛸', bg: '#6c5ce7' },
    status: 'group',
    lastSeen: '5 members',
    about: 'Our dev squad. Ship fast, break nothing 💻',
    unread: 0,
    isGroup: true,
    messages: [
      { from: 'them', sender: 'Rohit', text: 'PR is ready for review 🙏', time: '10:00 AM', date: 'Today', reactions: [] },
      { from: 'them', sender: 'Meera', text: 'On it! Give me 15 mins', time: '10:03 AM', date: 'Today', reactions: [] },
      { from: 'me',   text: 'Also update the README before merging', time: '10:05 AM', date: 'Today', reactions: [] },
      { from: 'them', sender: 'Rohit', text: 'Done ✅ README updated with setup steps', time: '10:20 AM', date: 'Today', reactions: ['👍', '❤️'] },
      { from: 'them', sender: 'Meera', text: 'Approved and merged! 🎉', time: '10:25 AM', date: 'Today', reactions: [] },
    ]
  },
  {
    id: 5,
    name: 'Arjun Verma',
    avatar: { emoji: '🧑‍🎤', bg: '#fdcb6e' },
    status: 'offline',
    lastSeen: 'Last seen 2 hours ago',
    about: 'DevOps | AWS | Kubernetes | Gym rat 🏋️',
    unread: 0,
    messages: [
      { from: 'them', text: 'Did you check the deployment pipeline?', time: 'Mon', date: 'Monday', reactions: [] },
      { from: 'me',   text: 'Yeah, CI is green 🟢', time: 'Mon', date: 'Monday', reactions: [] },
      { from: 'them', text: 'Netlify auto-deploy worked?', time: 'Mon', date: 'Monday', reactions: [] },
      { from: 'me',   text: 'Perfectly! Pushed to GitHub, it auto-deployed 🚀', time: 'Mon', date: 'Monday', reactions: ['🙌'] },
    ]
  },
  {
    id: 6,
    name: 'Priya\'s Notes 📝',
    avatar: { emoji: '📝', bg: '#b2bec3' },
    status: 'online',
    lastSeen: 'You',
    about: 'Save notes, links and ideas here',
    isSelf: true,
    unread: 0,
    messages: [
      { from: 'me', text: '📌 Portfolio projects:\n1. Netflix Clone ✅\n2. Chat App ✅\n3. Single Page Website\n4. Estate Price Estimator', time: '9:00 AM', date: 'Today', reactions: [] },
      { from: 'me', text: '🔗 Live: https://flourishing-biscuit-440050.netlify.app', time: '9:01 AM', date: 'Today', reactions: [] },
      { from: 'me', text: '💡 Remember to add README to all repos!', time: '9:02 AM', date: 'Today', reactions: [] },
    ]
  }
];

const EMOJIS = [
  '😀','😂','😍','🥰','😎','🤔','😅','🙏',
  '👍','👎','❤️','🔥','🎉','💯','🚀','✅',
  '😭','😤','🤣','😇','🥳','🤯','😱','🤩',
  '👏','💪','🙌','✌️','🤞','👋','💬','📌',
  '🌟','⚡','🎯','💡','🔗','📱','💻','🌈',
];

const AUTO_REPLIES = {
  1: [
    "That sounds amazing! 😍",
    "I totally agree with you!",
    "Haha yes! Bootstrap + jQuery is a classic combo 🙌",
    "Send it to me when done, I'll give feedback!",
    "You're doing great Priya! Keep it up 💪",
    "Oh wow, really? Tell me more!",
  ],
  2: [
    "Bhai tu toh genius hai 🔥",
    "Seriously though, your projects are fire!",
    "Portfolio game strong 💪",
    "Let's celebrate when you get the offer!",
    "You got this! 🚀",
  ],
  3: [
    "That's such a cool idea!",
    "ML + Chat? That's next level 🤯",
    "Count me in for the hackathon!",
    "Let's win this 🏆",
  ],
  4: [
    "On it! 👍",
    "Let me check the logs real quick",
    "LGTM 🚀",
    "Merged! Great work everyone 🎉",
    "CI passing ✅",
  ],
  5: [
    "Deployment looks solid!",
    "Auto-deploy is a lifesaver 🙌",
    "AWS costs are down this month btw",
    "Nice! Kubernetes cluster is healthy too 🟢",
  ],
  6: []
};
