function solution(schedules, timelogs, startday) {
  let answer = 0; //지각 안한 인원 수
  for (let i = 0; i < schedules.length; i++) {
    //직원 한 명씩 검사
    let goal = schedules[i] + 10;
    if (goal % 100 >= 60) {
      //60분 단위라서 보정 필요
      goal += 100; //시간 +1
      goal -= 60; // 분 -60
    }

    let cnt = 0;
    for (let j = 1; j < 7; j++) {
      //일주일 출근 기록
      let ref = j + startday; //실제 요일 기준, startday 기준으로 며칠째인지
      if (ref % 7 === 0 || ref % 7 === 6) {
        // 토,일은 검사 x
        continue;
      }
      if (goal < timelogs[i][j]) {
        // 한번이라도 늦으면 검사 x
        break;
      }
      ++cnt; //정상 출근
    }

    if (cnt === 5) {
      //5일 정상 출근하면
      ++answer; // 성공 직원 수 +1
    }
  }
  return answer;
}
