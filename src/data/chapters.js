export const chapters = [
  {
    number: 1,
    slug: "hello-python",
    title: "Hello, Python!",
    emoji: "👋",
    summary: "Make Python say something and explore your first lines of code.",
    color: "peach",
    lesson: {
      goals: [
        "Use print() to show text in the console.",
        "Understand that Python reads code in order.",
        "Try a tiny program and change the words.",
      ],
      steps: [
        {
          title: "Python speaks with print()",
          body: "The print() function tells Python to show text on the screen. It is a great first tool because it makes code easy to understand.",
        },
        {
          title: "Code is a set of instructions",
          body: "Each line is one instruction. Python runs them from top to bottom, just like following steps in a recipe.",
        },
        {
          title: "Make it your own",
          body: "Change the text inside the quotes and run the program again. The computer will always follow your new words.",
        },
      ],
      challenge: {
        prompt:
          "Run a two-line greeting that says hello and shares your excitement.",
        hint: "Use print() once for each line.",
        expectedOutput: "Hello, Python!\nI am ready to learn!",
      },
      starterCode: 'print("Hello, Python!")\nprint("I am ready to learn!")',
    },
  },
  {
    number: 2,
    slug: "variables",
    title: "Variables",
    emoji: "📦",
    summary: "Give information a name so your programs can remember it.",
    color: "blue",
    lesson: {
      goals: [
        "Store values in variables.",
        "Use a name to remember information.",
        "Print a stored value to the screen.",
      ],
      steps: [
        {
          title: "Variables are boxes",
          body: "A variable is like a labeled box. You can put a value in it and use the name later instead of repeating the value.",
        },
        {
          title: "Name your data",
          body: "Choose a good name such as name, age, or favorite_color. The name helps your code stay readable.",
        },
        {
          title: "Use the value again",
          body: "After you store something, you can print it, compare it, or change it as your program runs.",
        },
      ],
      challenge: {
        prompt: "Use your name and age variables to print both personal facts.",
        hint: "Keep the variable names in the print() calls, not inside quotes.",
        expectedOutput: "My name is Ada\nI am 11 years old",
      },
      starterCode:
        'name = "Ada"\nage = 11\nprint("My name is", name)\nprint("I am", age, "years old")',
    },
  },
  {
    number: 3,
    slug: "numbers-and-math",
    title: "Numbers and Math",
    emoji: "🧮",
    summary: "Use Python to work with numbers and solve fun puzzles.",
    color: "yellow",
    lesson: {
      goals: [
        "Work with integers and arithmetic operators.",
        "Use +, -, *, and / with confidence.",
        "Build a tiny math challenge.",
      ],
      steps: [
        {
          title: "Python does math",
          body: "Python can add, subtract, multiply, and divide. These operators work the same way as a calculator.",
        },
        {
          title: "Order matters",
          body: "Python follows standard math rules. That means multiplication and division happen before addition and subtraction unless parentheses change the order.",
        },
        {
          title: "Try a puzzle",
          body: "You can combine numbers and operations to create a fun trivia question or a quick calculator program.",
        },
      ],
      challenge: {
        prompt: "Calculate the total score and twice the original score.",
        hint: "Use + for the total and * to multiply.",
        expectedOutput: "Score: 10\nDouble score: 14",
      },
      starterCode:
        'score = 7\nbonus = 3\nprint("Score:", score + bonus)\nprint("Double score:", score * 2)',
    },
  },
  {
    number: 4,
    slug: "talking-to-the-computer",
    title: "Talking to the Computer",
    emoji: "💬",
    summary: "Ask questions and use answers to make a program personal.",
    color: "pink",
    lesson: {
      goals: [
        "Ask for input from a user.",
        "Store the response in a variable.",
        "Use that answer to personalize output.",
      ],
      steps: [
        {
          title: "Input makes programs interactive",
          body: "The input() function pauses the program and waits for the user to type something. That makes the program respond to real people.",
        },
        {
          title: "Always store the answer",
          body: "When someone types, save it in a variable. Then you can use it in a message or calculation.",
        },
        {
          title: "Build a friendly greeting",
          body: "You can combine a question with a stored response to make a custom message for each learner.",
        },
      ],
      challenge: {
        prompt: "Ask for a name and use it in a friendly greeting.",
        hint: "The input box starts with Ada. Save input() in a variable.",
        expectedOutput: "What is your name? Nice to meet you, Ada",
      },
      defaultInputs: ["Ada"],
      starterCode:
        'name = input("What is your name? ")\nprint("Nice to meet you,", name)',
    },
  },
  {
    number: 5,
    slug: "making-decisions",
    title: "Making Decisions",
    emoji: "🧭",
    summary: "Help your program choose what to do next.",
    color: "green",
    lesson: {
      goals: [
        "Use if statements to test conditions.",
        "Compare values with operators like == and >.",
        "Pick one path for your program.",
      ],
      steps: [
        {
          title: "Conditions guide the action",
          body: "An if statement checks whether something is true. If it is true, Python runs one block of code.",
        },
        {
          title: "Compare values",
          body: "Use == to check equality, > to check greater than, and < to check less than. These tests are the heart of decisions.",
        },
        {
          title: "Add an else",
          body: "When the condition is false, an else block can tell Python what to do instead.",
        },
      ],
      challenge: {
        prompt:
          "Use an if/else decision to give the learner the right message.",
        hint: "Try changing score to 10 to see the other path.",
        expectedOutput: "Keep practicing. You are getting better!",
      },
      starterCode:
        'score = 8\nif score >= 10:\n    print("Amazing job!")\nelse:\n    print("Keep practicing. You are getting better!")',
    },
  },
  {
    number: 6,
    slug: "for-loops",
    title: "Loops with for",
    emoji: "🔁",
    summary: "Repeat instructions and count with a for loop.",
    color: "purple",
    lesson: {
      goals: [
        "Repeat actions with a for loop.",
        "Iterate over a range of numbers.",
        "Count and print repeated patterns.",
      ],
      steps: [
        {
          title: "Loops save time",
          body: "A for loop repeats a block of code for each value in a sequence. It is perfect when you want a pattern or a count.",
        },
        {
          title: "Use range()",
          body: "The range() function creates a sequence of numbers, starting at 0 and stopping before the end value.",
        },
        {
          title: "Count with code",
          body: "You can print a number and a message repeatedly to create a countdown, a rhythm loop, or a simple pattern.",
        },
      ],
      challenge: {
        prompt: "Use a for loop to print the three iteration numbers.",
        hint: "range(3) gives you 0, 1, and 2.",
        expectedOutput: "Iteration: 0\nIteration: 1\nIteration: 2",
      },
      starterCode: 'for number in range(3):\n    print("Iteration:", number)',
    },
  },
  {
    number: 7,
    slug: "while-loops",
    title: "Loops with while",
    emoji: "🎯",
    summary: "Keep a game going while a condition is true.",
    color: "blue",
    lesson: {
      goals: [
        "Use while loops for repeated checking.",
        "Keep a loop running while a condition remains true.",
        "Understand how to stop a loop safely.",
      ],
      steps: [
        {
          title: "A while loop keeps checking",
          body: "Unlike a for loop, a while loop keeps going as long as a condition stays true. It is useful for games and waiting actions.",
        },
        {
          title: "The condition controls the loop",
          body: "If the condition becomes false, the loop stops. You must update the value inside the loop or it may run forever.",
        },
        {
          title: "Use a countdown",
          body: "A countdown is a classic while loop example because the number changes each time and eventually ends the loop.",
        },
      ],
      challenge: {
        prompt: "Count down from 3 and finish with a launch message.",
        hint: "Reduce countdown each time through the while loop.",
        expectedOutput: "Launch in 3\nLaunch in 2\nLaunch in 1\nBlast off!",
      },
      starterCode:
        'countdown = 3\nwhile countdown > 0:\n    print("Launch in", countdown)\n    countdown = countdown - 1\nprint("Blast off!")',
    },
  },
  {
    number: 8,
    slug: "lists",
    title: "Lists",
    emoji: "🧺",
    summary: "Collect related things together and explore them one by one.",
    color: "green",
    lesson: {
      goals: [
        "Create a list of related values.",
        "Access items by index.",
        "Loop through a list and display each item.",
      ],
      steps: [
        {
          title: "Lists keep things together",
          body: "A list holds several values in one place. It is useful when you want to group related data such as friends, colors, or scores.",
        },
        {
          title: "Use an index",
          body: "Items in a list are stored in order. Python uses positions called indexes to find each item.",
        },
        {
          title: "Loop through items",
          body: "A for loop can visit every item in a list so you can process them one by one.",
        },
      ],
      challenge: {
        prompt: "Loop through the friends list and cheer each friend on.",
        hint: "Use for friend in friends to visit each item.",
        expectedOutput:
          "Ari is ready to learn!\nMina is ready to learn!\nLeo is ready to learn!",
      },
      starterCode:
        'friends = ["Ari", "Mina", "Leo"]\nfor friend in friends:\n    print(friend, "is ready to learn!")',
    },
  },
  {
    number: 9,
    slug: "functions",
    title: "Functions",
    emoji: "🛠️",
    summary: "Build reusable blocks of code for your own mini-programs.",
    color: "yellow",
    lesson: {
      goals: [
        "Define a function with def.",
        "Pass information into a function.",
        "Reuse helpful code in multiple places.",
      ],
      steps: [
        {
          title: "Functions bundle steps",
          body: "A function is like a mini-machine. It runs a set of instructions when you call it, and you can use it many times.",
        },
        {
          title: "Parameters make it flexible",
          body: "A parameter is a piece of information that the function receives so it can behave differently each time.",
        },
        {
          title: "Reusable code",
          body: "Functions keep programs organized. Instead of writing the same code again and again, you define it once and call it when needed.",
        },
      ],
      challenge: {
        prompt: "Create a greeting function and call it for two friends.",
        hint: "Define the function before calling greet().",
        expectedOutput:
          "Hello, Sam ! Welcome to PyQuest.\nHello, Maya ! Welcome to PyQuest.",
      },
      starterCode:
        'def greet(name):\n    print("Hello,", name, "! Welcome to PyQuest.")\n\ngreet("Sam")\ngreet("Maya")',
    },
  },
  {
    number: 10,
    slug: "capstone-project",
    title: "Your Big Python Project",
    emoji: "🚀",
    summary: "Bring your new skills together in a game of your own.",
    color: "pink",
    lesson: {
      goals: [
        "Combine variables, loops, and conditions.",
        "Plan a small project idea.",
        "Use what you learned to build an exciting mini-game.",
      ],
      steps: [
        {
          title: "Start with a simple idea",
          body: "A good capstone project can be a quiz, a guessing game, or a tiny story adventure. Keep it small but fun.",
        },
        {
          title: "Mix your skills",
          body: "Your project can use variables to store scores, loops to repeat actions, and if statements to react to choices.",
        },
        {
          title: "End with a celebration",
          body: "Once the program works, share the final result with someone else. Every small project is a big win in learning.",
        },
      ],
      challenge: {
        prompt: "Build a three-round game that tracks the correct answers.",
        hint: 'The input box starts with 3, 2, 3. Compare each answer to "3".',
        expectedOutput:
          "Type 3 for a star: Nice! You earned a point.\nType 3 for a star: Close, but not quite.\nType 3 for a star: Nice! You earned a point.\nFinal score: 2",
      },
      defaultInputs: ["3", "2", "3"],
      starterCode:
        'score = 0\nfor round_number in range(3):\n    answer = input("Type 3 for a star: ")\n    if answer == "3":\n        score = score + 1\n        print("Nice! You earned a point.")\n    else:\n        print("Close, but not quite.")\nprint("Final score:", score)',
    },
  },
];

export function findChapter(number) {
  return chapters.find((chapter) => chapter.number === Number(number));
}
