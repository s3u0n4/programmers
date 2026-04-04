function record(log, t, r, c) {
  //현재 시간과 위치를 기록지에 도장 찍는 역할
  const key = `${t},${r},${c}`; //"시간, 행, 열" 을 하나의 문자열 키로 만듦
  log.set(key, (log.get(key) || 0) + 1); //이미 누군가 다녀갔다면 +1, 처음이면 1을 저장
}

function solution(points, routes) {
  //포인트 정보를 정리(숫자로 바로 좌표를 찾기 위함)
  const pointMap = {};
  points.forEach((p, i) => {
    pointMap[i + 1] = p; // 문제에서 포인트 번호는 1번부터 시작하므로 i+1을 키로 사용
  });

  const globalLog = new Map(); // 전 로봇의 "시간대별 위치"를 기록할 저장소

  routes.forEach((route) => {
    //각 로봇의 이동 경로를 하나씩 꺼내서 확인
    let time = 0; //이 로봇의 개별 시계 (0초부터 시작)

    let [curR, curC] = pointMap[route[0]]; //현재 위치를 시작점으로 설정

    record(globalLog, time, curR, curC); //출발 지점(0초) 기록

    for (let i = 1; i < route.length; i++) {
      //로봇이 가야할 목적지들을 순서대로 순회
      const [targetR, targetC] = pointMap[route[i]]; // 이번에 가야 할 목표 좌표

      // 1. r(세로) 좌표부터 먼저 맞추기
      while (curR !== targetR) {
        curR += curR < targetR ? 1 : -1; // 목표보다 작으면 아래로 (+1), 크면 위로(-1) 이동
        time++; // 이동했으니 1초 증가
        record(globalLog, time, curR, curC); //이동한 위치와 시간 기록
      }

      // 2. 그 다음 c(가로) 좌표 맞추기
      while (curC !== targetC) {
        curC += curC < targetC ? 1 : -1; // 목표보다 작으면 오른쪽으로(+1) , 크면 왼쪽으로(-1) 이동
        time++; // 이동했으니 1초 증가
        record(globalLog, time, curR, curC); //이동한 위치와 시간 기록
      }
    }
  });

  let dangerCount = 0; //충돌 횟수 계산
  for (let count of globalLog.values()) {
    //globalLog에 저장된 모든 방문 횟수(count) 를 확인
    if (count >= 2) {
      //같은 시간, 같은 장소에 2대 이상의 로봇이 있었다면 위험
      dangerCount++;
    }
  }
  return dangerCount;
}
