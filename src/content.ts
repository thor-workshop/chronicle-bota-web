// 문구의 근거는 게임의 data/text/ko.csv와 실제 조작·전투 코드입니다.
// 설명과 이야기 서술은 합니다체로 쓰며 실제 인용문은 원문을 보존합니다.
// [num:…], [status:…], [term:…]은 게임과 같은 의미로 강조합니다.
export const SITE = {
  name: 'Chronicle: Breach of the Abyss',
  short: 'CHRONICLE',
  tagline: '죽음이 사라진 세계',
  lead: '아스트랄은 별 연구를 증명할 단서를 찾아 불탄 학술원의 적들과 싸웁니다. 베아트리스는 떠나지 못한 혼령들을 보내기 위해 막힌 순례길을 뚫습니다.',
  description: '별 연구를 증명하려는 아스트랄과 혼령들을 떠나보내려는 베아트리스의 iOS·Android용 도트 액션 게임입니다. 순간이동과 기도로 적들을 상대하고, 레벨업 카드로 기술을 선택하고 강화합니다.',
  contact: 'thor128.workshop@gmail.com',
  maker: "Thor's Workshop",
  year: 2026,
}

export const LABELS = {
  skip: '본문으로 이동',
  navigation: '페이지 안내',
  game: '전투',
  heroes: '이야기',
  gameTitle: '전투와 성장',
  heroesTitle: '캐릭터와 이야기',
  heroesIntro: '앞으로 새로운 캐릭터가 계속 추가됩니다.',
  home: '소개 페이지',
  privacy: '개인정보처리방침',
  titleAlt: '벼락이 번쩍이는 하늘 아래 캐릭터들이 서 있는 Chronicle 타이틀 화면입니다.',
  pause: '움직임 멈추기',
  resume: '움직임 재생',
}

export const CONTROLS =
  '화면 왼쪽을 끌어 이동합니다. 오른쪽 아래 버튼으로 순간이동하거나 기도하고, 그 왼쪽 버튼으로 궁극기를 사용합니다.'

export const STORES = [
  { store: 'App Store', devices: 'iPhone · iPad', state: '출시 준비 중' },
  { store: 'Google Play', devices: 'Android', state: '출시 준비 중' },
]

export type Media = { motion?: string; still: string; alt: string }
export type Play = { id: 'astral' | 'beatrice'; character: string; title: string; body: string }
export const PLAY: Play[] = [
  {
    id: 'astral',
    character: '아스트랄',
    title: '블랙홀과 유성',
    body: '[term:특이점]을 최대치까지 모은 뒤 적들이 가까워지면 순간이동으로 빠져나갑니다. 원래 있던 자리에 생긴 블랙홀이 적들을 끌어모아 피해를 입힙니다. 이어서 궁극기 [term:유성]을 내려 주변 적들을 공격합니다.',
  },
  {
    id: 'beatrice',
    character: '베아트리스',
    title: '기도로 강화하는 천벌',
    body: '[term:천벌]이 다시 발동하기 전에 기도로 [term:수호령]을 [term:혼불]로 정화합니다. 다음 천벌은 혼불을 소모해 벼락을 [num:2번] 내리고 더 넓은 범위의 적들에게 피해를 입힙니다.',
  },
]

export const GROWTH = {
  title: '기술 선택과 강화',
  body: '레벨업에서 제시되는 카드 세 장 중 하나를 고릅니다. 새 기술을 배우는 레벨에서는 기술을 선택하고, 다른 레벨에서는 배운 기술이나 캐릭터의 능력치를 강화합니다.',
  hint: '카드를 누르면 전체 설명이 표시됩니다. 길게 누르면 해당 카드를 선택합니다.',
}

export type Hero = {
  id: 'astral' | 'beatrice'
  name: string
  epithet: string
  quote: string
  story: string
  play: string
  storyTitle: string
  scene: 'astral_library' | 'beatrice_temple'
}
export const HEROES: Hero[] = [
  {
    id: 'astral',
    name: '아스트랄',
    epithet: '쫓겨난 마법학자',
    quote: '별과 별 사이는 비어 있지 않다.',
    story: '학술원은 별의 목소리를 들었다는 아스트랄의 연구를 받아들이지 않고 그를 내쫓았습니다. 노트는 불태워졌지만 균열이 열린 밤에 떨어진 별의 위치가 적힌 한 장은 남았습니다. 아스트랄은 자신의 연구를 증명할 단서를 찾으러 불탄 학술원으로 돌아갑니다. 서기들의 잔상과 살아 움직이는 금서를 마법으로 물리치며 옛 관측탑으로 향합니다.',
    play: '별에서 온 마법으로 적들을 공격하고, [term:특이점]을 모아 블랙홀을 만듭니다.',
    storyTitle: '별이 보낸 것',
    scene: 'astral_library',
  },
  {
    id: 'beatrice',
    name: '베아트리스',
    epithet: '임종을 지키던 순례자',
    quote: '종을 울린다고 혼령이 갈 길까지 정할 수는 없습니다.',
    story: '베아트리스는 죽어 가는 이의 곁을 지키고 종을 울려 혼령을 고개 너머로 배웅하던 순례자입니다. 죽음이 사라진 뒤 혼령들은 떠나지 못하고 순례길에 머뭅니다. 혼령이 깃든 기도 돌과 깃발까지 길을 막자 베아트리스는 종을 들고 빛의 마법으로 적들과 싸웁니다. 혼령들이 다시 떠날 수 있도록 막힌 길을 열어 갑니다.',
    play: '곁을 지키는 [term:수호령]을 기도로 정화하고, [term:혼불]로 기술을 강화합니다.',
    storyTitle: '떠나보내는 자',
    scene: 'beatrice_temple',
  },
]

