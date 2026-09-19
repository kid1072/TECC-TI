import type { Question } from '../types/test'

export const questions: Question[] = [
  {
    id: 1,
    prompt: '你有一个完全自由的周末，最想怎么过？',
    options: [
      { id: 'A', label: '给一个远方的孩子写一封长长的信，分享最近读的书和一件开心的事。', score: 'ME' },
      { id: 'B', label: '带上相机，去老街巷里走走，记录那些快要消失的民俗和故事。', score: 'CH' },
      { id: 'C', label: '参加一场城市无障碍体验活动，坐着轮椅走一遍市中心的路线，看看哪里还需要改进。', score: 'HF' },
      { id: 'D', label: '报名一个非遗手工工作坊，亲手做一件传统小物件。', score: 'CH' },
    ],
  },
  {
    id: 2,
    prompt: '如果朋友发来一条语音，说“我今天有点难过”，你最可能怎么回复？',
    options: [
      { id: 'A', label: '马上打电话过去，陪他聊到心情好起来。', score: 'ME' },
      { id: 'B', label: '给他发一个搞笑视频，再约他周末去公园散步。', score: 'HF' },
      { id: 'C', label: '给他讲一个历史上类似处境的人如何走出来的故事。', score: 'CH' },
      { id: 'D', label: '默默记下，第二天给他带一份小礼物或写一张卡片。', score: 'ME' },
    ],
  },
  {
    id: 3,
    prompt: '在团队里，你更愿意担任什么角色？',
    options: [
      { id: 'A', label: '策划者，设计活动流程，确保每个环节都顺畅。', score: 'HF' },
      { id: 'B', label: '记录者，把大家的想法和活动过程整理成文字或影像。', score: 'CH' },
      { id: 'C', label: '陪伴者，一对一跟服务对象建立长期信任关系。', score: 'ME' },
      { id: 'D', label: '倡导者，对外发声，让更多人关注这个议题。', score: 'HF' },
    ],
  },
  {
    id: 4,
    prompt: '面对一个社会问题，你首先会？',
    options: [
      { id: 'A', label: '去实地看看，亲身体验，记录真实情况。', score: 'HF' },
      { id: 'B', label: '查阅资料，了解它的历史和文化背景。', score: 'CH' },
      { id: 'C', label: '找相关的人聊一聊，听听他们的故事和需求。', score: 'ME' },
      { id: 'D', label: '思考如何设计一个可持续的项目来解决它。', score: 'HF' },
    ],
  },
  {
    id: 5,
    prompt: '以下哪种活动最让你有参与感？',
    options: [
      { id: 'A', label: '为盲童录制一本有声读物，用声音演绎故事。', score: 'HF' },
      { id: 'B', label: '带城市随迁子女用代码画一颗星星。', score: 'ME' },
      { id: 'C', label: '和认知症长者一起在校园里办一场游园会。', score: 'HF' },
      { id: 'D', label: '参加一场无障碍剧本杀，在复旦校史里解谜。', score: 'HF' },
    ],
  },
  {
    id: 6,
    prompt: '你更认同哪句话？',
    options: [
      { id: 'A', label: '“每个孩子都值得被看见。”', score: 'ME' },
      { id: 'B', label: '“每个人都可能成为有障者，所以无障碍是每个人的事。”', score: 'HF' },
      { id: 'C', label: '“文化不灭，是因为有人记得。”', score: 'CH' },
    ],
  },
  {
    id: 7,
    prompt: '如果让你选一个项目长期参与，你会选？',
    options: [
      { id: 'A', label: '蓝信封书信陪伴：和乡村儿童一对一通信。', score: 'ME' },
      { id: 'B', label: '不落地飞行：亲身体验轮椅出行，制作无障碍指南。', score: 'HF' },
      { id: 'C', label: '聆听手艺：采访非遗传承人，记录口述史。', score: 'CH' },
      { id: 'D', label: '悠悠旦认知症友好：陪伴长者制作回忆录。', score: 'HF' },
    ],
  },
  {
    id: 8,
    prompt: '你更擅长哪种沟通方式？',
    options: [
      { id: 'A', label: '文字表达，写信、写文案。', score: 'ME' },
      { id: 'B', label: '面对面交流，倾听和陪伴。', score: 'ME' },
      { id: 'C', label: '用声音传递情感，录音、解说。', score: 'HF' },
      { id: 'D', label: '用影像记录，拍摄和剪辑。', score: 'CH' },
    ],
  },
  {
    id: 9,
    prompt: '你希望自己拥有哪种技能？',
    options: [
      { id: 'A', label: '能写出打动人的解说词，让视障者“看”懂电影。', score: 'HF' },
      { id: 'B', label: '能设计有趣的课程，让乡村孩子爱上学习。', score: 'ME' },
      { id: 'C', label: '能采访和整理口述史，留住老手艺人的记忆。', score: 'CH' },
      { id: 'D', label: '能策划一场融合活动，让不同群体玩在一起。', score: 'HF' },
    ],
  },
  {
    id: 10,
    prompt: '以下哪个场景最让你有成就感？',
    options: [
      { id: 'A', label: '孩子说：“因为你，我想考大学。”', score: 'ME' },
      { id: 'B', label: '视障朋友说：“这是我第一次‘看’懂电影。”', score: 'HF' },
      { id: 'C', label: '老人说：“谢谢你，让年轻人知道我们的手艺。”', score: 'CH' },
      { id: 'D', label: '认知症长者说：“我记得你，你上次陪我做的回忆录。”', score: 'HF' },
    ],
  },
  {
    id: 11,
    prompt: '你更想探索哪个社会议题？',
    options: [
      { id: 'A', label: '教育资源不均与乡村儿童成长。', score: 'ME' },
      { id: 'B', label: '无障碍环境与障碍群体权益。', score: 'HF' },
      { id: 'C', label: '非遗保护与城市文化记忆。', score: 'CH' },
    ],
  },
  {
    id: 12,
    prompt: '最后，选一句你的公益宣言：',
    tieBreaker: true,
    options: [
      { id: 'A', label: '“每个孩子都值得被看见，每个梦想都值得被守护。”', score: 'ME' },
      { id: 'B', label: '“每个人都可能成为有障者，所以无障碍是每个人的事。”', score: 'HF' },
      { id: 'C', label: '“文化不灭，是因为有人记得，有人记录，有人传承。”', score: 'CH' },
    ],
  },
]
