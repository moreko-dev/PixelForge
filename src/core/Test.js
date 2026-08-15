class Test {
    test0 = "test0";
    test1 = "test1";
    test2 = "test2";
}

const test = new Test();

const json = JSON.stringify(test);
console.log(json);
console.log(JSON.parse(json));
