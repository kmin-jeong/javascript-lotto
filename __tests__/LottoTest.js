const Lotto = require("../src/Lotto");
const { makeStrLotto } = require("../src/LottoView");
const {
  ProfitMessage,
  StatisticsMessage,
} = require("../src/constant/constant");
describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // 아래에 추가 테스트 작성 가능
  // 로또 테스트를 넣는다
  describe("로또 실행 테스트", () => {
    test("로또 한장과 당첨 번호 비교 테스트", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 7;
      const eachLotto = [1, 2, 3, 8, 17, 42];

      const result = lotto.comparisonEachothers(eachLotto, bonusNumber);

      expect(result).toEqual({ cnt: 3, bonusCnt: 0 });
    });
    test("로또 한장과 당첨 번호 비교 테스트->보너스 들어갈때", () => {
      const lotto = new Lotto([1, 4, 5, 7, 9, 33]);
      const bonusNumber = 7;
      const eachLotto = [1, 4, 5, 7, 17, 42];

      const result = lotto.comparisonEachothers(eachLotto, bonusNumber);

      expect(result).toEqual({ cnt: 4, bonusCnt: 1 });
    });
    test("뽑은 번호와 당첨 번호을 비교 후 같은 숫자의 값 -> 결과 반환 테스트.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const cnt = 4;
      const bonusCnt = 0;

      const result = lotto.sortRank(cnt, bonusCnt);

      expect(result).toEqual(4);
    });
  });
  // 여기서 부터 로또뷰 테스트
  describe("LottoView 테스트", () => {
    test("발행된 로또를 문자열로 전환 후 출력 테스트", () => {
      const input = [3, 18, 23, 29, 30, 38];
      const result = makeStrLotto(input);

      expect(result).toEqual("[3, 18, 23, 29, 30, 38]");
    });

    test("당첨 통계 메세지 출력 테스트", () => {
      const input = { three: 1, four: 0, five: 0, bonus: 0, six: 0 };
      const result = StatisticsMessage(input);

      expect(result).toEqual(
        "3개 일치 (5,000원) - 1개\n4개 일치 (50,000원) - 0개\n5개 일치 (1,500,000원) - 0개\n5개 일치, 보너스 볼 일치 (30,000,000원) - 0개\n6개 일치 (2,000,000,000원) - 0개\n"
      );
    });

    test("수익률 메세지 출력 테스트", () => {
      const input = 62.5;
      const result = ProfitMessage(input);

      expect(result).toEqual("총 수익률은 62.5%입니다.\n");
    });
  });
});
