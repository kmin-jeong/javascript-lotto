const Validation = require("../src/LottoValidation");

describe("당첨 번호 예외 테스트", () => {
  test("숫자가 아닌 값이 들어오면 예외가 발생한다", () => {
    expect(() => {
      Validation.validateLotto("a");
    }).toThrow("[ERROR]");
  });
});

describe("로또 구입 예외 테스트", () => {
  test("문자열이 포함되면 예외 발생 테스트.", () => {
    expect(() => {
      Validation.validateLotto("8000원");
    }).toThrow("[ERROR]");
  });
  test("1000 단위가 아니면 예외 발생 테스트.", () => {
    expect(() => {
      Validation.validateLotto("8200");
    }).toThrow("[ERROR]");
  });
  test("음수이면 예외 발생 테스트.", () => {
    expect(() => {
      Validation.validateLotto("-9000");
    }).toThrow("[ERROR]");
  });
});

describe("당첨 번호 예외 상황 테스트", () => {
  test("값이 숫자가 아닐 때 예외 테스트", () => {
    expect(() => {
      Validation.validateLotto("1,2,q,4,a,6");
    }).toThrow("[ERROR]");
  });
  test("6개가 아닐 때 예외 테스트.", () => {
    expect(() => {
      Validation.validateLotto("1,2,3,4,5,6,7,8,9,10");
    }).toThrow("[ERROR]");
  });
  test("중복된 숫자 예외 테스트.", () => {
    expect(() => {
      Validation.validateLotto("1,2,3,3,4,4,5");
    }).toThrow("[ERROR]");
  });
  test("보너스 번호 추가시 중복된 숫자 예외 테스트.", () => {
    expect(() => {
      Validation.validateBonus("1,1,2,3,4,5,7");
    }).toThrow("[ERROR]");
  });
});
