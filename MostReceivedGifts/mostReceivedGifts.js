function solution(friends, gifts) {
  const n = friends.length; //많이 쓸 예정이라

  const index = {};
  for (let i = 0; i < n; i++) {
    // 친구 이름을 숫자로
    index[friends[i]] = i;
  }

  let table = []; // 선물 기록 테이블 생성
  for (let i = 0; i < n; i++) {
    table[i] = []; //행 생성
    for (let j = 0; j < n; j++) {
      table[i][j] = 0; //열 생성, i가 j에게 준 선물 개수
    }
  }

  for (let i = 0; i < gifts.length; i++) {
    //선물 기록 채우기
    let [from, to] = gifts[i].split(" "); //선물 기록 하나씩 확인
    table[index[from]][index[to]]++; //a가 b에게 준 선물 횟수 +1
  }

  let giftScore = []; //선물 지수 계산
  for (let i = 0; i < n; i++) {
    //각 친구의 선물 지수 저장 배열
    let give = 0;
    let take = 0;

    for (let j = 0; j < n; j++) {
      give += table[i][j];
      take += table[j][i];
    }

    giftScore[i] = give - take;
  }

  let next = []; //다음 달 받을 선물 개수
  for (let i = 0; i < n; i++) {
    next[i] = 0;
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      //i 이후 친구들과 비교(중복 방지)
      if (table[i][j] > table[j][i]) {
        next[i]++;
      } else if (table[i][j] < table[j][i]) {
        next[j]++;
      } else {
        //준 횟수가 같을 때
        if (giftScore[i] > giftScore[j]) {
          next[i]++;
        } else if (giftScore[i] < giftScore[j]) {
          next[j]++;
        }
      }
    }
  }

  let answer = 0;
  for (let i = 0; i < n; i++) {
    if (next[i] > answer) answer = next[i]; //최댓값 구하는 법
  }

  return answer;
}
