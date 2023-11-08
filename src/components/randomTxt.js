/*
  "카페 베이커리",
  "편의점",
  "레스토랑",
  "학원·과외",
  "배달",
  "물류·포장",
  "공연·전시스탭",
  "기타",
*/

export const randomTxt = async (selectedJobIndex: number) => {
  if (selectedJobIndex === 0) {
    const randomIndex = Math.floor(Math.random() * cafe.length);
    return cafe[randomIndex];
  } else if (selectedJobIndex === 1) {
    const randomIndex = Math.floor(Math.random() * convenient.length);
    return convenient[randomIndex];
  } else if (selectedJobIndex === 2) {
    const randomIndex = Math.floor(Math.random() * restaurant.length);
    return restaurant[randomIndex];
  } else if (selectedJobIndex === 3) {
    const randomIndex = Math.floor(Math.random() * education.length);
    return education[randomIndex];
  } else if (selectedJobIndex === 5) {
    const randomIndex = Math.floor(Math.random() * logistics.length);
    return logistics[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * basic.length);
    return basic[randomIndex];
  }
};

const basic = [
  "오늘도\n버텨보기",
  "오늘의\n알바는?",
  "오늘도\n돈 벌자",
  "실시간으로\n돈 쌓기",
  "뭐니뭐니해도\n머니",
  "오늘도\n알바찬 하루",
  "출근이\n반이다",
  "오늘\n하루도\n파이팅",
  "렛츠\n머니타임",
  "알바생이\n귀여우면 됐지",
];

const cafe = [
  "오늘도\n버텨보기",
  "오늘의\n알바는?",
  "오늘도\n돈 벌자",
  "실시간으로\n돈 쌓기",
  "뭐니뭐니해도\n머니",
  "오늘도\n알바찬 하루",
  "출근이\n반이다",
  "오늘\n하루도\n 파이팅",
  "렛츠\n머니타임",
  "알바생이\n귀여우면 됐지",
  "샷 내릴 땐\n손목 조심",
  "커피머신으로\n변신",
  "스무디는\n제발 그만",
  "카페의 매출은\n내가 지킨다",
  "단일 메뉴로\n통일은 안될까요?",
];

const convenient = [
  "오늘도\n버텨보기",
  "오늘의\n알바는?",
  "오늘도\n돈 벌자",
  "실시간으로\n돈 쌓기",
  "뭐니뭐니해도\n머니",
  "오늘도\n알바찬 하루",
  "출근이\n반이다",
  "오늘\n하루도\n파이팅",
  "렛츠\n머니타임",
  "알바생이\n귀여우면 됐지",
  "오늘 폐기\n뭐 있지?",
  "오는 돈이 고와야\n가는 물건이 곱다",
  "민증 없으면\n돌아가",
  "알바생은\n존댓말로\n불러주세요",
];

const restaurant = [
  "오늘도\n버텨보기",
  "오늘의\n알바는?",
  "오늘도\n돈 벌자",
  "실시간으로\n돈 쌓기",
  "뭐니뭐니해도\n머니",
  "오늘도\n알바찬 하루",
  "출근이\n반이다",
  "오늘\n하루도\n파이팅",
  "렛츠\n머니타임",
  "알바생이\n귀여우면 됐지",
  "자나깨나\n기름 조심",
  "설거지옥\n스타트",
];

const education = [
  "오늘도\n버텨보기",
  "오늘의\n알바는?",
  "오늘도\n돈 벌자",
  "실시간으로\n돈 쌓기",
  "뭐니뭐니해도\n머니",
  "오늘도\n알바찬 하루",
  "출근이\n반이다",
  "오늘\n하루도\n파이팅",
  "렛츠\n머니타임",
  "알바생이\n귀여우면 됐지",
  "얘들아\n선생님도\n사람이야",
  "큰일이다\n모르는 문제가\n나타났다",
  "오늘 모르는 문제는\n다음 시간에",
  "난 과제 미뤄도\n넌 숙제 미루지마",
];

const logistics = [
  "오늘도\n버텨보기",
  "오늘의\n알바는?",
  "오늘도\n돈 벌자",
  "실시간으로\n돈 쌓기",
  "뭐니뭐니해도\n머니",
  "오늘도\n알바찬 하루",
  "출근이\n반이다",
  "오늘\n하루도\n파이팅",
  "렛츠\n머니타임",
  "알바생이\n귀여우면 됐지",
  "돈과 허리를\n등가교환",
  "오프라인 쇼핑을\n애용하자",
];
