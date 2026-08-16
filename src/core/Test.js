class Test {
    isTest = true;
    secondTest = new SecondTest();
}

class SecondTest {
    isSecondTest = true;
}

const test = new Test();

console.log(JSON.stringify(test, null, 2));
