const thisIsAArrowFunction = () => {
  console.log(this);
};

function oldFunction() {
  console.log(this);
}

const val = 5;

val.oldFunction();

class Example {
  constructor() {
    this.value = 4;
  }

  callNumber = () => {};
}
