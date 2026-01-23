function solution(bandage, health, attacks) {
  let maxHealth = health; //최대 체력
  let curHealth = health; //현대 체력
  let combo = 0; // 연속으로 붕대 감는데 성공한 횟수
  let attackIndex = 0; //지금 처리할 공격 인덱스
  let lastTime = attacks[attacks.length - 1][0]; //마지막 공격까지의 시간

  for (let time = 1; time <= lastTime; time++) {
    if (time === attacks[attackIndex][0]) {
      //시간이 공격하는 시간이면
      curHealth -= attacks[attackIndex][1]; //현재 체력이 첫번째 공격 피해량 만큼 피가 닳음
      combo = 0;
      attackIndex++; //다음 공격차례
      if (curHealth <= 0) {
        //현재 체력이 0이하면
        return -1; //-1 반환
      }
    } else {
      //회복 시간
      combo++; // 1초마다 회복 되면 성공횟수가 오름
      curHealth += bandage[1]; // 초당 회복량만큼 피가 참
      if (combo === bandage[0]) {
        //성공횟수가 회복되는 총 시간과 같아지면
        curHealth += bandage[2]; //추가회복량만큼 회복됨
        combo = 0; //성공횟수는 0으로 됨
      }
      if (curHealth > maxHealth) {
        //최대체력보다 현재체력이 많으면
        curHealth = maxHealth; //최대채력과 같아짐
      }
    }
  }
  return curHealth;
}
