function solution(video_len, pos, op_start, op_end, commands) {
  function toSecond(time) {
    // 시간을 다 초로 만듬
    let [m, s] = time.split(":").map(Number); // ':' 를 기준으로 나누고 split의 결과는 문자열이기 때문에 계산하려면 무조건 Number로 변환해야함
    return m * 60 + s;
  }

  function toTime(sec) {
    //초를 다시 mm:ss로 바꾸는 형식
    let m = String(Math.floor(sec / 60)).padStart(2, "0");
    let s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }
  //주어진 모든 변수를 초로 바꿈
  let video = toSecond(video_len);
  let current = toSecond(pos);
  let opStart = toSecond(op_start);
  let opEnd = toSecond(op_end);

  function skipOpening(time) {
    //현재 시간이 오프닝일 때 구하는 함수
    if (time >= opStart && time < opEnd) {
      time = opEnd;
    }
    return time;
  }

  for (let i = 0; i < commands.length; i++) {
    current = skipOpening(current); //현재 시간이 오프닝이면 오프닝 끝나는 시간으로 바꿔야함

    if (commands[i] === "prev") {
      // commands가 prev이면
      current -= 10; // 10초를 빼주고
      if (current < 0) current = 0; //계산한 결과가 0보다 작으면 0초로 됨
    } else {
      // next이면
      current += 10; // 10초 더해주고
      if (current > video) current = video; //계산한 결과가 비디오 재생시간보다 크면 비디오 길이의 끝으로 됨
    }
    current = skipOpening(current); //계산이 끝난 시간이 오프닝하는 시간이면 오프닝 끝나는 시간으로 바꿔야함
  }
  return toTime(current); //현재 시간을 다시 분,초로 바꿔야함
}
