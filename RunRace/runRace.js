function solution(players, callings) {
  const map = new Map(); //선수 이름을 현재위치(인덱스)에 저장
  for (let i = 0; i < players.length; i++) {
    map.set(players[i], i); //인덱스에 숫자 저장
  }

  for (let name of callings) {
    //호출된 선수 하나씩 처리
    let idx = map.get(name); //현재 선수 위치 찾기
    let front = players[idx - 1]; //앞에 있는 선수 위치 찾기
    players[idx - 1] = name; //배열에서 자리 바꾸기
    players[idx] = front;

    map.set(name, idx - 1); //map도 변경
    map.set(front, idx);
  }
  return players;
}
