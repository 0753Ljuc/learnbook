import reducer, { todoAdded, Todo } from "./todosSlice";

if (process.env.NODE_ENV === "test") {
  test("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual([
      { text: "Use Redux", completed: false, id: 0 },
    ]);
  });

  test("should handle a todo being added to an empty list", () => {
    const previousState: Todo[] = [];
    expect(reducer(previousState, todoAdded("Run the tests"))).toEqual([
      { text: "Run the tests", completed: false, id: 0 },
    ]);
  });

  test("should handle a todo being added to an existing list", () => {
    const previousState: Todo[] = [
      { text: "Run the tests", completed: true, id: 0 },
    ];
    expect(reducer(previousState, todoAdded("Use Redux"))).toEqual([
      { text: "Run the tests", completed: true, id: 0 },
      { text: "Use Redux", completed: false, id: 1 },
    ]);
  });
}

export const _sourceCode = `import reducer, { todoAdded, Todo } from "./todosSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual([
    { text: "Use Redux", completed: false, id: 0 },
  ]);
});

test("should handle a todo being added to an empty list", () => {
  const previousState: Todo[] = [];
  expect(reducer(previousState, todoAdded("Run the tests"))).toEqual([
    { text: "Run the tests", completed: false, id: 0 },
  ]);
});

test("should handle a todo being added to an existing list", () => {
  const previousState: Todo[] = [
    { text: "Run the tests", completed: true, id: 0 },
  ];
  expect(reducer(previousState, todoAdded("Use Redux"))).toEqual([
    { text: "Run the tests", completed: true, id: 0 },
    { text: "Use Redux", completed: false, id: 1 },
  ]);
}); `;
