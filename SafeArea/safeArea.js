function solution(board) {
  let n = board.length; //보드의 크기
  let danger = []; //위험 지역을 표시할 2차원 배열

  //danger 배열 만들기 (전부 0으로 )
  for (let i = 0; i < n; i++) {
    //행을 하나씩 만들기
    danger[i] = []; //2차원 배열에서 행(row)을 하나 만드는 코드
    for (let j = 0; j < n; j++) {
      // 열을 하나씩 만들기
      danger[i][j] = 0; // 원본 board를 망치지 않기 위해 관리
    }
  }

  for (let i = 0; i < n; i++) {
    //모든 행 검사
    for (let j = 0; j < n; j++) {
      // 모든 열 검사
      if (board[i][j] === 1) {
        //현재 위치가 지뢰라면
        danger[i][j] = 1; // 지뢰 위치 자체도 위험 표시

        for (let x = i - 1; x <= i + 1; x++) {
          // (i,j)기준 위,아래,오른쪽,왼쪽,대각선 전부 체크
          for (let y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < n && y >= 0 && y < n) {
              //배열 밖으로 나가지 않게 막음
              danger[x][y] = 1; // 주변 칸을 위험 지역으로 표시
            }
          }
        }
      }
    }
  }
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (danger[i][j] === 0) count++; //안전지대 세기
    }
  }
  return count;
}
