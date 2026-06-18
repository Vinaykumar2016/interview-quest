// Interview Quest - Testing Content Data

window.CATEGORIES = window.CATEGORIES || [];

window.CATEGORIES.push({
  id: 'testing',
  name: 'Testing',
  icon: '🧪',
  color: '#10B981',
  topics: [
    {
      id: 'junit',
      name: 'JUnit',
      icon: '☕',
      notes: {
        title: 'JUnit 5 (Jupiter) Testing Framework',
        points: [
          '<strong>Architecture:</strong> JUnit 5 consists of three sub-projects: <code>JUnit Platform</code> (engine launcher), <code>JUnit Jupiter</code> (new programming model and extension model), and <code>JUnit Vintage</code> (backward compatibility engine for JUnit 3 and 4).',
          '<strong>Lifecycle Annotations:</strong> <code>@Test</code> marks a method as a test. <code>@BeforeEach</code> and <code>@AfterEach</code> run before/after every test. <code>@BeforeAll</code> and <code>@AfterAll</code> run once before/after all tests in a class (must be static unless annotated with <code>@TestInstance(Lifecycle.PER_CLASS)</code>).',
          '<strong>Assertions & Assumptions:</strong> Assertions (<code>assertEquals</code>, <code>assertTrue</code>, <code>assertThrows</code>, <code>assertTimeout</code>) verify outcomes and fail the test if false. Assumptions (<code>assumeTrue</code>, <code>assumingThat</code>) abort execution of the test if conditions are not met, marking it skipped rather than failed.',
          '<strong>Parameterized Tests:</strong> Enable running a test method multiple times with different arguments. Declared with <code>@ParameterizedTest</code> and supplied by sources like <code>@ValueSource</code>, <code>@CsvSource</code>, <code>@MethodSource</code>, or <code>@EnumSource</code>.'
        ],
        codeExamples: [
          {
            title: 'Standard JUnit 5 Test Class Structure',
            code: 'import org.junit.jupiter.after.all.*;\nimport org.junit.jupiter.api.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass CalculatorTest {\n    private Calculator calc;\n\n    @BeforeAll\n    static void initSuite() { System.out.println("Suite started"); }\n\n    @BeforeEach\n    void setUp() { calc = new Calculator(); }\n\n    @Test\n    @DisplayName("Test basic addition")\n    void testAdd() {\n        assertEquals(5, calc.add(2, 3), "2 + 3 should equal 5");\n    }\n\n    @Test\n    void testDivisionByZero() {\n        assertThrows(ArithmeticException.class, () -> calc.divide(10, 0));\n    }\n}',
            language: 'java'
          },
          {
            title: 'Parameterized and Grouped Assertions',
            code: '@ParameterizedTest\n@ValueSource(ints = {2, 4, 6, 8})\nvoid testEvenNumbers(int number) {\n    assertTrue(number % 2 == 0);\n}\n\n@Test\nvoid testAssertAll() {\n    User user = new User("Jane", "Doe");\n    // Executed grouped assertions (all are run, even if one fails)\n    assertAll("user properties",\n        () -> assertEquals("Jane", user.getFirstName()),\n        () -> assertEquals("Doe", user.getLastName())\n    );\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Know the changes from JUnit 4 to JUnit 5 (e.g., @Before becomes @BeforeEach, @Test(expected=...) becomes assertThrows(), assertions are in org.junit.jupiter.api.Assertions).',
          'Understand assertAll() (Grouped Assertions) - it reports all failures together, which is highly useful.'
        ]
      },
      flashcards: [
        { front: 'What is JUnit 5 Platform vs. Jupiter vs. Vintage?', back: 'JUnit Platform is the foundation that launches testing frameworks on the JVM. JUnit Jupiter is the engine that executes JUnit 5 tests. JUnit Vintage is the engine that executes JUnit 3 and 4 tests, providing backward compatibility.' },
        { front: 'What is the difference between @BeforeEach and @BeforeAll in JUnit 5?', back: '@BeforeEach marks a method that runs before each test method in the class. @BeforeAll marks a method that runs once before all tests in the class (must be static by default).' },
        { front: 'How do you verify that a method throws a specific exception in JUnit 5?', back: 'Use Assertions.assertThrows(ExpectedException.class, () -> methodCall()). It returns the thrown exception instance, allowing you to run further assertions on its message or cause.' },
        { front: 'What is the purpose of JUnit Assumptions?', back: 'Assumptions (e.g., assumeTrue()) verify conditions that must be met for a test to run. If an assumption fails, the test is skipped/aborted rather than marked as failed. Useful for environment-specific tests.' }
      ],
      quiz: [
        {
          question: 'Which JUnit 5 annotation is used to run a test method multiple times with different inputs?',
          options: ['@RepeatedTest', '@ParameterizedTest', '@ValueSource', '@TestFactory'],
          correct: 1,
          explanation: '@ParameterizedTest is used to run a test multiple times with different parameters supplied by sources like @ValueSource or @CsvSource. @RepeatedTest just runs the exact same test N times.',
          difficulty: 'easy'
        },
        {
          question: 'Which assertion in JUnit 5 executes all passed executables and reports all failures together, rather than stopping at the first failure?',
          options: ['assertMultiple()', 'assertGroup()', 'assertAll()', 'assertEquals()'],
          correct: 2,
          explanation: 'assertAll() takes varargs of executables and executes all of them, grouping any failures together in a MultipleFailuresError.',
          difficulty: 'medium'
        }
      ],
      interview: [
        {
          question: 'Explain how Parameterized Tests work in JUnit 5 and provide an example of CSV Source usage.',
          hint: 'Mention @ParameterizedTest, @CsvSource, and arguments mapping.',
          answer: 'Parameterized tests allow a test to run multiple times with different data. You annotate the method with @ParameterizedTest and a source annotation. For example: @CsvSource({"1, 2, 3", "5, 5, 10"}). The test method accepts parameters matching the columns: void testAdd(int a, int b, int expected). JUnit automatically parses the strings and injects the values, executing the test for each CSV row.'
        }
      ]
    },
    {
      id: 'mockito',
      name: 'Mockito',
      icon: '🎭',
      notes: {
        title: 'Mockito Mocking Framework',
        points: [
          '<strong>Purpose:</strong> Mockito is a mocking framework used to isolate the class under test by simulating and verifying the behavior of its dependencies (collaborators).',
          '<strong>Mock vs. Spy:</strong> <code>Mock</code> creates a complete skeleton object where all methods return default values (null, 0, false) unless stubbed. <code>Spy</code> creates a wrapper around a real, existing object: methods run real code unless explicitly stubbed.',
          '<strong>Stubbing Behavior:</strong> Defining what a mock method returns. Done using <code>when(mock.method()).thenReturn(value)</code> or <code>doReturn(value).when(mock).method()</code> (required for Spies to avoid calling real methods).',
          '<strong>Argument Matchers:</strong> Allow flexible stubbing (e.g., <code>anyInt()</code>, <code>anyString()</code>, <code>any(User.class)</code>). If you use an argument matcher for one argument in a method call, **all** arguments in that call must use matchers.',
          '<strong>Verification:</strong> Checking that methods were invoked. Done using <code>verify(mock, times(1)).method()</code>. You can verify invocation counts, order (<code>InOrder</code>), or capture arguments passed to mocks using <code>ArgumentCaptor</code>.'
        ],
        codeExamples: [
          {
            title: 'Mocking, Stubbing, and Verification with Mockito',
            code: 'import org.junit.jupiter.api.extension.ExtendWith;\nimport org.mockito.*;\nimport org.mockito.junit.jupiter.MockitoExtension;\nimport static org.mockito.Mockito.*;\n\n@ExtendWith(MockitoExtension.class)\nclass UserServiceTest {\n\n    @Mock\n    private UserRepository repo;\n\n    @InjectMocks\n    private UserService service; // Auto-injects mocks into constructor\n\n    @Test\n    void testFindUser() {\n        User dummy = new User(1L, "Pratiksha");\n        // 1. Stubbing\n        when(repo.findById(1L)).thenReturn(Optional.of(dummy));\n\n        // 2. Execution\n        User result = service.getUserById(1L);\n\n        // 3. Verification & Assertions\n        Assertions.assertEquals("Pratiksha", result.getName());\n        verify(repo, times(1)).findById(1L);\n    }\n}',
            language: 'java'
          },
          {
            title: 'Spying and Argument Capturing',
            code: '@Test\nvoid testArgumentCaptor() {\n    // Spying on a real list\n    List<String> list = new ArrayList<>();\n    List<String> spyList = spy(list);\n\n    // Stubbing a spy method (use doReturn to prevent real call)\n    doReturn(100).when(spyList).size();\n    Assertions.assertEquals(100, spyList.size());\n\n    // Argument Captor\n    ArgumentCaptor<String> captor = ArgumentCaptor.forClass(String.class);\n    spyList.add("Hello Mockito");\n\n    verify(spyList).add(captor.capture());\n    Assertions.assertEquals("Hello Mockito", captor.getValue());\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Know when to use Mock vs. Spy: use Mock to isolate dependencies completely; use Spy to override specific methods on real objects while keeping others intact.',
          'Understand @InjectMocks: it creates an instance of the class and injects fields annotated with @Mock or @Spy into it.',
          'Never stub static methods or final classes using standard Mockito unless you use Mockito 3.4+ inline mocking features (mockStatic).'
        ]
      },
      flashcards: [
        { front: 'What is the difference between a Mock and a Spy in Mockito?', back: 'A Mock is a fully synthetic object created by Mockito where all method calls return default values (null, 0, false) unless stubbed. A Spy is a partial mock wrapped around a real object; it calls real methods by default unless they are explicitly stubbed.' },
        { front: 'What does @InjectMocks do?', back: '@InjectMocks tells Mockito to instantiate the target field and automatically inject all mock/spy dependencies (annotated with @Mock/@Spy) into its constructor, setter, or fields.' },
        { front: 'How do you stub a void method to throw an exception in Mockito?', back: 'Use doThrow(new Exception()).when(mock).voidMethodName(). You cannot use when().thenThrow() for void methods because the compiler complains about void methods being inside when().' },
        { front: 'What is an ArgumentCaptor and when do you use it?', back: 'An ArgumentCaptor allows you to capture arguments passed to a mock method during execution. You can then run assertions on the captured argument values. Useful for checking complex nested properties of method parameters.' }
      ],
      quiz: [
        {
          question: 'If you stub a method on a Spy, which syntax is recommended to prevent the real method from executing during stubbing?',
          options: ['when(spy.method()).thenReturn(val)', 'doReturn(val).when(spy).method()', 'spy.method().then(val)', 'doReturn(val).spy.method()'],
          correct: 1,
          explanation: 'Using doReturn().when() prevents the actual method from being invoked on the spy during stubbing. when().thenReturn() actually calls the real method first before stubbing it, which could cause errors or side effects.',
          difficulty: 'medium'
        },
        {
          question: 'What happens if you use an argument matcher like anyInt() for one argument, but a raw value like "John" for another in the same method call stubbing?',
          options: ['It works fine', 'Throws a compile error', 'Throws InvalidUseOfMatchersException at runtime', 'The raw value is treated as anyString()'],
          correct: 2,
          explanation: 'If you use an argument matcher for one parameter, Mockito requires ALL parameters in that method call to use matchers. You must wrap raw values in eq() (e.g., eq("John")).',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain what @Mock, @Spy, and @InjectMocks do and how they differ.',
          hint: 'Think about object instantiation and dependency wiring.',
          answer: '@Mock creates a mock implementation of a class or interface. @Spy wraps an existing instance to track invocations and allow selective stubbing. @InjectMocks instantiates the class under test and injects all mock or spy instances into it. While @Mock/@Spy define the dependencies, @InjectMocks defines the class being tested.'
        }
      ]
    }
  ]
});
