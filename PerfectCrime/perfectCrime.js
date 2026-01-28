function solution(info, n, m) {
  let dp = [];
  for (let i = 0; i < n; i++) {
    dp[i] = [];
    for (let j = 0; j < m; j++) {
      dp[i][j] = false; //처음엔 전부 불가능
    }
  }

  dp[0][0] = true; //아무것도 안훔친 상태

  for (let i = 0; i < info.length; i++) {
    //이번 물건을 훔친 결과 상태 저장용
    let next = []; //이번 물건을 훔친 후의 상태 저장용 배열

    for (let a = 0; a < n; a++) {
      next[a] = []; //next 배열의 행 생성
      for (let b = 0; b < m; b++) {
        next[a][b] = false; // next 배열도 전부 false로 초기화
      }
    }

    let aCost = info[i][0]; //현재 물건을 A가 훔치면 남기는 흔적 수
    let bCost = info[i][1]; //현재 물건을 B가 훔치면 남기는 흔적 수

    for (let a = 0; a < n; a++) {
      //현재 가능한 A흔적 상태들 확인
      for (let b = 0; b < m; b++) {
        //현재 가능한 B흔적 상태들 확인
        if (!dp[a][b]) continue; //이 상태가 불가능하면 패스

        if (a + aCost < n) {
          //A가 이 물건을 훔쳐도 안 잡히는 지
          next[a + aCost][b] = true; //A가 훔친 결과 상태 저장
        }

        if (b + bCost < m) {
          //B가 이 물건을 훔쳐도 안잡히는 지
          next[a][b + bCost] = true; //B가 훔친 결과 상태 저장
        }
      }
    }
    dp = next; //다음 물건을 위해 DP상태 갱신
  }
  for (let a = 0; a < n; a++) {
    //A흔적이 작은 것부터 확인
    for (let b = 0; b < m; b++) {
      //B흔적 조건 만족하는지 확인
      if (dp[a][b]) {
        //가능한 상태 발견
        return a; //가장 작은 A흔적
      }
    }
  }
  return -1; //어떤 방법으로도 완전범죄 불가능
}
