// Interview Quest - Modern Java Content Data

window.CATEGORIES = window.CATEGORIES || [];

window.CATEGORIES.push({
  id: 'java-modern',
  name: 'Modern Java',
  icon: '⚡',
  color: '#8B5CF6',
  topics: [
    // ─────────────────────────────────────────────
    // TOPIC 1: Java 8+ Features Overview
    // ─────────────────────────────────────────────
    {
      id: 'java8-features',
      name: 'Java 8+ Features Overview',
      icon: '✨',
      notes: {
        title: 'Java 8+ Features Overview',
        points: [
          '<strong>Default methods</strong> in interfaces allow adding new methods with a body using the <code>default</code> keyword, enabling interface evolution without breaking existing implementations. If a class implements two interfaces with the same default method, it must override to resolve the diamond problem.',
          '<strong>Static methods</strong> in interfaces provide utility/helper methods that belong to the interface itself, called via <code>InterfaceName.method()</code>. They are not inherited by implementing classes or sub-interfaces.',
          '<strong>Method references</strong> come in four types: static (<code>Class::staticMethod</code>), instance of a particular object (<code>obj::method</code>), instance of an arbitrary object (<code>Class::instanceMethod</code>), and constructor (<code>Class::new</code>). They are shorthand for lambdas that simply delegate to an existing method.',
          'The <strong>Date/Time API</strong> (java.time) introduced immutable, thread-safe classes: <code>LocalDate</code> (date only), <code>LocalDateTime</code> (date+time, no zone), <code>ZonedDateTime</code> (date+time+zone), <code>Period</code> (date-based amounts), and <code>Duration</code> (time-based amounts). All use ISO-8601 by default.',
          '<strong>CompletableFuture</strong> supports asynchronous, non-blocking programming with methods like <code>supplyAsync()</code>, <code>thenApply()</code>, <code>thenCompose()</code>, <code>thenCombine()</code>, and <code>exceptionally()</code>. It implements both <code>Future</code> and <code>CompletionStage</code>.',
          '<strong>Java 9+ Modules</strong> (Project Jigsaw) introduce <code>module-info.java</code> for strong encapsulation using <code>requires</code>, <code>exports</code>, and <code>opens</code> directives, enabling reliable configuration and improved security.',
          '<strong>Text blocks</strong> (Java 13+, standard in 15) use triple quotes <code>"""</code> for multi-line strings with automatic indentation management via <code>stripIndent()</code>. Trailing whitespace is stripped; use <code>\\s</code> to preserve it.',
          '<strong>Pattern matching instanceof</strong> (Java 16+) eliminates redundant casting: <code>if (obj instanceof String s)</code> both tests and binds. <strong>Switch expressions</strong> (Java 14+) use arrow syntax, can return values, and require exhaustiveness when used as expressions.'
        ],
        codeExamples: [
          {
            title: 'Default and Static Interface Methods',
            code: 'public interface Loggable {\n    default void log(String msg) {\n        System.out.println(timestamp() + \" \" + msg);\n    }\n\n    static String timestamp() {\n        return LocalDateTime.now().toString();\n    }\n}\n\npublic class Service implements Loggable {\n    public void process() {\n        log(\"Processing...\"); // uses default method\n    }\n}',
            language: 'java'
          },
          {
            title: 'Four Types of Method References',
            code: '// 1. Static method reference\nFunction<String, Integer> parse = Integer::parseInt;\n\n// 2. Instance method of a particular object\nString greeting = \"Hello\";\nSupplier<Integer> len = greeting::length;\n\n// 3. Instance method of an arbitrary object of a type\nFunction<String, String> upper = String::toUpperCase;\n\n// 4. Constructor reference\nSupplier<ArrayList<String>> listFactory = ArrayList::new;',
            language: 'java'
          },
          {
            title: 'Modern Java Features (14+)',
            code: '// Switch expression (Java 14+)\nString result = switch (status) {\n    case \"ACTIVE\" -> \"Running\";\n    case \"PAUSED\" -> \"On Hold\";\n    case \"STOPPED\", \"CANCELLED\" -> \"Inactive\";\n    default -> throw new IllegalArgumentException();\n};\n\n// Pattern matching instanceof (Java 16+)\nif (shape instanceof Circle c) {\n    double area = Math.PI * c.radius() * c.radius();\n}\n\n// Text block (Java 15+)\nString json = \"\"\"\n        {\n            \"name\": \"Alice\",\n            \"age\": 30\n        }\n        \"\"\";',
            language: 'java'
          }
        ],
        interviewTips: [
          'Be ready to compare the old java.util.Date / Calendar API with java.time and explain why immutability matters for thread safety.',
          'Know the difference between switch expressions (return a value, require exhaustiveness) and switch statements (traditional, fall-through). Interviewers love this.',
          'Understand that Nashorn was removed in Java 15 — mentioning GraalVM as the modern alternative shows you stay current.'
        ]
      },
      flashcards: [
        { front: 'What are the four types of method references in Java?', back: 'Static (Class::staticMethod), bound instance (obj::method), unbound instance (Class::instanceMethod), and constructor (Class::new).' },
        { front: 'What keyword is used to add a method body in an interface?', back: 'The <code>default</code> keyword. Default methods allow interfaces to evolve without breaking existing implementations.' },
        { front: 'What is the difference between Period and Duration?', back: '<code>Period</code> measures date-based amounts (years, months, days). <code>Duration</code> measures time-based amounts (hours, minutes, seconds, nanos).' },
        { front: 'What does CompletableFuture add over Future?', back: 'It adds non-blocking callbacks (thenApply, thenCompose), exception handling (exceptionally, handle), and the ability to manually complete or combine multiple futures.' },
        { front: 'What is a text block and when was it finalized?', back: 'A multi-line string literal delimited by triple double quotes ("""). Preview in Java 13, finalized in Java 15. It automatically manages indentation.' },
        { front: 'How does pattern matching instanceof work?', back: '<code>if (obj instanceof String s)</code> tests the type and binds the cast variable <code>s</code> in one step, eliminating the need for a separate cast statement.' },
        { front: 'What are the key directives in module-info.java?', back: '<code>requires</code> (declares dependency), <code>exports</code> (makes packages accessible), <code>opens</code> (allows reflection access), <code>provides...with</code> (service provider).' },
        { front: 'What happens when two interfaces provide the same default method?', back: 'The implementing class must override the method to resolve the conflict. The compiler will report an error otherwise. You can call a specific interface\'s version using <code>InterfaceName.super.method()</code>.' }
      ],
      quiz: [
        {
          question: 'Which type of method reference is String::toUpperCase?',
          options: [
            'Instance method of an arbitrary object of a particular type',
            'Static method reference',
            'Instance method of a particular object',
            'Constructor reference'
          ],
          correct: 0,
          explanation: 'String::toUpperCase is an unbound instance method reference — it takes an arbitrary String object and calls toUpperCase() on it. It\'s equivalent to (String s) -> s.toUpperCase(). A static reference would be Class::staticMethod, a bound instance reference would use a specific object like str::toUpperCase, and a constructor reference uses ::new.',
          difficulty: 'easy'
        },
        {
          question: 'What is the primary difference between Period and Duration in java.time?',
          options: [
            'Period uses date units (years/months/days); Duration uses time units (hours/minutes/seconds)',
            'Period is mutable while Duration is immutable',
            'Duration supports nanoseconds while Period does not support any precision',
            'Period can only represent positive amounts'
          ],
          correct: 0,
          explanation: 'Period models date-based amounts (years, months, days) while Duration models time-based amounts (seconds and nanoseconds). Both are immutable. Duration does support nanoseconds, but that\'s not the primary distinction. Both can represent positive and negative amounts.',
          difficulty: 'easy'
        },
        {
          question: 'What happens when a class implements two interfaces that define the same default method?',
          options: [
            'The compiler chooses the first interface alphabetically',
            'The class must override the method to resolve the conflict',
            'A runtime exception is thrown',
            'The method from the more specific interface is chosen'
          ],
          correct: 1,
          explanation: 'When a diamond problem occurs with default methods, the compiler forces the implementing class to override and provide its own implementation (or explicitly choose one using InterfaceName.super.method()). There is no automatic resolution based on order, alphabetical or otherwise.',
          difficulty: 'medium'
        },
        {
          question: 'Which Java version finalized switch expressions as a standard feature?',
          options: [
            'Java 12',
            'Java 13',
            'Java 14',
            'Java 16'
          ],
          correct: 2,
          explanation: 'Switch expressions were preview in Java 12 and 13, and became a standard feature in Java 14 (JEP 361). Java 16 introduced pattern matching for instanceof, not switch expressions.',
          difficulty: 'medium'
        },
        {
          question: 'In a switch expression, what happens if you omit the default branch when switching on a String?',
          options: [
            'It returns null for unmatched values',
            'A compilation error occurs because the switch is not exhaustive',
            'It falls through to the next case',
            'A runtime NullPointerException is thrown'
          ],
          correct: 1,
          explanation: 'Switch expressions (as opposed to statements) require exhaustiveness. Since String has infinite possible values, you must include a default branch. The compiler enforces this at compile time. Sealed types and enums can be exhaustive without default if all permitted subtypes/values are covered.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Walk me through the most impactful features introduced from Java 8 to Java 17.',
          hint: 'Organize by theme: functional programming, language syntax, APIs, and modularity.',
          answer: 'Java 8 was the biggest leap, introducing lambdas, the Stream API, Optional, and the java.time Date/Time API. It also added default and static methods in interfaces, enabling functional-style programming. Java 9 brought the module system (Project Jigsaw) for strong encapsulation and the JShell REPL. Java 10 introduced local variable type inference with var. Java 11 (LTS) added the HTTP Client API and made var usable in lambda parameters. Java 14 finalized switch expressions with arrow syntax. Java 15 gave us text blocks for multi-line strings and sealed classes as preview. Java 16 finalized pattern matching for instanceof. Java 17 (LTS) finalized sealed classes, enabling algebraic data types when combined with records. The overall trajectory has been toward more expressive, concise, and safe code.',
          difficulty: 'medium',
          followUp: 'If you had to pick one feature that most changed how you write Java daily, which would it be and why?'
        },
        {
          question: 'Explain the four types of method references with examples.',
          hint: 'Think about what the lambda equivalent looks like for each type.',
          answer: 'The four types are: (1) Static method reference like Integer::parseInt, equivalent to s -> Integer.parseInt(s), which calls a static method. (2) Bound instance method reference like myStr::length, equivalent to () -> myStr.length(), which calls an instance method on a specific object. (3) Unbound instance method reference like String::toLowerCase, equivalent to (String s) -> s.toLowerCase(), where the first parameter becomes the receiver. (4) Constructor reference like ArrayList::new, equivalent to () -> new ArrayList<>(), used to create new instances. The key distinction between bound and unbound is whether the receiver object is captured at reference creation time or provided as an argument.',
          difficulty: 'medium',
          followUp: 'Can you use a method reference when the lambda takes more parameters than the method? For example, a BiFunction?'
        },
        {
          question: 'How does the Java Module System improve upon the classpath?',
          hint: 'Think about encapsulation, dependency declaration, and runtime reliability.',
          answer: 'The module system solves several classpath problems. First, it provides strong encapsulation: only packages explicitly exported in module-info.java are accessible, unlike the classpath where all public types are visible. Second, it enables reliable configuration: module declarations specify dependencies with "requires", so missing dependencies are detected at compile/launch time rather than causing runtime ClassNotFoundException. Third, it improves security by preventing reflective access to internal packages unless "opens" is specified. Finally, it enables a custom runtime image via jlink, reducing application size. The classpath essentially treats all JARs as a flat namespace, leading to "JAR hell" where split packages and version conflicts are common.',
          difficulty: 'hard',
          followUp: 'What is the difference between exports and opens in a module declaration?'
        },
        {
          question: 'Compare the old Date/Calendar API with the java.time API.',
          hint: 'Focus on mutability, thread safety, API design, and timezone handling.',
          answer: 'The old java.util.Date is mutable and not thread-safe, meaning it can be modified after creation and shared references can cause bugs in concurrent code. Its API is poorly designed — months are 0-indexed, year starts from 1900, and most methods are deprecated. Calendar attempted to fix some issues but remained mutable and complex. The java.time API (JSR 310) provides immutable, thread-safe classes like LocalDate, LocalDateTime, and ZonedDateTime. It cleanly separates concerns: LocalDate for dates without time, LocalTime for time without dates, Instant for machine timestamps, and ZonedDateTime for full timezone-aware representations. Period and Duration properly distinguish date-based and time-based amounts. The API follows a fluent, consistent design inspired by Joda-Time.',
          difficulty: 'easy',
          followUp: 'When would you use Instant versus LocalDateTime?'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // TOPIC 2: Functional Interfaces
    // ─────────────────────────────────────────────
    {
      id: 'functional-interface',
      name: 'Functional Interfaces',
      icon: '⚙️',
      notes: {
        title: 'Functional Interfaces',
        points: [
          'A <strong>functional interface</strong> is an interface with exactly one abstract method (SAM — Single Abstract Method). It can have any number of default and static methods. The <code>@FunctionalInterface</code> annotation is optional but recommended for compile-time validation.',
          '<strong>Function&lt;T, R&gt;</strong> takes one argument of type T and returns a result of type R via <code>apply(T t)</code>. Compose functions using <code>andThen()</code> (apply this, then that) or <code>compose()</code> (apply that, then this).',
          '<strong>Predicate&lt;T&gt;</strong> takes one argument and returns a boolean via <code>test(T t)</code>. Chain predicates with <code>and()</code>, <code>or()</code>, and <code>negate()</code> for complex boolean logic.',
          '<strong>Consumer&lt;T&gt;</strong> takes one argument and returns nothing via <code>accept(T t)</code>. Use <code>andThen()</code> to chain side-effects. <strong>Supplier&lt;T&gt;</strong> takes no arguments and returns a value via <code>get()</code> — commonly used for lazy initialization and factory patterns.',
          '<strong>BiFunction&lt;T, U, R&gt;</strong> takes two arguments and returns a result. <strong>BiPredicate&lt;T, U&gt;</strong> takes two arguments and returns boolean. <strong>BiConsumer&lt;T, U&gt;</strong> takes two arguments and returns void. These extend the single-argument variants for two-parameter scenarios.',
          '<strong>UnaryOperator&lt;T&gt;</strong> extends Function&lt;T, T&gt; — input and output are the same type. <strong>BinaryOperator&lt;T&gt;</strong> extends BiFunction&lt;T, T, T&gt; — both inputs and output share the same type. Useful in reduce operations.',
          'Primitive specializations like <code>IntFunction</code>, <code>LongPredicate</code>, <code>DoubleSupplier</code>, and <code>ToIntFunction</code> avoid autoboxing overhead. Always prefer them in performance-sensitive code.',
          'Custom functional interfaces are useful when domain semantics matter. For example, <code>@FunctionalInterface interface Validator&lt;T&gt; { ValidationResult validate(T item); }</code> is more expressive than a raw <code>Function&lt;T, ValidationResult&gt;</code>.'
        ],
        codeExamples: [
          {
            title: 'Built-in Functional Interfaces in Action',
            code: '// Function: transform data\nFunction<String, Integer> strLen = String::length;\nFunction<Integer, String> intToStr = i -> \"Number: \" + i;\nFunction<String, String> composed = strLen.andThen(intToStr);\n// composed.apply(\"Hello\") -> \"Number: 5\"\n\n// Predicate: filter with chaining\nPredicate<String> nonEmpty = s -> !s.isEmpty();\nPredicate<String> startsWithA = s -> s.startsWith(\"A\");\nPredicate<String> combined = nonEmpty.and(startsWithA);\n// combined.test(\"Alice\") -> true\n\n// Consumer: perform side effects\nConsumer<String> print = System.out::println;\nConsumer<String> log = s -> logger.info(s);\nConsumer<String> printAndLog = print.andThen(log);\n\n// Supplier: lazy creation\nSupplier<List<String>> listFactory = ArrayList::new;',
            language: 'java'
          },
          {
            title: 'Operators and BiFunction',
            code: '// UnaryOperator: same type in and out\nUnaryOperator<String> shout = s -> s.toUpperCase() + \"!\";\nList<String> names = List.of(\"alice\", \"bob\");\nnames.stream().map(shout).toList();\n// [\"ALICE!\", \"BOB!\"]\n\n// BinaryOperator: reduce pattern\nBinaryOperator<Integer> sum = Integer::sum;\nint total = List.of(1, 2, 3).stream().reduce(0, sum);\n// total = 6\n\n// BiFunction\nBiFunction<String, Integer, String> repeat =\n    (s, n) -> s.repeat(n);\nrepeat.apply(\"ha\", 3); // \"hahaha\"',
            language: 'java'
          },
          {
            title: 'Custom Functional Interface',
            code: '@FunctionalInterface\npublic interface Converter<F, T> {\n    T convert(F from);\n\n    // Default method for chaining\n    default <V> Converter<F, V> andThen(Converter<T, V> after) {\n        return f -> after.convert(this.convert(f));\n    }\n}\n\n// Usage\nConverter<String, Integer> toInt = Integer::valueOf;\nConverter<Integer, Double> toDouble = Integer::doubleValue;\nConverter<String, Double> toDoubleFromStr = toInt.andThen(toDouble);\n\ndouble result = toDoubleFromStr.convert(\"42\"); // 42.0',
            language: 'java'
          }
        ],
        interviewTips: [
          'Know the difference between Function (returns a value) and Consumer (returns void). Interviewers often ask you to pick the right interface for a given scenario.',
          'Understand that @FunctionalInterface is optional — any interface with exactly one abstract method qualifies. The annotation just triggers a compile-time check.',
          'Be prepared to explain function composition with andThen() vs compose() — andThen applies left-to-right, compose applies right-to-left.'
        ]
      },
      flashcards: [
        { front: 'What makes an interface a functional interface?', back: 'It has exactly one abstract method (SAM — Single Abstract Method). It may have any number of default and static methods.' },
        { front: 'What is the difference between Function and UnaryOperator?', back: '<code>UnaryOperator&lt;T&gt;</code> extends <code>Function&lt;T, T&gt;</code> — the input and return types are the same. Function allows different input and return types.' },
        { front: 'What does Predicate.and() return?', back: 'A composed predicate that represents a short-circuiting logical AND. Returns true only if both predicates return true.' },
        { front: 'When would you use Supplier vs Function?', back: '<code>Supplier&lt;T&gt;</code> takes no arguments and provides a value (factory/lazy init). <code>Function&lt;T,R&gt;</code> takes an input and transforms it to an output.' },
        { front: 'What is the difference between andThen() and compose() on Function?', back: '<code>f.andThen(g)</code> applies f first, then g (left-to-right). <code>f.compose(g)</code> applies g first, then f (right-to-left). andThen: g(f(x)), compose: f(g(x)).' },
        { front: 'Why do primitive functional interface specializations exist?', back: 'To avoid autoboxing/unboxing overhead. For example, <code>IntPredicate</code> works with primitive <code>int</code> directly instead of boxing to <code>Integer</code>.' },
        { front: 'Can a functional interface extend another interface?', back: 'Yes, as long as the resulting interface still has exactly one abstract method. For example, UnaryOperator extends Function, inheriting apply() as its single abstract method.' },
        { front: 'What is BiPredicate used for?', back: '<code>BiPredicate&lt;T, U&gt;</code> takes two arguments and returns a boolean. Useful when a filtering condition depends on two values, like comparing two objects.' }
      ],
      quiz: [
        {
          question: 'Which functional interface would you use for a method that takes a String and returns void?',
          options: [
            'Consumer<String>',
            'Function<String, Void>',
            'Supplier<String>',
            'Predicate<String>'
          ],
          correct: 0,
          explanation: 'Consumer<T> has the method accept(T t) which returns void — perfect for operations that consume a value without returning anything. Function<String, Void> technically works but is awkward because you must return null. Supplier takes no arguments, and Predicate returns boolean.',
          difficulty: 'easy'
        },
        {
          question: 'What is the result of Predicate.negate().test() on a predicate that returns true?',
          options: [
            'true',
            'false',
            'Compilation error',
            'NullPointerException'
          ],
          correct: 1,
          explanation: 'negate() returns a predicate that is the logical negation of the original. If the original returns true, the negated version returns false. It does not throw an exception or cause a compilation error.',
          difficulty: 'easy'
        },
        {
          question: 'Which of the following is NOT a valid functional interface?',
          options: [
            'An interface with one abstract method and two default methods',
            'An interface with one abstract method that overrides Object.toString()',
            'An interface with two abstract methods',
            'An interface with one abstract method and one static method'
          ],
          correct: 2,
          explanation: 'A functional interface must have exactly one abstract method. Having two abstract methods violates this rule. Methods overriding Object methods (toString, equals, hashCode) don\'t count toward the abstract method total. Default and static methods don\'t count either.',
          difficulty: 'medium'
        },
        {
          question: 'What does BinaryOperator<T> extend?',
          options: [
            'BiFunction<T, T, T>',
            'Function<T, T>',
            'BiConsumer<T, T>',
            'UnaryOperator<T>'
          ],
          correct: 0,
          explanation: 'BinaryOperator<T> extends BiFunction<T, T, T>, meaning it takes two arguments of the same type and returns the same type. UnaryOperator extends Function<T, T> (single argument). It\'s commonly used in Stream.reduce() operations.',
          difficulty: 'medium'
        },
        {
          question: 'Given Function<String, Integer> f = String::length; what does f.compose(s -> s.trim()).apply("  hi  ") return?',
          options: [
            '6',
            '2',
            '4',
            'Compilation error'
          ],
          correct: 1,
          explanation: 'compose() applies the given function BEFORE the calling function. So first s.trim() is applied to "  hi  " yielding "hi", then String::length gives 2. If andThen() were used instead, the length (6) would be computed first and then trim would fail because Integer doesn\'t have trim().',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain the key built-in functional interfaces in java.util.function and when you\'d use each one.',
          hint: 'Group them by their purpose: transform, filter, consume, supply.',
          answer: 'The four core functional interfaces are Function, Predicate, Consumer, and Supplier. Function<T,R> transforms input T to output R using apply() — use it in Stream.map() or data conversions. Predicate<T> tests a condition returning boolean via test() — use it in Stream.filter() or validation. Consumer<T> performs side effects with no return via accept() — use it in forEach() or logging. Supplier<T> provides values with no input via get() — use it for lazy initialization, factory patterns, or orElseGet(). Each has Bi-variants (BiFunction, BiPredicate, BiConsumer) for two-parameter scenarios, and operator specializations (UnaryOperator, BinaryOperator) when input and output types match.',
          difficulty: 'medium',
          followUp: 'Can you give an example of function composition using andThen() in a real-world scenario?'
        },
        {
          question: 'What is the @FunctionalInterface annotation and is it required?',
          hint: 'Think about its role as documentation and compile-time safety.',
          answer: 'The @FunctionalInterface annotation is optional but strongly recommended. Its primary purpose is to instruct the compiler to verify that the interface has exactly one abstract method, generating a compile error if this contract is violated. Without it, any single-abstract-method interface can still be used as a lambda target — the annotation doesn\'t change runtime behavior. It also serves as documentation, signaling to other developers that the interface is designed for use with lambdas. This is similar to how @Override is optional but catches errors early. Note that methods from Object (toString, equals, hashCode) don\'t count toward the abstract method count.',
          difficulty: 'easy',
          followUp: 'Does adding a default method to a functional interface break the contract?'
        },
        {
          question: 'When would you create a custom functional interface instead of using the built-in ones?',
          hint: 'Consider readability, domain semantics, checked exceptions, and composition.',
          answer: 'You should create custom functional interfaces in several scenarios. First, for domain clarity: Validator<T> is more readable than Predicate<T> when the intent is validation, not just filtering. Second, when you need checked exceptions: built-in interfaces don\'t declare checked exceptions, so a custom interface like ThrowingFunction<T, R, E extends Exception> lets lambdas throw checked exceptions cleanly. Third, for custom composition: you can add domain-specific default methods, like a Converter that chains with andThen(). Fourth, when the method name matters: apply(), test(), accept() are generic — a custom interface can use a meaningful method name like convert(), validate(), or process(). However, don\'t create custom interfaces when a built-in one perfectly fits — unnecessary abstraction adds complexity.',
          difficulty: 'hard',
          followUp: 'How would you design a functional interface that supports checked exceptions?'
        },
        {
          question: 'Explain the primitive specializations of functional interfaces and why they matter.',
          hint: 'Think about autoboxing, performance, and the specific interfaces available.',
          answer: 'Primitive specializations like IntFunction, LongPredicate, DoubleConsumer, ToIntFunction, and IntToDoubleFunction exist to avoid autoboxing and unboxing. When using Function<Integer, Integer>, every primitive int must be boxed to Integer and unboxed back, creating garbage collection pressure and cache misses. IntUnaryOperator works directly with primitive int, avoiding this overhead entirely. In tight loops or stream pipelines processing millions of elements, this can make a significant performance difference. The naming convention follows the pattern: prefix indicates the primitive input type (Int, Long, Double), and suffix indicates output (ToInt, ToLong, ToDouble). IntStream, LongStream, and DoubleStream use these specializations internally.',
          difficulty: 'medium',
          followUp: 'When would the autoboxing overhead actually matter in practice?'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // TOPIC 3: Lambda Functions
    // ─────────────────────────────────────────────
    {
      id: 'lambda',
      name: 'Lambda Functions',
      icon: '🔮',
      notes: {
        title: 'Lambda Functions',
        points: [
          '<strong>Lambda syntax</strong> varies by complexity: <code>(x, y) -> x + y</code> (expression body), <code>x -> x * 2</code> (single parameter, no parens needed), <code>() -> 42</code> (no parameters), and <code>(x) -> { return x * 2; }</code> (block body requires explicit return and semicolons).',
          'Lambdas can only capture <strong>effectively final</strong> local variables — variables that are never reassigned after initialization. This restriction exists because the lambda may execute on a different thread, and Java avoids concurrent mutation of stack variables. Fields and static variables are NOT subject to this restriction.',
          '<strong>Method references</strong> are preferred over lambdas when the lambda simply delegates to an existing method: <code>list.forEach(System.out::println)</code> is cleaner than <code>list.forEach(x -> System.out.println(x))</code>. Use lambdas when you need to transform arguments, add logic, or call multiple methods.',
          '<strong>Target typing</strong> means the compiler infers the functional interface type from context. The same lambda <code>x -> x + 1</code> could be a <code>Function&lt;Integer, Integer&gt;</code> or <code>UnaryOperator&lt;Integer&gt;</code> depending on the assignment target.',
          '<strong>Variable capture</strong>: lambdas capture the value of effectively final local variables (not the variable itself). This is different from closures in other languages that capture the variable by reference. Instance variables are accessed via the captured <code>this</code> reference.',
          'The <code>this</code> keyword inside a lambda refers to the <strong>enclosing class instance</strong>, not the lambda itself (since lambdas are not classes). In an anonymous inner class, <code>this</code> refers to the anonymous class instance.',
          '<strong>Lambda vs anonymous class</strong>: Lambdas don\'t create a new scope for <code>this</code>, don\'t generate a separate .class file (they use invokedynamic), can\'t have state (no fields), and can only implement functional interfaces. Anonymous classes can implement any interface or extend a class.',
          'Common patterns include: <strong>strategy pattern</strong> (pass behavior), <strong>template method</strong> (execute-around), <strong>decorator</strong> (function composition), and <strong>lazy evaluation</strong> (Supplier-based deferred computation).'
        ],
        codeExamples: [
          {
            title: 'Lambda Syntax Variations',
            code: '// No parameters\nRunnable task = () -> System.out.println(\"Running\");\n\n// Single parameter (parens optional)\nConsumer<String> greet = name -> System.out.println(\"Hi \" + name);\n\n// Multiple parameters\nBiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;\n\n// Block body with return\nFunction<String, String> process = s -> {\n    String trimmed = s.trim();\n    return trimmed.toUpperCase();\n};\n\n// With explicit type\nComparator<String> comp = (String a, String b) -> a.compareTo(b);',
            language: 'java'
          },
          {
            title: 'Effectively Final and Variable Capture',
            code: 'public void processNames(List<String> names) {\n    String prefix = \"User: \";  // effectively final\n    int count = 0;             // NOT effectively final\n\n    names.forEach(name -> {\n        System.out.println(prefix + name);  // OK\n        // count++;  // COMPILE ERROR: not effectively final\n    });\n\n    // Workaround: use AtomicInteger or an array\n    AtomicInteger counter = new AtomicInteger(0);\n    names.forEach(name -> {\n        counter.incrementAndGet();  // OK: object is effectively final\n    });\n}',
            language: 'java'
          },
          {
            title: 'Lambda vs Anonymous Class — this Reference',
            code: 'public class Enclosing {\n    String name = \"Enclosing\";\n\n    void demo() {\n        // Lambda: \"this\" refers to Enclosing instance\n        Runnable lambda = () -> {\n            System.out.println(this.name); // prints \"Enclosing\"\n        };\n\n        // Anonymous class: \"this\" refers to Runnable instance\n        Runnable anon = new Runnable() {\n            String name = \"Anonymous\";\n            @Override\n            public void run() {\n                System.out.println(this.name); // prints \"Anonymous\"\n            }\n        };\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'The "effectively final" rule is a top interview question. Know that the variable\'s VALUE is captured, not the variable itself, which is why mutation is disallowed.',
          'Be prepared to explain why lambdas use invokedynamic instead of generating anonymous inner classes — it\'s more efficient and allows the JVM to optimize at runtime.',
          'Understand that target typing means the same lambda expression can match different functional interfaces depending on context — this is a key difference from anonymous classes which always specify their type.'
        ]
      },
      flashcards: [
        { front: 'Can you omit parentheses around a single lambda parameter?', back: 'Yes, for a single parameter without an explicit type: <code>x -> x + 1</code>. If you specify the type or have zero/multiple parameters, parentheses are required.' },
        { front: 'What does "effectively final" mean?', back: 'A variable is effectively final if it is never reassigned after initialization. It doesn\'t need the <code>final</code> keyword, but behaves as if it had one. Required for lambda variable capture.' },
        { front: 'What does "this" refer to inside a lambda?', back: 'The enclosing class instance, not the lambda itself. Lambdas don\'t introduce a new scope for <code>this</code>, unlike anonymous inner classes.' },
        { front: 'How are lambdas compiled differently from anonymous classes?', back: 'Lambdas use <code>invokedynamic</code> bytecode instruction, deferring the implementation strategy to the JVM at runtime. Anonymous classes generate a separate .class file at compile time.' },
        { front: 'When should you prefer a method reference over a lambda?', back: 'When the lambda simply delegates to an existing method without additional logic. For example, <code>s -> s.length()</code> should be <code>String::length</code>.' },
        { front: 'Can a lambda expression throw checked exceptions?', back: 'Only if the target functional interface\'s abstract method declares the checked exception. Built-in interfaces like Function and Predicate do not, so you must handle checked exceptions inside the lambda or use a custom interface.' },
        { front: 'What is target typing in lambda expressions?', back: 'The compiler determines the functional interface type based on the context (assignment, method parameter, return statement, cast). The same lambda can match different functional interfaces.' },
        { front: 'Can lambdas have state (instance fields)?', back: 'No. Lambdas cannot have fields or state. They can capture effectively final local variables and access enclosing instance fields via the captured <code>this</code> reference.' }
      ],
      quiz: [
        {
          question: 'Which of the following is a valid lambda expression?',
          options: [
            '(int x, y) -> x + y',
            '(x, y) -> x + y',
            '(x, y) -> { x + y }',
            'x, y -> x + y'
          ],
          correct: 1,
          explanation: '(x, y) -> x + y is valid with inferred types and expression body. Option A mixes explicit and inferred types (not allowed). Option C uses a block body but doesn\'t have a return statement. Option D is missing parentheses for multiple parameters.',
          difficulty: 'easy'
        },
        {
          question: 'What happens if you try to modify a local variable inside a lambda?',
          options: [
            'Runtime exception is thrown',
            'The modification is silently ignored',
            'Compilation error: variable must be effectively final',
            'It works but only on the lambda\'s copy of the variable'
          ],
          correct: 2,
          explanation: 'Local variables used in lambdas must be effectively final. Attempting to modify them causes a compilation error. This restriction prevents issues with concurrent access since lambdas might run on different threads. The variable is NOT copied — its value is captured.',
          difficulty: 'easy'
        },
        {
          question: 'What does "this" refer to inside a lambda defined in a method of class Foo?',
          options: [
            'The lambda function itself',
            'null',
            'The Foo instance that contains the method',
            'A synthetic proxy object'
          ],
          correct: 2,
          explanation: 'Inside a lambda, "this" refers to the enclosing class instance (Foo), not the lambda itself. Lambdas do not create a new scope for "this". This is different from anonymous inner classes where "this" refers to the anonymous class instance.',
          difficulty: 'medium'
        },
        {
          question: 'Why does Java use invokedynamic for lambdas instead of generating inner classes?',
          options: [
            'To enable runtime optimization and avoid class-loading overhead',
            'To allow lambdas to have mutable state',
            'To make lambdas serializable by default',
            'To support multiple abstract methods'
          ],
          correct: 0,
          explanation: 'invokedynamic defers the implementation strategy to the JVM, allowing runtime optimizations like avoiding class-file generation, reducing memory footprint, and enabling potential inlining. It does not add mutability, serialization, or multi-method support. This is more efficient than generating a .class file for every lambda at compile time.',
          difficulty: 'medium'
        },
        {
          question: 'Given: Function<String, Integer> f = s -> s.length(); Which is an equivalent method reference?',
          options: [
            'String::length',
            'String::getLength',
            's::length',
            'length::String'
          ],
          correct: 0,
          explanation: 'String::length is an unbound instance method reference. It takes a String as the implicit first argument and calls length() on it. This is the correct form for instance methods when the object is the lambda parameter. s::length would only work if s were a specific String variable in scope (bound reference).',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain the difference between a lambda expression and an anonymous inner class.',
          hint: 'Compare this reference, compilation, scope, state, and interface requirements.',
          answer: 'There are several key differences. First, "this" semantics: in a lambda, "this" refers to the enclosing class instance, while in an anonymous class it refers to the anonymous class instance itself. Second, compilation: lambdas use invokedynamic bytecode which defers implementation to the JVM, while anonymous classes generate a separate .class file. Third, scope: lambdas don\'t introduce a new variable scope (they share the enclosing scope), while anonymous classes have their own scope where you can shadow enclosing variables. Fourth, state: lambdas cannot have fields or constructors, while anonymous classes can. Fifth, type constraints: lambdas can only implement functional interfaces (single abstract method), while anonymous classes can implement any interface or extend abstract/concrete classes. In practice, prefer lambdas for short, stateless callbacks and anonymous classes when you need state or multiple method implementations.',
          difficulty: 'medium',
          followUp: 'Are there performance differences between lambdas and anonymous classes?'
        },
        {
          question: 'Why must local variables be effectively final to be used in lambdas?',
          hint: 'Think about how variables are captured and concurrency implications.',
          answer: 'Local variables in Java live on the stack and are destroyed when the method returns. When a lambda captures a local variable, it captures the variable\'s value, not a reference to the variable itself. If the variable could be modified after capture, the lambda would be working with a stale value, leading to confusing bugs. Additionally, lambdas may be executed asynchronously on different threads — allowing mutation would require synchronization of stack variables, which Java doesn\'t support. By requiring effectively final variables, Java ensures that the captured value is consistent and thread-safe without complex memory model guarantees. Note that this restriction only applies to local variables; instance and class fields can be freely used because they live on the heap and are accessed through references.',
          difficulty: 'hard',
          followUp: 'How can you work around this restriction when you actually need to accumulate values in a lambda?'
        },
        {
          question: 'What is target typing and why is it important for lambdas?',
          hint: 'Think about how the compiler knows what type a lambda expression represents.',
          answer: 'Target typing is the mechanism by which the Java compiler infers the functional interface type of a lambda expression from the context in which it appears. For example, the lambda x -> x + 1 could be a Function<Integer, Integer>, UnaryOperator<Integer>, or IntUnaryOperator depending on the target type. The compiler looks at assignment targets, method parameter types, return types, and cast expressions to determine the correct functional interface. This is important because lambdas in Java are not objects with an inherent type — they only have meaning in the context of a functional interface. This design is why you cannot assign a lambda to Object without a cast, and why the same lambda can be used with different functional interface types. Target typing enables maximum flexibility and eliminates verbose type declarations.',
          difficulty: 'medium',
          followUp: 'Can you assign a lambda directly to a variable of type Object?'
        },
        {
          question: 'Show how you would use lambdas to implement the Strategy pattern.',
          hint: 'Think about passing behavior as a parameter.',
          answer: 'The Strategy pattern is beautifully simplified with lambdas. Instead of creating separate strategy classes, you can pass behavior directly. For example, a sorting service might accept a Comparator<T> lambda: service.sort(users, (u1, u2) -> u1.getName().compareTo(u2.getName())). A validation framework might accept Predicate<T> strategies: validator.addRule(user -> user.getAge() >= 18). A pricing calculator might take Function<Order, BigDecimal> to apply different discount strategies: calculator.setDiscount(order -> order.getTotal().multiply(BigDecimal.valueOf(0.10))). The key insight is that functional interfaces replace strategy interfaces, and lambdas replace concrete strategy classes, dramatically reducing boilerplate while maintaining the pattern\'s flexibility.',
          difficulty: 'easy',
          followUp: 'How would you combine multiple strategies using function composition?'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // TOPIC 4: Optional Class
    // ─────────────────────────────────────────────
    {
      id: 'optional',
      name: 'Optional Class',
      icon: '🎁',
      notes: {
        title: 'Optional Class',
        points: [
          '<strong>Optional&lt;T&gt;</strong> is a container that may or may not hold a non-null value. Create with <code>Optional.of(value)</code> (throws NPE if null), <code>Optional.ofNullable(value)</code> (allows null), or <code>Optional.empty()</code> for absent values.',
          '<strong>Checking presence</strong>: <code>isPresent()</code> returns true if value exists; <code>isEmpty()</code> (Java 11+) returns true if absent. Prefer <code>ifPresent(consumer)</code> for action-on-present and <code>ifPresentOrElse(consumer, runnable)</code> (Java 9+) for both cases.',
          '<strong>Retrieving values</strong>: <code>get()</code> returns the value but throws <code>NoSuchElementException</code> if empty — avoid bare get(). Prefer <code>orElse(defaultValue)</code>, <code>orElseGet(supplier)</code> (lazy), or <code>orElseThrow()</code> / <code>orElseThrow(exceptionSupplier)</code>.',
          '<strong>Transforming</strong>: <code>map(function)</code> transforms the value if present, wrapping the result in Optional. <code>flatMap(function)</code> is used when the mapping function itself returns an Optional, avoiding nested Optional&lt;Optional&lt;T&gt;&gt;.',
          '<code>filter(predicate)</code> returns the Optional if the value matches the predicate, or empty otherwise. <code>stream()</code> (Java 9+) converts to a zero-or-one element stream, useful for flatMapping streams of Optionals.',
          '<strong>Anti-patterns</strong>: Don\'t use Optional as a field type, method parameter, or in collections. Don\'t call <code>get()</code> without checking presence. Don\'t use <code>Optional.of()</code> when the value might be null. Don\'t use <code>isPresent() + get()</code> — use <code>map()</code>/<code>orElse()</code> instead.',
          '<strong>orElse() vs orElseGet()</strong>: <code>orElse()</code> always evaluates its argument (eager), while <code>orElseGet()</code> only calls the supplier when the Optional is empty (lazy). Use orElseGet() when the default value is expensive to create.',
          '<strong>API design</strong>: Optional is designed as a return type for methods that might not return a value. Using it correctly communicates to callers that absence is a possibility and forces them to handle it, replacing null-returning methods and reducing NullPointerExceptions.'
        ],
        codeExamples: [
          {
            title: 'Creating and Retrieving Optional Values',
            code: '// Creating Optionals\nOptional<String> present = Optional.of(\"Hello\");\nOptional<String> nullable = Optional.ofNullable(getUserName()); // safe\nOptional<String> absent = Optional.empty();\n\n// Retrieving values safely\nString name = nullable.orElse(\"Anonymous\");\nString computed = nullable.orElseGet(() -> computeExpensiveDefault());\nString required = nullable.orElseThrow(\n    () -> new UserNotFoundException(\"No user found\")\n);\n\n// Conditional actions\nnullable.ifPresent(n -> System.out.println(\"Welcome, \" + n));\nnullable.ifPresentOrElse(\n    n -> greet(n),\n    () -> greetStranger()\n);',
            language: 'java'
          },
          {
            title: 'Transforming with map, flatMap, and filter',
            code: '// map: transform the value if present\nOptional<String> email = findUser(id)\n    .map(User::getEmail);\n\n// flatMap: when mapping function returns Optional\nOptional<Address> address = findUser(id)\n    .flatMap(User::getAddress)  // getAddress returns Optional<Address>\n    .filter(a -> a.getCity() != null);\n\n// Chaining transformations\nString city = findUser(id)\n    .flatMap(User::getAddress)\n    .map(Address::getCity)\n    .map(String::toUpperCase)\n    .orElse(\"UNKNOWN\");\n\n// stream() for flat-mapping collections of Optionals\nList<String> emails = userIds.stream()\n    .map(this::findUser)           // Stream<Optional<User>>\n    .flatMap(Optional::stream)     // Stream<User>\n    .map(User::getEmail)\n    .toList();',
            language: 'java'
          },
          {
            title: 'Common Anti-Patterns to Avoid',
            code: '// ❌ WRONG: isPresent() + get()\nif (optional.isPresent()) {\n    return optional.get();\n} else {\n    return \"default\";\n}\n// ✅ CORRECT:\nreturn optional.orElse(\"default\");\n\n// ❌ WRONG: Optional as method parameter\npublic void process(Optional<String> name) { }  // Don\'t!\n// ✅ CORRECT: Use overloading or nullable\npublic void process(String name) { }\npublic void process() { process(null); }\n\n// ❌ WRONG: Optional.of() with nullable value\nOptional<String> opt = Optional.of(possiblyNull); // NPE risk!\n// ✅ CORRECT:\nOptional<String> opt = Optional.ofNullable(possiblyNull);',
            language: 'java'
          }
        ],
        interviewTips: [
          'Always mention that Optional should be used as a RETURN type, never as a field, constructor parameter, or method parameter — this is a common interview trap.',
          'Know the difference between orElse() and orElseGet() — interviewers love asking about eager vs lazy evaluation and when the performance difference matters.',
          'Be ready to refactor imperative null-checking code into functional Optional chains using map/flatMap/filter — this is a common live-coding exercise.'
        ]
      },
      flashcards: [
        { front: 'What is the difference between Optional.of() and Optional.ofNullable()?', back: '<code>Optional.of(value)</code> throws NullPointerException if value is null. <code>Optional.ofNullable(value)</code> returns Optional.empty() if value is null. Use ofNullable when the value might be null.' },
        { front: 'When should you use orElseGet() instead of orElse()?', back: 'Use <code>orElseGet(supplier)</code> when the default value is expensive to compute. orElse() always evaluates its argument (even when Optional has a value), while orElseGet() only calls the supplier when empty.' },
        { front: 'What is the difference between map() and flatMap() on Optional?', back: '<code>map()</code> wraps the result in an Optional automatically. <code>flatMap()</code> expects the function to return an Optional itself, avoiding nested Optional<Optional<T>>.' },
        { front: 'Should Optional be used as a method parameter?', back: 'No. Optional was designed as a return type to signal that a value might be absent. Using it as a parameter forces callers to create Optional objects unnecessarily. Use method overloading or @Nullable instead.' },
        { front: 'What does Optional.stream() do?', back: 'Converts the Optional to a Stream of zero or one elements. If present, a single-element stream; if empty, an empty stream. Added in Java 9, it\'s useful for flatMapping streams of Optionals.' },
        { front: 'Why should you avoid calling get() on Optional?', back: 'Calling <code>get()</code> on an empty Optional throws <code>NoSuchElementException</code>. It defeats the purpose of Optional, which is to avoid unchecked access. Use orElse(), orElseGet(), orElseThrow(), or map() instead.' },
        { front: 'What does filter() do on Optional?', back: 'Returns the same Optional if the value is present and matches the predicate, otherwise returns Optional.empty(). It does not filter multiple elements — Optional holds at most one value.' },
        { front: 'What is the anti-pattern of using isPresent() followed by get()?', back: 'It mimics null-checking with <code>if (x != null)</code> and gains nothing from Optional\'s functional API. Replace with <code>orElse()</code>, <code>map()</code>, or <code>ifPresent()</code> for cleaner, safer code.' }
      ],
      quiz: [
        {
          question: 'What does Optional.of(null) return?',
          options: [
            'Optional.empty()',
            'An Optional containing null',
            'Throws NullPointerException',
            'Throws IllegalArgumentException'
          ],
          correct: 2,
          explanation: 'Optional.of(null) throws NullPointerException immediately. It is designed for values you know are non-null. Use Optional.ofNullable(null) to safely get Optional.empty() when the value might be null.',
          difficulty: 'easy'
        },
        {
          question: 'What is the key difference between orElse() and orElseGet()?',
          options: [
            'orElse() returns Optional, orElseGet() returns the raw value',
            'orElse() eagerly evaluates the default; orElseGet() lazily evaluates via a Supplier',
            'orElseGet() can throw exceptions; orElse() cannot',
            'There is no functional difference'
          ],
          correct: 1,
          explanation: 'orElse(defaultValue) always evaluates defaultValue regardless of whether the Optional is present. orElseGet(supplier) only invokes the Supplier when the Optional is empty, making it better for expensive computations. Both return the unwrapped value, not an Optional.',
          difficulty: 'easy'
        },
        {
          question: 'What does the following return? Optional.of("hello").map(String::toUpperCase).orElse("world")',
          options: [
            '"HELLO"',
            '"hello"',
            '"world"',
            'Optional["HELLO"]'
          ],
          correct: 0,
          explanation: 'Optional.of("hello") creates a present Optional. map(String::toUpperCase) transforms "hello" to "HELLO", still wrapped in Optional. orElse("world") unwraps the value — since it\'s present, it returns "HELLO". The orElse default "world" is never used.',
          difficulty: 'medium'
        },
        {
          question: 'Which is the recommended way to use Optional in an API?',
          options: [
            'As a return type for methods that might not return a value',
            'As a method parameter type',
            'As a field type in entity classes',
            'In collections like List<Optional<String>>'
          ],
          correct: 0,
          explanation: 'Optional was specifically designed as a return type to signal that a method might not return a value. Using it as a field (not serializable by default), method parameter (forces callers to wrap), or in collections (adds unnecessary wrapping) are all considered anti-patterns by the Java architects.',
          difficulty: 'medium'
        },
        {
          question: 'What does findUser(id).flatMap(User::getAddress).map(Address::getCity) return when getAddress() returns Optional<Address>?',
          options: [
            'Optional<Optional<String>>',
            'Optional<String>',
            'String',
            'Compilation error'
          ],
          correct: 1,
          explanation: 'flatMap is used because getAddress() returns Optional<Address> — it flattens the nested Optional. Then map(Address::getCity) wraps the city String in Optional. The result is Optional<String>. If map() were used instead of flatMap, you would get Optional<Optional<Address>>, which is the exact problem flatMap solves.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain Optional and why it was introduced in Java 8.',
          hint: 'Focus on the problem it solves (NullPointerException) and how it communicates intent.',
          answer: 'Optional was introduced to provide a better alternative to returning null from methods. Before Optional, there was no way to tell from a method signature whether it might return null, leading to pervasive NullPointerExceptions — often called the "billion-dollar mistake." Optional makes the possibility of absence explicit in the type system: a method returning Optional<User> clearly communicates that it might not find a user. It also provides a rich functional API (map, flatMap, filter, orElse) for safely handling absent values without nested null checks. However, it\'s intentionally not serializable and not intended for use as fields, parameters, or collection elements — it\'s designed specifically as a return type.',
          difficulty: 'easy',
          followUp: 'What are the main anti-patterns when using Optional?'
        },
        {
          question: 'Walk me through the difference between map() and flatMap() on Optional with a real example.',
          hint: 'Think about what happens when the mapping function itself returns an Optional.',
          answer: 'map() transforms the value inside an Optional and wraps the result in a new Optional. For example, optional.map(User::getName) transforms Optional<User> to Optional<String>. flatMap() is needed when the mapping function itself returns an Optional — it flattens the result to avoid Optional<Optional<T>>. Consider a User with an Optional<Address> address field: using map would give Optional<Optional<Address>>, but flatMap gives Optional<Address>. A practical chain: findUser(id).flatMap(User::getAddress).map(Address::getCity).orElse("Unknown"). Here flatMap is used for getAddress() because it returns Optional, and map is used for getCity() because it returns a plain String.',
          difficulty: 'medium',
          followUp: 'Can you have multiple flatMap calls chained together?'
        },
        {
          question: 'Explain the difference between orElse() and orElseGet() and when the distinction matters.',
          hint: 'Think about eager vs lazy evaluation and side effects.',
          answer: 'orElse(T value) evaluates its argument eagerly — the default value is computed regardless of whether the Optional is present. orElseGet(Supplier<T> supplier) is lazy — it only invokes the supplier when the Optional is empty. This distinction matters when the default value is expensive to create. For example, orElse(fetchFromDatabase()) will always execute the database query even when the Optional has a value, wasting resources. orElseGet(() -> fetchFromDatabase()) only queries the database when needed. In most cases with simple constants like orElse("default"), the difference is negligible. But with remote calls, object creation, or any side-effect-producing code, orElseGet should always be preferred.',
          difficulty: 'medium',
          followUp: 'Can you think of a bug that could be caused by using orElse() with a method that has side effects?'
        },
        {
          question: 'How would you refactor a chain of null checks into Optional operations?',
          hint: 'Show the before (imperative null checks) and after (Optional chaining).',
          answer: 'Consider this imperative code: if (user != null) { Address addr = user.getAddress(); if (addr != null) { String city = addr.getCity(); if (city != null) { return city.toUpperCase(); } } } return "UNKNOWN". This can be refactored to: return Optional.ofNullable(user).map(User::getAddress).map(Address::getCity).map(String::toUpperCase).orElse("UNKNOWN"). If getAddress() returns Optional<Address>, use flatMap: Optional.ofNullable(user).flatMap(User::getAddress).map(Address::getCity).map(String::toUpperCase).orElse("UNKNOWN"). The functional version is more readable, eliminates pyramid-of-doom nesting, and makes the happy-path transformation pipeline clear.',
          difficulty: 'easy',
          followUp: 'What if some of those methods throw checked exceptions?'
        },
        {
          question: 'Why should you not use Optional as a field type or method parameter?',
          hint: 'Think about serialization, performance, and API design intent.',
          answer: 'Optional was designed by Brian Goetz specifically as a return type for "result might be absent" scenarios. Using it as a field adds memory overhead (extra object allocation per field) and Optional is not Serializable, causing problems with JPA entities, Jackson serialization, and other frameworks. As a method parameter, it forces every caller to wrap their value in Optional.ofNullable() — it\'s cleaner to accept a nullable parameter or use method overloading. In collections, List<Optional<String>> adds wrapping overhead and complicates stream processing — use a plain list and filter out nulls. The core principle: Optional pushes the burden of handling absence to the caller, which only makes sense at method boundaries (return types), not internal representation.',
          difficulty: 'hard',
          followUp: 'How do frameworks like Jackson handle Optional fields if you do use them?'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // TOPIC 5: Streams API
    // ─────────────────────────────────────────────
    {
      id: 'streams',
      name: 'Streams API',
      icon: '🌊',
      notes: {
        title: 'Streams API',
        points: [
          '<strong>Creating streams</strong>: <code>collection.stream()</code>, <code>Arrays.stream(arr)</code>, <code>Stream.of(a, b, c)</code>, <code>Stream.generate(supplier)</code> (infinite), <code>Stream.iterate(seed, op)</code> (infinite/bounded), and <code>IntStream.range(0, 10)</code> for primitives.',
          '<strong>Intermediate operations</strong> are lazy and return a new stream: <code>filter(predicate)</code>, <code>map(function)</code>, <code>flatMap(function)</code>, <code>distinct()</code>, <code>sorted()</code>, <code>peek(consumer)</code>, <code>limit(n)</code>, <code>skip(n)</code>, <code>takeWhile()</code>, <code>dropWhile()</code> (Java 9+).',
          '<strong>Terminal operations</strong> trigger execution and produce a result or side-effect: <code>forEach()</code>, <code>collect()</code>, <code>reduce()</code>, <code>count()</code>, <code>findFirst()</code>, <code>findAny()</code>, <code>anyMatch()</code>, <code>allMatch()</code>, <code>noneMatch()</code>, <code>toArray()</code>, <code>min()</code>, <code>max()</code>, <code>toList()</code> (Java 16+).',
          '<strong>Collectors</strong> are powerful terminal strategies: <code>toList()</code>, <code>toSet()</code>, <code>toMap()</code>, <code>groupingBy()</code>, <code>partitioningBy()</code>, <code>joining()</code>, <code>counting()</code>, <code>summarizingInt()</code>, <code>reducing()</code>. Downstream collectors enable multi-level transformations.',
          '<strong>Parallel streams</strong> via <code>parallelStream()</code> or <code>stream().parallel()</code> use the ForkJoinPool for data parallelism. Use only for CPU-intensive operations on large datasets. Avoid when: order matters, side-effects exist, the source is small, or operations involve I/O.',
          '<strong>Lazy evaluation</strong>: intermediate operations are not executed until a terminal operation is invoked. The stream pipeline fuses operations — elements are processed one at a time through the entire pipeline (loop fusion), enabling short-circuiting with operations like <code>findFirst()</code> and <code>limit()</code>.',
          '<strong>Stateful vs stateless</strong>: Stateless operations (map, filter) process each element independently. Stateful operations (distinct, sorted, limit) need information about other elements, which can impact parallel performance. Prefer stateless operations in parallel streams.',
          '<strong>Infinite streams</strong> are created with <code>Stream.generate()</code> or <code>Stream.iterate()</code>. They must be bounded with <code>limit()</code> or short-circuiting terminals (findFirst, anyMatch). Java 9 added <code>Stream.iterate(seed, hasNext, next)</code> with a predicate for bounded iteration.'
        ],
        codeExamples: [
          {
            title: 'Stream Pipeline Basics',
            code: 'List<String> names = List.of(\"Alice\", \"Bob\", \"Charlie\", \"Anna\", \"David\");\n\n// Filter, transform, collect\nList<String> result = names.stream()\n    .filter(n -> n.startsWith(\"A\"))\n    .map(String::toUpperCase)\n    .sorted()\n    .toList();  // Java 16+ [\"ALICE\", \"ANNA\"]\n\n// reduce: summing lengths\nint totalLength = names.stream()\n    .mapToInt(String::length)\n    .sum();  // 25\n\n// flatMap: flatten nested collections\nList<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4));\nList<Integer> flat = nested.stream()\n    .flatMap(Collection::stream)\n    .toList();  // [1, 2, 3, 4]',
            language: 'java'
          },
          {
            title: 'Collectors: Grouping and Partitioning',
            code: '// groupingBy: group employees by department\nMap<String, List<Employee>> byDept = employees.stream()\n    .collect(Collectors.groupingBy(Employee::getDepartment));\n\n// groupingBy with downstream: count per department\nMap<String, Long> deptCount = employees.stream()\n    .collect(Collectors.groupingBy(\n        Employee::getDepartment,\n        Collectors.counting()\n    ));\n\n// partitioningBy: split into two groups\nMap<Boolean, List<Employee>> partitioned = employees.stream()\n    .collect(Collectors.partitioningBy(\n        e -> e.getSalary() > 50000\n    ));\n\n// toMap with merge function\nMap<String, Integer> nameToAge = people.stream()\n    .collect(Collectors.toMap(\n        Person::getName,\n        Person::getAge,\n        (existing, replacement) -> existing  // merge on conflict\n    ));',
            language: 'java'
          },
          {
            title: 'Infinite Streams and Parallel Processing',
            code: '// Infinite stream with limit\nList<Integer> fibs = Stream.iterate(\n        new int[]{0, 1},\n        f -> new int[]{f[1], f[0] + f[1]}\n    )\n    .limit(10)\n    .map(f -> f[0])\n    .toList();  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\n// Bounded iterate (Java 9+)\nStream.iterate(1, n -> n <= 100, n -> n * 2)\n    .forEach(System.out::println);  // 1, 2, 4, 8, 16, 32, 64\n\n// Parallel stream for CPU-intensive work\nlong count = largeList.parallelStream()\n    .filter(item -> expensiveComputation(item))\n    .count();',
            language: 'java'
          }
        ],
        interviewTips: [
          'Understand lazy evaluation deeply — interviewers often ask what happens if you create a stream pipeline without a terminal operation (nothing happens — no processing occurs).',
          'Know the difference between reduce() and collect() — reduce creates new values at each step (immutable accumulation), collect uses a mutable container (more efficient for collections).',
          'Be cautious about parallel streams — they\'re not always faster. Mention the ForkJoinPool, thread safety requirements, and the overhead of splitting/merging. A common interview mistake is suggesting parallel() as a performance silver bullet.'
        ]
      },
      flashcards: [
        { front: 'What is the difference between intermediate and terminal operations?', back: 'Intermediate operations are lazy, return a new stream, and don\'t trigger execution (map, filter, sorted). Terminal operations trigger the pipeline and produce a result or side-effect (collect, forEach, reduce).' },
        { front: 'What happens if you use a stream without a terminal operation?', back: 'Nothing. Stream operations are lazy — no processing occurs until a terminal operation is invoked. The intermediate operations just build up the pipeline description.' },
        { front: 'What is the difference between map() and flatMap()?', back: '<code>map()</code> transforms each element to one element. <code>flatMap()</code> transforms each element to zero or more elements and flattens them into a single stream. Used for one-to-many transformations.' },
        { front: 'When should you avoid parallel streams?', back: 'When the dataset is small, operations involve I/O or synchronization, order matters (e.g., limit, findFirst), the source doesn\'t split well (LinkedList), or operations have side-effects.' },
        { front: 'What does Collectors.groupingBy() return?', back: 'A Map where keys are the classification function results and values are Lists (by default) of elements in each group. A downstream collector can change the value type.' },
        { front: 'What is the difference between findFirst() and findAny()?', back: '<code>findFirst()</code> returns the first element in encounter order. <code>findAny()</code> may return any element and is faster in parallel streams. Both return Optional.' },
        { front: 'What are stateful vs stateless stream operations?', back: 'Stateless operations (map, filter) process each element independently. Stateful operations (distinct, sorted, limit) need to see other elements and may buffer data, which impacts parallel performance.' },
        { front: 'How do you create an infinite stream?', back: 'Use <code>Stream.generate(supplier)</code> for unbounded generation or <code>Stream.iterate(seed, unaryOp)</code> for sequential values. Must use <code>limit()</code> or a short-circuiting terminal to avoid infinite execution.' }
      ],
      quiz: [
        {
          question: 'Which of the following is a terminal operation?',
          options: [
            'filter()',
            'map()',
            'collect()',
            'sorted()'
          ],
          correct: 2,
          explanation: 'collect() is a terminal operation that triggers the stream pipeline and gathers elements into a collection or result. filter(), map(), and sorted() are all intermediate operations that are lazy and return a new stream.',
          difficulty: 'easy'
        },
        {
          question: 'What does stream.peek(System.out::println).count() do on [1, 2, 3]?',
          options: [
            'Prints 1, 2, 3 and returns 3',
            'Returns 3 without printing anything',
            'Prints 1, 2, 3 and returns void',
            'Throws UnsupportedOperationException'
          ],
          correct: 0,
          explanation: 'peek() is an intermediate operation that performs an action on each element as it passes through. count() is the terminal operation that triggers the pipeline. Since count() needs to process all elements, peek prints each one. Note: in some JVM implementations, count() may skip peek() if the stream size is known — but the standard behavior processes elements.',
          difficulty: 'easy'
        },
        {
          question: 'What is the output of Stream.of(3, 1, 4, 1, 5).distinct().sorted().toList()?',
          options: [
            '[1, 3, 4, 5]',
            '[3, 1, 4, 5]',
            '[1, 1, 3, 4, 5]',
            '[5, 4, 3, 1]'
          ],
          correct: 0,
          explanation: 'distinct() removes the duplicate 1, leaving [3, 1, 4, 5] (conceptually). sorted() then sorts in natural order to produce [1, 3, 4, 5]. The order of distinct() and sorted() doesn\'t affect the final result here, but distinct() before sorted() can be more efficient.',
          difficulty: 'medium'
        },
        {
          question: 'What does Collectors.partitioningBy(predicate) return?',
          options: [
            'A Map<Boolean, List<T>> with exactly two entries (true and false)',
            'A List split into two sublists',
            'A Set of elements matching the predicate',
            'A Map<String, List<T>> with dynamic keys'
          ],
          correct: 0,
          explanation: 'partitioningBy() always returns a Map<Boolean, List<T>> with exactly two entries: true key for elements matching the predicate and false key for those that don\'t. Unlike groupingBy, the keys are always Boolean and both entries always exist (possibly with empty lists).',
          difficulty: 'medium'
        },
        {
          question: 'What is the risk of using parallelStream() with a shared mutable collection?',
          options: [
            'Deadlock only',
            'Race conditions, data corruption, or ConcurrentModificationException',
            'The stream automatically synchronizes access',
            'The stream falls back to sequential processing'
          ],
          correct: 1,
          explanation: 'Parallel streams process elements on multiple threads from the ForkJoinPool. If they modify a shared mutable collection (e.g., adding to an ArrayList), you can get race conditions, data corruption, or ConcurrentModificationException. The stream does NOT automatically synchronize. Use collect() with thread-safe collectors instead of manual mutation.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain how lazy evaluation works in the Streams API.',
          hint: 'Discuss what happens with and without terminal operations, and how loop fusion works.',
          answer: 'Stream intermediate operations like filter, map, and sorted are lazy — they don\'t execute when called but instead build a pipeline description. Execution only begins when a terminal operation like collect(), forEach(), or count() is invoked. The JVM uses loop fusion to optimize: instead of making separate passes for each operation, elements flow one-at-a-time through the entire pipeline. For example, stream.filter(p).map(f).findFirst() doesn\'t filter all elements first — it tests and transforms one element at a time, stopping as soon as findFirst() has a result. This enables short-circuit optimization and means that with findFirst(), only elements up to the first match are processed. Without a terminal operation, nothing happens at all.',
          difficulty: 'medium',
          followUp: 'Can you give an example where lazy evaluation significantly improves performance?'
        },
        {
          question: 'When should you use parallel streams and when should you avoid them?',
          hint: 'Consider data size, operation type, thread pool, and order requirements.',
          answer: 'Parallel streams are beneficial for CPU-intensive operations on large datasets where elements can be processed independently. Good use cases include heavy mathematical computations, large-scale data transformations, and bulk operations where order doesn\'t matter. Avoid parallel streams when: the dataset is small (overhead exceeds benefit, typically below 10,000 elements), operations involve I/O (threads block and starve the shared ForkJoinPool), operations have side effects or use shared mutable state (race conditions), order matters (findFirst, limit behave differently), or the data source doesn\'t split efficiently (LinkedList, I/O streams). Also be aware that all parallel streams share the common ForkJoinPool by default, so a slow parallel stream can block other parallel operations in the application.',
          difficulty: 'hard',
          followUp: 'How can you use a custom thread pool with parallel streams?'
        },
        {
          question: 'Explain the difference between reduce() and collect() and when to use each.',
          hint: 'Think about immutable accumulation vs mutable reduction.',
          answer: 'reduce() performs immutable reduction — it takes an identity value and a BinaryOperator, creating a new result at each step. For example, stream.reduce(0, Integer::sum) adds numbers, creating new Integer values. collect() performs mutable reduction — it uses a Supplier (create container), BiConsumer (accumulate), and BiConsumer (combine) to modify a mutable container. For example, collect(Collectors.toList()) creates an ArrayList and adds elements to it. Use reduce() for producing a single immutable value (sum, max, concatenation of small strings). Use collect() for building collections or complex results (lists, maps, grouped data) because mutable accumulation avoids creating intermediate objects. String concatenation with reduce() is O(n²) due to immutable String copies, while collect(Collectors.joining()) uses StringBuilder internally for O(n) performance.',
          difficulty: 'medium',
          followUp: 'Can you implement a custom Collector?'
        },
        {
          question: 'How would you use Collectors.groupingBy() with downstream collectors?',
          hint: 'Think about multi-level grouping and aggregation within groups.',
          answer: 'Collectors.groupingBy() takes a classification function and an optional downstream collector. The downstream collector determines how elements within each group are aggregated. For example: groupingBy(Employee::getDept, Collectors.counting()) gives count per department. groupingBy(Employee::getDept, Collectors.averagingDouble(Employee::getSalary)) gives average salary per department. You can nest them: groupingBy(Employee::getDept, groupingBy(Employee::getCity)) creates a Map<String, Map<String, List<Employee>>>. Other useful downstream collectors include mapping() to transform elements, filtering() (Java 9+) to filter within groups, collectingAndThen() to apply a finisher, and reducing() for custom aggregation. This is analogous to SQL\'s GROUP BY with aggregate functions.',
          difficulty: 'medium',
          followUp: 'How would you find the highest-paid employee in each department using streams?'
        },
        {
          question: 'What is flatMap and when would you use it over map?',
          hint: 'Think about one-to-many transformations and nested structures.',
          answer: 'map() performs a one-to-one transformation — each input element produces exactly one output element. flatMap() performs a one-to-many transformation — each input element can produce zero, one, or many output elements, and the results are flattened into a single stream. Use flatMap when you have nested structures: a list of orders where each order has multiple items, you\'d use orders.stream().flatMap(order -> order.getItems().stream()) to get a flat stream of all items. It\'s also essential when a mapping function returns a stream, Optional, or collection. Common examples include splitting strings into words: lines.stream().flatMap(line -> Arrays.stream(line.split(" "))), or flattening Optional streams: ids.stream().map(this::findUser).flatMap(Optional::stream) to get only present values.',
          difficulty: 'easy',
          followUp: 'What happens if your flatMap function returns an empty stream for some elements?'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // TOPIC 6: Records
    // ─────────────────────────────────────────────
    {
      id: 'records',
      name: 'Records',
      icon: '📀',
      notes: {
        title: 'Records',
        points: [
          '<strong>Records</strong> (Java 16+) are immutable data carriers declared with <code>record Point(int x, int y) {}</code>. The compiler automatically generates a canonical constructor, accessor methods (x(), y() — not getX()), equals(), hashCode(), and toString().',
          'The <strong>canonical constructor</strong> has parameters matching the record header. A <strong>compact constructor</strong> omits the parameter list and is used for validation/normalization: <code>public Point { if (x < 0) throw new IllegalArgumentException(); }</code> — fields are auto-assigned after the body.',
          'Records can have <strong>custom methods</strong> (instance and static), static fields, and static initializers. They CANNOT have instance fields beyond the record components, mutable state, or extend other classes (they implicitly extend java.lang.Record).',
          'Records can <strong>implement interfaces</strong>, making them ideal for sealed type hierarchies: <code>sealed interface Shape permits Circle, Rectangle {}</code> with <code>record Circle(double radius) implements Shape {}</code>.',
          '<strong>Restrictions</strong>: records are implicitly final (no subclassing), component fields are private and final, no instance initializers, cannot be abstract, and cannot declare instance fields. Accessor methods can be overridden but must return the same type.',
          '<strong>Records vs Lombok</strong>: Records are a language feature with proper equals/hashCode based on all components, no dependency required, but are fully immutable with no builder pattern. Lombok\'s @Data/@Value offers more flexibility (builders, selective immutability, custom field names) but requires a dependency and annotation processing.',
          '<strong>Record patterns</strong> (Java 21) enable destructuring in pattern matching: <code>if (obj instanceof Point(int x, int y))</code> directly extracts components. Works in switch statements for concise, type-safe decomposition.',
          'Records are ideal for DTOs, value objects, intermediate results in stream operations, multi-return values, and configuration objects. Avoid them when you need inheritance, mutability, or complex behavior beyond data carrying.'
        ],
        codeExamples: [
          {
            title: 'Record Declaration and Constructors',
            code: '// Basic record with compact constructor for validation\npublic record Email(String address) {\n    public Email {  // compact constructor\n        if (address == null || !address.contains(\"@\")) {\n            throw new IllegalArgumentException(\"Invalid email\");\n        }\n        address = address.toLowerCase().trim();  // normalize\n    }\n}\n\n// Record with custom constructor\npublic record Range(int start, int end) {\n    public Range {\n        if (start > end) throw new IllegalArgumentException();\n    }\n\n    // Additional constructor\n    public Range(int single) {\n        this(single, single);\n    }\n\n    // Custom method\n    public int length() {\n        return end - start;\n    }\n}',
            language: 'java'
          },
          {
            title: 'Records with Interfaces and Sealed Types',
            code: 'sealed interface Shape permits Circle, Rectangle, Triangle {\n    double area();\n}\n\nrecord Circle(double radius) implements Shape {\n    public double area() {\n        return Math.PI * radius * radius;\n    }\n}\n\nrecord Rectangle(double width, double height) implements Shape {\n    public double area() {\n        return width * height;\n    }\n}\n\nrecord Triangle(double base, double height) implements Shape {\n    public double area() {\n        return 0.5 * base * height;\n    }\n}\n\n// Usage with pattern matching (Java 21)\nString describe(Shape shape) {\n    return switch (shape) {\n        case Circle(var r) -> \"Circle with radius \" + r;\n        case Rectangle(var w, var h) -> w + \"x\" + h + \" rectangle\";\n        case Triangle(var b, var h) -> \"Triangle: base=\" + b;\n    };\n}',
            language: 'java'
          },
          {
            title: 'Record Patterns (Java 21)',
            code: '// Destructuring in instanceof\nrecord Point(int x, int y) {}\nrecord Line(Point start, Point end) {}\n\nvoid process(Object obj) {\n    // Simple record pattern\n    if (obj instanceof Point(int x, int y)) {\n        System.out.println(\"Point at (\" + x + \", \" + y + \")\");\n    }\n\n    // Nested record pattern\n    if (obj instanceof Line(Point(int x1, int y1), Point(int x2, int y2))) {\n        double length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));\n        System.out.println(\"Length: \" + length);\n    }\n}\n\n// In switch expressions\nString format(Object obj) {\n    return switch (obj) {\n        case Point(var x, var y) -> \"(\" + x + \",\" + y + \")\";\n        case Line(var s, var e) -> s + \" -> \" + e;\n        default -> obj.toString();\n    };\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Emphasize that record accessors use the component name directly (x(), not getX()). This is a common gotcha when migrating from Lombok or traditional POJOs.',
          'Know the compact constructor syntax — it\'s unique to records and a favorite interview question. Remember that field assignment happens automatically AFTER the compact constructor body.',
          'Be ready to discuss records in the context of DDD value objects — records are perfect for immutable value types where identity is based on all field values.'
        ]
      },
      flashcards: [
        { front: 'What does the compiler generate for a record?', back: 'A canonical constructor, accessor methods (named after components, not getX()), equals() based on all components, hashCode() based on all components, and toString() showing all components.' },
        { front: 'What is a compact constructor?', back: 'A record constructor that omits the parameter list: <code>public MyRecord { /* validation */ }</code>. Field assignments happen automatically after the body executes. Used for validation and normalization.' },
        { front: 'Can a record have instance fields?', back: 'No. Records can only have the fields declared as components in the header. They can have static fields and static methods, but no additional instance fields.' },
        { front: 'Can a record extend a class?', back: 'No. Records implicitly extend java.lang.Record and Java doesn\'t support multiple inheritance. Records are also implicitly final and cannot be subclassed.' },
        { front: 'How do record accessor methods differ from traditional getters?', back: 'Record accessors are named after the component (e.g., <code>name()</code> not <code>getName()</code>). They return the component value directly and can be overridden, but the return type must match.' },
        { front: 'What are record patterns in Java 21?', back: 'Record patterns allow destructuring records in instanceof and switch: <code>if (obj instanceof Point(int x, int y))</code> extracts components directly. They can be nested for deep destructuring.' },
        { front: 'When should you use a record vs a regular class?', back: 'Use records for immutable data carriers (DTOs, value objects, intermediate results). Use regular classes when you need mutability, inheritance, encapsulation beyond the components, or complex behavior.' },
        { front: 'Can records implement interfaces?', back: 'Yes. Records can implement any number of interfaces, including sealed interfaces. This makes them ideal for algebraic data types when combined with sealed types.' }
      ],
      quiz: [
        {
          question: 'What is the accessor method name for record Point(int x, int y)?',
          options: [
            'getX() and getY()',
            'x() and y()',
            'getx() and gety()',
            'X() and Y()'
          ],
          correct: 1,
          explanation: 'Record accessor methods are named after the component — x() and y(), not getX() and getY(). This follows the record convention, not the JavaBeans naming convention. This is an important distinction when working with frameworks that expect getX() style getters.',
          difficulty: 'easy'
        },
        {
          question: 'What is the purpose of a compact constructor in a record?',
          options: [
            'To reduce memory usage of record instances',
            'To validate and normalize parameters before auto-assignment',
            'To create a constructor with fewer parameters',
            'To make the record mutable'
          ],
          correct: 1,
          explanation: 'A compact constructor is used for validation and normalization of record parameters. It omits the parameter list and field assignments — the compiler adds field assignments after the body executes. For example, you can validate input or normalize strings to lowercase. It does not affect memory or mutability.',
          difficulty: 'easy'
        },
        {
          question: 'Which of the following is allowed in a record?',
          options: [
            'Declaring additional instance fields',
            'Extending another class',
            'Implementing an interface',
            'Being declared abstract'
          ],
          correct: 2,
          explanation: 'Records can implement interfaces, which makes them powerful with sealed types. They cannot have additional instance fields (only component fields), cannot extend classes (implicitly extend Record), and cannot be abstract (implicitly final). They can have static fields, static methods, and instance methods.',
          difficulty: 'medium'
        },
        {
          question: 'What does the compact constructor "public Point { x = Math.abs(x); }" do?',
          options: [
            'Compilation error because fields are final',
            'Reassigns the parameter x, then auto-assigns the normalized value to the field',
            'Throws UnsupportedOperationException',
            'Creates a mutable record'
          ],
          correct: 1,
          explanation: 'In a compact constructor, the names refer to the parameters, not the fields. The statement x = Math.abs(x) modifies the parameter value. After the compact constructor body completes, the compiler auto-assigns all (potentially modified) parameters to the final fields. The record remains immutable after construction.',
          difficulty: 'hard'
        },
        {
          question: 'How do records differ from Lombok\'s @Value?',
          options: [
            'Records are a JDK feature requiring no dependencies; Lombok is a compile-time annotation processor',
            'Records support builders natively; Lombok does not',
            'Lombok generates immutable classes; records generate mutable classes',
            'Records require Java 8; Lombok requires Java 11+'
          ],
          correct: 0,
          explanation: 'Records are a built-in Java language feature (Java 16+) with no external dependencies, while Lombok requires a library dependency and annotation processing. Both produce immutable classes, but Lombok offers more flexibility (builders, selective immutability). Records don\'t have native builder support. Records require Java 16+, not Java 8.',
          difficulty: 'medium'
        }
      ],
      interview: [
        {
          question: 'What are Java records and when would you use them?',
          hint: 'Describe what gets generated, the constraints, and ideal use cases.',
          answer: 'Records, finalized in Java 16, are a concise way to declare immutable data carrier classes. When you write record Point(int x, int y) {}, the compiler generates: a canonical constructor, accessor methods x() and y() (not getX/getY), equals() and hashCode() based on all components, and a descriptive toString(). Records are implicitly final and extend java.lang.Record. They\'re ideal for DTOs, value objects, API responses, intermediate stream results, and multi-return values. I use them whenever I need a class whose purpose is purely to hold data without complex behavior. They pair beautifully with sealed interfaces for algebraic data types and with pattern matching for exhaustive deconstruction.',
          difficulty: 'easy',
          followUp: 'What are the limitations of records compared to regular classes?'
        },
        {
          question: 'Explain compact constructors and how they differ from canonical constructors.',
          hint: 'Focus on the syntax, automatic field assignment, and typical use cases.',
          answer: 'A canonical constructor in a record has the same parameters as the record header: public Point(int x, int y) { this.x = x; this.y = y; }. A compact constructor omits the parameter list AND the field assignments: public Point { if (x < 0) throw new IllegalArgumentException(); }. In the compact form, the variable names refer to the constructor parameters, not the fields. After the compact constructor body executes, the compiler automatically inserts this.x = x; this.y = y; assignments. This means you can modify parameter values for normalization (e.g., address = address.trim().toLowerCase()) and the modified values get assigned to the fields. Compact constructors are the idiomatic way to add validation and normalization to records without the boilerplate of a full canonical constructor.',
          difficulty: 'medium',
          followUp: 'Can you have both a compact constructor and a custom constructor in the same record?'
        },
        {
          question: 'How do records work with sealed interfaces for pattern matching?',
          hint: 'Think about algebraic data types, exhaustive switches, and record patterns.',
          answer: 'Records and sealed interfaces together create algebraic data types in Java. You define a sealed interface with a finite set of permitted implementations, each as a record: sealed interface Shape permits Circle, Rectangle {} with record Circle(double radius) implements Shape {} and record Rectangle(double w, double h) implements Shape {}. This enables exhaustive switch expressions where the compiler verifies all cases are covered — no default branch needed. With Java 21 record patterns, you can destructure in the switch: switch(shape) { case Circle(var r) -> pi * r * r; case Rectangle(var w, var h) -> w * h; }. Nested record patterns enable deep destructuring. This combination brings the expressiveness of Scala/Kotlin sealed hierarchies to Java, making code both type-safe and concise.',
          difficulty: 'hard',
          followUp: 'What happens if you add a new record to the permits clause — does existing code break?'
        },
        {
          question: 'Compare records with Lombok\'s @Value and @Data. When would you choose each?',
          hint: 'Consider dependencies, features, IDE support, and project constraints.',
          answer: 'Records are a language-level feature requiring no dependencies, providing immutability with auto-generated equals/hashCode/toString based on all components. Lombok\'s @Value is similar but offers more flexibility: @Builder for builder pattern, @With for wither methods, @EqualsAndHashCode.Exclude to exclude fields, and customizable toString. @Data generates mutable classes (getters and setters). I choose records when: the project is on Java 16+, I want zero dependencies, and I need simple immutable data carriers. I choose Lombok @Value when: I need builders, selective field exclusion from equals, or JavaBeans-style getter names. I choose @Data when mutability is needed (e.g., JPA entities). Records are the future direction, but Lombok remains valuable for its extra features and Java 8+ support.',
          difficulty: 'medium',
          followUp: 'Can you use records as JPA entities?'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // TOPIC 7: Sealed Classes
    // ─────────────────────────────────────────────
    {
      id: 'sealed-classes',
      name: 'Sealed Classes',
      icon: '🔒',
      notes: {
        title: 'Sealed Classes',
        points: [
          '<strong>Sealed classes</strong> (Java 17) restrict which classes can extend them using the <code>sealed</code> keyword and <code>permits</code> clause: <code>sealed class Shape permits Circle, Rectangle {}</code>. This provides controlled inheritance — you define the complete hierarchy.',
          'Every permitted subclass MUST use one of three modifiers: <code>final</code> (no further subclassing), <code>sealed</code> (restricted further subclassing), or <code>non-sealed</code> (open for unrestricted subclassing). Omitting these causes a compilation error.',
          '<strong>Sealed interfaces</strong> work identically: <code>sealed interface Expr permits Num, Add, Mul {}</code>. Records implementing sealed interfaces are implicitly final. This is the foundation for algebraic data types in Java.',
          'The <code>permits</code> clause can be omitted if all permitted subtypes are declared in the <strong>same compilation unit</strong> (same file). The compiler infers the permitted subtypes automatically.',
          '<strong>Pattern matching with sealed types</strong>: When used in switch expressions, the compiler knows all permitted subtypes, enabling <strong>exhaustive switches</strong> without a default branch. Adding a new permitted subtype causes compile errors in existing switches, providing safety.',
          '<strong>Benefits over enums</strong>: Unlike enums, sealed types can have different fields, methods, and constructors per subtype. Enums represent a fixed set of constants with uniform structure, while sealed types represent a fixed set of types with heterogeneous data.',
          '<strong>Sealed + records</strong> is the most powerful combination: sealed interface for the type hierarchy, records for the immutable data, and pattern matching for exhaustive processing. This trio enables ML-style algebraic data types in Java.',
          'Use sealed classes when: you have a known, complete set of subtypes, you want the compiler to enforce exhaustiveness, you\'re modeling domain types where the hierarchy is fixed (AST nodes, protocol messages, result types), or you want to prevent external extension of your API.'
        ],
        codeExamples: [
          {
            title: 'Sealed Class Hierarchy',
            code: '// Sealed class with three permitted subtypes\npublic sealed class PaymentMethod\n        permits CreditCard, BankTransfer, DigitalWallet {\n    abstract double fee(double amount);\n}\n\npublic final class CreditCard extends PaymentMethod {\n    private final String cardNumber;\n    public CreditCard(String cardNumber) {\n        this.cardNumber = cardNumber;\n    }\n    @Override\n    double fee(double amount) { return amount * 0.029; }\n}\n\npublic final class BankTransfer extends PaymentMethod {\n    @Override\n    double fee(double amount) { return 0.50; }\n}\n\npublic non-sealed class DigitalWallet extends PaymentMethod {\n    // Open for extension (PayPal, GooglePay, etc.)\n    @Override\n    double fee(double amount) { return amount * 0.015; }\n}',
            language: 'java'
          },
          {
            title: 'Sealed Interface with Records and Exhaustive Switch',
            code: 'sealed interface Result<T> permits Success, Failure {\n    // Algebraic data type for operation results\n}\n\nrecord Success<T>(T value) implements Result<T> {}\nrecord Failure<T>(String error, Exception cause) implements Result<T> {}\n\n// Exhaustive switch — no default needed!\npublic <T> String describe(Result<T> result) {\n    return switch (result) {\n        case Success<T>(var value) -> \"Success: \" + value;\n        case Failure<T>(var error, var cause) -> \"Failed: \" + error;\n    };  // Compiler verifies all cases are handled\n}\n\n// Usage\nResult<Integer> result = new Success<>(42);\nSystem.out.println(describe(result)); // \"Success: 42\"',
            language: 'java'
          },
          {
            title: 'Expression Tree with Sealed Types',
            code: '// AST for arithmetic expressions\nsealed interface Expr permits Num, Add, Mul, Neg {}\nrecord Num(double value) implements Expr {}\nrecord Add(Expr left, Expr right) implements Expr {}\nrecord Mul(Expr left, Expr right) implements Expr {}\nrecord Neg(Expr operand) implements Expr {}\n\n// Evaluate with exhaustive pattern matching\ndouble eval(Expr expr) {\n    return switch (expr) {\n        case Num(var v) -> v;\n        case Add(var l, var r) -> eval(l) + eval(r);\n        case Mul(var l, var r) -> eval(l) * eval(r);\n        case Neg(var e) -> -eval(e);\n    };\n}\n\n// Expr tree: (3 + 4) * -(2)\nExpr tree = new Mul(new Add(new Num(3), new Num(4)), new Neg(new Num(2)));\nSystem.out.println(eval(tree)); // -14.0',
            language: 'java'
          }
        ],
        interviewTips: [
          'The key value proposition of sealed classes is compiler-enforced exhaustiveness. Emphasize that adding a new permitted subtype causes compile errors everywhere it\'s used in switches, unlike the Visitor pattern which requires runtime checks.',
          'Know the three required modifiers for subtypes: final, sealed, or non-sealed. Interviewers often ask what happens if you don\'t specify one (compilation error).',
          'Be ready to compare sealed classes with enums, the Visitor pattern, and type hierarchies in Kotlin/Scala. This shows depth of understanding.'
        ]
      },
      flashcards: [
        { front: 'What three modifiers can a permitted subclass of a sealed class use?', back: '<code>final</code> (no further subclassing), <code>sealed</code> (controlled further subclassing), or <code>non-sealed</code> (open for unrestricted subclassing). One must be specified.' },
        { front: 'Can the permits clause be omitted?', back: 'Yes, if all permitted subtypes are declared in the same source file (compilation unit). The compiler infers the permitted subtypes automatically.' },
        { front: 'How do sealed types enable exhaustive switch?', back: 'The compiler knows all permitted subtypes at compile time. In a switch expression, it can verify that all subtypes are handled, eliminating the need for a default branch and catching missing cases.' },
        { front: 'What is the advantage of sealed types over enums?', back: 'Sealed types allow each subtype to have different fields, constructors, and methods (heterogeneous data). Enums represent a fixed set of constants with uniform structure.' },
        { front: 'Can records implement sealed interfaces?', back: 'Yes. Records are implicitly final, so they satisfy the subclass modifier requirement. The combination of sealed interfaces and records creates algebraic data types in Java.' },
        { front: 'What happens when you add a new permitted subtype?', back: 'All switch expressions over that sealed type will fail to compile because they\'re no longer exhaustive. This provides compile-time safety for handling all cases.' },
        { front: 'What does non-sealed mean on a subclass?', back: 'It opens the hierarchy at that point — any class can extend the non-sealed subclass without restriction. It breaks the seal for that branch while keeping other branches controlled.' },
        { front: 'What is the relationship between sealed classes and pattern matching?', back: 'Sealed classes provide the closed set of types, and pattern matching (especially with records) provides destructuring. Together, they enable type-safe, exhaustive processing of algebraic data types without the Visitor pattern.' }
      ],
      quiz: [
        {
          question: 'Which modifier is NOT valid for a permitted subclass of a sealed class?',
          options: [
            'final',
            'sealed',
            'abstract',
            'non-sealed'
          ],
          correct: 2,
          explanation: 'Permitted subclasses must be exactly one of: final, sealed, or non-sealed. "abstract" alone is not a valid modifier for a permitted subclass — an abstract class would need to be either sealed (restricting its subtypes) or non-sealed (open to extension). The compiler requires one of the three specific modifiers.',
          difficulty: 'easy'
        },
        {
          question: 'When can the permits clause be omitted from a sealed class?',
          options: [
            'When there is only one subclass',
            'When all permitted subtypes are in the same source file',
            'When all subtypes are records',
            'When the sealed class is in a module'
          ],
          correct: 1,
          explanation: 'The permits clause can be omitted when all permitted subtypes are declared in the same compilation unit (source file). The compiler automatically infers the permitted subtypes. The number of subclasses, whether they\'re records, and module status are irrelevant to this rule.',
          difficulty: 'easy'
        },
        {
          question: 'What is the key advantage of sealed classes over the Visitor pattern?',
          options: [
            'Sealed classes are faster at runtime',
            'The compiler enforces exhaustiveness, catching missing cases at compile time',
            'Sealed classes support multiple dispatch',
            'The Visitor pattern cannot work with interfaces'
          ],
          correct: 1,
          explanation: 'Sealed classes with switch expressions provide compiler-enforced exhaustiveness — if you miss a case or add a new subtype, the compiler reports an error. The Visitor pattern achieves similar goals but relies on runtime behavior and is more verbose. Sealed classes are not specifically about performance or multiple dispatch.',
          difficulty: 'medium'
        },
        {
          question: 'What is the result of making a permitted subclass non-sealed?',
          options: [
            'The class becomes final',
            'The class can be extended by any class without restriction',
            'The class is removed from the sealed hierarchy',
            'A compilation error occurs'
          ],
          correct: 1,
          explanation: 'Marking a permitted subclass as non-sealed opens it for unrestricted extension — any class can extend it. The class remains part of the sealed hierarchy (it\'s still a permitted subtype), but its own subtypes are not restricted. This is useful when you want to allow third-party extension at a specific point in your hierarchy.',
          difficulty: 'medium'
        },
        {
          question: 'Given sealed interface Expr permits Num, Add {} and records Num and Add, what happens if you write a switch on Expr without handling Add?',
          options: [
            'It compiles with a warning',
            'It throws a MatchException at runtime',
            'Compilation error: the switch expression does not cover all possible input values',
            'The default branch handles it implicitly'
          ],
          correct: 2,
          explanation: 'Switch expressions over sealed types require exhaustiveness. Missing the Add case causes a compilation error because the compiler knows all permitted subtypes and verifies every case is handled. There is no implicit default for sealed types — that\'s precisely the safety guarantee they provide.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'What are sealed classes in Java and what problem do they solve?',
          hint: 'Think about inheritance control, exhaustiveness, and domain modeling.',
          answer: 'Sealed classes, finalized in Java 17, restrict which classes can extend or implement them using the "sealed" keyword and "permits" clause. They solve the problem of uncontrolled inheritance — before sealed classes, you could either allow unlimited subclassing or prevent it entirely with "final." Sealed classes provide a middle ground: you explicitly declare the complete set of subtypes. The main benefit is compiler-enforced exhaustiveness: when you switch over a sealed type, the compiler verifies that all permitted subtypes are handled. If you add a new subtype, all existing switches become compilation errors, preventing runtime bugs. This is essential for domain modeling where the set of types is known and closed, such as AST nodes, protocol messages, or Result<Success, Failure> types.',
          difficulty: 'easy',
          followUp: 'How do sealed classes compare to Kotlin\'s sealed classes?'
        },
        {
          question: 'Explain the three modifier options for permitted subclasses and when you\'d use each.',
          hint: 'Think about how each modifier affects further subclassing.',
          answer: 'Every direct subclass of a sealed class must declare one of three modifiers. "final" prevents any further subclassing — use it when the subtype is a concrete, complete implementation like a record or a leaf class. "sealed" makes the subtype itself sealed, creating a nested hierarchy with its own restricted set of subtypes — use it when you need multi-level controlled hierarchies, like sealed Vehicle permits Car, Truck where Car is sealed and permits Sedan, SUV. "non-sealed" opens the hierarchy at that point, allowing unrestricted subclassing — use it when you want to provide extensibility at a specific branch, like non-sealed class DigitalWallet extends PaymentMethod so third parties can create PayPalWallet, GooglePayWallet. The choice reflects how much control you need at each level of your type hierarchy.',
          difficulty: 'medium',
          followUp: 'If a non-sealed subclass is extended, are those grandchildren covered in switch expressions on the sealed parent?'
        },
        {
          question: 'How do sealed interfaces, records, and pattern matching work together?',
          hint: 'Describe algebraic data types and show how they compose.',
          answer: 'These three features combine to create algebraic data types (ADTs) in Java, similar to what Scala and Kotlin offer. A sealed interface defines the closed set of possible types: sealed interface Shape permits Circle, Rectangle {}. Records provide concise, immutable implementations with auto-generated constructors and accessors: record Circle(double r) implements Shape {}. Pattern matching with record patterns enables exhaustive, destructuring-based processing: switch (shape) { case Circle(var r) -> pi * r * r; case Rectangle(var w, var h) -> w * h; }. The compiler ensures all cases are handled, record patterns extract data without explicit accessors, and the whole thing is type-safe and concise. This trio eliminates the need for the Visitor pattern and dramatically reduces boilerplate compared to traditional OOP hierarchies.',
          difficulty: 'hard',
          followUp: 'Can you show how you would model an expression tree using this pattern?'
        },
        {
          question: 'When would you choose sealed classes over enums?',
          hint: 'Compare their data modeling capabilities and flexibility.',
          answer: 'Use enums when you have a fixed set of constants with uniform structure — each constant has the same fields and methods, like DayOfWeek or HttpStatus. Use sealed classes when you need heterogeneous subtypes: each subtype can have different fields, constructors, and behavior. For example, a Result type needs Success<T>(value) and Failure(error, cause) — these have completely different data. A Shape hierarchy needs Circle(radius) vs Rectangle(width, height) — different arity and semantics. Enums are simpler for simple cases and automatically provide values(), ordinal(), and name(). Sealed classes are more powerful for complex domain modeling, support generics (enums cannot be generic), can have complex constructors, and work with record patterns for destructuring. In modern Java, sealed classes effectively supersede enums for complex type hierarchies.',
          difficulty: 'medium',
          followUp: 'Can you use sealed classes to implement a state machine?'
        },
        {
          question: 'What are the design considerations when choosing between final, sealed, and non-sealed for a permitted subclass?',
          hint: 'Think about API design, extensibility, and maintenance.',
          answer: 'Choosing the right modifier is an API design decision with long-term implications. Use "final" (or records, which are implicitly final) by default — it provides maximum control and enables the most compiler optimizations. This is appropriate for concrete data types where no further specialization makes sense. Use "sealed" when you have a known sub-hierarchy: for example, a sealed Vehicle permits MotorVehicle, NonMotorVehicle where MotorVehicle is itself sealed. This creates layered exhaustiveness checks. Use "non-sealed" sparingly — it\'s an escape hatch that allows third-party extension at the cost of losing exhaustive pattern matching for that branch. It\'s appropriate when you control the top-level hierarchy but want to allow customization at specific points, like a plugin system. The principle is: start with the most restrictive option and only open up when you have a clear extensibility requirement.',
          difficulty: 'hard',
          followUp: 'How does the choice of modifier affect binary compatibility when evolving the API?'
        }
      ]
    }
  ]
});
