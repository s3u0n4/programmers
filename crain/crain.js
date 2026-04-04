function solution(storage, requests) {
  const n = storage.length; // n= 세로 길이
  const m = storage[0].length; //m= 가로 길이
  const map = []; //확장된 창고를 저장할 2차원 배열

  // 바깥 한 겹 추가
  for (let i = 0; i < n + 2; i++) {
    //위,아래로 한줄 씩 더 만들기 위해 n+2
    map[i] = []; //행 초기화
    for (let j = 0; j < m + 2; j++) {
      //좌우도 똑같이
      map[i][j] =
        i === 0 || j === 0 || i === n + 1 || j === m + 1
          ? "."
          : storage[i - 1][j - 1];
    }
  }

  const spread = () => {
    //외부 공기를 퍼뜨리는 함수
    let changed = true; //공기가 퍼졌는지 확인하는 함수
    while (changed) {
      //더 이상 퍼질 게 없을 때까지 반복
      changed = false; //일단 변화가 없다고 가정
      for (
        let i = 1;
        i <= n;
        i++ //내부 영역만 탐색
      )
        for (let j = 1; j <= m; j++)
          if (
            map[i][j] === "0" && //아직 외부와 연결 안된 빈칸이면
            (map[i - 1][j] === "." ||
              map[i + 1][j] === "." ||
              map[i][j - 1] === "." ||
              map[i][j + 1] === ".") //상하좌우 하나라도 외부 공기면
          ) {
            map[i][j] = ".";
            changed = true; //다시 한번 더 검사해야하므로
          }
    }
  };

  for (let req of requests) {
    //요청 하나씩 처리
    const t = req[0]; //제거할 문자

    if (req.length === 1) {
      //길이가 1이면 지게차
      spread(); // 외부 공기 확장

      const remove = []; //제거할 좌표 저장
      for (let i = 1; i <= n; i++)
        for (let j = 1; j <= m; j++)
          if (
            map[i][j] === t && //target 문자 이고
            (map[i - 1][j] === "." ||
              map[i + 1][j] === "." ||
              map[i][j - 1] === "." ||
              map[i][j + 1] === ".") //외부공기와 닿아있으면
          )
            remove.push([i, j]); //제거 리스트에 추가

      for (let [x, y] of remove) map[x][y] = "0"; //0으로 제거
    } else {
      //길이가 2 이상이면
      for (let i = 1; i <= n; i++)
        for (let j = 1; j <= m; j++) if (map[i][j] === t) map[i][j] = "0"; //해당문자열 전부 재거
    }
  }

  spread();

  let count = 0;
  for (let i = 1; i <= n; i++)
    for (
      let j = 1;
      j <= m;
      j++ //내부 탐색  바깥에 한줄 추가했기 때문에
    )
      if (map[i][j] !== "." && map[i][j] !== "0") count++; //0도 아니고 외부칸도 아닌 것만 카운트

  return count;
}