export const UPCOMING = {
  name: '시오리',
  state: 'COMING SOON',
  body: '시오리의 이야기를 준비하고 있습니다.',
  alt: '곧 추가될 캐릭터 시오리의 실루엣입니다.',
}

export const CAPTIONS = {
  astralCombat: '아스트랄이 순간이동으로 블랙홀을 만든 뒤 유성을 내려 적들을 공격하는 터치 모드 전투 화면입니다.',
  beatriceCombat: '베아트리스가 수호령을 혼불로 정화한 뒤 강화된 천벌로 적들을 공격하는 터치 모드 전투 화면입니다.',
  astralCards: '아스트랄의 레벨업 화면입니다. 효과 설명이 적힌 카드 세 장 중 하나를 선택합니다.',
  beatriceCards: '베아트리스의 레벨업 화면입니다. 효과 설명이 적힌 카드 세 장 중 하나를 선택합니다.',
}

export const PRIVACY = {
  date: '적용 대상 · 0.6.0 알파 게임과 소개 사이트',
  lead: '진행 정보는 기기에 보관합니다. 새 소식은 GitHub Pages에서 받으며 멀티플레이 시험은 같은 네트워크의 참가자와 연결합니다.',
  description: 'Chronicle: Breach of the Abyss 0.6.0 알파의 기기 저장, 새 소식 통신, 멀티플레이 시험과 사용 권한을 안내합니다.',
  sections: [
    { title: '계정과 분석', body: '이번 알파에서는 계정과 온라인 순위 기능을 제공하지 않습니다. 광고나 이용 분석 도구를 사용하지 않습니다. 게임에서 이름, 연락처나 위치 정보를 입력받지 않으며 개발자가 개인 플레이 기록을 수집하는 기능은 없습니다.' },
    { title: '기기 저장', body: '설정, 해금, 플레이 기록과 이어 할 판은 기기에 저장합니다. 멀티플레이 시험의 결과와 새 소식의 본문, 그림, 읽음 상태도 기기에 보관합니다. 게임이 개인 진행 기록을 개발자 서버로 전송하는 기능은 없습니다. 앱을 삭제하거나 운영체제에서 앱 데이터를 지우면 이 정보도 삭제될 수 있습니다.' },
    { title: '새 소식 통신', body: '제목 화면에 처음 들어오거나 새 소식에서 새로고침을 누르면 HTTPS로 GitHub Pages에 연결해 공지를 받습니다. 글에 포함된 그림은 해당 글을 열 때 받습니다. 플레이 기록과 읽음 상태를 전송하지 않습니다. 연결할 수 없으면 게임에 포함된 소식과 보관한 소식을 보여 줍니다.' },
    { title: '멀티플레이 시험', body: '같은 Wi-Fi의 방장과 참가자가 직접 연결합니다. 연결 주소와 세션 식별 값, 선택한 캐릭터와 유물, 조작 입력, 전투 상태와 선택 결과를 함께하는 전투에 사용합니다. 이 정보는 같은 방의 기기 사이에서 전송하며 개발자 서버로 보내지 않습니다. 로컬 멀티플레이 통신은 암호화하지 않습니다. 방에 참가한 동안 연결 주소와 전투 상태를 다른 참가 기기가 처리합니다.' },
    { title: '사용 권한', body: 'Android에서는 새 소식과 멀티플레이 연결에 인터넷 권한을 사용하고 전투와 조작의 진동 효과에 진동 권한을 사용합니다. iOS에서는 같은 Wi-Fi의 참가자와 연결할 때 로컬 네트워크 접근을 요청합니다. 카메라, 마이크와 사진 보관함에 접근하지 않습니다.' },
    { title: '서비스 제공업체', body: '소개 사이트와 새 소식 자료는 GitHub Pages에서 제공합니다. 사이트에는 계정, 쿠키와 이용 분석 도구가 없습니다. GitHub는 보안 목적으로 사이트 방문과 새 소식 요청의 IP 주소를 기록하고 보관합니다. 이 정보의 처리는 GitHub의 개인정보처리방침을 따릅니다.', link: { label: 'GitHub 개인정보처리방침', href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement' } },
    { title: '문의와 피드백', body: '문의나 피드백을 이메일로 보내시면 발신 주소와 직접 적은 내용을 받습니다. 문의 응대와 게임 개선에 사용합니다. 불필요한 개인정보는 적지 않아도 됩니다. 보관이나 삭제에 관한 요청은 아래 이메일로 보내실 수 있습니다.' },
    { title: '테스트 대상', body: '이번 비공개 알파 테스트는 13세 이상 이용자를 대상으로 합니다. 이용자의 나이와 생년월일을 게임에서 수집하지 않습니다.' },
    { title: '내용 변경', body: '개인정보 처리 방식이 바뀌면 이 페이지와 게임의 새 소식에 변경 내용과 적용 대상을 안내합니다.' },
  ],
  contactTitle: '문의',
  contactBody: '개인정보 처리에 관한 문의는 아래 이메일로 보내실 수 있습니다.',
}
