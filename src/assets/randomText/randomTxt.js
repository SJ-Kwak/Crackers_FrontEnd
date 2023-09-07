import { selectedJobIndex } from "src/screens/ChooseJob.js"

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

export const randomTxt = () => {
    if (selectedJobIndex==0) {
        const randomIndex = Math.floor(Math.random() * cafe.length);
        return cafe[randomIndex];
    }
    else if (selectedJobIndex==1) {
        const randomIndex = Math.floor(Math.random() * convenient.length);
        return convenient[randomIndex];        
    }
    else if (selectedJobIndex==2) {
        const randomIndex = Math.floor(Math.random() * restaurant.length);
        return restaurant[randomIndex];        
    }
    else if (selectedJobIndex==3) {
        const randomIndex = Math.floor(Math.random() * education.length);
        return education[randomIndex];        
    }
    else if (selectedJobIndex==5) {
        const randomIndex = Math.floor(Math.random() * logistics.length);
        return logistics[randomIndex];        
    }
    else {
        const randomIndex = Math.floor(Math.random() * basic.length);
        return basic[randomIndex];          
    }
}

const basic = [
    "오늘도\n 버텨보기",
    "오늘의\n 알바는?",
    "오늘도\n 돈 벌자",
    "실시간으로\n 돈 쌓기",
    "뭐니뭐니해도\n 머니",
    "오늘도\n 알바찬 하루",
    "출근이\n 반이다",
    "오늘\n 하루도\n 파이팅",
    "렛츠\n 머니타임",
    "알바생이\n 귀여우면 됐지"
]

const cafe = [
    "오늘도\n 버텨보기",
    "오늘의\n 알바는?",
    "오늘도\n 돈 벌자",
    "실시간으로\n 돈 쌓기",
    "뭐니뭐니해도\n 머니",
    "오늘도\n 알바찬 하루",
    "출근이\n 반이다",
    "오늘\n 하루도\n 파이팅",
    "렛츠\n 머니타임",
    "알바생이\n 귀여우면 됐지",
    "샷 내릴 땐\n 손목 조심",
    "커피머신으로\n 변신",
    "스무디는\n 제발 그만",
    "카페의 매출은\n 내가 지킨다",
    "단일 메뉴로\n 통일은 안될까요?"
]

const convenient = [
    "오늘도\n 버텨보기",
    "오늘의\n 알바는?",
    "오늘도\n 돈 벌자",
    "실시간으로\n 돈 쌓기",
    "뭐니뭐니해도\n 머니",
    "오늘도\n 알바찬 하루",
    "출근이\n 반이다",
    "오늘\n 하루도\n 파이팅",
    "렛츠\n 머니타임",
    "알바생이\n 귀여우면 됐지",
    "오늘 폐기\n 뭐 있지?",
    "오는 돈이 고와야\n 가는 물건이 곱다",
    "민증 없으면\n 돌아가",
    "알바생은\n 존댓말로\n 불러주세요"
]

const restaurant = [
    "오늘도\n 버텨보기",
    "오늘의\n 알바는?",
    "오늘도\n 돈 벌자",
    "실시간으로\n 돈 쌓기",
    "뭐니뭐니해도\n 머니",
    "오늘도\n 알바찬 하루",
    "출근이\n 반이다",
    "오늘\n 하루도\n 파이팅",
    "렛츠\n 머니타임",
    "알바생이\n 귀여우면 됐지",
    "자나깨나\n 기름 조심",
    "설거지옥\n 스타트"
]

const education = [
    "오늘도\n 버텨보기",
    "오늘의\n 알바는?",
    "오늘도\n 돈 벌자",
    "실시간으로\n 돈 쌓기",
    "뭐니뭐니해도\n 머니",
    "오늘도\n 알바찬 하루",
    "출근이\n 반이다",
    "오늘\n 하루도\n 파이팅",
    "렛츠\n 머니타임",
    "알바생이\n 귀여우면 됐지",
    "얘들아\n 선생님도\n 사람이야",
    "큰일이다\n 모르는 문제가\n 나타났다",
    "오늘 모르는 문제는\n 다음 시간에",
    "난 과제 미뤄도\n 넌 숙제 미루지마"
]

const logistics = [
    "오늘도\n 버텨보기",
    "오늘의\n 알바는?",
    "오늘도\n 돈 벌자",
    "실시간으로\n 돈 쌓기",
    "뭐니뭐니해도\n 머니",
    "오늘도\n 알바찬 하루",
    "출근이\n 반이다",
    "오늘\n 하루도\n 파이팅",
    "렛츠\n 머니타임",
    "알바생이\n 귀여우면 됐지",
    "돈과 허리를\n 등가교환",
    "오프라인 쇼핑을\n 애용하자"
]


const handleRandomTxt = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomPhoto = cards[randomIndex].source;
    setSelectedPhoto(randomPhoto);
    setIndex(randomIndex);
    console.log(index);
    //handleHowManyTimes(index);
  };