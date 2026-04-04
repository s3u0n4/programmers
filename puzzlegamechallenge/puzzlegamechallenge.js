function solution(diffs, times, limit) {
  let minLevel = 1; //가능한 최소 숙련도
  let maxLevel = 100000; //가능한 최대 숙련도(level)
  let answer = maxLevel; //정답을 저장할 변수(일단 최대값으로 시작) , 큰값으로 시작해서 더 작은 값 발견하면 계속 갱신

  while (minLevel <= maxLevel) {
    //이분 탐색 시작(탐색 범위가 남아있는 동안 반복)
    let currentLevel = Math.floor((minLevel + maxLevel) / 2); //현재 가정하는 숙련도
    let total = 0; //이 숙련도로 모든 퍼즐을 풀때 걸리는 총 시간
    for (let i = 0; i < diffs.length; i++) {
      //모든 퍼즐을 하나씩 확인
      if (diffs[i] <= currentLevel) {
        //숙련도가 충분하면
        total += times[i]; //바로 클리어
      } else {
        //숙련도가 부족하면
        let prev = 0;
        if (i > 0) {
          prev = times[i - 1];
        }
        let mistake = diffs[i] - currentLevel; //틀리는 횟수
        total += (times[i] + prev) * mistake + times[i]; // 틀릴때마다 현재 퍼즐 + 이전 퍼즐 +  현재 퍼즐 다시 풀기
      }
      if (total > limit) break; //제한 시간 넘으면 중단
    }

    if (total <= limit) {
      //제한 시간 안에 클리어 가능
      answer = currentLevel;
      maxLevel = currentLevel - 1; // 더 낮은 숙련도 가능 여부
    } else {
      minLevel = currentLevel + 1;
    }
  }

  return answer;
}
